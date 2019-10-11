import React, {Component} from 'react';
import {StyleSheet, Text,Animated, Dimensions,
        AsyncStorage, Platform, View, TouchableOpacity} from 'react-native';
import { Icon, } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import MapView, {Marker, Circle} from 'react-native-maps';
import Unlocked from './svgs/unlocked';

const geolib = require('geolib');
const dist = {'world':20000, 'city':20000, 'local':2000, 'micro':200}
const distance = {'world':10000000, 'city':8000, 'local':800, 'micro':80}
var win_height = Dimensions.get('window').height
var received_rooms = [0,1]

export default class preview_room extends React.Component {
    static navigationOptions = {header: null};
    constructor(props) {
        super(props);
        this.state = {
            global_messages_waiting:0,
            textInput:'', // what the user searched
            search_term:'', // what the user searched
            region: {
                latitude: 40.746787, 
                longitude: -73.988527,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              },
            show:32, // number of rooms/people to show
            selected_data: [], // data to show in flatlist
            loading:false, // if loading rooms
            public_visible:false, 
            private_visible:false, 
            loading:false, 
            col1:'#FFA666', // first color in gradient
            col2:'#FF3757', // second color in gradient
            search_bg:'#FFD0AF', // search background color
            page_:'r o o m s', // page currently on 
            messages:[],
            padding:10,

            height_show_page:new Animated.Value(0), // start with show_page closed
            four_squares:new Animated.Value(1), // start with four squares open
            is_four_squares:true, 
        }
    }

    async componentDidMount() {
        user = await AsyncStorage.getItem('user')
        x = await this.props.navigation.getParam("x")
        y = geolib.getBoundsOfDistance({ latitude:x[12], 
                                  longitude:x[13]
                                },  
                                  dist[x[3]])
        console.log(y,'YYY')
        y2 = ( y[1]['longitude'] - y[0]['longitude'] )/2
        y3 = ( y[1]['latitude'] - y[0]['latitude'] )/2 

        console.log(y2,y3)
        await this.setState({
            key:this.props.navigation.getParam("key"),
            username:user, 
            x:x, 
            loading:true,
            region:{
                latitude:x[12], 
                longitude:x[13],
                latitudeDelta:y2,
                longitudeDelta:y3               
            }
        })
        console.log(distance[this.state.x[3]])
    }
    onSwipeUp(gestureState) {
        this.setState({public_visible:false, private_visible:false})
    }                                                                                                         
    onSwipeDown(gestureState) {
        this.setState({public_visible:false, private_visible:false})
    }
    onSwipeLeft(gestureState) {
        this.setState({public_visible:false, private_visible:false})
    }
    onSwipeRight(gestureState) {
        this.setState({public_visible:false, private_visible:false})
    }
    onSwipe(gestureName, gestureState) {
        
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        this.setState({gestureName: gestureName});
        
        switch (gestureName) {

        case SWIPE_UP:
            this.setState({public_visible:false, private_visible:false})
            this.props.navigation.goBack()
            break;
          
        case SWIPE_DOWN:    
            this.setState({public_visible:false, private_visible:false})
            this.props.navigation.goBack()
            break;
        
        case SWIPE_LEFT:
            this.setState({public_visible:false, private_visible:false})    
            this.props.navigation.goBack()
            break;
          
        case SWIPE_RIGHT:
            this.setState({public_visible:false, private_visible:false})
            this.props.navigation.goBack()
            break;
        }
    }  
    winHeight() {
        if(Platform.OS === 'ios') {
            if ( Dimensions.get('window').height > 811) {
                return win_height*0.045
            }
            else {
                return (win_height*0.015+12)
            }
        }        
        else {
            return (win_height*0.015+12)
        }
    }    
    walk_stay() {
        if(this.state.x[2] == 'walk') {
            return 'Walk away'
        }
        else {
            return 'Be here'
        }
    }
    async back() {
        await this.props.navigation.goBack(this.state.key)
    }

    // for flex
    what_margin_left(index) {
        if(this.state.messages[index][2] == '#000000' || this.state.messages[index][2] == '#9b9b9b' ) {
            return 0.3
        }
        else if( this.state.messages[index][0] == this.state.username || this.state.messages[index][1] == this.state.username ) {
            return 0.3
        }
        else {
            return 0
        }       
    }
    what_margin_right(index) {
        if(this.state.messages[index][2] == '#000000' || this.state.messages[index][2] == '#9b9b9b') {
            return 0.3
        }        
        else if( this.state.messages[index][0] == this.state.username || this.state.messages[index][1] == this.state.username ) {
            return 0
        }
        else {
            return 0.3
        }       
    }

    // border color text
    border_color_left(index) {
        if(this.state.messages[index][2] == '#000000' || this.state.messages[index][2] == '#9b9b9b') {
            return 'transparent'
        }                
        else if( this.state.messages[index][0] == this.state.username || this.state.messages[index][1] == this.state.username) {
            return 'white'
        }
        else {
            return this.state.messages[index][2]
        }    
    }
    border_color_right(index) {
        if(this.state.messages[index][2] == '#000000' || this.state.messages[index][2] == '#9b9b9b') {
            return 'transparent'
        }        
        else if( this.state.messages[index][1] == this.state.username || this.state.messages[index][0] == this.state.username ) {
            return this.state.messages[index][2]
        }
        else {
            return 'white'
        }    
    }

    left_date(index) {
        date = moment(this.state.messages[index][6]*1000).tz(timezone)
        date = date.format('MMM, DD YY h:mm A').toString()
        return date
    }
    right_date(index) {
        date = moment(this.state.messages[index][6]*1000).tz(timezone)
        date = date.format('MMM, DD YY h:mm A').toString()
        return date
    }

    // horizontal view options
    change_padding(){
        if(this.state.padding == 10) {
            this.setState({padding:15, showing_date:0.4, show_date:true, },function(){console.log(this.state.showing_date, this.state.padding)})
        }
        else if(this.state.padding == 15) {
            this.setState({padding:10, showing_date:0.7, show_date:false,},function(){console.log(this.state.show_date, this.state.padding)})
        }
    }
    show_date_left(index){
        if(this.state.messages[index][1] == this.state.username && this.state.show_date == true || this.state.messages[index][0] == this.state.username && this.state.show_date == true) {
            return false
        }
        else if(this.state.show_date == true) {
            return true
        }
    }
    show_date_right(index) {
        if(this.state.messages[index][1] == this.state.username && this.state.show_date == true || this.state.messages[index][0] == this.state.username && this.state.show_date == true) {
            return true
        }
        else if(this.state.show_date == true) {
            return false
        }
    }    
    show_name(index) {

        if(this.state.chat_type == 0) {
            if( this.state.messages[index][2] == '#000000' ) {
                return true
            }
            else {
                return false
            }
        }
        else if(this.state.chat_type == 1 ) {
            if( this.state.messages[index][2] == '#000000' ) {
                return true
            }
            else if(this.state.messages[index][0] == this.state.username ||
                    this.state.messages[index][1] == this.state.username ||
                    this.state.messages[index][2] == '#9b9b9b' || 
                    this.state.messages[index][2] == '#9b9b9c') {
                return false
            }
            else {
                return true
            }
        }
    }

    name() {
        if(this.state.x[4] == 'name') {
            return 'Named only'
        }
        else {
            return 'Named and anonymous'
        }
    }
    admin() {
        if(this.state.x[5] == 'admin') {
            return 'Admin only chat'
        }
        else {
            return 'Everyone can chat'
        }
    }
    async join_room() {
        await this.props.navigation.goBack()
    }

    render() {
    const config = {velocityThreshold: 0.3,directionalOffsetThreshold: 80};
    return (
    <View style={styles.container}>
        { this.state.loading && (
        <Dialog          
            rounded={true}
            visible={this.state.loading}
            >
            <DialogContent>
                <GestureRecognizer
                    onSwipe={(direction, state) => this.onSwipe(direction, state)}
                    onSwipeLeft={ (state) => this.onSwipeLeft(state) }
                    config={config}
                    style={{flex:1,}}
                >
                    <View style={{height:Dimensions.get('window').height, width:Dimensions.get('window').width, backgroundColor:'white', justifyContent:'center', alignItems:'center', alignContent:'center'}}>
                        <View style={{height:this.winHeight(),backgroundColor:'#FF7D61', alignSelf:'stretch', }}></View>
                        
                        <View style={{flex:0.135, backgroundColor:'#FF7D61', alignSelf:'stretch',justifyContent:'center', alignContent:'center'}}>
                            <View style={{flexDirection:'row', alignContent:'center', justifyContent:'center', alignItems:'center'}}>
                                <View style={{flex:1, alignSelf:'stretch', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                                    <TouchableOpacity onPress={ () => { this.props.navigation.goBack() }}>
                                        <Icon 
                                            name="chevron-left"
                                            color="white"
                                            type='entypo'
                                            size={25*factor_hor}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex:4, justifyContent:'center', alignContent:'center', alignItems:'center', alignSelf:'stretch'}}>
                                    <Text style={{fontWeight:'500', color:'white', fontSize:28*factor_hor, fontFamily:'avenir next', textAlign:'center'}}>{this.state.x[8]}</Text>
                                </View>
                                <View style={{flex:1, alignSelf:'stretch'}}></View>
                            </View>
                            <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                <Text style={{fontWeight:'300', color:'white', fontSize:18*factor_hor, fontFamily:'avenir next', textAlign:'center'}}>{this.state.x[17]}</Text>
                            </View>                         
                            <View style={{flex:1}}></View>
                        </View>
                        <View style={{flex:0.3, alignSelf:'stretch'}}>                     
                            <MapView
                                {...this.state}
                                style={{flex:1}}
                                region={this.state.region}
                                customMapStyle={
                                [
                                    {"featureType": "administrative.land_parcel",
                                    "elementType": "labels",
                                    "stylers": [
                                    {"visibility": "off"}]},
                                    {"featureType": "poi.attraction",
                                    "stylers": [
                                    {"visibility": "off"}]},
                                    {"featureType": "poi.business",
                                    "stylers": [
                                    {"visibility": "off"}]},
                                    {"featureType": "poi.medical",
                                    "stylers": [
                                    {"visibility": "off"}]},
                                    {"featureType": "poi.medical",
                                    "elementType": "labels.text",
                                    "stylers": [
                                    {"visibility": "off"}]},
                                    {"featureType": "poi.park",
                                    "elementType": "labels",
                                    "stylers": [{"visibility": "off"}]},
                                    {"featureType": "poi.place_of_worship",
                                    "stylers": [{"visibility": "off"}]},
                                    {"featureType": "road.local",
                                    "elementType": "labels",
                                    "stylers": [{"visibility": "off"}]}]
                                }>
                                <Circle
                                    center={{latitude: this.state.x[12], longitude:this.state.x[13]}}
                                    radius={distance[this.state.x[3]]}
                                    strokeColor={ 'rgba(252, 48, 4, 0)' }
                                    strokeWidth={1}
                                    fillColor={ `rgba(252, 48, 4, 0.1)` }
                                />
                                <Marker coordinate={{latitude: this.state.x[12],longitude: this.state.x[13]}}/>
                            </MapView>  
                        </View>
                        <View style={{flex:0.065, paddingLeft:10*factor_hor, paddingRight:10*factor_hor, flexDirection:'row', borderBottomColor:'#ececec', borderTopColor:'#ececec', borderBottomWidth:0.5, borderTopWidth:0.5,}}>
                            <View style={{ justifyContent:'center'}}>
                                <Text style={{textAlign:'left', fontSize:18*factor_hor, color:'#9b9b9b'}}>{this.state.x[3].slice(0,1).toUpperCase()}{this.state.x[3].slice(1)} | {this.walk_stay()}</Text>
                            </View>
                            <View style={{flex:1,}}></View>
                            <View style={{ justifyContent:'center'}}>
                                <Text style={{textAlign:'right',fontSize:18*factor_hor, color:'#FF7D61' }}>{this.state.x[16]} members</Text>
                            </View>
                        </View>
                        <View style={{flex:0.05, flexDirection:'row', justifyContent:'center', alignContent:'center' }}>
                            <View style={{flex:1, marginRight:3, marginBottom:Dimensions.get('window').height*0.0225, borderBottomColor:'#ececec', borderBottomWidth:0.5}}></View>
                            <Text style={{fontSize:22*factor_hor, color:'#FF7D61', fontFamily:'avenir next'}}>Room Preview</Text>
                            <View style={{flex:1, marginLeft:3, marginBottom:Dimensions.get('window').height*0.0225, borderBottomColor:'#ececec', borderBottomWidth:0.5}}></View>
                        </View>
                        <View style={{flex:0.4,  backgroundColor:'red'}}>
                        
                        {/* messages */}
                        <View style={{flex:1, marginTop:10, marginBottom:5, minHeight:'60%', alignSelf:'stretch', marginLeft:this.state.padding*factor_hor, marginRight:this.state.padding*factor_hor, }}>
                            <FlatList 
                                data={this.state.messages}
                                extraData={this.state}
                                ref = "flatList"
                                
                                showsVerticalScrollIndicator={false}
                                //ListFooterComponent={() => this.state.loading_post? null :this.which_footer()}

                                inverted={true}
                                initialNumToRender={40} 
                                maxToRenderPerBatch={40} 
                                style={{backgroundColor:'white', flex:1, }}
                                keyExtractor={(item,index) => (index).toString()}
                                renderItem={({item, index}) => ( 
                                    <View key={index} style={{ minHeight:10, marginBottom:10*factor_ver, alignSelf:'stretch', flexDirection:'row', backgroundColor:'white', }}>
                            
                                    {/* date right side*/}
                                    <View style={{flex:this.what_margin_left(index), marginRight:5, alignItems:'center', justifyContent:'center', alignContent:'center', }}>
                                    { this.show_date_left(index) && (
                                        <Text style={{textAlign:'center', color:'#9b9b9b', fontFamily:'avenir next', justifyContent:'center', alignContent:'center', alignItems:'center'}}>{this.left_date(index)}</Text>
                                    )}
                                    </View>
                                    
                                    <View style={{flex:0.7, paddingRight:0*factor_hor, marginBottom:2, paddingLeft:0*factor_hor, }}>
                                    {this.show_name(index) && (
                                        <Text onPress={()=>{this.change_padding()}} style={{textAlign:this.which_side(index), fontFamily:'avenir next', fontSize:(8+6*factor_hor), color:'#9b9b9b', }}>[{this.state.messages[index][0]}]</Text>
                                        )}

                                    {/* text */}
                                    <View style={{flex:0.7, paddingRight:5*factor_hor, paddingLeft:5*factor_hor, 
                                    borderRightWidth:1, borderLeftWidth:1, borderRightColor:this.border_color_right(index), borderLeftColor:this.border_color_left(index),}}>
                                        
                                        <Text onPress={()=>{this.change_padding()}} style={{textAlign:this.which_side(index), fontFamily:'avenir next', fontSize:(8+10*factor_hor), fontWeight:this.what_weight(index), color:this.state.messages[index][2],}}>{this.state.messages[index][3]}</Text>
                                        {this.isImage(index) && ( 
                                        <View style={{alignContent:'center', justifyContent:'center', alignItems:'center',}}>
                                            <TouchableOpacity 
                                                style={{flex:1, width:(Dimensions.get('window').width*this.state.showing_date - 30*factor_hor) , height:(Dimensions.get('window').width*0.7 - 30)}}
                                                onPress={() => {this.setState({clicked_image:this.state.messages[index][4]}), this.setState({visible4:true},function(){console.log(this.state.visible4, )})}}>
                                                <FastImage
                                                    resizeMode={FastImage.resizeMode.contain}
                                                    source={{ uri: `http://${serverLocation}/${this.state.messages[index][4]}` }}
                                                    style={{flex:1, width:(Dimensions.get('window').width*this.state.showing_date - 30*factor_hor) , height:(Dimensions.get('window').width*0.7 - 30),  }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        )}                            
                                    </View>
                                    </View>
                                    {/* left side */}
                                    <View style={{flex:this.what_margin_right(index), marginLeft:5, justifyContent:'center', alignItems:'center', alignContent:'center',}}>
                                        { this.show_date_right(index) && (
                                            <Text style={{textAlign:'center', color:'#9b9b9b',}}>{this.right_date(index)}</Text>
                                        )}
                                    </View>     
                                </View>
                                )}/>
                        </View>
                        </View>

                        <View style={{flex:0.075,}}>
                            <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
                                <Text style={{textAlign:'center', color:'#9b9b9b'}}>{this.name()}</Text>
                            </View>
                            <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
                                <Text style={{textAlign:'center', color:'#9b9b9b'}}>{this.admin()}</Text>
                            </View>
                        </View>

                        <View style={{width:Dimensions.get('window').width*0.8, flexDirection:'row', height:Dimensions.get('window').height*0.05, backgroundColor:'#ececec', borderRadius:20, justifyContent:'center', alignContent:'center' }}>
                            <View style={{flex:1, alignItems:'center', justifyContent:'center', alignContent:'center', flexDirection:'row'}}>
                                <View style={{flex:1, alignItems:'center', justifyContent:'center', alignContent:'center'}}></View>
                                <Unlocked
                                    width={17.5*factor_hor}
                                    height={17.5*factor_hor}
                                    style={{
                                        marginRight:5,
                                        justifyContent:'center',
                                        alignContent:'center',
                                        marginBottom:3,
                                    }}
                                />
                            </View>
                            <TouchableOpacity style={{flex:1, justifyContent:'center', alignContent:'center', alignItems:'center'}} onPress={() => {this.join_room()}}>
                                <View>
                                    <Text style={{textAlign:'center', fontWeight:'500', fontSize:22*factor_hor, fontFamily:'avenir next', color:'#FF7D61'}}>Join room</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{flex:0.9, }}></View>
                        </View>
                        <View style={{height:this.winHeight(), alignSelf:'stretch', }}></View>
                    </View>
                
                </GestureRecognizer>
            </DialogContent>
        </Dialog>                               
        )}    
    </View>

      );
    }
  }
const styles = StyleSheet.create({
  
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    
    });
