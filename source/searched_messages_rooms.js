import React, {Component} from 'react';
import {StyleSheet, ActivityIndicator, Dimensions, AsyncStorage,
        Text, View, TouchableOpacity, TouchableHighlight,
        Platform, KeyboardAvoidingView, FlatList,
    } from 'react-native';
import { Icon } from 'react-native-elements';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import moment from  'moment-timezone';
import FastImage from 'react-native-fast-image'

export default class searched_messages_rooms extends React.Component {
    static navigationOptions = {header: null}
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            message_name:'Search Messages',
            roomID:'' ,
            buffer:10, // buffer at bottom screen
            message:'', // message someone types
            number_lines:'', // numbers lines written
            textheight:30, // height of text input
            last_textheight:30, // height of last textheight
            search_term:'',
            color:'white',
            messages:[ ], 
            showing_date:0.7,
            show:20, // number messages to show
            isFetching:false, // whether fetch or not
            admin:'nobody', // group admin
            padding:10, // padding left and right
            negative_padding_left:0, // padding left
            negative_padding_right:0, // padding right
            show_date:false, // show the date
            last_direction:false, // go up feed
            keyboard_opened:false, // if keyboard open
            visible:false, // for image uploads
            visible4:false, // pressed image
            clicked_image:null, // image pressed on 
            received_messages: [0,1],
            end:true,
        }
          
    }

    async componentDidMount() {
     
        data = await this.props.navigation.getParam('x')
        user = await AsyncStorage.getItem('user')
        roomID = data[1]
        color = data[2]
        search_term = data[0]
        room_message_dict = JSON.parse( await AsyncStorage.getItem('room_messages') ) 
        room_messages_info = JSON.parse(await AsyncStorage.getItem('room_messages_info'))
        status_ = room_messages_info[roomID][6]
        is_date = true
        old_timestamp = 100000000000000000000

        if(Platform.OS === 'ios') {
            if ( Dimensions.get('window').height > 811) {
                ios = 40              
            }
        }        
        if( status_ == 'left' ) {  
            old_timestamp = room_messages_info[roomID][20] 
        }   

        url = `http://${serverLocation}:80/get_search_messages_rooms?`
        await fetch(url, {
            method:'POST',
            headers:{    
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
            body: 
            JSON.stringify({
                roomID:roomID,
                search_term:search_term,
                received_messages: '['+(this.state.received_messages).toString()+']',
                old_timestamp:old_timestamp
        })})
        .then((response) => response.json())
        .then((responseJson2) => {
            if(responseJson2.length == 0 ){
                this.setState({end:true})
            }
            else {
                this.setState({end:false})
            }
            this.setState({messages:responseJson2})
            for(key in responseJson2) {
                this.state.received_messages.push( responseJson2[key][7] )
            }
        })
        .catch((error) => {
            console.log(error)
        });     

        await this.setState({
            buffer:ios,
            username: user,
            received_messages:this.state.received_messages,
            roomID:roomID,
            color:color,
            search_term:search_term,
        })
    }


    async reached_end() {
        if(this.state.end == false) {
            old_timestamp = this.state.messages[this.state.messages.length - 1][6]
            url = `http://${serverLocation}:80/get_search_messages_rooms?`
            await fetch(url, {
                method:'POST',
                headers:{    
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                body: 
                JSON.stringify({
                    roomID:this.state.roomID,
                    search_term:this.state.search_term,
                    received_messages: '['+(this.state.received_messages).toString()+']',
                    old_timestamp:old_timestamp
            })})
            .then((response) => response.json())
            .then((responseJson2) => {
                if(responseJson2.length == 0) {
                    this.setState({end:true})
                }
                for(key in responseJson2) {
                    this.state.received_messages.push( responseJson2[key][7] )
                }
                this.setState({
                    messages:[...this.state.messages, ...responseJson2], 
                    received_messages:this.state.received_messages
                })
                
            })
            .catch((error) => {
                console.log(error)
            }); 
 
        }
    }  

    onSwipeUp(gestureState) {
        this.setState({visible4:false}, function () {console.log(this.state.visible4)});
        console.log(this.state.visible4)
    }                                                                                                         
    onSwipeDown(gestureState) {
        this.setState({visible4:false}, function () {console.log(this.state.visible4)});
        console.log(this.state.visible4)
    }
    onSwipeLeft(gestureState) {
        this.setState({visible4:false}, function () {console.log(this.state.visible4)});
        console.log(this.state.visible4)
    }
    onSwipeRight(gestureState) {
        this.setState({visible4:false}, function () {console.log(this.state.visible4)});
        console.log(this.state.visible4)
    }
    onSwipe(gestureName, gestureState) {
        
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        this.setState({gestureName: gestureName});
        
        switch (gestureName) {

        case SWIPE_UP:
            this.setState({visible4:false}, function () {console.log(this.state.visible4)});
            console.log(this.state.visible4)
            break;
          
        case SWIPE_DOWN:    
            this.setState({visible4:false}, function () {console.log(this.state.visible4)});
            console.log(this.state.visible4)
            break;
        
        case SWIPE_LEFT:
            this.setState({visible4:false}, function () {console.log(this.state.visible4)});
            console.log(this.state.visible4)
            break;
          
        case SWIPE_RIGHT:
            this.setState({visible4:false}, function () {console.log(this.state.visible4)});
            console.log(this.state.visible4)
            break;
        }
    }    

    which_footer(){
        if(this.state.act_load_color !== 'white') {
            return <ActivityIndicator size='small' style={{height:25,marginTop:10,justifyContent: 'center',alignItems: 'center',}}/>
        }
        else if( this.state.act_load_color == 'white') {
            return null
        } 
    }
    which_side(index) {
        if(this.state.messages[index][2] == '#000000' || this.state.messages[index][2] == '#9b9b9b') {
            return 'center'
        }        
        else if( this.state.messages[index][1] == this.state.username || this.state.messages[index][0] == this.state.username ) {
            return 'right'
        }
        else {
            return 'left'
        }
    }


    // for flex
    what_margin_left(index) {
        if(this.state.messages[index][2] == '#000000' || this.state.messages[index][2] == '#9b9b9b' ) {
            return 0.25
        }
        else if( this.state.messages[index][0] == this.state.username || this.state.messages[index][1] == this.state.username ) {
            return 0.25
        }
        else {
            return 0
        }       
    }
    what_margin_right(index) {
        if(this.state.messages[index][2] == '#000000' || this.state.messages[index][2] == '#9b9b9b') {
            return 0.25
        }        
        else if( this.state.messages[index][0] == this.state.username || this.state.messages[index][1] == this.state.username ) {
            return 0
        }
        else {
            return 0.25
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
        if( this.state.messages[index][1] !== this.state.username || this.state.messages[index][0] == this.state.username){
            return null
        } 
        else {
            date = moment(this.state.messages[index][6]*1000).tz(timezone)
            date = date.format('MMM, DD YY h:mm A').toString()
            return date
        }
    }
    right_date(index) {
        // if right date and message is right then show date
        if( this.state.messages[index][1] == this.state.username || this.state.messages[index][0] == this.state.username){
            date = moment(this.state.messages[index][6]*1000).tz(timezone)
            date = date.format('MMM, DD YY h:mm A').toString()
            return date
        } 
        else {
            return null
        }
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
    is_image_selected(flex) {
        if(flex == 'flex') {
            if(this.state.visible == true) {
                return 4.5
            }
            else {
                return 6
            }
        }
        if(flex == 'width') {
            if(this.state.visible == true) {
                return Dimensions.get('window').width*0.5625
            }
            else {
                return Dimensions.get('window').width*0.75
            }            
        }
    }

    show_name(index) {
        if(this.state.messages[index][2] == '#000000') { 
            return true
        }
        else if( this.state.messages[index][0] == this.state.username || this.state.messages[index][1] == this.state.username ) {
                     return false 
                }
        else {
            return true
        }
    }
    isImage(index) {
        if( this.state.messages[index][4] !== 'none') {
            return true
        }
        else {
            return false
        }
    }   


    render() {
        const config = {velocityThreshold: 0.3,directionalOffsetThreshold: 80};
        return (
            <View style={styles.container}>
                {/* add image */}
                <Dialog          
                    overlayOpacity={0.15}
                    hasOverlay={true}
                    rounded={true}
                    containerStyle={{opacity:1}}
                    visible={this.state.visible4}
                    onTouchOutside={() => {this.setState({visible4:false})}}
                    >
                    <DialogContent>
                        <GestureRecognizer
                            onSwipe={(direction, state) => this.onSwipe(direction, state)}

                            onSwipeUp={ (state) => this.onSwipeUp(state) }
                            onSwipeDown={ (state) => this.onSwipeDown(state) }
                            onSwipeLeft={ (state) => this.onSwipeLeft(state) }
                            onSwipeRight={ (state) => this.onSwipeRight(state) }
                            
                            config={config}
                            style={{flex:1, backgroundColor:'black'}}
                        >
                            <View style={{height:Dimensions.get('window').height, width:Dimensions.get('window').width, backgroundColor:'black', justifyContent:'center', alignContent:'center'}}>
                                
                                <View style={{flex:1,  }}>
                                    <View style={{absolute:'position', zIndex:2, top:0*factor_ver, right:factor_hor*0.075, zIndex:3, justifyContent:'center', alignContent:'center', alignItems:'flex-end', }}>
                                        <TouchableHighlight underlayColor={'transparent'} onPress={() => {this.setState( {visible4:false} )}} style={{marginEnd:25, zIndex:3, paddingBottom:0, marginTop:10*factor_ver, paddingTop:30*factor_ver}}>
                                            <Icon 
                                                style={{zIndex:3,}}
                                                size={30*factor_hor}
                                                name="cross"
                                                color="#9B9B9B"
                                                type='entypo'
                                            />
                                        </TouchableHighlight>
                                    </View>
                                </View>
                                <View style={{flex:8}}>
                                    <FastImage
                                    resizeMode={FastImage.resizeMode.contain}
                                        source={{ uri: `http://${serverLocation}/${this.state.clicked_image }`}}
                                        style={{ flex:1, paddingRight:1, paddingLeft:1, width:Dimensions.get('window').width, height:Dimensions.get('window').width-2, resizeMode:'contain'}}
                                    />
                                </View>
                                <View style={{flex:1}}></View>
                            </View>
                        </GestureRecognizer>
                    </DialogContent>
                </Dialog>   


                <View style={{height:Dimensions.get('window').height*0.035, backgroundColor:this.state.color, justifyContent:'center', alignContent:'center', alignItems:'center', alignSelf:'stretch'}}></View>         
                <View style={{height:Dimensions.get('window').height*0.055, flexDirection:'row', backgroundColor:this.state.color, justifyContent:'center', alignContent:'center', alignItems:'center', alignSelf:'stretch'}}>
                    <View style={{flex:1.5, }}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon 
                                name="chevron-left"
                                color="white"
                                type='entypo'
                                size={25*factor_hor}
                            />
                        </TouchableOpacity>                
                    </View>
                    <View style={{flex:1.5, alignContent:'center', alignItems:'center', justifyContent:'center'}}>

                        
                    </View>
                    <Text style={{color:'white', fontSize:24*factor_ver, fontWeight:'500', fontFamily:'avenir next', }}>{this.state.message_name}</Text>
                    <View style={{flex:2,}}></View>
                    <View style={{flex:1,}}></View>
                </View>            

                {/* messages and textinput */}
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.container}>

                {/* messages */}
                <View style={{flex:1, marginBottom:5, minHeight:'60%', alignSelf:'stretch', marginLeft:this.state.padding*factor_hor, marginRight:this.state.padding*factor_hor, }}>
                    <FlatList 
                        data={this.state.messages}
                        extraData={this.state}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={1}
                        onEndReached={ () => {this.reached_end();}}
        
                        inverted={true}
                        initialNumToRender={40} 
                        maxToRenderPerBatch={40} 
                        style={{flex:1, }}
                        keyExtractor={(item,index) => (index).toString()}
                        renderItem={({item, index}) => ( 
                    
                        <View key={index} style={{ minHeight:10, marginBottom:15*factor_ver, alignSelf:'stretch', flexDirection:'row', backgroundColor:'white', }}>
                            
                            {/* date */}
                            <View style={{flex:this.what_margin_left(index), marginRight:5, alignItems:'center', justifyContent:'center', alignContent:'center', }}>
                            { this.show_date_left(index) && (
                                <Text style={{textAlign:'center', color:'#9b9b9b', fontFamily:'avenir next', justifyContent:'center', alignContent:'center', alignItems:'center'}}>{this.left_date(index)}</Text>
                            )}
                            </View>
                            
                            <View style={{flex:0.7, paddingRight:5*factor_hor, paddingLeft:5*factor_hor, borderRightWidth:1, borderLeftWidth:1, borderRightColor:this.border_color_right(index), borderLeftColor:this.border_color_left(index),}}>
                                {this.show_name(index) && (
                                <Text onPress={()=>{this.change_padding()}} style={{textAlign:this.which_side(index), fontFamily:'avenir next', fontSize:14, color:'#9b9b9b', }}>[{this.state.messages[index][0]}]</Text>
                                )}
                                <Text onPress={()=>{this.change_padding()}} style={{textAlign:this.which_side(index), fontFamily:'avenir next', fontSize:17, color:this.state.messages[index][2], }}>{this.state.messages[index][3]}</Text>
                                {this.isImage(index) && ( 
                                <View style={{alignContent:'center', justifyContent:'center', alignItems:'center',}}>
                                    <TouchableOpacity 
                                        style={{flex:1, width:(Dimensions.get('window').width*this.state.showing_date - 30*factor_hor) , height:(Dimensions.get('window').width*0.7 - 30)}}
                                        onPress={() => {this.setState({clicked_image:this.state.messages[index][4]}), this.setState({visible4:true},function(){console.log(this.state.visible4, )})}}>
                                        <FastImage
                                        resizeMode={FastImage.resizeMode.contain}
                                            source={{uri: `http://${serverLocation}/${this.state.messages[index][4]}` }}
                                            style={{ flex:1, width:(Dimensions.get('window').width*this.state.showing_date - 30*factor_hor) , height:(Dimensions.get('window').width*0.7 - 30), resizeMode:'contain' }}
                                        />
                                    </TouchableOpacity>
                                </View>
                                )}                            
                            </View>
                            
                            <View style={{flex:this.what_margin_right(index), marginLeft:5, justifyContent:'center', alignItems:'center', alignContent:'center',}}>
                            { this.show_date_right(index) && (
                                <Text style={{textAlign:'center', color:'#9b9b9b',}}>{this.right_date(index)}</Text>
                                )}
                            </View>     
                        </View>
                        )}/>
                </View>

                {/* textinput */}
                <View style={{height:this.state.textheight, zIndex:1, maxHeight:Dimensions.get('window').height*0.2, minHeight:30, flexDirection:'row', alignContent:'center', justifyContent:'center'}}>
                    <View style={{flex:1, }}></View>     
                    <View style={{flex:this.is_image_selected('flex'),  justifyContent:'center', alignContent:'center',}}></View>
                    <View style={{flex:1, }}></View>
                </View>
            
                {/* bottom footer */}
                <View style={{height:this.state.buffer, }}></View>
                </View>
                </KeyboardAvoidingView>
            </View>
        )}
    }

const styles = StyleSheet.create({
  
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },

    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
});
