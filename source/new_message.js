import React, {Component} from 'react';
import {StyleSheet, ScrollView, Dimensions, Keyboard,
        TextInput, Text, View, TouchableOpacity,
        Platform, KeyboardAvoidingView, FlatList, 
        TouchableHighlight,} from 'react-native';
import { Icon } from 'react-native-elements';
import { AsyncStorage } from 'react-native';
import Dialog, { DialogContent, DialogButton, } from 'react-native-popup-dialog';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import moment from  'moment-timezone';
import FastImage from 'react-native-fast-image'
import ImagePicker from 'react-native-image-picker';

var body = new FormData();

export default class new_message extends React.Component {
    static navigationOptions = {header: null}
    constructor(props) {
        super(props);
        this.socket = global.socket
        this.state = {

            username:'',
            is_anon:false, 
            image_data:'none',
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
            messages:[],

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
            
            selected_users:[], // users to send to
            selected_users2:[],
            act_load_color:"white", // activity indicator load color
            roomID:'', // chatID
            banner_color:'#f9a32c',
            go_to:'',
            original_banner:'#f9a32c',

            new_mesasge:true, // if banner is going to be To: or name or group 
            messages_connected:'', // async storage whether connected on messages namespace
        }
    }

    async componentDidMount() { 
        ios = 10
        if(Platform.OS === 'ios') {
            if ( Dimensions.get('window').height > 811) {
                ios = 40              
        }}

        // set buffer, username, messages_connected, selected_users
        username = await AsyncStorage.getItem('user')
        selected_users = await this.props.navigation.getParam("to_list")
        selected_users2 = []
        sender_text_color = await AsyncStorage.getItem('text_color')
        data = await this.props.navigation.getParam('data')
        is_anon = false
        go_to = 'PRIVATE_MESSAGE'

        if(typeof(data) !== 'undefined') {
            go_to = 'goBack'
        }

        // handle convo from feed
        if( typeof(data) !== 'undefined' ) {
            // if anonymous
            if(  data.name1 == 'Anonymous') {
                is_anon = true
                selected_users = [ 'Anonymous', 'Anonymous' ]
                selected_users2 = [username, data.name2]
            }
            // if named
            else {
                selected_users = [ username, data.name1 ]
            }
        }
        if(is_anon == true) {
            message_name = 'Anonymous'
        }

        else if(selected_users.length == 2 ) {
            message_name = selected_users[1]
        }
        else {
            message_name = 'Group'
        }

        await this.setState({
            buffer:ios,
            username: username,
            selected_users: selected_users,
            selected_users2: selected_users2,
            sender_text_color: sender_text_color,
            is_anon: is_anon,
            go_to:go_to,
            message_name: message_name,
        })
    }
    
    num_users() {
        if(this.state.selected_users.length > 2 ){
            return 1
        }
        else {
            return 0
        }
    }
    go() {
        if(this.state.go_to == 'goBack') {
            this.props.navigation.goBack()
        }
        else {
            this.props.navigation.push('PRIVATE_MESSAGE')
        }
    }

    // send message
    async send_message() {  
        if(this.state.sending_message == false) {   
            await this.setState({sending_message:true})   
            data = await this.props.navigation.getParam('data')
            
            // send message already sent one before
            if(this.state.message.length > 0 && this.state.messages.length > 0 || this.state.an_image == true && this.state.messages.length !== 0) {  
                
                // if anonymous
                send_as_anon = this.state.username       
                if(this.state.is_anon == true) {
                    send_as_anon = 'Anonymous'
                }

                // emit message and server creates mysql entry w/o image
                await this.socket.emit('sending', { 
                    'sender':send_as_anon, 
                    'sender2':this.state.username,
                    'sender_text_color':this.state.sender_text_color, 
                    'message':this.state.message, 
                    'media':this.state.image_data, 
                    'chatID':this.state.roomID, 
                    'roomID':this.state.roomID, 
                })

                // change cancel to back & change banner
                await this.setState({ 
                    new_mesasge:false, 
                    image_data:'none',
                    destination:'none', 
                    an_image:false,
                    last_textheight:30,
                    message:'',
                    sending_message:false,
                })
    
                await this.scroll_to_bottom();
                await this.delete_image();
                await this.textInput.clear(); 
            }               

            // send first message
            else if( (this.state.message.length > 0 && this.state.messages.length == 0) || (this.state.an_image == true && this.state.messages.length == 0) ) {
                // create room in Chats and get roomID/chatID back
                message_dict = JSON.parse( await AsyncStorage.getItem('messages') ) 
                messages_info = JSON.parse(await AsyncStorage.getItem('messages_info'))
                send_invite = false
                user = this.state.username
                anon = false
                type = 0
                chat_name = this.state.selected_users[1]
                second_member = this.state.selected_users[1] // real name admin2
                send_members = this.state.selected_users
                from_type = ''
                postID = ''

                // set group name 
                if(this.state.selected_users.length > 2) {
                    type = 1
                    chat_name = 'Group'
                    second_member = 'Group'
                }
                else if( typeof(data) !== 'undefined' ) {
                    console.log('set name')
                    // if anonymous
                    if(data.name1 == 'Anonymous') {
                        user == 'Anonymous'
                        anon = true
                        chat_name = data.name1
                        second_member = 'Anonymous'
                        send_members = this.state.selected_users2
                        postID = data.postID
                        from_type = data.from_type
                    } 
                    else {
                        chat_name = data.name1
                    }
                }
                url = `http://${serverLocation}:80/make_chat?username=${user}&is_anon=${anon}&second_member=${second_member}&chat_type=${type}&chat_name=${chat_name}&num_members=${this.state.selected_users.length}&from_type=${from_type}&postID=${postID}`
                await fetch(url)
                .then((response) => response.json())
                .then((responseJson2) => {
                    this.setState({roomID:responseJson2},function(){console.log(this.state.roomID)})
                    
                    // if no previous convo w person
                    if(typeof(global.messages_info[this.state.roomID]) == 'undefined') {
                        // set convo
                        send_invite = true
                        global.messages_info[responseJson2] = [responseJson2, '#f9a32c', 'block', 'false', "no", null, this.num_users(), 'joined', 0 ]
                        global.message_dict[responseJson2] = []
                        AsyncStorage.setItem('messages_info', JSON.stringify(global.messages_info))
                        AsyncStorage.setItem('messages', JSON.stringify(global.message_dict) )
                        this.setState({roomID:responseJson2,banner_color:'#f9a32c'},function(){console.log(this.state.roomID)})
                        
                        console.log(global.messages_info, 'MESSAGES INFO')

                        // listen to messages
                        this.socket.on('message_', (data) => {
                            data.data[4] = data.data[4].replace(/["]/g, '')
                            if(data.data[5] == this.state.roomID && data.data[2] !== '#9b9b9c') {
                                this.state.messages.unshift(data.data)
                                this.setState({messages:this.state.messages})
                
                                if(data.data[2] == '#9b9b9b') {
                                    if( data.data[3].includes('changed the chat name') ) {
                                        msg = data.data[3].split(':')[1].replace(/\s/g,' ');
                                        console.log(msg)
                                        this.setState({ message_name:msg })
                                    }
                                    else if( data.data[3] == ( this.state.username+' was made admin' ) ) {             
                                        if_admin = this.state.username+' was made admin'       
                                        if(this.state.admin2 == null) {
                                            this.state.admin2 = this.state.username
                                        }
                                        else if(this.state.admin3 == null) {
                                            this.state.admin3 = this.state.username
                                        }
                                        this.setState({is_admin:true, admin2:this.state.admin2, admin3:this.state.admin3})
                                    }
                                }                                
                            }                               
                        });         

                        // join room
                        this.socket.emit('join_chat', {
                            'username':this.state.username, 
                            'sender_text_color':this.state.sender_text_color, 
                            'room':this.state.roomID, 
                            'anon':this.state.is_anon
                        }) 
                            
                        // invite members
                        if(send_invite == true) {
                            this.socket.emit( 'invite', {
                                'username':this.state.username,
                                'room':this.state.roomID,
                                'selected_users':send_members,
                                'is_anon':this.state.is_anon
                            })
                        }                                                                           
                    }
                    // if left previous convo
                    else {
                        // left convo
                        if(global.messages_info[this.state.roomID][7] == 'left') {
                            // listen to messages
                            this.socket.on('message_', (data) => {
                                data.data[4] = data.data[4].replace(/["]/g, '')
                                if(data.data[5] == this.state.roomID && data.data[2] !== '#9b9b9c') {
                                    this.state.messages.unshift(data.data)
                                    this.setState({messages:this.state.messages})
                                    if(data.data[2] == '#9b9b9b') {
                                        if( data.data[3].includes('changed the chat name') ) {
                                            msg = data.data[3].split(':')[1].replace(/\s/g,' ');
                                            console.log(msg)
                                            this.setState({ message_name:msg })
                                        }
                                        else if( data.data[3] == ( this.state.username+' was made admin' ) ) {             
                                            if_admin = this.state.username+' was made admin'       
                                            if(this.state.admin2 == null) {
                                                this.state.admin2 = this.state.username
                                            }
                                            else if(this.state.admin3 == null) {
                                                this.state.admin3 = this.state.username
                                            }
                                            this.setState({is_admin:true, admin2:this.state.admin2, admin3:this.state.admin3})
                                        }
                                    }                                  
                                }
                            });          
                            // join room
                            this.socket.emit('rejoin', {
                                username:this.state.username,
                                room:this.state.roomID,
                                anon:this.state.is_anon
                            })

                            // set message_info
                            global.messages_info[this.state.roomID][3] = false
                            global.messages_info[this.state.roomID][4] = 'no'
                            global.messages_info[this.state.roomID][5] = 0
                            global.messages_info[this.state.roomID][6] = type
                            global.messages_info[this.state.roomID][7] = 'joined'
                            global.messages_info[this.state.roomID][8] = 0
                            AsyncStorage.setItem('messages_info', JSON.stringify(global.messages_info) )                                  
                        }
                        // joined convo
                        else if(global.messages_info[this.state.roomID][7] == 'joined') {
                            // listen to messages
                            this.socket.on('message_', (data) => {
                                data.data[4] = data.data[4].replace(/["]/g, '')
                                if(data.data[5] == this.state.roomID && data.data[2] !== '#9b9b9c') {
                                    this.state.messages.unshift(data.data)
                                    this.setState({messages:this.state.messages})
                                    if(data.data[2] == '#9b9b9b') {
                                        if( data.data[3].includes('changed the chat name') ) {
                                            msg = data.data[3].split(':')[1].replace(/\s/g,' ');
                                            console.log(msg)
                                            this.setState({ message_name:msg })
                                        }
                                        else if( data.data[3] == ( this.state.username+' was made admin' ) ) {             
                                            if_admin = this.state.username+' was made admin'       
                                            if(this.state.admin2 == null) {
                                                this.state.admin2 = this.state.username
                                            }
                                            else if(this.state.admin3 == null) {
                                                this.state.admin3 = this.state.username
                                            }
                                            this.setState({is_admin:true, admin2:this.state.admin2, admin3:this.state.admin3})
                                        }
                                    }                                   
                                }                                
                            });       

                            // set message_info
                            global.messages_info[this.state.roomID][3] = false
                            global.messages_info[this.state.roomID][4] = 'no'
                            global.messages_info[this.state.roomID][5] = 0
                            global.messages_info[this.state.roomID][6] = type
                            global.messages_info[this.state.roomID][7] = 'joined'
                            global.messages_info[this.state.roomID][8] = 0
                            AsyncStorage.setItem('messages_info', JSON.stringify(global.messages_info) )                                  
                        }
                        // invited convo
                        else {
                            // set convo
                            send_invite = true 
                            global.messages_info[responseJson2] = [responseJson2, '#f9a32c', 'block', 'false', "no", type, this.num_users(), 'joined', 0 ]
                            global.message_dict[responseJson2] = []
                            AsyncStorage.setItem('messages_info', JSON.stringify(global.messages_info))
                            AsyncStorage.setItem('messages', JSON.stringify(global.message_dict) )
                            this.setState({roomID:responseJson2,banner_color:'#f9a32c'},function(){console.log(this.state.roomID)})
                        
                            // listen to messages
                            this.socket.on('message_', (data) => {
                                data.data[4] = data.data[4].replace(/["]/g, '')
                                if(data.data[5] == this.state.roomID && data.data[2] !== '#9b9b9c') {
                                    this.state.messages.unshift(data.data)
                                    this.setState({messages:this.state.messages})
                                    if(data.data[2] == '#9b9b9b') {
                                        if( data.data[3].includes('changed the chat name') ) {
                                            msg = data.data[3].split(':')[1].replace(/\s/g,' ');
                                            console.log(msg)
                                            this.setState({ message_name:msg })
                                        }
                                        else if( data.data[3] == ( this.state.username+' was made admin' ) ) {             
                                            if_admin = this.state.username+' was made admin'       
                                            if(this.state.admin2 == null) {
                                                this.state.admin2 = this.state.username
                                            }
                                            else if(this.state.admin3 == null) {
                                                this.state.admin3 = this.state.username
                                            }
                                            this.setState({is_admin:true, admin2:this.state.admin2, admin3:this.state.admin3})
                                        }
                                    }                                     
                                }                                
                            });         

                            // join room
                            this.socket.emit('join_chat', {
                                'username':this.state.username, 
                                'sender_text_color':this.state.sender_text_color, 
                                'room':this.state.roomID, 
                                'anon':this.state.is_anon
                            })                               
                        }                              
                    }
                })
                .catch((error) => {
                    alert.alert("Check your connection and try again")
                    console.log(error)
                });                  

                // if anonymous
                send_as_anon = this.state.username       
                if(this.state.is_anon == true) {
                    send_as_anon = 'Anonymous'
                }

                // emit message and server creates mysql entry w/o image
                await this.socket.emit('sending', { 
                    'sender':send_as_anon, 
                    'sender2':this.state.username, 
                    'sender_text_color':this.state.sender_text_color, 
                    'message':this.state.message, 
                    'media':this.state.image_data, 
                    'chatID':this.state.roomID, 
                    'roomID':this.state.roomID, 
                })

                // change cancel to back & change banner
                await this.setState({ 
                    new_mesasge:false,
                    image_data:'none',
                    destination:'none',
                    an_image:false,
                    last_textheight:30,
                    message:'',
                    sending_message:false,
                })    

                await this.scroll_to_bottom();
                await this.delete_image();
                await this.textInput.clear();                 
            }   
        }
    }

    // end of messages 
    async reached_end() {
        // if number shown < length of art
        if(this.state.show < this.state.messages.length ) {
            // show more posts
                this.setState( {show:(this.state.show+40)}, function() {console.log(this.state.show)})
        }
        else if(this.state.show == this.state.messages.length) {
            if(this.state.loading_post == false) {
                this.get_messages()
            }
        }
        else if(this.state.show > this.state.messages.length) {
            if(this.state.act_load_color !== 'white') {
                this.setState({act_load_color:'white'},function(){console.log(this.state.act_load_color)})
            }    
        }
    }  

    // keyboard actions
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

    // handle image
    async delete_image() {
        await this.setState({
            visible:false, 
            an_image:false, 
            filePath:{}, 
            destination:'none',
            image_data:'none'
        })
        body = new FormData();
    }
    chooseFile = async () => {
        await this.setState({
            visible:false, 
            an_image:false, 
            filePath:{}, 
            destination:'none',
            image_data:'none',
        })
        
        body = new FormData();
        
        var options = {
            title:'Select Image',
            storageOptions:{mediaType:'photo',skipBackup:true,path:'images',},
            maxWidth:400, 
            maxHeight:400
        };

        ImagePicker.showImagePicker(options, response => {
            if(response.didCancel) {
            console.log('User cancelled image picker');
            } 
            else if(response.error) {
            console.log('ImagePicker Error: ', response.error);
            } 
            else {
                this.setState({ 
                    filePath:response, 
                    image_data:JSON.stringify(response.data),
                    visible:true, 
                    an_image:true, 
                });
                body.append('file',{uri:response.uri,name:response.fileName,type:response.type});
                body.append('Content-Type', 'image/png');
            }
        });  
    }; 
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
        if(this.state.messages[index][2] == '#000000' || this.state.messages[index][2] == '#9b9b9b' || this.state.messages[index][2] == '#9b9b9c') {
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
        if(this.state.messages[index][2] == '#000000' || this.state.messages[index][2] == '#9b9b9b' || this.state.messages[index][2] == '#9b9b9c') {
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
        if(this.state.messages[index][2] == '#000000' || this.state.messages[index][2] == '#9b9b9b' || this.state.messages[index][2] == '#9b9b9c') {
            return 0.2
        }        
        else if( this.state.messages[index][0] == this.state.username || this.state.messages[index][1] == this.state.username ) {
            return 0
        }
        else {
            return 0.2
        }       
    }

    // border color text
    border_color_left(index) {
        if(this.state.messages[index][2] == '#000000' || this.state.messages[index][2] == '#9b9b9b' || this.state.messages[index][2] == '#9b9b9c')  {
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
        if(this.state.messages[index][2] == '#000000' || this.state.messages[index][2] == '#9b9b9b' || this.state.messages[index][2] == '#9b9b9c') {
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
        date = date.format('h:mm A').toString()
        return date
    }
    right_date(index) {
        // if right date and message is right then show date
        if( this.state.messages[index][1] == this.state.username || this.state.messages[index][0] == this.state.username){
            date = moment(this.state.messages[index][6]*1000).tz(timezone)
            date = date.format('MMM DD, YYYY').toString()
            return date
        } 
        else {
            return null
        }
    }
    right_date2(index) {
        // if right date and message is right then show date
        if( this.state.messages[index][1] == this.state.username || this.state.messages[index][0] == this.state.username){
            date = moment(this.state.messages[index][6]*1000).tz(timezone)
            date = date.format('h:mm A').toString()
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
    change_send_color(){
        // if admin 
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
        if(global.messages_info[this.state.roomID][6] == 0) {
            if( this.state.messages[index][2] == '#000000' ) {
                return true
            }
            else {
                return false
            }
        }
        else if(global.messages_info[this.state.roomID][6] == 1 ) {
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
    what_banner(){
        if(this.state.sender_text_color=='#000000') {
            return this.state.org_col
        }
        else {
            return this.state.banner_color
        }
        
    }
    async returned(admin1,admin2,admin3, color, name){
        this.setState({admin1:admin1, admin2:admin2, admin3:admin3, message_name:name},function(){console.log(this.state.admin1,this.state.admin2,this.state.admin3, this.state.message_name)})
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
    what_weight(index) {
        if(this.state.messages[index][2] !== '#000000') {
            return '300'
        }
        else {
            return '500'
        }
    }    

    show_img(index) {
        if(this.state.messages[index][4] !== 'none') {
            if(this.state.messages[index][4].length > 200 ) {
                x = 'data:image/png;base64,' +  this.state.messages[index][4]
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
                                <View style={{flex:1, justifyContent:'center', alignContent:'center', alignItems:'flex-end', backgroundColor:'black'}}>
                                    <TouchableHighlight underlayColor={'transparent'} onPress={() => {this.setState( {visible4:false} )}} style={{marginEnd:25, paddingBottom:0, marginTop:10, paddingTop:30}} >
                                        <Icon 
                                            size={40*factor_hor}
                                            name="cross"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                                <View style={{flex:9}}>
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

                { this.state.new_mesasge && ( 
                <View style={{height:Dimensions.get('window').height*0.035,justifyContent:'center', alignContent:'center', alignItems:'center', alignSelf:'stretch'}}></View>         
                )}
                { this.state.new_mesasge && ( 
                <View style={{height:Dimensions.get('window').height*0.055, paddingLeft:10, paddingRight:10, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center', alignSelf:'stretch'}}>
                    
                    <TouchableOpacity style={{justifyContent:'center', alignContent:'center', alignItems:'center',}} onPress={()=>{this.go()}}>
                        <Text style={{color:this.state.banner_color, fontSize:16*factor_ver}}>Cancel</Text>
                    </TouchableOpacity>                
                    
                    <View style={{flex:1}}></View>
                    <Text style={{fontSize:24*factor_ver, fontFamily:'avenir next', }}>New Message</Text>
                    <View style={{flex:1}}></View>
                    <TouchableOpacity style={{flex:1,justifyContent:'center', alignContent:'center', alignItems:'center', }}>  
                    </TouchableOpacity>                
                    
                </View>  
                )}
                { this.state.new_mesasge && ( 
                <View style={{height:Dimensions.get('window').height*0.045,  flexDirection:'row', alignSelf:'stretch'}}>
                        <View style={{flex:0.75, }}></View>
                        <View style={{flex:1, marginRight:5, justifyContent:'center', alignContent:'center' }}>
                            <Text style={{ fontSize:20*factor_hor, marginBottom:2, textAlign:'right', fontFamily:'avenir next'}}>To:</Text>
                        </View>
                        <View style={{flex:6, justifyContent:'center', alignContent:'center'}}>
                            <ScrollView ref={ref => this.scrollView = ref}
                                        horizontal={true} 
                                        showsHorizontalScrollIndicator={false}
                                        >
                            
                                {this.state.selected_users.map((item, index) => {
                                    return (
                                        <View style={{marginEnd:10*factor_hor, justifyContent:'center', alignContent:'center'}}>
                                            <Text style={{fontSize:18*factor_hor, fontFamily:'avenir next' }}>[{this.state.selected_users[index]}]</Text>
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    </View>                                         
                )}

                { !this.state.new_mesasge && ( 
                <View style={{height:Dimensions.get('window').height*0.035, opacity:0.8, backgroundColor:'#f7f7f7',  justifyContent:'center', alignContent:'center', alignItems:'center', alignSelf:'stretch'}}></View>         
                )}
                { !this.state.new_mesasge && ( 
                <View style={{
                    height:Dimensions.get('window').height*0.055, 
                    opacity:0.8, 
                    flexDirection:'row', 
                    backgroundColor:'#f7f7f7', 
                    justifyContent:'center', 
                    alignContent:'center', 
                    alignItems:'center',
                    alignSelf:'stretch',
                    borderBottomColor:'#9b9b9b',
                    borderBottomWidth:0.25, 
                }}>
                    <View style={{flex:1, }}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.push('PRIVATE_MESSAGE')}}>
                            <Icon 
                                name="chevron-left"
                                color="black"
                                type='entypo'
                                size={25*factor_hor}
                            />
                        </TouchableOpacity>                
                    </View>
                    <View style={{flex:2}}></View>
                    <Text style={{color:'black', fontSize:24*factor_ver, fontWeight:'500', fontFamily:'avenir next', }}>{this.state.message_name}</Text>
                    <View style={{flex:2}}></View>
                    <View style={{flex:1,}}>
                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.push('MESSAGE_SETTINGS', {returned:this.returned.bind(this), data: JSON.stringify( {selected_users:this.state.selected_users, admin1:this.state.username, admin2:null, admin3:null, roomID:this.state.roomID, message_name:this.state.message_name, is_admin:true, blocked:false, muted:false, is_anon:this.state.is_anon, color:this.state.original_banner }) })
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
                )}

                {/* messages and textinput */}
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.container}>

                {/* messages */}
                <View style={{flex:1, marginBottom:5, minHeight:'60%', alignSelf:'stretch', marginLeft:this.state.padding*factor_hor, marginRight:this.state.padding*factor_hor, }}>
                    <FlatList 
                        data={this.state.messages}
                        extraData={this.state}
                        ref = "flatList"
                        keyboardDismissMode={'on-drag'}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.9}
                        onEndReached={ () => {this.reached_end();}}
                        ListFooterComponent={() => this.state.loading_post? null :this.which_footer()}
                        inverted={true}
                        initialNumToRender={40} 
                        maxToRenderPerBatch={40} 
                        style={{backgroundColor:'white', flex:1, }}
                        keyExtractor={(item,index) => (index).toString()}
                        renderItem={({item, index}) => ( 
                            <View key={index} style={{ minHeight:10, marginBottom:7.5*factor_ver, alignSelf:'stretch', flexDirection:'row', backgroundColor:'white', }}>
                    
                            {/* date */}
                            <View style={{flex:this.what_margin_left(index), marginRight:5, alignItems:'center', justifyContent:'center', alignContent:'center', }}>
                            { this.show_date_left(index) && (
                                <View>
                                    <Text style={{textAlign:'center', color:'#9b9b9b', fontFamily:'avenir next', justifyContent:'center', alignContent:'center', alignItems:'center'}}>{this.left_date(index)}</Text>
                                    <Text style={{textAlign:'center', color:'#9b9b9b', fontFamily:'avenir next', justifyContent:'center', alignContent:'center', alignItems:'center'}}>{this.left_date2(index)}</Text>
                                </View>
                            )}
                            </View>
                            
                            <View style={{flex:0.8, marginBottom:2, }}>
                                {this.show_name(index) && (
                                    <Text 
                                        onPress={()=>{this.change_padding()}} 
                                        style={{textAlign:this.which_side(index), fontFamily:'avenir next', fontSize:14, color:'#9b9b9b', }}>[{this.state.messages[index][0]}]</Text>
                                )}

                            <View style={{
                               flex:0.8, 
                               paddingLeft:5*factor_hor, 
                               borderLeftWidth:2.5,
                               borderLeftColor:this.border_color_left(index),
                               paddingRight:5*factor_hor, 
                               borderRightWidth:2.5,
                               borderRightColor:this.border_color_right(index), 
                               backgroundColor:'#f7f7f7',
                               borderRadius:0*factor_hor,
                               paddingTop:3*factor_hor,
                               paddingLeft:3*factor_hor,
                               paddingRight:10*factor_hor, 
                               paddingBottom:3*factor_ver,
                            }}>
                                <Text 
                                    onPress={()=>{this.change_padding()}} 
                                    style={{
                                        textAlign:'left',
                                        marginLeft:5, 
                                        marginRight:5, 
                                        fontFamily:'avenir next', 
                                        fontSize:18.5, 
                                        fontWeight:'400', 
                                        color:this.state.messages[index][2]}}
                                >{this.state.messages[index][3]}</Text>
                                {this.isImage(index) && ( 
                                <View style={{alignContent:'center', justifyContent:'center', alignItems:'center',}}>
                                    <TouchableOpacity 
                                        style={{flex:1, width:(Dimensions.get('window').width*this.state.showing_date - 30*factor_hor) , height:(Dimensions.get('window').width*0.7 - 30)}}
                                        onPress={() => {this.setState({clicked_image:this.state.messages[index][4]}), this.setState({visible4:true},function(){console.log(this.state.visible4, )})}}>
                                        <FastImage
                                            resizeMode={FastImage.resizeMode.contain}
                                            source={{ uri: this.show_img(index) }}
                                            style={{ flex:1, width:(Dimensions.get('window').width*this.state.showing_date - 30*factor_hor) , height:(Dimensions.get('window').width*0.7 - 30), }}
                                        />
                                    </TouchableOpacity>
                                </View>
                                )}                            
                                </View>
                            </View>
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
                       {/* buffer */}
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

                    {/* if image added to message */}
                    {this.state.visible && ( 
                    <View style={{flex:1.2, flexDirection:'row', }}>
                        <View style={{height:20, position:'absolute', left:40*factor_hor,justifyContent:'center',}}>
                            <TouchableHighlight underlayColor={'transparent'} onPress={() => {this.delete_image()}}>
                                <Icon 
                                    size={40*factor_hor}
                                    name="cross"
                                    color="#9B9B9B"
                                    type='entypo'
                                />
                            </TouchableHighlight>                            
                        </View>
                        <View style={{ height:30*factor_hor, position:'absolute', left:5, bottom:0, width:30*factor_hor, alignContent:'center', justifyContent:'center', alignItems:'center',}}>
                            <TouchableOpacity onPress={() => {this.setState({clicked_image:this.state.filePath.data}), this.setState({visible4:true},function(){console.log(this.state.visible4, )})}}>
                                <FastImage
                                    resizeMode={FastImage.resizeMode.contain}
                                    source={{ uri: this.state.filePath.uri }}
                                    style={{  width:30*factor_hor , height:30*factor_hor, }}
                                />
                            </TouchableOpacity>
                        </View>                
                    </View>               
                    )}

                    {/* text bar */}
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
                            onTouchStart={() =>  {this.open_keyboard()}}
                            ref={input => { this.textInput = input }}
                            multiline={true}
                            autoCompleteType={"off"}
                            textAlignVertical={'top'}
                            selection={{start:this.state.message.length, end:this.state.message.length}}
                            placeholder='Type...'                                                              
                            placeholderTextColor='black'
                            onContentSizeChange={(e)=>{this.updateSize(e.nativeEvent.contentSize.height)}}
                            onChangeText={(typedText)=>{this.setState({message:typedText})}}
                            onEndEditing={()=>{this.close_keyboard()}}
                        />  
                    </View>
                    
                    <View style={{flex:1, position:'absolute', bottom:-4*factor_ver, right:7.5*factor_hor, }}>
                        <TouchableOpacity style={{flex:1,}} onLongPress={()=>{this.change_send_color()}} delayLongPress={500} onPress={()=>{this.send_message()}}>
                            <Icon 
                                size={32.5*factor_hor}
                                name='ios-arrow-dropup-circle'
                                color={this.state.banner_color}
                                type='ionicon'
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            
                {/* bottom footer */}
                <View style={{height:this.state.buffer, bottom:-4*factor_ver,}}></View>
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
