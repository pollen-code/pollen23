import React, {Component} from 'react';
import {StyleSheet, Text, Dimensions, AsyncStorage, 
        Platform, Alert, View, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image'
import Dialog, { DialogContent, DialogButton, } from 'react-native-popup-dialog';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import MapView, {Marker, Circle} from 'react-native-maps';
import moment from  'moment-timezone';
import Svg, { Path } from 'react-native-svg';
import AnonIcon from './svgs/anon_icon'
import Unlocked from './svgs/unlocked'

const geolib = require('geolib');
const dist = {'world':20000, 'city':20000, 'local':2000, 'micro':200}
const distance = {'world':10000000, 'city':8000, 'local':800, 'micro':80}
var win_height = Dimensions.get('window').height

export default class room_preview extends React.PureComponent {
    static navigationOptions = {header: null};
    constructor(props) {
        super(props);
        this.socket_rooms = global.socket_rooms
        this.state = {
            is_anon:'', // if join as anon
            visible7:false, // control modal of image
            public_visible:false,  // control modal visible via swipe
            private_visible:false, // control modal visible via swipe
            search_term:'', // what the user searched
            region:{
                    latitude:0, 
                    longitude:0,
                    latitudeDelta:0,
                    longitudeDelta:0
                }, // rejoin for map 
            loading:false, // if loading
            messages:[], // last 20 messages of room
            showing_date:0.7, // width of image
            padding:10, // padding around dates
            act_load_color:'white', // flatlist indicator color
        }
    }

    async componentDidMount() {
        user = await AsyncStorage.getItem('user') // username
        data_room = await this.props.navigation.getParam("x") // data about room
        console.log('XXX', data_room)
        // check if inside room radius
        y = geolib.getBoundsOfDistance({ 
                                latitude:data_room[12], 
                                longitude:data_room[13]
        }, dist[data_room[3]])

        // get upper and lower bounds of room
        y2 = ( y[1]['longitude'] - y[0]['longitude'] )/2
        y3 = ( y[1]['latitude'] - y[0]['latitude'] )/2 

        // set variables
        await this.setState({
            key:this.props.navigation.getParam("key"),
            username:user, 
            data_room:data_room, 
            loading:true,
            region:{
                latitude:data_room[12], 
                longitude:data_room[13],
                latitudeDelta:y2,
                longitudeDelta:y3               
            }
        })

        // get messages from db
        await this.get_messages()
    }
    async get_messages() {  

        old_timestamp = 1000000000000000 // date to get messages before
        is_date = true 

        // get historical messages
        url = `http://${serverLocation}:80/get_messages_rooms?`
        await fetch(url, {
            method:'POST',
            headers:{    
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
            body: 
            JSON.stringify({
                roomID:this.state.data_room[0], 
                old_timestamp:old_timestamp,
                is_date:is_date 
        })})
        .then((response) => response.json())
        .then((responseJson2) => {
            this.setState({
                messages:[...this.state.messages, ...responseJson2], 
                run_reached_end:false,
            })
        })
        .catch((error) => {
            console.log(error)
        })  
    }
    async join_room2() {
        // create room object
        member1 = ''
        member2 = ''

        if(this.state.is_anon == true) {
            member1 = 'Anonymous'
            member2 =  this.state.username   
        }
        else {
            member1 = this.state.username
            member2 = null
        }

        if( typeof(global.room_message_info[this.state.data_room[0]]) !== 'undefined') {
            global.room_message_info[this.state.data_room[0]] = []
        }

        global.room_message_info[this.state.data_room[0]] = [
                    this.state.data_room[0],    
                    member1,
                    member2,
                    "#FF7D61",
                    false,
                    null,
                    'joined',
                    this.state.data_room[1], // public
                    this.state.data_room[2], // walk
                    this.state.data_room[3], // world
                    this.state.data_room[4], // name
                    this.state.data_room[5], // admin onlt
                    this.state.data_room[6], // num users
                    this.state.data_room[7], // tags
                    this.state.data_room[8], // name
                    this.state.data_room[9], // admin1
                    this.state.data_room[10], // admin2
                    this.state.data_room[11], // admin3
                    this.state.data_room[12], // lat
                    this.state.data_room[13], // long
                    this.state.data_room[14], // time
                    this.state.data_room[15], // password
                    this.state.data_room[16], // member count
                    this.state.data_room[17], // room bio
                    null, // admin4 
                    null, // admin5 
                    null, // admin5, 
                    'in'
                    ]
        global.room_message_dict[this.state.data_room[0]] = []
        
        AsyncStorage.setItem('room_messages', JSON.stringify(global.room_message_dict))
        AsyncStorage.setItem('room_messages_info', JSON.stringify(global.room_message_info))
        await this.socket_rooms.emit('joining_room', { 
                                    'room':this.state.data_room[0],
                                    'userID':this.state.username,
                                    'is_anon':this.state.is_anon
        })
        await this.socket_rooms.emit('room_sending', {
            member1:member1, 
            member2:member2, 
            sender_text_color:'#9b9b9c',
            message:'joined',
            media:'none',
            roomID:this.state.roomID,
        })            
        await this.props.navigation.navigate('VIEW_ROOM', {x:this.state.data_room})
    }
    async join_room() {
        
        // if inside coordinates    
        inradius = geolib.isPointWithinRadius(
            { latitude:global.user_position.coords.latitude, longitude:global.user_position.coords.longitude }, // point
            { latitude: this.state.data_room[12], longitude: this.state.data_room[13] }, // circle point
            distance[this.state.data_room[3]]
        )

        if(inradius == true || inradius == 'true') {
            // if not already in room
            if( typeof(global.room_message_info[this.state.data_room[0]]) == 'undefined' || global.room_message_info[this.state.data_room[0]][6] == 'invited') {    
                // if allow anon room show dialog
                console.log(1)
                if( this.state.data_room[4] !== 'name' ) {
                    await this.setState({visible7:true})
                }
                // if named only
                else {
                    // create room object
                    if( typeof(global.room_message_info[this.state.data_room[0]]) !== 'undefined') {
                        global.room_message_info[this.state.data_room[0]] = []
                    }

                    global.room_message_info[this.state.data_room[0]] = [
                                                            this.state.data_room[0],    
                                                            this.state.username,
                                                            null,
                                                            "#FF7D61",
                                                            false,
                                                            null,
                                                            'joined',                                                   
                                                            this.state.data_room[1], // public
                                                            this.state.data_room[2], // walk
                                                            this.state.data_room[3], // world
                                                            this.state.data_room[4], // name
                                                            this.state.data_room[5], // admin 
                                                            this.state.data_room[6], // num users
                                                            this.state.data_room[7], // tags
                                                            this.state.data_room[8], // name
                                                            this.state.data_room[9], // admin1
                                                            this.state.data_room[10], // admin2
                                                            this.state.data_room[11], // admin3
                                                            this.state.data_room[12], // lat
                                                            this.state.data_room[13], // long
                                                            this.state.data_room[14], // time
                                                            this.state.data_room[15], // password
                                                            this.state.data_room[16], // member count
                                                            this.state.data_room[17], // room bio
                                                            null, // admin 1
                                                            null, // admin 2
                                                            null, // admin 3
                                                            'in'
                                                            ]
                    global.room_message_dict[this.state.data_room[0]] = []
                    
                    AsyncStorage.setItem('room_messages', JSON.stringify(global.room_message_dict))
                    AsyncStorage.setItem('room_messages_info', JSON.stringify(global.room_message_info))// emit room entrance
                    
                    // emit room entrance
                    await this.socket_rooms.emit('joining_room', { 
                        room:this.state.data_room[0],
                        userID:this.state.username,
                        is_anon:false,
                    })
                    await this.socket_rooms.emit('room_sending', {
                        member1:this.state.username,
                        member2:null,
                        sender_text_color:'#9b9b9c',
                        message:'joined',
                        media:'none',
                        roomID:this.state.roomID,
                    })  

                    // go to room
                    await this.props.navigation.navigate('VIEW_ROOM', {x:this.state.data_room})
                }
            }

            // if joined room 
            else if( global.room_message_info[this.state.data_room[0]][6] == 'joined' || global.room_message_info[this.state.data_room[0]][6] == 'left' ) {
                // joined
                console.log(2)
                await this.props.navigation.navigate('VIEW_ROOM', {x:this.state.data_room})

            }
            // if kicked from room
            else if( global.room_message_info[this.state.data_room[0]][6] == 'kicked' ) {
                Alert.alert("You were kicked from this room", "")
            }

        }
        else {
            Alert.alert("You're not in range of this room", '')
        }
    }
    async click_anon() {
        await this.setState({is_anon:true, visible7:false, })
        await this.join_room2()
    }
    async click_named() {
        await this.setState({is_anon:false, visible7:false, })
        await this.join_room2()
    }

    // swipe on image
    onSwipeLeft(gestureState) {
        this.setState({public_visible:false, private_visible:false})
    }
    onSwipe(gestureName, gestureState) {
        
        const { SWIPE_LEFT} = swipeDirections;
        this.setState({gestureName: gestureName});
        
        switch (gestureName) {
        
        case SWIPE_LEFT:
            this.setState({public_visible:false, private_visible:false})    
            break;
        }
    }
    
    // view dynamic features
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
        if(this.state.data_room[3] == 'world') {
            return null
        } 
        if(this.state.data_room[2] == 'walk') {
            return '| Walk away'
        }
        else {
            return '| Be here'
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
        if( this.state.messages[index][2] !== '#000000' && (  
                this.state.messages[index][0] == this.state.username ||
                this.state.messages[index][1] == this.state.username ||
                this.state.messages[index][2] == '#9b9b9b' || 
                this.state.messages[index][2] == '#9b9b9c') ) {
            return false
        }
        else {
            return true
        }
    }
    name() {
        if(this.state.data_room[4] == 'name') {
            return 'Named only'
        }
        else {
            return 'Named and anonymous'
        }
    }
    admin() {
        if(this.state.data_room[5] == 'admin') {
            return 'Admin only chat'
        }
        else {
            return 'Everyone can chat'
        }
    }
    which_footer(){
        if(this.state.act_load_color !== 'white') {
            return null
        }
        else if( this.state.act_load_color == 'white') {
            return null
        } 
    }
    what_weight(index) {
        if(this.state.messages[index][2] !== '#000000') {
            return '300'
        }
        else {
            return '500'
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
        {/* clicked image */}
        <Dialog          
                overlayOpacity={0.15}
                hasOverlay={true}
                rounded={true}
                containerStyle={{opacity:1}}
                visible={this.state.visible7}
                onTouchOutside={() => {this.setState({visible7:false})}}
                >
                <DialogContent>
                    <GestureRecognizer
                        onSwipe={(direction, state) => this.onSwipe(direction, state)}

                        onSwipeUp={ (state) => this.onSwipeUp(state) }
                        onSwipeDown={ (state) => this.onSwipeDown(state) }
                        onSwipeLeft={ (state) => this.onSwipeLeft(state) }
                        onSwipeRight={ (state) => this.onSwipeRight(state) }
                        
                        config={config}
                        style={{ justifyContent:'center', alignContent:'center', alignItems:'center',
                        width:275, height:275, backgroundColor: 'white'}}
                    >
                        <View style={{height:Dimensions.get('window').height, width:Dimensions.get('window').width, backgroundColor:'white', justifyContent:'center', alignContent:'center', alignItems:'center'}}>

                            <View style={{height:10}}></View>
                            <TouchableOpacity>
                                <AnonIcon
                                width={200}
                                height={175}
                                    style={{ paddingRight:1, justifyContent:'center', alignContent:'center', paddingLeft:1, }}
                                />
                            </TouchableOpacity>
                            <View style={{height:20}}></View>
                            <TouchableOpacity 
                                onPress={()=>{ this.click_anon() }}
                                style={{width:150, height:30, backgroundColor:'#ECECEC', justifyContent:'center', alignContent:'center', alignItems:'center', borderRadius:20}}>
                                <View style={{width:200, height:40, backgroundColor:'#ECECEC', justifyContent:'center', alignContent:'center', alignItems:'center', borderRadius:20}}>
                                    <Text style={{textAlign:'center', fontFamily:'avenir next', fontSize:20, color:'#878585' }}>Anonymous</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{height:17.5}}></View>
                            <TouchableOpacity 
                                onPress={()=>{ this.click_named() }}
                                style={{width:150, height:30, backgroundColor:'#ECECEC', justifyContent:'center', alignContent:'center', alignItems:'center', borderRadius:20}}>
                                <View style={{width:200, height:40, backgroundColor:'#ECECEC', justifyContent:'center', alignContent:'center', alignItems:'center', borderRadius:20}}>
                                    <Text style={{textAlign:'center', fontFamily:'avenir next', fontSize:20, color:'#878585'}}>Named</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </GestureRecognizer>
                </DialogContent>
</Dialog>   

        { this.state.loading && (
            <View style={{height:Dimensions.get('window').height, width:Dimensions.get('window').width, backgroundColor:'white', justifyContent:'center', alignItems:'center', alignContent:'center'}}>
                        <View style={{height:this.winHeight(),backgroundColor:'#FF7D61', alignSelf:'stretch', }}></View>
                        
                        <View style={{flex:0.135, backgroundColor:'#FF7D61', alignSelf:'stretch',justifyContent:'center', alignContent:'center'}}>
                            <View style={{flexDirection:'row', alignContent:'center', justifyContent:'center', alignItems:'center'}}>
                                <View style={{flex:1, alignSelf:'stretch', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                                    <TouchableOpacity style={{flex:1, marginTop:3*factor_ver}} onPress={ () => {this.props.navigation.goBack()} }>
                                        <Icon 
                                            name="chevron-left"
                                            color="white"
                                            type='entypo'
                                            size={27.5*factor_hor}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex:4, justifyContent:'center', alignContent:'center', alignItems:'center', alignSelf:'stretch'}}>
                                    <Text 
                                        numberOfLines={1}
                                        style={{fontWeight:'500', color:'white', fontSize:28*factor_hor, fontFamily:'avenir next', textAlign:'center'}}>{this.state.data_room[8]}</Text>
                                </View>
                                <View style={{flex:1, alignSelf:'stretch'}}></View>
                            </View>
                            <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                <Text 
                                numberOfLines={2}
                                style={{fontWeight:'300', color:'white', fontSize:18*factor_hor, fontFamily:'avenir next', textAlign:'center'}}>{this.state.data_room[17]}</Text>
                            </View>                         
                            <View style={{flex:1}}></View>
                        </View>
                        <View style={{flex:0.3, alignSelf:'stretch'}}>                     
                            <MapView
                                {...this.state}
                                showsUserLocation={true}
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
                                    center={{latitude: this.state.data_room[12], longitude:this.state.data_room[13]}}
                                    radius={distance[this.state.data_room[3]]}
                                    strokeColor={ 'rgba(252, 48, 4, 0)' }
                                    strokeWidth={1}
                                    fillColor={ `rgba(252, 48, 4, 0.1)` }
                                />
                                <Marker coordinate={{latitude: this.state.data_room[12],longitude: this.state.data_room[13]}}/>
                            </MapView>  
                        </View>
                        <View style={{flex:0.065, paddingLeft:10*factor_hor, paddingRight:10*factor_hor, flexDirection:'row', borderBottomColor:'#ececec', borderTopColor:'#ececec', borderBottomWidth:0.5, borderTopWidth:0.5,}}>
                            <View style={{ justifyContent:'center'}}>
                                <Text style={{textAlign:'left', fontSize:18*factor_hor, color:'#9b9b9b'}}>{this.state.data_room[3].slice(0,1).toUpperCase()}{this.state.data_room[3].slice(1)} {this.walk_stay()}</Text>
                            </View>
                            <View style={{flex:1,}}></View>
                            <View style={{ justifyContent:'center'}}>
                                <Text style={{textAlign:'right',fontSize:18*factor_hor, color:'#FF7D61' }}>{this.state.data_room[16]} members</Text>
                            </View>
                        </View>
                        <View style={{flex:0.05, flexDirection:'row', justifyContent:'center', alignContent:'center' }}>
                            <View style={{flex:1, marginRight:3, marginBottom:Dimensions.get('window').height*0.0225, borderBottomColor:'#ececec', borderBottomWidth:0.5}}></View>
                            <Text style={{fontSize:22*factor_hor, color:'#FF7D61', fontFamily:'avenir next'}}>Room Preview</Text>
                            <View style={{flex:1, marginLeft:3, marginBottom:Dimensions.get('window').height*0.0225, borderBottomColor:'#ececec', borderBottomWidth:0.5}}></View>
                        </View>
                        <View style={{flex:0.4, alignSelf:'stretch', }}>
                        
                            <View style={{flex:1, alignSelf:'stretch', marginLeft:this.state.padding*factor_hor, marginRight:this.state.padding*factor_hor, }}>
                                <FlatList 
                                    data={this.state.messages}
                                    extraData={this.state}
                                    ref = "flatList"
                                    
                                    showsVerticalScrollIndicator={false}
                                    ListFooterComponent={() => this.state.loading_post? null :this.which_footer()}

                                    inverted={true}
                                    initialNumToRender={20} 
                                    maxToRenderPerBatch={20} 
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
                                                <TouchableOpacity style={{flex:1, width:(Dimensions.get('window').width*this.state.showing_date - 30*factor_hor) , height:(Dimensions.get('window').width*0.7 - 30)}}>
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

                        <View style={{flex:0.075, }}>
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
