import React from 'react';
import {StyleSheet, View, AsyncStorage,Dimensions, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import io from 'socket.io-client';
import FastImage from 'react-native-fast-image';
import Geolocation from 'react-native-geolocation-service';
import SplashScreen from 'react-native-splash-screen';
import Permissions from 'react-native-permissions';
import OneSignal from 'react-native-onesignal';
import DeviceInfo from 'react-native-device-info';

const geolib = require('geolib');
global.factor_ver = Dimensions.get('window').height/812
global.factor_hor = Dimensions.get('window').width/375
global.timezone = DeviceInfo.getTimezone()
global.serverLocation = '3.15.140.51'
global.socket = null // socket messages
global.socket_rooms = null // socket rooms
global.user_position = null // user position
global.user = null // username
global.location_time_delta = 0 // time track user position
distance = {'world':10000000, 'city':8000, 'local':800, 'micro':80} 

export default class load_page extends React.Component {
    static navigationOptions = {header: null};
    constructor(props) {
        super(props);
        global.navigate_var = this.props.navigation;
        this.state = {
            loggedInStatus:false, // if logged in 
            routechoice:'SIGNUP_LOGIN', // where to go based on loggedinstatus
            connection:'NULL',
        }
    }

    async componentWillMount() {
        // instantiate geolocation
        try {
            await Geolocation.getCurrentPosition(
                (position) => {
                    global.user_position = position
                    global.location_time_delta = Math.floor(position.timestamp/1000)
                },
                (error) => {
                    console.log(error);
                    Alert.alert("Please check your location settings and try again")
                },
                { enableHighAccuracy: true, timeout: 30000, }
            );   
        } 
        catch (error) {
            
        }
        SplashScreen.hide(); 
    }
    async componentDidMount () {
        console.log('LOADPAGE')
        //OneSignal.init("60128076-dae1-4ba5-81a1-cc422279dc99", {kOSSettingsKeyAutoPrompt : true});
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
        OneSignal.inFocusDisplaying(2);
        await this.create_msg_dicts();
    }
    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }
    onReceived(notification) {
        console.log("Notification received: ", notification);
    }
    async onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.data);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
        
        type = openResult.notification.payload.additionalData.type
        user = await AsyncStorage.getItem('user')
        
        if(type == 'rooms') {
            roomID = openResult.notification.payload.additionalData.roomID
            url = `http://${serverLocation}:80/show_my_rooms_?`
            await fetch(url, {
                method:'POST',
                headers:{    
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                body: 
                JSON.stringify({
                    userID:user,
                    roomID:roomID
            })})
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(roomID, responseJson)
                if( typeof(global.room_message_info) == 'undefined' ) {
                    this.create_msg_dicts2()
                }
                navigate_var.navigate('VIEW_ROOM', {x:responseJson[0]})  
            })
        }
        else if(type == 'chats') {
            chatID = openResult.notification.payload.additionalData.chatID
            url = `http://${serverLocation}:80/get_chats_?userID=${user}&chatID=${chatID}`
            await fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                responseJson = responseJson[0]
                if( typeof(global.messages_info) == 'undefined' ) {
                    this.create_msg_dicts2()
                }

                name_ = null
                color_ = global.messages_info[responseJson[10]][1]

                if(responseJson[2] == 1) {
                    name_ = responseJson[3]
                }
                else if(responseJson[4] !== user) {
                    name_ = responseJson[4]
                }
                else if(responseJson[5] !== user) {
                    name_ = responseJson[5]
                }

                navigate_var.navigate('VIEW_MESSAGE', {

                    data:{
                        chatID:responseJson[10], 
                        admin1:responseJson[5], 
                        admin2:responseJson[6], 
                        admin3:responseJson[7],   
                        time_leave:responseJson[1], 
                        if_left:responseJson[11], 
                        color:color_, 
                        num_users:responseJson[0], 
                        chat_type:responseJson[2], 
                        name:name_
                    } 
                }) 
            })  
        }
    }
    onIds = (device) => {
        this.setState({connection:device.userId})
    }
    async create_msg_dicts() {
        try {
            // set logged in status
            const token1 = await AsyncStorage.getItem('loggedin_status');  
            await this.setState({loggedInStatus:token1},function(){console.log(this.state.loggedInStatus)});

            // if logged in create dicts
            if(this.state.loggedInStatus == 'true') {
                this.setState({ routechoice:'FEED'}); 
                
                // get username 
                user = await AsyncStorage.getItem('user')
                console.log(user, 'USERNAME AFTER LOAD PAGE')
                global.user = user

                // if no permission request then make dicts
                await Permissions.check('location')
                .then(response => {
                    if(response !== 'authorized') {
                        Permissions.request('location', { type:'always'})
                            .then(response => {
                                this.set_location();
                                setTimeout(() => {this.props.navigation.push(this.state.routechoice)}, 1000);             
                                this.make_dicts()
                            })
                    }
                    else if(response == 'authorized') {
                        setTimeout(() => {this.props.navigation.push(this.state.routechoice)}, 1000); 
                        this.make_dicts()
                    }
                })
            }
            // if not logged in pass
            else {
                console.log(this.state.routechoice, 'route choice')
                setTimeout(() => {this.props.navigation.navigate(this.state.routechoice)}, 1000); 
            }
        }
        catch (error) {
           console.log(error);
        }
    }
    async create_msg_dicts2() {
        try {
            // set logged in status
            const token1 = await AsyncStorage.getItem('loggedin_status');  
            await this.setState({loggedInStatus:token1});

            // if logged in create dicts
            if(this.state.loggedInStatus == 'true') {
                
                // get username 
                user = await AsyncStorage.getItem('user')
                console.log(user, 'USER2')
                global.user = user

                // if no permission request then make dicts
                await Permissions.check('location')
                .then(response => {
                    if(response !== 'authorized') {
                        Permissions.request('location', { type: 'always' })
                        .then(response => {
                        this.make_dicts()
                        })
                    }
                    else if(response == 'authorized') {
                        this.make_dicts()
                    }
                })
            }
            // if not logged in pass
            else {
                this.props.navigation.navigate('SIGNUP_LOGIN')
            }
        }
        catch (error) {
           console.log(error);
        }
    }
    async set_location() {
        // begin location tracking
        await Geolocation.watchPosition(
            (position) => {
                // set most recent position globally
                global.user_position = position

                // log state of room dict
                console.log('position', position)

                // check if out of radius or back in
                for(key in global.room_message_info) {

                    if(global.room_message_info[key][9] !== 'world' && global.room_message_info[key][8] !== 'walk' && 
                        global.room_message_info[key][6] !== 'left' && global.room_message_info[key][6] !== 'kicked') {
                        
                        // if inside coordinates    
                        inradius = geolib.isPointWithinRadius(
                            { latitude:global.user_position.coords.latitude, longitude:global.user_position.coords.longitude }, // point
                            { latitude:global.room_message_info[key][18], longitude:global.room_message_info[key][19] }, // circle point
                            distance[global.room_message_info[key][9]]
                        )

                        // if left radius then force out   
                        if( inradius == false && global.room_message_info[key][27] == 'in' ) {
                            // remake item
                            global.room_message_info[key][27] = 'out'
                            global.room_message_info[key][5] = Math.floor(Date.now()/1000)
                            global.room_message_dict[key] = []
                            // emit out of range
                            console.log('emit left room radius')
                            url = `http://${serverLocation}:80/room_member_active?userID=${this.state.username}&roomID=${room_message_info[key][0]}`
                            fetch(url)
                            this.socket_rooms.emit('left_room_radius', {'room':global.room_message_info[key][0]})
                        }
                        // if joined radius then enter
                        else if( inradius == true && global.room_message_info[key][27] == 'out' ) {
                            // remake item
                            global.room_message_info[key][27] = 'in'
                            global.room_message_info[key][5] = Math.floor(Date.now()/1000)
                            global.room_message_dict[key] = []
                            // emit in range
                            console.log('emit join room radius')
                            url = `http://${serverLocation}:80/room_member_inactive?userID=${this.state.username}&roomID=${room_message_info[key][0]}`
                            fetch(url)
                            this.socket_rooms.emit('joined_room_radius', {'room':global.room_message_info[key][0]})
                        }
                    }
                }
                console.log('room messages', global.room_message_info)
                // if more than 5 minutes elapsed insert new location
                if( Math.floor(position.timestamp/1000) - global.location_time_delta > 300 ) {
                    // fetch to insert new location in DB
                    username = global.user
                    console.log(username, 'username')
                    url = `http://${serverLocation}:80/update_location?userID=${username}&latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&timestamp=${Math.floor(position.timestamp/1000)}`
                    if(username !== null && typeof(username) !== null && username !== 'null') {
                        fetch(url) 
                    }
                    
                    // set time to current time
                    global.location_time_delta = Math.floor(position.timestamp/1000)                    
                }    
              },
              (error) => {
                  console.log(error);
              }, {  distanceFilter:10, 
                    maximumAge:240000,    
                    interval:60000, 
                    fastestInterval:10000, 
                    enableHighAccuracy: true})          
    }
    async make_dicts() {
        // user global username to begin tracking 
        selected_chats = [] // dict for chats to socket connect 
        selected_rooms = [] // dict for rooms to socket connect
        was_connected = 'true' 
        // reset async rooms/chats
        url = `http://${serverLocation}:80/check_connection?userID=${user}`
        await fetch(url)
        .then((response) => response.json())
        .then((responseJson2) => {
            // if previously kill app then reset dicts
            if(responseJson2 == 'false') {
                was_connected = 'false'
                AsyncStorage.setItem('is_connected', responseJson2 )
                
                // if disconnected delete async chats/rooms
                AsyncStorage.removeItem('messages')
                AsyncStorage.removeItem('messages_info')
                AsyncStorage.removeItem('room_messages')
                AsyncStorage.removeItem('room_messages_info')
                console.log('reset async')
            }
        })
        .catch((error) => {
            console.log(error)
        });  
        // connect to messages namespace
        this.socket = await io(`http://${serverLocation}:80/messages`,
                                {transports: ["websocket"], 
                                query: `name=${user}&connection=${this.state.connection}`,
                                reconnection: true,
                                reconnectionDelay: 500,
                                reconnectionAttempts: 1000000000,
                                forceNew:true });  
        // connect to rooms namespace 
        this.socket_rooms = await io(`http://${serverLocation}:80/rooms`,
                                {transports: ["websocket"], 
                                query: `name=${user}`,
                                reconnection: true,
                                reconnectionDelay: 500,
                                reconnectionAttempts: 1000000000,
                                forceNew:true });  
        mute_rooms = false
        mute_messages = false

        // get mute status
        url = `http://${serverLocation}:80/mute_status?userID=${user}`
        console.log(url)
        await fetch(url)
        .then((response) => response.json())
        .then((responseJson2) => {
            mute_rooms = responseJson2[0][0]
            mute_messages = responseJson2[0][1]
            AsyncStorage.setItem('mute_rooms', mute_rooms)
            AsyncStorage.setItem('mute_messages', mute_messages)
            console.log('mutes', mute_rooms, mute_messages)
        })
        .catch((error) => {
            console.log(error)
        });  

        // set locations
        await this.set_location()

        // set global sockets
        global.socket = this.socket
        global.socket_rooms = this.socket_rooms            
        console.log(global.socket, 'message socket')
        console.log(global.socket_rooms, 'rooms socket')
        // get & create directory for each chat
        url = `http://${serverLocation}:80/select_chat?userID=${user}`
        await fetch(url)
        .then((response) => response.json())
        .then((responseJson2) => {
            // save whether connected or not
            message_dict = {}
            message_dict_info = {}
            for( key in responseJson2 ) {
                // if have not left the chat
                if( responseJson2[key][4] == 'no' ) {
                    selected_chats.push(responseJson2[key][0])
                }
                
                // if you disconnected and deleted the 
                if(was_connected == 'false') {
                    message_dict_info[[responseJson2[key][0]]] = responseJson2[key] 
                    message_dict[responseJson2[key][0]] = []
                }   
            }
            // set the message dictionary 
            AsyncStorage.setItem('messages', JSON.stringify(message_dict))
            AsyncStorage.setItem('messages_info', JSON.stringify(message_dict_info))
        })
        .catch((error) => {
            console.log(error)
        })  

        // get & create directory for each room
        url = `http://${serverLocation}:80/select_rooms?userID=${user}`
        await fetch(url)
        .then((response) => response.json())
        .then((responseJson2) => {
            // create dict objects
            room_message_dict = {}
            room_message_dict_info = {}
            
            for( key in responseJson2 ) {    
                // identify if in room or not
                room_message_dict_info[[responseJson2[key][0]]] = responseJson2[key] 
                room_message_dict[responseJson2[key][0]] = []    

                inradius = geolib.isPointWithinRadius(
                    { latitude:global.user_position.coords.latitude, longitude:global.user_position.coords.longitude }, // point
                    { latitude:responseJson2[key][18], longitude:responseJson2[key][19] }, // circle point
                        distance[responseJson2[key][9]]
                    )
                if(inradius == true) {
                    responseJson2[key].push('in')
                }  
                else {
                    responseJson2[key].push('out')
                }
                // if have not left the chat
                if( responseJson2[key][6] !== 'left' && responseJson2[key][6] !== 'kicked' && responseJson2[key][27] !== 'out'  ) {
                    selected_rooms.push(responseJson2[key][0])
                }
            }
            // save the dictionaries
            AsyncStorage.setItem('room_messages', JSON.stringify(room_message_dict))
            AsyncStorage.setItem('room_messages_info', JSON.stringify(room_message_dict_info))
        })
        .catch((error) => {
            console.log(error)
        });                     
        
        // connect to all chats on server side
        await this.socket.emit('rejoin_chat', { 'rooms':selected_chats })
        
        // connect to all rooms on server side
        await this.socket_rooms.emit('rejoin_rooms', { 'rooms':selected_rooms })
        
        // set global dicts 
        global.message_dict = JSON.parse( await AsyncStorage.getItem('messages') )
        global.messages_info = JSON.parse( await AsyncStorage.getItem('messages_info') )
        global.room_message_dict = JSON.parse( await AsyncStorage.getItem('room_messages') )
        global.room_message_info = JSON.parse( await AsyncStorage.getItem('room_messages_info') )
        
        // listen to messages
        await this.socket.on('message_', (data) => {
            // set CHATID message globally
            chatID = data.data[5]
            data.data[4] = data.data[4].replace(/["]/g, '')            
            // if no message dict and receive message
            if( typeof(global.messages_info[chatID]) == 'undefined' ) {
                // create 
                global.message_dict[chatID] = []
                global.messages_info[chatID] = [chatID, '#f9a32c', 'block', 'false', "no", 0, 1, 'invited', 1]

                AsyncStorage.setItem( 'messages', JSON.stringify(global.message_dict) )
                AsyncStorage.setItem( 'messages_info', JSON.stringify(global.messages_info) )
            }

            // insert new message into chat
            if( data.data[2] !== '#9b9b9c' ) {
                global.message_dict[chatID].unshift( data.data )
            }

            // if message_dict too long splice 
            if(global.message_dict[chatID].length > 40) {
                global.message_dict[chatID].splice(0,1)
            }

            // if special message                         
            if(data.data[2] == "#9b9b9b" || data.data[2] == "#9b9b9c" ) {
                // if you were added
                if_added = global.user+" was invited to the chat"
                if(data.data[3] == if_added) {
                    if(typeof(global.messages_info[chatID]) !== 'undefined') {
                        if(global.messages_info[chatID][7] == 'left') {
                            global.messages_info[chatID][4] = 'no'
                            global.messages_info[chatID][5] = 0
                            global.messages_info[chatID][7] = 'invited'
                            global.messages_info[chatID][8] = 0
                            AsyncStorage.setItem( 'messages_info', JSON.stringify(global.messages_info) )
                        }
                    }                                  
                }
                
                // if you were kicked
                if_removed = global.user+' was removed from the chat'
                if(data.data[3] == if_removed) {
                    this.socket.emit('remove', {'roomID':chatID})            
                    global.messages_info[chatID][4] = 'yes'
                    global.messages_info[chatID][5] = Math.floor(Date.now() / 1000)
                    global.messages_info[chatID][7] = 'left'
                    global.messages_info[chatID][8] = 0
                    AsyncStorage.setItem( 'messages_info', JSON.stringify(global.messages_info) )
                }
            }
            // save back to async
            AsyncStorage.setItem( 'messages_info', JSON.stringify(global.messages_info) )
            AsyncStorage.setItem( 'messages', JSON.stringify(global.message_dict) )
        })
        
        // listen to messages
        await this.socket_rooms.on('room_message_', (data) => { 
            roomID = data.data[5]
            data.data[4] = data.data[4].replace(/["]/g, '')
            console.log(data, 'data')
            // insert new message into chat
            if( data.data[2] !== '#9b9b9c' ) {
                global.room_message_dict[roomID].unshift( data.data )
                // if message_dict too long splice 
                if(global.room_message_dict[roomID].length > 40) {
                    global.room_message_dict[roomID].splice(40,1)
                } 
                if(data.data[2] == '#9b9b9b') {
                    if( data.data[3].includes(' was made admin' ) ) {             
                        if(global.room_message_info[roomID][15] == null) {
                            global.room_message_info[roomID][15] = global.user
                        }
                        else if(global.room_message_info[roomID][16] == null) {
                            global.room_message_info[roomID][16] = global.user
                        }
                        else if(global.room_message_info[roomID][17] == null) {
                            global.room_message_info[roomID][17] = global.user
                        }                          
                    }
                    else if( data.data[3] == 'Anonymous was made admin' ) {
                        if( data.data[1] == this.state.username ) {
                            if(global.room_message_info[roomID][24] == null) {
                                global.room_message_info[roomID][15]= 'Anonymous' 
                                global.room_message_info[roomID][24] = global.user
                            }
                            else if(global.room_message_info[roomID][25] == null) {
                                global.room_message_info[roomID][16]= 'Anonymous' 
                                global.room_message_info[roomID][25] = global.user
                            }
                            else if(global.room_message_info[roomID][26] == null) {
                                global.room_message_info[roomID][17]= 'Anonymous' 
                                global.room_message_info[roomID][26] = global.user
                            }
                            this.setState({
                                is_admin:true, 
                                admin1:this.state.admin1, 
                                admin2:this.state.admin2,
                                admin3:this.state.admin3,
                                admin4:this.state.admin4,
                                admin5:this.state.admin5,
                                admin6:this.state.admin6
                            })
                        
                        }
                    }
                    if( data.data[3].includes(' the room bio was changed' ) ) {
                        msg = data.data[3].split(':')[1].replace(/\s/g,' ');
                        global.room_message_info[roomID][23] = msg
                    }
                }
            }
            if( data.data[2] == '#9b9b9c' ) {
                if(data.data[3] == 'joined') {
                    global.room_message_info[roomID][22] = global.room_message_info[roomID][22]+1
                }
                else if(data.data[3] == 'left') {
                    global.room_message_info[roomID][22] = global.room_message_info[roomID][22]-1
                }
                else if(data.data[3] == global.user +' was removed from the room') {
                    global.room_message_info[roomID][6] = 'kicked'
                    this.socket_rooms.emit('leaving_room', { 'room':this.state.roomID })  
                    console.log(global.room_message_info, 'KICKED ROOM')
                }
            }

            // save back to async
            AsyncStorage.setItem('room_messages_info', JSON.stringify(global.room_message_info) )
            AsyncStorage.setItem('room_messages', JSON.stringify(global.room_message_dict) )
            
        })
        
        // log dicts
        console.log('ROOM MESSAGES INFO', global.room_message_info)
        console.log('ROOM MESSAGeS DICT', global.room_message_dict)                
        console.log('MESSAGES INFO', global.messages_info)
        console.log('MESSAGES DICT', global.message_dict)
        
        // reconnecting to sockets 
        this.socket.on('reconnect', () => {

            console.log('MESSAGES INFO', global.messages_info)
            console.log('MESSAGES DICT', global.message_dict)  
            
            selected_chats = []

            // add messages to connect to 
            for(key in global.messages_info) {
                if(global.messages_info[key][4] == 'no') {
                    selected_chats.push(global.messages_info[key][0])
                }
            }
            
            // clear out caches of messages
            for(key in global.messages_info) {
                chatID = global.messages_info[key][0]
                global.message_dict[key] = []
            }

            AsyncStorage.setItem( 'messages_info', JSON.stringify(global.messages_info) )
            AsyncStorage.setItem( 'messages', JSON.stringify(global.message_dict) )
            
            // connect to messages
            this.socket.emit('rejoin_chat', { 'rooms':selected_chats })
                        
            console.log('MESSAGES INFO', global.messages_info)
            console.log('MESSAGES DICT', global.message_dict) 
        }); 
        
        // rooms reconncet
        this.socket_rooms.on('reconnect', () => {

            console.log('ROOM MESSAGES INFO', global.room_message_info)
            console.log('ROOM MESSAGeS DICT', global.room_message_dict)               

            selected_rooms = [] 
            // connect on these rooms
            for(key in global.room_message_info) {
                // clear out the caches
                roomID = global.room_message_info[key][0]
                global.room_message_dict[roomID] = []
                
                // add messages to connect to
                inradius = geolib.isPointWithinRadius(
                    { latitude:global.user_position.coords.latitude, longitude:global.user_position.coords.longitude },
                    { latitude:global.room_message_info[key][18], longitude:global.room_message_info[key][19] }, 
                    distance[global.room_message_info[key][9]]
                )
                if(inradius == true && global.room_message_info[key][6] == 'joined') {
                    selected_rooms.push(global.room_message_info[key][0])
                }
            }

            // save new rooms
            AsyncStorage.setItem( 'room_messages_info', JSON.stringify(global.room_message_info) )
            AsyncStorage.setItem( 'room_messages', JSON.stringify(global.room_message_dict) )                
            // clear out cache of messages
            global.socket_rooms.emit('rejoin_rooms', { 'rooms':selected_rooms })     

            console.log('ROOM MESSAGES INFO', global.room_message_info)
            console.log('ROOM MESSAGeS DICT', global.room_message_dict)                
            
        });  
    }

    render() {
        return (
            <View style={styles.container}>
            {/* <View style={{position:'absolute', right:Dimensions.get('window').width*0.5, zIndex:4, bottom:Dimensions.get('window').height*0.6, backgroundColor:'blue', alignSelf:'stretch', height:20, width:20}}></View> */}
            <LinearGradient colors={['#FFBA6F','#FC3004']} style={{flex:1, opacity:1, alignSelf:'stretch'}}>
                <View style={{flex:0.35}}></View>
                <View style={styles.top_logo}>
                    <FastImage 
                        source={require('./spore_no_background.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{flex: 1,width: '100%',}}
                    />
                </View>

                <View style={styles.bottom_button}>
                    <View style={{flex:1, flexDirection:'row'}}>
                    
                        <View style={{flex:0.2,}}></View>
        
                        <View style={{flex:0.6, flexDirection:'column'}}>
                            <View style={{flex:0.25, }}></View>
                            <View style={{flex:0.25, justifyContent:'center', alignContent:'center', alignItems:'center'}}></View>
                            <View style={{flex:0.25, }}></View>
                            <View style={{flex:0.25, }}></View>
                        </View>
                        <View style={{flex:0.2,}}></View>
                    </View>
                </View>
            </LinearGradient>
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

top_logo: {
    flex: 0.6,
    justifyContent:'center',
    alignItems:'center'
  },

bottom_button: {
    flex:0.4,
    justifyContent:'center',
    alignSelf:'stretch',
    flexDirection:'row', 

  },


});
