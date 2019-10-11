import React, {Component} from 'react';
import {StyleSheet, TouchableHighlight, Dimensions, 
        TextInput, Alert, Text, View, TouchableOpacity, 
        Platform, AsyncStorage} from 'react-native';
import { Icon } from 'react-native-elements';
import { ScrollView} from 'react-native-gesture-handler';
import MapView, {Marker, Circle} from 'react-native-maps';
import Dialog, { DialogContent} from 'react-native-popup-dialog';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import FastImage from 'react-native-fast-image'
import Airplane from './svgs/airplane'

const geolib = require('geolib');
const distance = {'world':10000000, 'city':8000, 'local':800, 'micro':80} 
const dist = {'world':20000, 'city':20000, 'local':2000, 'micro':200} 

export default class room_message_settings extends React.Component {
    static navigationOptions = {header: null}
    constructor(props) {
        super(props);
        this.socket_rooms = global.socket_rooms
        this.state = {

            username:'',
            buffer:10, 
            visible7:false,
            visible6:false,

            load_map:false, 
            selected_users: [], // list of users
            media:[], // urls
            selected_users2:[], // for media banner
            message_name:'', // top bannger
            is_admin:'false', // if user is admin
            admins:[], // admin list
            blocked:false, // if blocked
            muted:false, // if muted
            color:'', // current color
            roomID:'', // roomID
            show_members:true, // show add members
            show_search:true,  // show search bar 
            chat_data:[], // data on chat info
            // for members vs media
            people_color:'#9b9b9b', 
            following_color:'#9b9b9b',
            access_color:'#9b9b9b',
            bg_following:'#ececec',
            bg_people:'white',
            bg_access:'white', 
            following_bw:1,
            people_bw:0, 
            access_bw:0,
            visible4:false, // image
            clicked_image:0, // clicked image
            users1: [],
            imgs1: [],
            requests:[],
            is_anon:false,
            block_chat:'',
            visible7:false, // 
            key_:0, //  
            room_bio:'',
        }
    }

    async componentDidMount() {

        room_message_info = JSON.parse(await AsyncStorage.getItem('room_messages_info'))

        user = await AsyncStorage.getItem('user')
        roomID = await this.props.navigation.getParam('roomID')
        chat_type = ''
        ios = 10
        admin1 = room_message_info[roomID][15]    
        admin2 = room_message_info[roomID][16]
        admin3 = room_message_info[roomID][17]
        admin4 = room_message_info[roomID][24]
        admin5 = room_message_info[roomID][25]
        admin6 = room_message_info[roomID][26]
        is_admin = false
        is_anon = false
        room_bio = room_message_info[roomID][23]
        map_lat = room_message_info[roomID][18]
        map_long = room_message_info[roomID][19]
        radius = room_message_info[roomID][9]
        message_name = room_message_info[roomID][14]
        muted = room_message_info[roomID][4]
        color = room_message_info[roomID][3]
        chat_data = room_message_info[roomID]
        status_ = room_message_info[roomID][6] 
        y = geolib.getBoundsOfDistance({ latitude:map_lat, longitude:map_long}, dist[radius])
        y2 = ( y[1]['longitude'] - y[0]['longitude'] )/2
        y3 = ( y[1]['latitude'] - y[0]['latitude'] )/2 
        if(Platform.OS === 'ios') {
            if ( Dimensions.get('window').height > 811) {
                ios = 40              
            }
        }
        if(status_ == 'joined') {
            chat_type = "Leave Room"
        }
        else if( status_ == 'kicked') {
            chat_type = "Can't Rejoin"
        }
        else if(status_ == 'left') {
            chat_type = 'Rejoin Room'
        }
        if( admin1 == user || admin2 == user || admin3 == user || 
            admin4 == user || admin5 == user || admin6 == user ) {
            is_admin = true
        }
        if( room_message_info[roomID][1] == 'Anonymous' ) {
            is_anon = true
        } 

        await this.setState({
            buffer:ios,
            username:user,
            message_name:message_name,
            is_admin:is_admin,
            is_anon:is_anon,
            muted:muted,
            color:color,
            roomID:roomID,
            room_bio:room_bio,
            block_chat:chat_type,
            chat_data:chat_data,
            admin1:admin1,
            admin2:admin2,
            admin3:admin3,
            admin4:admin4, 
            admin5:admin5, 
            admin6:admin6, 
            admins:[admin1, admin2, admin3],
            map_radius:radius,
            map_lat:map_lat,
            map_long:map_long,
            region:{
                latitude:map_lat, 
                longitude:map_long,
                latitudeDelta:y2,
                longitudeDelta:y3               
            },
            load_map:true,
            imgs1:[],
        })

        url = `http://${serverLocation}:80/get_imgs_rooms?roomID=${this.state.roomID}`
        console.log(url)
        await fetch(url)             
        .then((response) => response.json())
        .then((responseJson2) => {
            this.setState({
                imgs1:responseJson2,
            })
        })
        .catch((error) => {
            console.log(error)
        })           

        url = `http://${serverLocation}:80/get_members_rooms?roomID=${this.state.roomID}`
        console.log(url)
        await fetch(url)             
        .then((response) => response.json())
        .then((responseJson2) => {
            this.setState({
                selected_users2:responseJson2,
            })
        })
        .catch((error) => {
            console.log(error)
        }) 

        url = `http://${serverLocation}:80/get_requests_rooms?roomID=${this.state.roomID}`
        console.log(url)
        await fetch(url)             
        .then((response) => response.json())
        .then((responseJson2) => {
            this.setState({
                requests:responseJson2,
            })
            console.log(this.state.requests)
        })
        .catch((error) => {
            console.log(error)
        })         
    } 
    async leave() {

        if( global.room_message_info[this.state.roomID][6] == 'left' ) {
            // rejoin
            inradius = geolib.isPointWithinRadius(
                { latitude:global.user_position.coords.latitude, longitude:global.user_position.coords.longitude }, // point
                { latitude:global.room_message_info[this.state.roomID][18], longitude:global.room_message_info[this.state.roomID][19] }, // circle point
                distance[global.room_message_info[this.state.roomID][9]]
            )
            
            if( inradius == true ) {

                global.room_message_info[this.state.roomID][6] = 'joined'
                global.room_message_info[this.state.roomID][5] = null
                global.room_message_dict[this.state.roomID] = []    

                await AsyncStorage.setItem('room_messages_info', JSON.stringify(global.room_message_info) )
                await AsyncStorage.setItem('room_messages', JSON.stringify(global.room_message_dict) )
                await this.socket_rooms.emit('room_rejoin', {username:this.state.username,room:this.state.roomID,anon:this.state.is_anon})
                await this.props.navigation.push('ROOMS')
            }
            else {
                return Alert.alert("Not in room radius")
            }
        }
        else if( global.room_message_info[this.state.roomID][6] == 'joined' ) {
            if( this.state.is_admin == true ) {
                if(this.state.admin1 == this.state.username) {
                    global.room_message_info[this.state.roomID][15] = null
                }
                else if(this.state.admin2 == this.state.username) {
                    global.room_message_info[this.state.roomID][16] = null
                }
                else if(this.state.admin3 == this.state.username) {
                    global.room_message_info[this.state.roomID][17] = null
                }
                else if(this.state.admin4 == this.state.username) {
                    global.room_message_info[this.state.roomID][15] = null
                    global.room_message_info[this.state.roomID][24] = null
                }
                else if(this.state.admin5 == this.state.username) {
                    global.room_message_info[this.state.roomID][16] = null
                    global.room_message_info[this.state.roomID][25] = null
                }
                else if(this.state.admin6 == this.state.username) {
                    global.room_message_info[this.state.roomID][17] = null
                    global.room_message_info[this.state.roomID][26] = null
                }
            } 
            global.room_message_info[this.state.roomID][6] = 'left'
            global.room_message_info[this.state.roomID][5] = Math.floor(Date.now() / 1000)

            await AsyncStorage.setItem('room_messages_info', JSON.stringify(global.room_message_info) )
            
            await this.socket_rooms.emit('room_leave', {username:this.state.username,room:this.state.roomID,anon:this.state.is_anon, is_admin:this.state.is_admin})        

            await this.props.navigation.push('ROOMS')    
        }
    }
    muted() {
        if(this.state.muted == true || this.state.muted == 'true') {
            return 'Unmute'
        }
        else if(this.state.muted == false || 'this.state.muted == false') {
            return 'Mute'
        }
    }
    async click_mute() {
        if(this.state.muted == true || this.state.muted == 'true') {
            await this.setState({muted:false})
            await this.muted()
            url = `http://${serverLocation}:80/mute_room?userID=${this.state.username}&roomID=${this.state.roomID}&muted=false`
            console.log(url)
            await fetch(url)
            global.room_message_info[this.state.roomID][4] = this.state.muted
            await AsyncStorage.setItem('room_messages_info', JSON.stringify(global.room_message_info))
        }
        else if(this.state.muted == false || this.state.muted == 'false') {
            await this.setState({muted:true})
            await this.muted()
            url = `http://${serverLocation}:80/mute_room?userID=${this.state.username}&roomID=${this.state.roomID}&muted=true`
            console.log(url)
            await fetch(url)
            global.room_message_info[this.state.roomID][4] = this.state.muted
            await AsyncStorage.setItem('room_messages_info', JSON.stringify(global.room_message_info))
        }
    }
    press_following() {
        this.setState({
            people_color:'#9b9b9b',
            following_color:'#9b9b9b',
            
            bg_following:'#ececec',
            bg_people:'white',
            bg_access:'white',

            following_bw:1,
            access_bw:0,
            people_bw:0, 
            
            show_members:true,
            show_search:true,
        })
    }
    press_people() {
        this.setState({
            following_color:'#9b9b9b',
            people_color:'#9b9b9b',
            
            bg_people:'#ececec',
            bg_following:'white',
            bg_access:'white',
            
            following_bw:0,
            access_bw:0,
            people_bw:1, 
            
            show_members:false,
            show_search:false,
        })
    }
    press_access() {
        this.setState({
            following_color:'#9b9b9b',
            people_color:'#9b9b9b',
            access_color:'#9b9b9b',

            bg_people:'white',
            bg_following:'white',
            bg_access:'#ececec', 

            following_bw:0,
            access_bw:1, 
            people_bw:0, 

            show_members:false,
            show_search:false,
        })
    }
    members_media() {
        if(this.state.following_bw == 1) {
            return true
        }
    }
    members_people() {
        if(this.state.people_bw == 1) {
            return true
        }
    }
    members_access() {
        if(this.state.access_bw == 1 ) {
            return true
        }

    }
    showing_search() {
        if(this.state.show_members == true) {
            return false 
        }     
        else {
            return true
        }
    }
    click_search() {
        if(this.state.show_search == true) {
            this.setState({
                show_search:false,
                show_members:false,
            })
        }
        else if(this.state.show_search == false) {
            this.setState({
                show_search:true,
                show_members:true,
            })
        }
    }
    async search_members(search) {
        url = `http://${serverLocation}:80/search_members_rooms?chatID=${this.state.roomID}&search_term=${search}`
        await fetch(url)
        .then((response) => response.json())
        .then((responseJson2) => {
            this.setState({selected_users2:responseJson2})
        })
        .catch((error) => {
            console.log(error)
        });     
    }
    async search_private() {
        await this.props.navigation.navigate('SEARCHED_MESSAGES_ROOMS', {x:[this.state.txt, this.state.roomID, this.state.color]})
    }
    goProfile(index, name) {
        console.log(name, typeof(name))
        if(name == 'Anonymous' || name == null ) {
            return null
        }
        else {
            this.props.navigation.navigate('EXTERNAL_VIEW_PROFILE', {profileID:name})
        }
    }
    async deal_access(index) {
        if(this.state.is_admin == true) {
            await this.setState({ key_:index, visible6:true })        
        }
    }
    onSwipeUp(gestureState) {
        this.setState({visible4:false,visible6:false, visible7:false}, function () {console.log(this.state.visible4,this.state.visible6, this.state.visible7)});
        console.log(this.state.visible4,this.state.visible6, this.state.visible7)
    }                                                                                                         
    onSwipeDown(gestureState) {
        this.setState({visible4:false,visible6:false, visible7:false}, function () {console.log(this.state.visible4,this.state.visible6, this.state.visible7)});
        console.log(this.state.visible4,this.state.visible6, this.state.visible7)
    }
    onSwipeLeft(gestureState) {
        this.setState({visible4:false,visible6:false, visible7:false}, function () {console.log(this.state.visible4,this.state.visible6, this.state.visible7)});
        console.log(this.state.visible4,this.state.visible6, this.state.visible7)
    }
    onSwipeRight(gestureState) {
        this.setState({visible4:false,visible6:false, visible7:false}, function () {console.log(this.state.visible4,this.state.visible6, this.state.visible7)});
        console.log(this.state.visible4,this.state.visible6, this.state.visible7)
    }
    onSwipe(gestureName, gestureState) {
        
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        this.setState({gestureName: gestureName});
        
        switch (gestureName) {

        case SWIPE_UP:
            this.setState({visible4:false, visible6:false,visible7:false}, function () {console.log(this.state.visible4,this.state.visible6, this.state.visible7)});
            console.log(this.state.visible4,this.state.visible6, this.state.visible7)
            break;
          
        case SWIPE_DOWN:    
            this.setState({visible4:false, visible6:false,visible7:false}, function () {console.log(this.state.visible4,this.state.visible6, this.state.visible7)});
            console.log(this.state.visible4,this.state.visible6, this.state.visible7)
            break;
        
        case SWIPE_LEFT:
            this.setState({visible4:false, visible6:false,visible7:false}, function () {console.log(this.state.visible4,this.state.visible6, this.state.visible7)});
            console.log(this.state.visible4,this.state.visible6, this.state.visible7)
            break;
          
        case SWIPE_RIGHT:
            this.setState({visible4:false, visible6:false,visible7:false}, function () {console.log(this.state.visible4,this.state.visible6, this.state.visible7)});
            console.log(this.state.visible4, this.state.visible6, this.state.visible7)
            break;
        }
    }       
    async goprofile2(index) {
        await this.setState({ key_:index },function(){console.log(this.state.key_)})
        if( this.state.is_admin == true && // if im admin
            this.state.selected_users2[index][0] !== this.state.username && // if not me
            (this.state.admin1 !== this.state.selected_users2[index][0] || this.state.admin1 == 'Anonymous') && 
            (this.state.admin2 !== this.state.selected_users2[index][0] || this.state.admin2 == 'Anonymous') && 
            (this.state.admin3 !== this.state.selected_users2[index][0] || this.state.admin3 == 'Anonymous') &&
            this.state.admin4 !== this.state.selected_users2[this.state.key_][1] &&
            this.state.admin5 !== this.state.selected_users2[this.state.key_][1] && 
            this.state.admin6 !== this.state.selected_users2[this.state.key_][1] 
            ) {
            await this.setState({ key_:index, visible7:true })
        }
    } 
    async returned(color){
        this.setState({banner_color:color, color:color},function(){console.log(this.state.color)})
    }
    async remove_user() {
        if(     (this.state.admin1 == this.state.selected_users2[this.state.key_][0] && this.state.admin1 !== 'Anonymous' ) || 
                (this.state.admin2 == this.state.selected_users2[this.state.key_][0] && this.state.admin2 !== 'Anonymous' ) || 
                (this.state.admin3 == this.state.selected_users2[this.state.key_][0] && this.state.admin3 !== 'Anonymous' ) || 
                this.state.admin4 == this.state.selected_users2[this.state.key_][1] || 
                this.state.admin5 == this.state.selected_users2[this.state.key_][1] || 
                this.state.admin6 == this.state.selected_users2[this.state.key_][1] ) {
            return Alert.alert("Can't remove admin")
        }                        
        else {
            member = this.state.selected_users2[this.state.key_][0]
            if(this.state.selected_users2[this.state.key_][0] == 'Anonymous') {
                member = this.state.selected_users2[this.state.key_][1]
            }

            // remove DB
            await this.socket_rooms.emit('delete_member_from_room', { 'username':member,'room':this.state.roomID })  
                       
            // rid on lists
            ind = this.state.selected_users2.indexOf(this.state.selected_users2[this.state.key_]);
            
            await this.state.selected_users2.splice(ind, 1)
            await this.setState({visible7:false})
        }
    }
    async make_admin() {
        if(this.state.selected_users2[this.state.key_][0] == 'Anonymous') {
            if( this.state.admin1 == null || this.state.admin1 == '') {
                url = `http://${serverLocation}:80/make_admin_room?name=${this.state.selected_users2[this.state.key_][1]}&chatID=${this.state.roomID}&route=1&is_anon=true`
                await fetch(url)
                this.state.admins[0] = this.state.selected_users2[this.state.key_][0]
                await this.setState({admins:this.state.admins, visible7:false, admin1:this.state.selected_users2[this.state.key_][0]})
                await this.room_socket.emit('room_sending', {
                    member1:'Anonymous',
                    member2:this.state.selected_users2[this.state.key_][0],
                    sender_text_color:'#9b9b9b',
                    message:'Anonymous was made admin',
                    media:'none',
                    roomID:this.state.roomID,
                })
            }        
            else if( this.state.admin2 == null || this.state.admin2 == '') {
                url = `http://${serverLocation}:80/make_admin_room?name=${this.state.selected_users2[this.state.key_][1]}&chatID=${this.state.roomID}&route=2&is_anon=true`
                await fetch(url)
                this.state.admins[1] = this.state.selected_users2[this.state.key_][0]
                await this.setState({admins:this.state.admins, visible7:false, admin2:this.state.selected_users2[this.state.key_][0]})
                await this.room_socket.emit('room_sending', {
                    member1:'Anonymous',
                    member2:this.state.selected_users2[this.state.key_][0],
                    sender_text_color:'#9b9b9b',
                    message:'Anonymous was made admin',
                    media:'none',
                    roomID:this.state.roomID,
                })
            }
            else if( this.state.admin3 == null || this.state.admin3 == '') {
                url = `http://${serverLocation}:80/make_admin_room?name=${this.state.selected_users2[this.state.key_][1]}&chatID=${this.state.roomID}&route=3&is_anon=true`
                await fetch(url)
                this.state.admins[2] = this.state.selected_users2[this.state.key_][0]
                await this.setState({admins:this.state.admins, visible7:false, admin3:this.state.selected_users2[this.state.key_][0]})
                await this.room_socket.emit('room_sending', {
                    member1:'Anonymous',
                    member2:this.state.selected_users2[this.state.key_][0],
                    sender_text_color:'#9b9b9b',
                    message:'Anonymous was made admin',
                    media:'none',
                    roomID:this.state.roomID,
                })
            }  
            else {
                await this.setState({ visible7:false })
                return Alert.alert('Chat already has three admins')
            }
        }  
        else {
            if( this.state.admin1 == null || this.state.admin1 == '') {
                url = `http://${serverLocation}:80/make_admin_room?name=${this.state.selected_users2[this.state.key_][0]}&chatID=${this.state.roomID}&route=1&is_anon=false`
                await fetch(url)
                this.state.admins[0] = this.state.selected_users2[this.state.key_][0]
                await this.setState({admins:this.state.admins, visible7:false, admin1:this.state.selected_users2[this.state.key_][0]})
                await this.room_socket.emit('room_sending', {
                    member1:this.state.username,
                    member2:this.state.username,
                    sender_text_color:'#9b9b9b',
                    message:this.state.selected_users2[this.state.key_][0]+' was made admin',
                    media:'none',
                    roomID:this.state.roomID,
                })
            }        
            else if( this.state.admin2 == null || this.state.admin2 == '') {
                url = `http://${serverLocation}:80/make_admin_room?name=${this.state.selected_users2[this.state.key_][0]}&chatID=${this.state.roomID}&route=2&is_anon=false`
                await fetch(url)
                this.state.admins[1] = this.state.selected_users2[this.state.key_][0]
                await this.setState({admins:this.state.admins, visible7:false, admin2:this.state.selected_users2[this.state.key_][0]})
                await this.room_socket.emit('room_sending', {
                    member1:this.state.username,
                    member2:this.state.username,
                    sender_text_color:'#9b9b9b',
                    message:this.state.selected_users2[this.state.key_][0]+' was made admin',
                    media:'none',
                    roomID:this.state.roomID,
                })
            }
            else if( this.state.admin3 == null || this.state.admin3 == '') {
                url = `http://${serverLocation}:80/make_admin_room?name=${this.state.selected_users2[this.state.key_][0]}&chatID=${this.state.roomID}&route=3&is_anon=false`
                await fetch(url)
                this.state.admins[2] = this.state.selected_users2[this.state.key_][0]
                await this.setState({admins:this.state.admins, visible7:false, admin3:this.state.selected_users2[this.state.key_][0]})
                await this.room_socket.emit('room_sending', {
                    member1:this.state.username,
                    member2:this.state.username,
                    sender_text_color:'#9b9b9b',
                    message:this.state.selected_users2[this.state.key_][0]+' was made admin',
                    media:'none',
                    roomID:this.state.roomID,
                })
            }  
            else {
                await this.setState({ visible7:false })
                return Alert.alert('Chat already has three admins')
            }            
        }    
    }
    walk_stay() {
        if(this.state.chat_data[8] == 'walk') {
            return 'Walk away'
        }
        else {
            return 'Be here'
        }
    }
    async change_bio() {
        global.room_message_info[this.state.roomID][23] = this.state.txt
        await AsyncStorage.setItem('room_messages_info', JSON.stringify(global.room_message_info))
        url = `http://${serverLocation}:80/change_room_bio?room_bio=${this.state.txt}&roomID=${this.state.roomID}`
        await fetch(url)
        await this.room_socket.emit('room_sending', {
            member1:this.state.username,
            member2:this.state.username,
            sender_text_color:'#9b9b9b',
            message:"The room bio was changed to: "+this.state.txt,
            media:'none',
            roomID:this.state.roomID,
        })
    }
    async invite() {
        // remove DB
        await this.socket_rooms.emit('rooms_invite', {
            'username':this.state.username,
            'roomID':this.state.roomID,
            'selected_users':[ this.state.requests[this.state.key_][1] ]
        })
        
        // remove backend
        url = `http://${serverLocation}:80/respond_request?ID=${this.state.requests[this.state.key_][4]}&status=invited`
        console.log(url)
        await fetch(url)            
        
        // rid on lists
        ind = this.state.requests.indexOf(this.state.requests[this.state.key_]);
        await this.state.requests.splice(ind, 1)
        await this.setState({visible6:false})
    }
    async reject() {
        // remove backend
        url = `http://${serverLocation}:80/respond_request?ID=${this.state.requests[this.state.key_][4]}&status=reject`
        console.log(url)
        await fetch(url)

        // rid on lists
        ind = this.state.requests.indexOf(this.state.requests[this.state.key_]);
        await this.state.requests.splice(ind, 1)
        await this.setState({visible6:false})
    }

    render() {
        const config = {velocityThreshold: 0.3, directionalOffsetThreshold: 80};
        return (
        <View style={styles.container}>
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
                        style={{flex:1, backgroundColor: 'black'}}>
                        <View style={{height:Dimensions.get('window').height, width:Dimensions.get('window').width, backgroundColor:'black', justifyContent:'center', alignContent:'center'}}>
                            <View style={{flex:1,}}>
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
                                    source={ {uri: `http://${serverLocation}/${this.state.clicked_image}` }}
                                    style={{ flex:1, paddingRight:1, paddingLeft:1, width:Dimensions.get('window').width, height:Dimensions.get('window').width-2, }}
                                /> 
                            </View>
                            <View style={{flex:1}}></View>
                        </View>
                    </GestureRecognizer>
                </DialogContent>
            </Dialog>                               
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
                         width:275*factor_hor, height:275*factor_hor, backgroundColor: 'white'}}
                    >
                        <View style={{height:Dimensions.get('window').height, width:Dimensions.get('window').width, backgroundColor:'white', justifyContent:'center', alignContent:'center', alignItems:'center'}}>

                            <View style={{height:10}}></View>
                            <TouchableOpacity>
                                <Airplane
                                    width={125*factor_hor}
                                    height={125*factor_hor}
                                    style={{paddingRight:1, justifyContent:'center', alignContent:'center', paddingLeft:1, }}
                                />
                            </TouchableOpacity>
                            <View style={{height:20}}></View>
                            <TouchableOpacity 
                                onPress={() => {this.make_admin()}}
                                style={{width:150*factor_hor, height:30, backgroundColor:'#ECECEC', justifyContent:'center', alignContent:'center', alignItems:'center', borderRadius:20}}>
                                <View style={{width:200*factor_hor, height:40, backgroundColor:'#ECECEC', justifyContent:'center', alignContent:'center', alignItems:'center', borderRadius:20}}>
                                    <Text style={{textAlign:'center', fontFamily:'avenir next', fontSize:20*factor_hor, color:'#878585' }}>make admin</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{height:17.5}}></View>
                            <TouchableOpacity 
                                onPress={()=>{this.remove_user()}}
                                style={{width:150*factor_hor, height:30, backgroundColor:'#ECECEC', justifyContent:'center', alignContent:'center', alignItems:'center', borderRadius:20}}>
                                <View style={{width:200*factor_hor, height:40, backgroundColor:'#ECECEC', justifyContent:'center', alignContent:'center', alignItems:'center', borderRadius:20}}>
                                    <Text style={{textAlign:'center', fontFamily:'avenir next', fontSize:20*factor_hor, color:'red'}}>remove user</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </GestureRecognizer>
                </DialogContent>
            </Dialog>   
            <Dialog          
                overlayOpacity={0.15}
                hasOverlay={true}
                rounded={true}
                containerStyle={{opacity:1}}
                visible={this.state.visible6}
                onTouchOutside={() => {this.setState({visible6:false})}}
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
                         width:275*factor_hor, height:275*factor_hor, backgroundColor: 'white'}}
                    >
                        <View style={{height:Dimensions.get('window').height, width:Dimensions.get('window').width, backgroundColor:'white', justifyContent:'center', alignContent:'center', alignItems:'center'}}>

                            <View style={{height:10}}></View>
                            <TouchableOpacity>
                                <Airplane 
                                    width={125*factor_hor}
                                    height={125*factor_hor}
                                    style={{paddingRight:1, justifyContent:'center', alignContent:'center', paddingLeft:1, }}
                                />
                            </TouchableOpacity>
                            <View style={{height:20}}></View>
                            <TouchableOpacity 
                                onPress={() => {this.invite()}}
                                style={{width:150*factor_hor, height:30, backgroundColor:'#ECECEC', justifyContent:'center', alignContent:'center', alignItems:'center', borderRadius:20}}>
                                <View style={{width:200*factor_hor, height:40, backgroundColor:'#ECECEC', justifyContent:'center', alignContent:'center', alignItems:'center', borderRadius:20}}>
                                    <Text style={{textAlign:'center', fontFamily:'avenir next', fontSize:20*factor_hor, color:'#878585' }}>send invite</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{height:17.5}}></View>
                            <TouchableOpacity 
                                onPress={()=>{this.reject()}}
                                style={{width:150*factor_hor, height:30, backgroundColor:'#ECECEC', justifyContent:'center', alignContent:'center', alignItems:'center', borderRadius:20}}>
                                <View style={{width:200*factor_hor, height:40, backgroundColor:'#ECECEC', justifyContent:'center', alignContent:'center', alignItems:'center', borderRadius:20}}>
                                    <Text style={{textAlign:'center', fontFamily:'avenir next', fontSize:20*factor_hor, color:'red'}}>reject request</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </GestureRecognizer>
                </DialogContent>
            </Dialog>   
                          
            <View style={{
                height:Dimensions.get('window').height*0.035, 
                backgroundColor:'white', 
                justifyContent:'center', 
                alignContent:'center', 
                alignItems:'center', 
                alignSelf:'stretch'
            }}></View>         
            <View style={{
                height:Dimensions.get('window').height*0.055, 
                borderBottomColor:'#ececec', 
                borderBottomWidth:0.75, 
                flexDirection:'row', 
                backgroundColor:'white', 
                justifyContent:'center', 
                alignContent:'center', 
                alignItems:'center', 
                alignSelf:'stretch'
            }}>
                <View style={{flex:1, }}>
                    <TouchableOpacity onPress={()=>{
                        this.props.navigation.state.params.returned(this.state.admin1,this.state.admin2,this.state.admin3, this.state.color ), 
                        this.props.navigation.goBack()
                        }}>
                        <Icon 
                            name="chevron-left"
                            color="black"
                            type='entypo'
                            size={25*factor_hor}
                        />
                    </TouchableOpacity>                
                </View>
                <View style={{flex:4, justifyContent:'center', alignContent:'center', alignItems:'center' }}>
                    <Text style={{color:'black', fontSize:24*factor_ver, fontWeight:'500', fontFamily:'avenir next', }}>{this.state.message_name}</Text>
                </View>
                <View style={{flex:1,}}></View>
            </View>            
            
            <View style={{height:Dimensions.get('window').height*0.4, paddingLeft:20*factor_hor, paddingRight:20*factor_hor, alignSelf:'stretch'}}>      
                {/* buffer */}
                <View style={{flex:0.25}}></View>
                {/* admin names */}
                <View style={{flex:1, justifyContent:'center', alignContent:'center', flexDirection:'row'}}>
                    <View style={{flex:2, marginRight:20*factor_hor, justifyContent:'center', alignContent:'center'}}>
                        <Text style={{fontSize:20*factor_hor, textAlign:'left', fontWeight:'500', color:'#9b9b9b', fontFamily:'avenir next', }}>Room admins</Text>
                    </View>
                    <View style={{flex:3, justifyContent:'center', alignContent:'center' }}>
                    
                        <ScrollView horizontal={true}>
                            {this.state.admins.map((item, index) => {
                                return ( 
                                    <View key={index} style={{justifyContent:'center', alignContent:'center'}}>
                                        <TouchableOpacity 
                                        onPress={() => {this.goProfile(index, this.state.admins[index])}} style={{justifyContent:'center', alignContent:'center'}}>
                                            <Text style={{fontSize:20*factor_hor, textAlign:'left', fontWeight:'500', color:'#9b9b9b', fontFamily:'avenir next', }}>[{this.state.admins[index]}] </Text>
                                        </TouchableOpacity>
                                    </View>
                            )})}
                        </ScrollView>  
                    </View>
                </View>
                {/* room bio */}
                <View style={{flex:1, justifyContent:'center', alignContent:'center', flexDirection:'row'}}>
                    <View style={{flex:2, marginRight:20*factor_hor, justifyContent:'center', alignContent:'center'}}>
                        <Text style={{fontSize:20*factor_hor, textAlign:'left', fontWeight:'500', color:'#9b9b9b', fontFamily:'avenir next', }}>Room bio</Text>
                    </View>
                    { this.state.is_admin && (
                    <View style={{flex:3, justifyContent:'center', alignContent:'center' }}>
                        <TextInput style={{fontSize:20*factor_hor, textAlign:'left', fontWeight:'500', color:'#9b9b9b', fontFamily:'avenir next', }}
                                color='#9b9b9b'
                                maxLength={50}
                                returnKeyType='next'
                                ref={input => { this.textInput = input }}
                                placeholder={this.state.room_bio}
                                placeholderTextColor='#9b9b9b'
                                onChangeText = { (typedText) => { this.setState({txt:typedText}) }}
                                onSubmitEditing = {() => { this.change_bio(), this.textInput.clear() } }
                        >
                        </TextInput>  
                    </View>
                    )}
                    { !this.state.is_admin && (
                    <View style={{flex:3, justifyContent:'center', alignContent:'center' }}>
                        <Text style={{fontSize:20*factor_hor, textAlign:'left', fontWeight:'500', color:'#9b9b9b', fontFamily:'avenir next', }}>[{this.state.room_bio}]</Text>
                    </View>
                    )}
                </View>
             
                {/* block convo */}
                <View style={{flex:1, justifyContent:'center', alignContent:'center', flexDirection:'row'}}>
                    <View style={{flex:2, marginRight:20*factor_hor, justifyContent:'center', alignContent:'center'}}>
                        <Text style={{fontSize:20*factor_hor, textAlign:'left', fontWeight:'500', color:'#9b9b9b', fontFamily:'avenir next', }}>Admin room</Text>
                    </View>
                    <TouchableOpacity style={{justifyContent:'center', marginTop:3, alignContent:'center'}} onPress={() => {this.props.navigation.navigate('ADMIN_ROOM', {chatID:this.state.roomID})}}>
                        <Icon 
                            name="chevron-right"
                            color="black"
                            type='entypo'
                            size={25*factor_hor}
                        />
                    </TouchableOpacity>
                    <View style={{flex:3, justifyContent:'center', alignContent:'center' }}>
                    </View>
                </View>

                {/* buffer */}
                <View style={{flex:0.25, }}></View>
                {/* search chat */}
                <View style={{flex:0.75, flexDirection:'row',  borderRadius:10, backgroundColor:'#ececec'}}>            
                    <View style={{marginStart:9, flex:1, justifyContent:'center', marginBottom:0, marginEnd:3}}>
                            <Icon 
                                size={22*factor_hor}
                                name="magnifying-glass" 
                                color='#626364'
                                type='entypo' 
                            />
                    </View>    
                    <View style={{paddingLeft:2, flex:8, justifyContent:'center' }}>
                    <TextInput style={{textAlign:'left', fontSize:20*factor_hor, fontFamily:'Avenir Next' }}
                                color='black'
                                returnKeyType='next'
                                ref={input => { this.textInput = input }}
                                placeholder='Search messages'
                                placeholderTextColor='#626364'
                                onChangeText = { (typedText) => { this.setState({txt:typedText}) }}
                                onSubmitEditing = {() => { this.search_private(), this.textInput.clear(), this.setState( {search_term:''}) } }
                    >
                    </TextInput>
                    </View> 
                    <View style={{flex:1}}></View>                         
                </View>
                {/* buffer */}
                <View style={{flex:0.5}}></View>
                {/* mute convo */}
                <View style={{flex:0.75, borderBottomColor:'#ececec', borderTopColor:'#ececec', borderBottomWidth:1, borderTopWidth:1, justifyContent:'center', alignContent:'center', flexDirection:'row'}}>
                    <View style={{flex:4, marginRight:20*factor_hor, justifyContent:'center', alignContent:'center'}}>
                        <Text style={{fontSize:20*factor_hor, textAlign:'left', fontWeight:'500', color:'#9b9b9b', fontFamily:'avenir next', }}>Mute Notifications</Text>
                    </View>
                    <View style={{flex:2, justifyContent:'center', alignContent:'center' }}>
                        <TouchableOpacity onPress={() => {this.click_mute()}}>
                            <Text numberOfLines={2} style={{fontSize:20*factor_hor, textAlign:'left', fontWeight:'500', color:'#9b9b9b', fontFamily:'avenir next', }}>{this.muted()}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* buffer */}
                <View style={{flex:0.5}}></View>
            </View>
    
            <View style={{height:Dimensions.get('window').height*0.4, paddingLeft:20*factor_hor, paddingRight:20*factor_hor, alignSelf:'stretch'}}>
                <View style={{height:40*factor_ver, flexDirection:'row', borderColor:'#ececec', borderWidth:1,borderRadius:10*factor_hor,   }}>    
                    <View style={{flex:1, justifyContent:'center', alignContent:'center', borderRadius:10*factor_hor, borderWidth:this.state.following_bw, backgroundColor:this.state.bg_following, borderColor:'#ececec'}}>
                        <TouchableOpacity onPress={()=>{this.press_following()}}>
                            <Text style={{color:this.state.following_color, fontSize:20*factor_hor, textAlign:'center'}}>Members</Text>
                        </TouchableOpacity>                       
                    </View>
                    <View style={{flex:1, justifyContent:'center', alignContent:'center', borderRadius:10*factor_hor, borderWidth:this.state.people_bw, backgroundColor:this.state.bg_people, borderColor:'#ececec'}}>
                        <TouchableOpacity onPress={()=>{this.press_people()}}>
                            <Text style={{color:this.state.people_color, fontSize:20*factor_hor, textAlign:'center'}}>Media</Text>
                        </TouchableOpacity>
                    </View>    
                    { this.state.is_admin && (
                    <View style={{flex:1, justifyContent:'center', alignContent:'center', borderRadius:10*factor_hor, borderWidth:this.state.access_bw, backgroundColor:this.state.bg_access, borderColor:'#ececec'}}>
                        <TouchableOpacity onPress={()=>{this.press_access()}}>
                            <Text style={{color:this.state.access_color, fontSize:20*factor_hor, textAlign:'center'}}>Access</Text>
                        </TouchableOpacity>
                    </View>                        
                    )}
                </View>   
                <View style={{height:10,}}></View>
                <View style={{height:40*factor_hor, flexDirection:'row', flexDirection:'row', }}>
                    <View style={{flex:1, justifyContent:'center', alignContent:'center', flexDirection:'row' }}>
                        <View style={{flex:0.025}}></View>
                        {/* magnify glass icon */}
                        { this.state.show_search && ( 
                        <View style={{height:33*factor_hor, justifyContent:'center', alignContent:'center', width:33*factor_hor, borderRadius:80, backgroundColor:'#ececec'}}>
                            <TouchableOpacity onPress={() => {this.click_search()}}>
                                <Icon 
                                    size={22*factor_hor}
                                    name="magnifying-glass" 
                                    color='#9b9b9b'
                                    type='entypo' 
                                />                            
                            </TouchableOpacity>
                        </View>
                        )}
                        {/* search text  */}
                        { this.state.show_search && ( 
                        <Text style={{textAlign:'left', color:'#9b9b9b', fontFamily:'avenir next', marginTop:3, fontSize:18}}>  search</Text>
                        )}
                        {/* full search bar open */}
                        { this.showing_search() && (

                        <View style={{flex:1.75, flexDirection:'row',  borderRadius:10, backgroundColor:'#ececec'}}>            
                        <View style={{marginStart:9, flex:1, justifyContent:'center', marginBottom:0, marginEnd:3}}>
                                <TouchableOpacity onPress={() => {this.click_search()}}>
                                    <Icon 
                                        size={22*factor_hor}
                                        name="magnifying-glass" 
                                        color='#9b9b9b'
                                        type='entypo' 
                                    />
                                </TouchableOpacity>
                        </View>    
                        <View style={{paddingLeft:2, flex:7, justifyContent:'center',}}>
                        <TextInput  style={{textAlign:'left', fontSize:20*factor_hor, fontFamily:'Avenir Next' }}
                                    color='black'
                                    returnKeyType='next'
                                    ref={input => { this.textInput = input }}
                                    placeholder='Search members'
                                    placeholderTextColor='#626364'
                                    onChangeText = { (typedText) => { this.search_members(typedText) }}
                        >
                        </TextInput>
                        </View>                            
                        </View>

                        )}      
                        {/* buffer */}
                        { this.state.show_search && (<View style={{flex:0.25}}></View>)}
                        {/* icon add member */}
                        { this.state.show_search && ( 
                            <View>
                                <TouchableOpacity onPress={() => {this.props.navigation.navigate('ADD_ROOM', {chatID:this.state.roomID} )}}>
                                    <View style={{height:30*factor_hor,  justifyContent:'center', alignContent:'center', width:30*factor_hor, borderRadius:80, backgroundColor:'#CACACA'}}>
                                        <Icon
                                            style={{justifyContent:'center', alignContent:'center'}}
                                            size={factor_hor*25}
                                            name='plus'
                                            color='white'
                                            type='entypo'
                                        />  
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                        {/* text add member */}
                        { this.state.show_search && (  
                            <View>
                                <Text style={{textAlign:'left', color:'#9b9b9b', fontFamily:'avenir next', marginTop:3, fontSize:18}}>  add members</Text>                         
                            </View>
                        )}
                        {/* buffer */}
                        { this.state.show_search && (<View style={{flex:0.5}}></View>)}
                    </View>
                </View>

                {/* show lists of people */}
                { this.members_media() && ( 
                    <View style={{flex:1, paddingLeft:10*factor_hor, paddingRight:10*factor_hor, flexDirection:'row'}}>
                        <View style={{flex:1, alignSelf:'stretch'}}>
                            <ScrollView>
                                {this.state.selected_users2.map((item, index) => {
                                    return ( 
                                        <View>
                                            <TouchableOpacity 
                                                delayLongPress={450} 
                                                onLongPress={() => { this.setState({key_:index}), this.goprofile2(index) }}
                                                onPress={() => {this.goProfile(index, this.state.selected_users2[index][0])}}>
                                                <Text style={{textAlign:'center', color:'black', fontSize:20*factor_hor, fontFamily:'avenir next', }}>[ {this.state.selected_users2[index][0] } ]</Text>
                                            </TouchableOpacity>
                                        </View>
                                )})}
                            </ScrollView>
                        </View>
                    </View>
                )}
                {/* show pictures */}
                { this.members_people() && ( 
                    <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingLeft:10*factor_hor, justifyContent:'center', alignContent:'center', paddingRight:10*factor_hor, flexDirection:'row'}}>
                        <View style={{flex:1}}></View>
                        <View style={{ justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
                        <ScrollView style={{flexGrow:1}}>

                            {this.state.imgs1.map((item, index) => {
                                return ( 
                                    <View key={index} style={{height:150, marginBottom:5, justifyContent:'center', justifyContent:'center'}} onLayout={()=>{console.log(this.state.imgs1[index][0])}}>
                                            <TouchableOpacity onPress={() => {this.setState({ clicked_image:this.state.imgs1[index][0], visible4:true })}}>
                                            <FastImage
                                                    resizeMode={FastImage.resizeMode.contain}
                                                    source={ {uri: `http://${serverLocation}/${this.state.imgs1[index][0]}` }}
                                                    style={{ width:150, height:150, paddingRight:1, justifyContent:'center', alignContent:'center', paddingLeft:1, }}
                                            /> 
                                            </TouchableOpacity>
                                    </View>
                            )})}
                        </ScrollView>
                        </View>                                                    
                        <View style={{flex:1}}></View>
                    </View>
                )}
                {/* show pictures */}
                { this.members_access() && ( 
                    <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingLeft:10*factor_hor, justifyContent:'center', alignContent:'center', paddingRight:10*factor_hor, flexDirection:'row'}}>
                        <View style={{flex:1}}></View>
                        <View style={{ justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
                        <ScrollView style={{flexGrow:1}}>

                            {this.state.requests.map((item, index) => {
                                return ( 
                                    <View>
                                        <TouchableOpacity 
                                            delayLongPress={450} 
                                            onLongPress={() => { this.setState({key_:index}), this.deal_access(index) }}
                                            onPress={() => {this.goProfile(index, this.state.requests[index][1])}}>
                                            <Text style={{textAlign:'center', color:'black', fontSize:20*factor_hor, fontFamily:'avenir next', }}>[ {this.state.requests[index][1] } ]</Text>
                                        </TouchableOpacity>
                                    </View>
                            )})}
                        </ScrollView>
                        </View>                                                    
                        <View style={{flex:1}}></View>
                    </View>
                )}                
            </View>    

            <View style={{
                height:Dimensions.get('window').height*0.05, 
                marginLeft:20*factor_hor, 
                marginRight:20*factor_hor,
                borderRadius:12.5*factor_hor, 
                justifyContent:'center', 
                alignContent:'center', 
                backgroundColor:'#F3F3F3', 
                alignSelf:'stretch'}}
            >
                <TouchableOpacity onPress={()=>{this.leave()}}>
                    <Text style={{textAlign:'center', color:'#FC3004', fontSize:22*factor_hor, fontWeight:'500'}}>{this.state.block_chat}</Text>
                </TouchableOpacity>
            </View>
            <View style={{height:Dimensions.get('window').height*0.05}}></View>

        </View>
        );
    }}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
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
