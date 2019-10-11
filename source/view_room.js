import React, {Component} from 'react';
import {StyleSheet, AsyncStorage, Dimensions,
        TextInput, Alert, Text, View, TouchableOpacity,
        Platform, KeyboardAvoidingView, FlatList, Keyboard,
        TouchableHighlight, AppState,
    } from 'react-native';
import { Icon } from 'react-native-elements';
import Dialog, { DialogContent, DialogButton, } from 'react-native-popup-dialog';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import moment from  'moment-timezone';
import FastImage from 'react-native-fast-image'
import MapView, {Marker, Circle} from 'react-native-maps';
import Airplane from './svgs/airplane';
import ImagePicker from 'react-native-image-picker';

const geolib = require('geolib');
const distance = {'world':10000000, 'city':8000, 'local':800, 'micro':80}
const dist = {'world':20000, 'city':20000, 'local':2000, 'micro':200}
var body = new FormData();

export default class view_room extends React.Component {
    static navigationOptions = {header: null}
    constructor(props) {
        super(props);
        this.socket_rooms = global.socket_rooms
        this.state = {
            appState: AppState.currentState,
            username:'',
            is_anon:false, 
            load_room:false, // if loading alert
            sender_text_color:'',
            sender_text_color2:'',
            message_name:'',
            an_image:false,
            destination:'none', // if image exists
            buffer:10, // buffer at bottom screen
            message:'', // message someone types
            number_lines:'', // numbers lines written
            textheight:30, // height of text input
            last_textheight:30, // height of last textheight
            showing_date:0.7, // width of image
            original_banner:'',
            load_map:false,
            messages:[],
            old_timestamp:'', // messages already have 
            keyboard_show:false,
            image_data:'none',
            sending_message:false, // start not sending message
            show:40, // number messages to show
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
            is_anon:false,
            selected_users:[], // users to send to
            act_load_color:"white", // activity indicator load color
            roomID:'', // roomID
            banner_color:'white', // banner color
            loading:false,
            run_reached_end:false,
            visible9:false, 
            visible7:false, 
            new_mesasge:false, // if banner is going to be To: or name or group 
            messages_connected:'', // async storage whether connected on messages namespace
        }
    }

    async componentDidMount() {
        
        // listen into state
        AppState.addEventListener('change', this._handleAppStateChange);

        // set variables
        data = await this.props.navigation.getParam('x')
        // if coming from notification
        
        sender_text_color = await AsyncStorage.getItem('text_color')
        user = await AsyncStorage.getItem('user')
        room_message_info = JSON.parse(await AsyncStorage.getItem('room_messages_info'))
        
        roomID = data[0]
        original_banner = sender_text_color
        color = original_banner
        admin1 = data[9]
        admin2 = data[10]
        admin3 = data[11]
        admin4 = global.room_message_info[roomID][24]
        admin5 = global.room_message_info[roomID][25]
        admin6 = global.room_message_info[roomID][26]
        name = data[8]
        num_users = data[16]
        status_ = global.room_message_info[roomID][6]
        is_anon = false
        ios = 10
        is_admin = false
        
        map_lat = room_message_info[roomID][18]
        map_long = room_message_info[roomID][19]
        radius = room_message_info[roomID][9]
        y = geolib.getBoundsOfDistance({ latitude:map_lat, longitude:map_long}, dist[radius])
        y2 = ( y[1]['longitude'] - y[0]['longitude'] )*3
        y3 = ( y[1]['latitude'] - y[0]['latitude'] )*3 

        if( admin1 == user || admin2 == user || name == user || admin4 == user || admin5 == user || admin6 == user ) {
            is_admin = true
        }
        if( global.room_message_info[roomID][1] == 'Anonymous' ) {
            is_anon = true
        }
        if(Platform.OS === 'ios') {
            if ( await Dimensions.get('window').height > 811) {
                ios = 40              
        }}

        await this.setState({
            buffer:ios,
            banner_color:original_banner,
            original_banner:original_banner,
            color:color,
            roomID:roomID,
            is_anon:is_anon,
            status_:status_,
            admin1:admin1,
            admin2:admin2,
            admin3:admin3,
            admin4:admin4,
            admin5:admin5,
            admin6:admin6,            
            message_name:name,
            num_users:num_users,
            username:user,
            sender_text_color:sender_text_color,
            is_admin:is_admin,
            map_radius:radius,
            map_lat:map_lat,
            map_long:map_long,
            chat_data:room_message_info[roomID],
            region:{
                latitude:map_lat, 
                longitude:map_long,
                latitudeDelta:y2,
                longitudeDelta:y3               
            },
            load_map:true,
        })

        //  if in radius turn active on in room members
        console.log(room_message_info, roomID)
        if( room_message_info[roomID][27] == 'in' ) {
            url = `http://${serverLocation}:80/room_member_active?userID=${user}&roomID=${data[0]}`
            console.log(url)
            fetch(url)
        }

        // join radius
        await this.socket_rooms.on('update_joined_room', (data) => { 
            roomID = data.data
            if(roomID == this.state.roomID) {
                console.log(roomID, 'roomID')
                Alert.alert("You rejoined this room's radius")
                this.setState({
                    messages:[],
                    run_reached_end:true, 
                    loading:false
                })
                this.reached_end()
            }
        })    

        // left radius
        await this.socket_rooms.on('update_left_room', (data) => { 
            roomID = data.data
            if(roomID == this.state.roomID) {
                console.log(roomID, 'roomID')
                Alert.alert("You left this room's radius")
                this.setState({
                    messages:[],
                    run_reached_end:true, 
                    loading:false
                })
                this.reached_end()             
            }
        })   

        // lose connection and reconnect
        await this.socket_rooms.on('reconnect', () => { 
            this.setState({
                messages:[],
                run_reached_end:true, 
                loading:false
            })
            this.reached_end()
        })     

        // get messages accordingly
        if(status_ == 'joined') {
            await this.joined()
        }
        else if(status_ == 'left' || status_ == 'kicked') {
            await this.left()
        }
        if(this.state.run_reached_end == true) {
            await this.reached_end()
        }
    }
    async leave() {
        this.socket_rooms.removeAllListeners("update_joined_room");
        this.socket_rooms.removeAllListeners("update_left_room");
        
        // set inactive room members
        url = `http://${serverLocation}:80/room_member_inactive?userID=${this.state.username}&roomID=${this.state.roomID}`
        fetch(url)
        
        this.props.navigation.navigate('ROOMS')
    }

    // status
    async left() {
        // get historical messages
        if(this.state.loading == false) {

            room_message_dict = JSON.parse( await AsyncStorage.getItem('room_messages') ) 
            room_message_info = JSON.parse(await AsyncStorage.getItem('room_messages_info'))
            
            // if theres less than 40 messages in global dict
            if(room_message_dict[this.state.roomID].length < 41) {
                        
                // put all asynced messages into messages
                for(key in room_message_dict[this.state.roomID]) {
                    this.state.messages.push(room_message_dict[this.state.roomID][key])
                }   
                await this.setState({messages:this.state.messages})

                old_timestamp = room_message_info[this.state.roomID][5]
                is_date = true

                // if more than one message in dict 
                if(global.room_message_dict[this.state.roomID].length > 0) {
                    is_date = false 
                    old_timestamp = this.state.messages[this.state.messages.length - 1][7]
                }

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
                        roomID:this.state.roomID,
                        old_timestamp:old_timestamp,
                        is_date:is_date 
                })})
                .then((response) => response.json())
                .then((responseJson2) => {
                    run_reached_end = true
                    if(responseJson2.length == 0) {
                        run_reached_end = false
                    }
                    this.setState({
                        messages:[...this.state.messages, ...responseJson2], 
                        run_reached_end:run_reached_end,
                        loading:false,
                    })
                })
                .catch((error) => {
                    console.log(error)
                })  
            }
        }        
    }
    async joined() {
        if(this.state.loading == false) {
            
            room_message_dict = JSON.parse( await AsyncStorage.getItem('room_messages') ) 
            room_message_info = JSON.parse(await AsyncStorage.getItem('room_messages_info'))

            // add new messages
            await this.socket_rooms.on('room_message_', (data) => {
                
                data.data[4] = data.data[4].replace(/["]/g, '')

                console.log(data.data[2], data.data[5])

                if(data.data[5] == this.state.roomID && data.data[2] !== '#9b9b9c' ) {
                    this.state.messages.unshift(data.data)
                    this.setState({messages:this.state.messages})
            
                    if(data.data[2] == '#9b9b9b') {
                        if( data.data[3] == ( this.state.username+' was made admin' ) ) {             
                            if(this.state.admin1 == null) {
                                this.state.admin1 = this.state.username 
                            }
                            else if(this.state.admin2 == null) {
                                this.state.admin2 = this.state.username
                            }
                            else if(this.state.admin3 == null) {
                                this.state.admin3 = this.state.username
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
                        else if( data.data[3] == 'Anonymous was made admin'  ) {
                            if( data.data[1] == this.state.username ) {
                                if(this.state.admin1 == null) {
                                    this.state.admin1 = 'Anonymous' 
                                    this.state.admin4 = this.state.username
                                }
                                else if(this.state.admin2 == null) {
                                    this.state.admin2 = 'Anonymous'
                                    this.state.admin5 = this.state.username
                                }
                                else if(this.state.admin3 == null) {
                                    this.state.admin3 = 'Anonymous'
                                    this.state.admin6 = this.state.username
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
                    }
                }
                else if(data.data[5] == this.state.roomID && data.data[2] == '#9b9b9c')  {
                    if(data.data[3] == 'joined') {
                        this.setState({num_users:this.state.num_users+1})
                    }
                    else if(data.data[3] == 'left') {
                        this.setState({num_users:this.state.num_users-1})
                    }
                    else if(data.data[3] == this.state.username+' was removed from the room' ) {
                        Alert.alert('You were removed from the room')
                        this.leave()
                    }
                }
            })   

            // if theres less than 40 messages in global dict
            if(global.room_message_dict[this.state.roomID].length < 41) {                
                // put all asynced messages into messages
                for(key in room_message_dict[this.state.roomID]) {
                    this.state.messages.push(room_message_dict[this.state.roomID][key])
                }  
                
                await this.setState({messages:this.state.messages})

                old_timestamp = 10000000000000
                is_date = true

                // if more than one message in dict 
                if(global.room_message_dict[this.state.roomID].length > 0) {
                    is_date = false
                    old_timestamp = this.state.messages[this.state.messages.length - 1][7]
                }

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
                        roomID:this.state.roomID,
                        old_timestamp:old_timestamp,
                        is_date:is_date 
                })})
                .then((response) => response.json())
                .then((responseJson2) => {
                    run_reached_end = true
                    if(responseJson2.length == 0) {
                        run_reached_end = false
                    }
                    this.setState({
                        messages:[...this.state.messages, ...responseJson2], 
                        run_reached_end:run_reached_end,
                        loading:false,
                    })
                })
                .catch((error) => {
                    console.log(error)
                })  
            }
        }
    }
    _handleAppStateChange = async (nextAppState) => {  
        if (this.state.appState.match(/active/) && nextAppState === 'background') {
            // app went to background == turn active off on room members
            url = `http://${serverLocation}:80/room_member_inactive?userID=${this.state.username}&roomID=${this.state.roomID}`
            fetch(url)
            console.log('background')
        }
        else if (this.state.appState.match(/background/) && nextAppState === 'active') {
            // app went to foreground == turn active on on room members
            if( typeof(this.state.roomID) !== 'undefined') {
                if(global.room_message_info[this.state.roomID][27] == 'in') {
                    url = `http://${serverLocation}:80/room_member_active?userID=${this.state.username}&roomID=${this.state.roomID}`
                    fetch(url)
                    console.log('foreground')
                }
            }
            else {
                data = await this.props.navigation.getParam('x')
                user = await AsyncStorage.getItem('user')
                if(global.room_message_info[data[0]][27] == 'in') {
                    url = `http://${serverLocation}:80/room_member_active?userID=${user}&roomID=${data[0]}`
                    fetch(url)
                    console.log('foreground')
                }
            }
        }
        this.setState({appState: nextAppState});
    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    // end of messages
    async reached_end() {
        if(this.state.run_reached_end == true && this.state.loading == false) {
            // set time data
            old_timestamp = 100000000000000
            is_date = true

            if( typeof(this.state.messages[this.state.messages.length - 1]) !== 'undefined') {
                old_timestamp = this.state.messages[this.state.messages.length - 1][7]
                is_date = false
            }

            // if have left
            if( this.state.status_ == 'left' ) {
                old_timestamp = global.room_message_info[this.state.roomID][5]
                is_date = true    

                if(global.room_message_info[this.state.roomID][5] > this.state.messages[this.state.messages.length - 1][6] ) {
                    old_timestamp = this.state.messages[this.state.messages.length - 1][6]
                }
            }    

            url = `http://${serverLocation}:80/get_messages_rooms?`
            await fetch(url, {
                method:'POST',
                headers:{    
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                body: 
                JSON.stringify({
                    roomID:this.state.roomID,
                    old_timestamp:old_timestamp,
                    is_date:is_date
            })})
            .then((response) => response.json())
            .then((responseJson2) => {
                console.log('END REACHED MESSAGES', responseJson2)
                run_reached_end = true
                if(responseJson2.length == 0) {
                    run_reached_end = false
                }
                this.setState({
                    run_reached_end:run_reached_end,
                    messages:[...this.state.messages, ...responseJson2], 
                })
            })
            .catch((error) => {
                console.log(error)
            });   
        }
    }  
    // send message
    async send_message() {  
        // can speak
        speak_key = true

        // if admin only room
        if(global.room_message_info[this.state.roomID][11] !== 'everyone') {
            // if admin can speak
            if(this.state.is_admin == true) {
                speak_key = true
                await this.setState({sender_text_color:'#000000'})
            }
            // if not admin in admin only room
            else {
                speak_key = false
                Alert.alert('Admin only rooms only allow admins to send messages')
            }
        }

        if(this.state.sending_message == false && 
            ( this.state.an_image == true || this.state.message.length > 0 ) && 
            global.room_message_info[this.state.roomID][6] == 'joined' &&
            speak_key == true ) {   

            // if be here and out of range and not admin
            if( global.room_message_info[this.state.roomID][8] == 'here' &&
                global.room_message_info[this.state.roomID][27] == 'out' ) {
                Alert.alert("You left this room's radius. Enter the radius to send and receive messages.")
                return null
            }
            
            await this.setState({sending_message:true})   

            // if anonymous
            send_as_anon = this.state.username       
            if(this.state.is_anon == true) {
                send_as_anon = 'Anonymous'
            }

            // emit message 
            await this.socket_rooms.emit('room_sending', {
                'member1':send_as_anon, 
                'member2':this.state.username, 
                'sender_text_color':this.state.banner_color, 
                'message':this.state.message, 
                'media':this.state.image_data, 
                'roomID':this.state.roomID, 
            })                

            // change cancel to back & change banner
            await this.setState({
                    new_mesasge:false, 
                    destination:'none', 
                    an_image:false,
                    last_textheight:30,
                    message:'',
                    sending_message:false
            })    

            //await Keyboard.dismiss(); 
            await this.scroll_to_bottom();
            await this.delete_image();
            //await this.close_keyboard();
            await this.textInput.clear();                             
        }
    }

    async open_keyboard() {
        // if keyboard closed
        this.scroll_to_bottom()
        if( this.state.keyboard_opened == false ) {

                    // if theres been text entered already
                    if( this.state.last_textheight !== this.state.textheight ) {
                        await this.setState({buffer:10, keyboard_opened:true, textheight:this.state.last_textheight, },function(){console.log(this.state.buffer, this.state.keyboard_opened)})
                    }
                    
                    // no text entered
                    else if ( this.state.last_textheight == this.state.textheight ) {
                        await this.setState({buffer:10, keyboard_opened:true, },function(){console.log(this.state.buffer)})           
                    }
        }
    }
    async close_keyboard() {
        if(this.state.keyboard_opened == true) {
                // if x make 40 buffer n dismiss keyboard
                if(Platform.OS === 'ios' && Dimensions.get('window').height > 811) {
                        await this.setState({buffer:40,keyboard_opened:false, textheight:30},function(){console.log(this.state.buffer, this.state.keyboard_opened, this.state.textheight)})                       
                        Keyboard.dismiss(); 
                }
                // if x make 40 buffer n dismiss keyboard
                else {
                    await this.setState({buffer:10,keyboard_opened:false, textheight:30},function(){console.log(this.state.buffer, this.state.keyboard_opened, this.state.textheight)})                       
                    Keyboard.dismiss(); 
                }
        }
    }   

    scroll_to_bottom() {
        this.refs.flatList.scrollToOffset({x: 0, y: 0, animated: true})
    }
    updateSize = (height) => {
        this.setState({
          textheight:height,
          last_textheight:height,
        },function() {console.log(
                this.state.last_textheight,
                this.state.textheight
            )}
        );
    }

    // image actions
    onSwipeUp(gestureState) {
        this.setState({visible4:false,visible9:false,visible7:false}, function () {console.log(this.state.visible4,this.state.visible9, this.state.visible7)});
        console.log(this.state.visible4,this.state.visible9, this.state.visible7)
    }                                                                                                         
    onSwipeDown(gestureState) {
        this.setState({visible4:false,visible9:false,visible7:false}, function () {console.log(this.state.visible4,this.state.visible9, this.state.visible7)});
        console.log(this.state.visible4,this.state.visible9, this.state.visible7)
    }
    onSwipeLeft(gestureState) {
        this.setState({visible4:false,visible9:false,visible7:false}, function () {console.log(this.state.visible4,this.state.visible9, this.state.visible7)});
        console.log(this.state.visible4,this.state.visible9, this.state.visible7)
    }
    onSwipeRight(gestureState) {
        this.setState({visible4:false,visible9:false,visible7:false}, function () {console.log(this.state.visible4,this.state.visible9, this.state.visible7)});
        console.log(this.state.visible4,this.state.visible9, this.state.visible7)
    }
    onSwipe(gestureName, gestureState) {
        
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        this.setState({gestureName: gestureName});
        
        switch (gestureName) {

        case SWIPE_UP:
            this.setState({visible4:false,visible9:false,visible7:false}, function () {console.log(this.state.visible4,this.state.visible9, this.state.visible7)});
            console.log(this.state.visible4,this.state.visible9, this.state.visible7)
            break;
          
        case SWIPE_DOWN:    
            this.setState({visible4:false,visible9:false,visible7:false}, function () {console.log(this.state.visible4,this.state.visible9, this.state.visible7)});
            console.log(this.state.visible4,this.state.visible9, this.state.visible7)
            break;
        
        case SWIPE_LEFT:
            this.setState({visible4:false,visible9:false,visible7:false}, function () {console.log(this.state.visible4,this.state.visible9, this.state.visible7)});
            console.log(this.state.visible4,this.state.visible9, this.state.visible7)
            break;
          
        case SWIPE_RIGHT:
            this.setState({visible4:false,visible9:false,visible7:false}, function () {console.log(this.state.visible4,this.state.visible9, this.state.visible7)});
            console.log(this.state.visible4,this.state.visible9, this.state.visible7)
            break;
        }
    }    
    onSwipeRight2(gestureState) {
        this.props.navigation.goBack()
    }
    onSwipe2(gestureName, gestureState) {
        const {SWIPE_RIGHT} = swipeDirections;
        this.setState({gestureName: gestureName});
        switch (gestureName) {
        case SWIPE_RIGHT:
            console.log('back')
            break;
        }
    }   

    // handle image
    async delete_image() {
        await this.setState({
            visible:false, 
            image_data:'none', 
            an_image:false, 
            filePath:{}, 
            destination:'none'
        })
        body = new FormData();
    }
    chooseFile = async () => {
        // clear previous images
        await this.setState({
            visible:false, 
            an_image:false, 
            image_data:'none', 
            filePath:{}, 
            destination:'none'
        })
        
        // pick an image 
        body = new FormData();
        var options = {
            title:'Select Image',
            storageOptions:{mediaType:'photo',skipBackup:true,path:'images'},
            maxWidth: 400,
            maxHeight: 400,
        };
        await ImagePicker.showImagePicker(options, response => {
            if(response.didCancel) {
                console.log('User cancelled image picker');
            } 
            else if(response.error) {
                console.log('ImagePicker Error: ', response.error);
            } 
            else {
                body.append('file',{
                            uri: response.uri, 
                            name: response.fileName, 
                            type: response.type
                        });
                body.append('Content-Type', 'image/png');
                this.setState({ 
                    image_data:JSON.stringify(response.data), 
                    filePath:response, 
                    visible:true, 
                    an_image:true 
                });  
            }
        })
    }
    isImage(index) {
        if( this.state.messages[index][4] !== 'none') {
            return true
        }
        else {
            return false
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
            return 0.2
        }
        else if( this.state.messages[index][0] == this.state.username || this.state.messages[index][1] == this.state.username ) {
            return 0.2
        }
        else {
            return 0
        }       
    }
    what_margin_right(index) {
        if(this.state.messages[index][2] == '#000000' || this.state.messages[index][2] == '#9b9b9b') {
            return 0.2
        }        
        else if( this.state.messages[index][0] == this.state.username || this.state.messages[index][1] == this.state.username ) {
            return 0
        }
        else {
            return 0.2
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
        date = date.format('MMM DD, YYYY').toString()
        return date
    }
    left_date2(index) {
        date = moment(this.state.messages[index][6]*1000).tz(timezone)
        date = date.format('hh:mm A').toString()
        return date
    }
    right_date(index) {
        date = moment(this.state.messages[index][6]*1000).tz(timezone)
        date = date.format('MMM DD, YYYY').toString()
        return date
    }
    right_date2(index) {
        date = moment(this.state.messages[index][6]*1000).tz(timezone)
        date = date.format('hh:mm A').toString()
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
        if(index < this.state.messages.length-1) {    
            if(this.state.messages[index][0] == "Anonymous") {
                if(typeof(this.state.messages[index+1][1]) !== 'undefined') {
                    if(this.state.messages[index][1] == this.state.messages[index+1][1]) {
                        return false
                    }
                }
            } 
            else {
                if(typeof(this.state.messages[index+1][1]) !== 'undefined') {
                    if(this.state.messages[index][0] == this.state.messages[index+1][0]) {
                        return false
                    }
                }
            }
        }

        if( this.state.messages[index][2] == '#000000' ) {
            return true
        }
        else if(this.state.messages[index][2] == '#9b9b9b' || this.state.messages[index][2] == '#9b9b9c') {
            return false
        }
        else if(this.state.messages[index][0] == this.state.username || this.state.messages[index][1] == this.state.username) {
            return false
        }
        else {
            return true
        }
    }
    change_send_color(){
        // if admin 
        if( this.state.admin1 == this.state.username || this.state.admin2 == this.state.username || this.state.admin3 == this.state.username || 
            this.state.admin4 == this.state.username || this.state.admin5 == this.state.username || this.state.admin6 == this.state.username ) {
            // if normal text
            if(this.state.sender_text_color !== '#000000') {
                org_col = this.state.sender_text_color
                this.setState({
                    sender_text_color2:org_col,
                    sender_text_color:'#000000', 
                    banner_color:'#000000'
                })
            }
            // if black text
            else {
                org_col = this.state.sender_text_color2
                org_banner = this.state.original_banner 
                this.setState({ 
                    sender_text_color:org_col,
                    sender_text_color2:'#000000',
                    banner_color:org_banner
                })
            }
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
    walk_stay() {
        if(this.state.chat_data[9] == 'world') {
            return null
        } 
        if(this.state.chat_data[8] == 'walk') {
            return '| Walk away'
        }
        else {
            return '| Be here'
        }
    }
    async returned(admin1,admin2,admin3, color){
        this.setState({admin1:admin1, admin2:admin2, admin3:admin3, },function(){console.log(this.state.admin1,this.state.admin2,this.state.admin3, )})
        if(typeof(color) !== 'undefined') {
            // if not black then change
            if(this.state.banner_color == '#000000') {
                this.setState({ original_banner:color},function(){console.log(this.state.color)})
            }
            else {
                this.setState({banner_color:color, original_banner:color},function(){console.log(this.state.color)})
            }
            
        }
    }
    show_img(index) {
        if(this.state.messages[index][4] !== 'none') {
            if(this.state.messages[index][4].length > 200 ) {
                x = 'data:image/png;base64,'+this.state.messages[index][4]
                return x
            }    
            else {
                x = `http://${serverLocation}/${this.state.messages[index][4]}`
                return x
            }
        }
        else {
            return 'none'
        }
    }
    show_big_img(clicked_image) {
        if(this.state.visible4 == true) {
            if(clicked_image.length > 200 ) {
                x = 'data:image/png;base64,'+clicked_image
                return x
            }    
            else {
                x = `http://${serverLocation}/${clicked_image}`
                return x
            }        
        }
        else {
            return 'none'
        }
    }
    async goprofile2(index) {
        await this.setState({ key_:index },function(){console.log(this.state.key_)})
        
        // set sender names
        sender0 = this.state.messages[this.state.key_][0]
        sender1 = this.state.messages[this.state.key_][1]
        
        // 
        if( this.state.is_admin == true && 
            this.state.username !== sender0 && 
            this.state.username !== sender1 &&
            this.state.admin1 !== sender0 &&
            this.state.admin2 !== sender0 && 
            this.state.admin3 !== sender0 && 
            this.state.admin4 !== sender1 &&
            this.state.admin5 !== sender1 && 
            this.state.admin6 !== sender1) {
            await this.setState({ key_:index, visible7:true })
        }
    } 
    async make_admin() {
        if(this.state.messages[this.state.key_][0] == 'Anonymous') {
            if( this.state.admin1 == null || this.state.admin1 == '') {
                url = `http://${serverLocation}:80/make_admin_room?name=${this.state.messages[this.state.key_][1]}&chatID=${this.state.roomID}&route=1&is_anon=true`
                await fetch(url)
                await this.setState({
                    visible7:false, 
                    admin1:this.state.messages[this.state.key_][0]
                })
                await this.socket_rooms.emit('room_sending', {
                    member1:'Anonymous',
                    member2:this.state.messages[this.state.key_][0],
                    sender_text_color:'black',
                    message:'Anonymous was made admin',
                    media:'none',
                    roomID:this.state.roomID,
                })
            }        
            else if( this.state.admin2 == null || this.state.admin2 == '') {
                url = `http://${serverLocation}:80/make_admin_room?name=${this.state.messages[this.state.key_][1]}&chatID=${this.state.roomID}&route=2&is_anon=true`
                await fetch(url)
                await this.setState({
                    visible7:false, 
                    admin2:this.state.messages[this.state.key_][0]
                })
                await this.socket_rooms.emit('room_sending', {
                    member1:'Anonymous',
                    member2:this.state.messages[this.state.key_][0],
                    sender_text_color:'black',
                    message:'Anonymous was made admin',
                    media:'none',
                    roomID:this.state.roomID,
                })
            }
            else if( this.state.admin3 == null || this.state.admin3 == '') {
                url = `http://${serverLocation}:80/make_admin_room?name=${this.state.messages[this.state.key_][1]}&chatID=${this.state.roomID}&route=3&is_anon=true`
                await fetch(url)
                await this.setState({ 
                    visible7:false, 
                    admin3:this.state.messages[this.state.key_][0]
                })
                await this.socket_rooms.emit('room_sending', {
                    member1:'Anonymous',
                    member2:this.state.messages[this.state.key_][0],
                    sender_text_color:'black',
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
                url = `http://${serverLocation}:80/make_admin_room?name=${this.state.messages[this.state.key_][0]}&chatID=${this.state.roomID}&route=1&is_anon=false`
                await fetch(url)
                await this.setState({
                    visible7:false, 
                    admin1:this.state.messages[this.state.key_][0]
                })
                await this.socket_rooms.emit('room_sending', {
                    member1:this.state.username,
                    member2:this.state.username,
                    sender_text_color:'black',
                    message:this.state.messages[this.state.key_][0]+' was made admin',
                    media:'none',
                    roomID:this.state.roomID,
                })
            }        
            else if( this.state.admin2 == null || this.state.admin2 == '') {
                url = `http://${serverLocation}:80/make_admin_room?name=${this.state.messages[this.state.key_][0]}&chatID=${this.state.roomID}&route=2&is_anon=false`
                await fetch(url)
                await this.setState({
                    visible7:false, 
                    admin2:this.state.messages[this.state.key_][0]
                })
                await this.socket_rooms.emit('room_sending', {
                    member1:this.state.username,
                    member2:this.state.username,
                    sender_text_color:'black',
                    message:this.state.messages[this.state.key_][0]+' was made admin',
                    media:'none',
                    roomID:this.state.roomID,
                })
            }
            else if( this.state.admin3 == null || this.state.admin3 == '') {
                url = 'http://18.191.215.230:80/make_admin_room?name='+this.state.messages[this.state.key_][0]+'&chatID='+this.state.roomID+'&route=3&is_anon=false'
                await fetch(url)
                await this.setState({
                    visible7:false, 
                    admin3:this.state.messages[this.state.key_][0]
                })
                await this.socket_rooms.emit('room_sending', {
                    member1:this.state.username,
                    member2:this.state.username,
                    sender_text_color:'black',
                    message:this.state.messages[this.state.key_][0]+' was made admin',
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
    async remove_user() {
        if(     (this.state.admin1 == this.state.messages[this.state.key_][0] && this.state.admin1 !== 'Anonymous' ) || 
                (this.state.admin2 == this.state.messages[this.state.key_][0] && this.state.admin2 !== 'Anonymous' ) || 
                (this.state.admin3 == this.state.messages[this.state.key_][0] && this.state.admin3 !== 'Anonymous' ) || 
                this.state.admin4 == this.state.messages[this.state.key_][1] || 
                this.state.admin5 == this.state.messages[this.state.key_][1] || 
                this.state.admin6 == this.state.messages[this.state.key_][1] ) {
            return Alert.alert("Can't remove admin")
        }                        
        else {
            member = this.state.messages[this.state.key_][0]
            if(this.state.messages[this.state.key_][0] == 'Anonymous') {
                member = this.state.messages[this.state.key_][1]
            }

            // remove DB
            await this.socket_rooms.emit('delete_member_from_room', { 'username':member,'room':this.state.roomID })  
            await this.setState({visible7:false})
        }
    }

    render() {
        const config = {velocityThreshold:0.2, directionalOffsetThreshold:80};
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
                                        source={{ uri:this.show_big_img(this.state.clicked_image) }}
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
                    visible={this.state.visible9}
                    onTouchOutside={() => {this.setState({visible9:false})}}
                    >
                    <DialogContent>
                        <GestureRecognizer
                            onSwipe={(direction, state) => this.onSwipe(direction, state)}

                            onSwipeUp={ (state) => this.onSwipeUp(state) }
                            onSwipeDown={ (state) => this.onSwipeDown(state) }
                            onSwipeLeft={ (state) => this.onSwipeLeft(state) }
                            onSwipeRight={ (state) => this.onSwipeRight(state) }
                            
                            config={config}
                            style={{flex:1, }}
                        >
                            <View style={{height:Dimensions.get('window').height, width:Dimensions.get('window').width, justifyContent:'center', alignContent:'center'}}>
                                
                                <View style={{height:Dimensions.get('window').height*0.035, backgroundColor:this.state.banner_color, justifyContent:'center', alignContent:'center', alignItems:'center', alignSelf:'stretch'}}></View>         
                                <View style={{height:Dimensions.get('window').height*0.055, flexDirection:'row', backgroundColor:this.state.banner_color, justifyContent:'center', alignContent:'center', alignItems:'center', alignSelf:'stretch'}}>
                    <View style={{flex:1, }}>
                        <TouchableOpacity onPress={() => {this.setState({visible9:!this.state.visible9})}}>
                            <Icon 
                                name="chevron-left"
                                color="white"
                                type='entypo'
                                size={25*factor_hor}
                            />
                        </TouchableOpacity>                
                    </View>
                    <TouchableOpacity onPress={() => { Keyboard.dismiss(), this.setState({visible9:!this.state.visible9})}} style={{flex:4, justifyContent:'center', alignContent:'center'}}>
                        <View style={{flex:4, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                            <Text style={{color:'white', fontSize:24*factor_hor, fontWeight:'500', fontFamily:'avenir next', }}>{this.state.message_name}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{flex:1,}}>
                        <TouchableOpacity onPress={()=>{
                                                        this.setState({visible9:!this.state.visible9}),
                                                        this.props.navigation.push('ROOM_MESSAGE_SETTINGS', {roomID:this.state.roomID, returned:this.returned.bind(this),})
                                                    }}>
                            <Icon 
                                name="settings"
                                color="white"
                                type='MaterialIcons'
                                size={25*factor_hor}
                            />
                        </TouchableOpacity>                
                    </View>
                </View>            
                                
                                { this.state.load_map && (
                                <View style={{height:Dimensions.get('window').height*0.7, alignSelf:'stretch'}}>                     
                                        
                                        <MapView
                                            {...this.state}
                                            style={{flex:1}}
                                            showsUserLocation={true}
                                            showsUserLocation={true}
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
                                                center={{   latitude:this.state.map_lat, 
                                                            longitude:this.state.map_long
                                                        }}
                                                radius={distance[this.state.map_radius] }
                                                strokeColor={ 'rgba(252, 48, 4, 0)' }
                                                strokeWidth={1}
                                                fillColor={ `rgba(252, 48, 4, 0.1)` }
                                            />
                                            <Marker coordinate={{latitude:this.state.map_lat, 
                                                                longitude:this.state.map_long
                                                    }}/>
                                        </MapView>  
                                        
                                    </View>
                                )}
                                { this.state.load_map && (
                                <View style={{height:Dimensions.get('window').height*0.05, paddingLeft:10*factor_hor, paddingRight:10*factor_hor, flexDirection:'row', borderBottomColor:'#ececec', borderTopColor:'#ececec', borderBottomWidth:0.5, borderTopWidth:0.5,}}>
                                    <View style={{ justifyContent:'center'}}>
                                        <Text style={{textAlign:'left', fontSize:18*factor_hor, color:'#9b9b9b'}}>{ this.state.chat_data[9].slice(0,1).toUpperCase()}{this.state.chat_data[9].slice(1)} {this.walk_stay()}</Text>
                                    </View>
                                    <View style={{flex:1,}}></View>
                                    <View style={{ justifyContent:'center'}}>
                                        <Text style={{textAlign:'right',fontSize:18*factor_hor, color:'#FF7D61' }}>{this.state.chat_data[22]} members</Text>
                                    </View>
                                </View>                    
                                )}
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
                                        style={{ paddingRight:1, justifyContent:'center', alignContent:'center', paddingLeft:1, }}
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
            
                <View style={{
                    height:Dimensions.get('window').height*0.035, 
                    justifyContent:'center', 
                    alignContent:'center', 
                    alignItems:'center', 
                    alignSelf:'stretch',
                    opacity:0.8,
                }}></View>         
                <View style={{
                    height:Dimensions.get('window').height*0.055, 
                    flexDirection:'row', 
                    opacity:0.8,
                    backgroundColor:'#f7f7f7', 
                    justifyContent:'center', 
                    alignContent:'center', 
                    alignItems:'center',
                    alignSelf:'stretch',
                    borderBottomColor:'#9b9b9b',
                    borderBottomWidth:0.25, 
                }}>
                    <View style={{flex:1, }}>
                        <TouchableOpacity onPress={()=>{this.leave()}}>
                            <Icon 
                                name="chevron-left"
                                color="black"
                                type='entypo'
                                size={25*factor_hor}
                            />
                        </TouchableOpacity>                
                    </View>
                    <TouchableOpacity onPress={() => {Keyboard.dismiss(),this.setState({visible9:!this.state.visible9})}} style={{flex:4, justifyContent:'center', alignContent:'center'}}>
                        <View style={{flex:4, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                            <Text style={{color:'black', fontSize:24*factor_hor, fontWeight:'500', fontFamily:'avenir next', }}>{this.state.message_name}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{flex:1,}}>
                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.push('ROOM_MESSAGE_SETTINGS', {
                                roomID:this.state.roomID, 
                                returned:this.returned.bind(this),})
                        }}>
                            <Icon 
                                name="settings"
                                color="black"
                                type='MaterialIcons'
                                size={25*factor_hor}
                            />
                        </TouchableOpacity>                
                    </View>
                </View>            

                {/* messages and textinput */}
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.container}>

                {/* messages */}
                <View style={{flex:1, marginBottom:5, minHeight:'60%', alignSelf:'stretch', marginLeft:this.state.padding*factor_hor, marginRight:this.state.padding*factor_hor, }}>
                    <FlatList 
                        data={this.state.messages}
                        extraData={this.state}
                        ref = "flatList"
                        keyboardDismissMode='on-drag'
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={1}
                        onEndReached={ () => {this.reached_end()}}
                        ListFooterComponent={() => this.state.loading_post? null :this.which_footer()}
                        inverted={true}
                        initialNumToRender={40} 
                        maxToRenderPerBatch={40} 
                        style={{backgroundColor:'white', flex:1, }}
                        keyExtractor={(item,index) => (index).toString()}
                        renderItem={({item, index}) => ( 
                            <View key={index} style={{ minHeight:10, marginBottom:7.5*factor_ver, alignSelf:'stretch', flexDirection:'row', backgroundColor:'white', }}>
                    
                            {/* date right side*/}
                            <View style={{flex:this.what_margin_left(index), marginRight:5, alignItems:'center', justifyContent:'center', alignContent:'center', }}>
                            { this.show_date_left(index) && (
                                <View>
                                    <Text style={{textAlign:'center', color:'#9b9b9b', fontFamily:'avenir next', justifyContent:'center', alignContent:'center', alignItems:'center'}}>{this.left_date(index)}</Text>
                                    <Text style={{textAlign:'center', color:'#9b9b9b', fontFamily:'avenir next', justifyContent:'center', alignContent:'center', alignItems:'center'}}>{this.left_date2(index)}</Text>
                                </View>
                            )}
                            </View>
                            
                            <View style={{flex:0.8, marginBottom:2, paddingLeft:0*factor_hor, }}>
                            {this.show_name(index) && (
                                <Text 
                                    onPress={()=>{this.change_padding()}} 
                                    style={{textAlign:this.which_side(index), 
                                        fontFamily:'avenir next', fontSize:(8+6*factor_hor), color:'#9b9b9b'}}
                                    delayLongPress={350} 
                                    onLongPress={() => { this.setState({key_:index}), this.goprofile2(index) }}>[{this.state.messages[index][0]}]</Text>
                                )}

                            {/* text */}
                            <View style={{
                               flex:0.8, 
                               paddingLeft:5*factor_hor, 
                               borderLeftWidth:2.5,
                               borderLeftColor:this.border_color_left(index),
                               paddingRight:5*factor_hor, 
                               borderRightWidth:3,
                               borderRightColor:this.border_color_right(index), 
                               backgroundColor:'#f7f7f7',
                               paddingTop:3*factor_hor,
                               paddingLeft:3*factor_hor,
                               paddingRight:10*factor_hor, 
                               paddingBottom:3*factor_ver,
                            }}>
                                <Text 
                                    delayLongPress={350} 
                                    onLongPress={() => { this.setState({key_:index}), this.goprofile2(index) }}
                                    onPress={()=>{this.change_padding()}} 
                                    style={{
                                        textAlign:'left',
                                        marginLeft:5, 
                                        marginRight:5, 
                                        fontFamily:'avenir next', 
                                        fontSize:18.5, 
                                        fontWeight:'400', 
                                        color:this.state.messages[index][2],
                                }}>{this.state.messages[index][3]}</Text>
                                {this.isImage(index) && ( 
                                <View style={{alignContent:'center', justifyContent:'center', alignItems:'center',}}>
                                    <TouchableOpacity 
                                        style={{flex:1, width:(Dimensions.get('window').width*this.state.showing_date - 30*factor_hor) , height:(Dimensions.get('window').width*0.7 - 30)}}
                                        onPress={() => {this.setState({clicked_image:this.state.messages[index][4]}), this.setState({visible4:true},function(){console.log(this.state.visible4, )})}}>
                                        <FastImage
                                            resizeMode={FastImage.resizeMode.contain}
                                            source={{ uri: this.show_img(index) }}
                                            style={{ width:(Dimensions.get('window').width*this.state.showing_date - 30*factor_hor), height:(Dimensions.get('window').width*0.7 - 30),  }}
                                        />
                                    </TouchableOpacity>
                                </View>
                                )}                            
                            </View>
                            </View>
                            {/* left side */}
                            <View style={{flex:this.what_margin_right(index), marginLeft:5, justifyContent:'center', alignItems:'center', alignContent:'center',}}>
                                { this.show_date_right(index) && (
                                    <View>
                                        <Text style={{textAlign:'center', color:'#9b9b9b',}}>{this.right_date(index)}</Text>
                                        <Text style={{textAlign:'center', color:'#9b9b9b',}}>{this.right_date2(index)}</Text>
                                    </View>
                                )}
                            </View>     
                        </View>
                        )}/>
                </View>

                {/* textinput */}
                <View style={{height:this.state.textheight, zIndex:1, maxHeight:Dimensions.get('window').height*0.2, minHeight:30, flexDirection:'row', alignContent:'center', justifyContent:'center'}}>
                    <View style={{flex:1, }}>
                        {/* icon left*/}
                        <TouchableOpacity style={{flex:1,position:'absolute', bottom:-4*factor_ver, right:10*factor_hor,}} onPress={this.chooseFile.bind(this)}>
                            <Icon 
                                size={32.5*factor_hor}
                                name="md-images"
                                color={this.state.banner_color}
                                type='ionicon'
                            />
                        </TouchableOpacity>
                    </View>     

                    {this.state.visible && ( 
                        <View style={{flex:1.2, flexDirection:'row', }}>
                            
                            <View style={{ height:20, position:'absolute', left:40*factor_hor,justifyContent:'center',}}>
                                <TouchableHighlight underlayColor={'transparent'} onPress={() => {this.delete_image()}}>
                                    <Icon 
                                        size={20*factor_hor}
                                        name="cross"
                                        color="#9B9B9B"
                                        type='entypo'
                                    />
                                </TouchableHighlight>                            
                            </View>
                            
                            <View style={{ height:30*factor_hor, position:'absolute', left:5, bottom:0, width:30*factor_hor, alignContent:'center', justifyContent:'center', alignItems:'center',}}>
                                <TouchableOpacity onPress={() => { Keyboard.dismiss(), this.setState({clicked_image:this.state.filePath.data}), this.setState({visible4:true},function(){console.log(this.state.visible4, )})}}>
                                    <FastImage
                                        resizeMode={FastImage.resizeMode.contain}
                                        source={{ uri: this.state.filePath.uri }}
                                        style={{  width:30*factor_hor , height:30*factor_hor,}}
                                    />
                                </TouchableOpacity>
                            </View>                
                        </View>               
                    )}

                    <View style={{flex:this.is_image_selected('flex'),  justifyContent:'center', alignContent:'center',}}>
                        <TextInput  
                            style={{
                                textAlign:'left', 
                                borderColor:'#ececec',  
                                height:this.state.textheight, 
                                maxHeight:Dimensions.get('window').height*0.2, 
                                minHeight:35,  
                                borderWidth:0.5, 
                                borderRadius:10*factor_hor, 
                                fontSize:18, 
                                backgroundColor:'#f7f7f7',
                                fontFamily:'avenir next', 
                                justifyContent:'center', 
                                alignContent:'center', 
                                paddingLeft:10*factor_hor,
                                paddingRight:10*factor_hor, 
                                paddingBottom:1,
                                position:'absolute', 
                                bottom:1, 
                                width:this.is_image_selected('width'), 
                            }}
                            color='black'
                            keyboardDismissMode='interactive'
                            onTouchStart={() => {this.open_keyboard()}}
                            ref={input => {this.textInput = input}}
                            multiline={true}
                            autoCompleteType={"off"}
                            textAlignVertical={'top'}
                            placeholder='Type...'                                                              
                            placeholderTextColor='black'
                            onContentSizeChange={(e)=>{this.updateSize(e.nativeEvent.contentSize.height)}}
                            onChangeText={(typedText)=>{this.setState({message:typedText})}}
                            onEndEditing={()=>{this.close_keyboard()}}
                        />  
                    </View>
                    <View style={{flex:1, position:'absolute', bottom:-4*factor_ver, right:7.5*factor_hor, }}>
                        <TouchableOpacity style={{flex:1, }} onLongPress={()=>{this.change_send_color()}} delayLongPress={350} onPress={()=>{this.send_message()}}>
                            <Icon 
                                size={32.5*factor_hor}
                                name='ios-arrow-dropup-circle'
                                color={this.state.banner_color}
                                type='ionicon'
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            
                <View style={{height:this.state.buffer-4*factor_ver, }}></View>
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




