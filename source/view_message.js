import React, {Component} from 'react';
import {StyleSheet,  Dimensions, TextInput,
        Text, View, TouchableOpacity, Platform, 
        KeyboardAvoidingView, FlatList, Keyboard,
        TouchableHighlight, AsyncStorage, AppState
        } from 'react-native';
import { Icon } from 'react-native-elements';
import Dialog, { DialogContent, } from 'react-native-popup-dialog';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import moment from  'moment-timezone';
import FastImage from 'react-native-fast-image'
import ImagePicker from 'react-native-image-picker';

var body = new FormData();

export default class view_message extends React.Component {
    static navigationOptions = {header: null}
    constructor(props) {
        super(props);
        this.socket = global.socket
        this.state = {
            appState: AppState.currentState,
            username:'',
            is_anon:false, // if user chatting anonymously
            sender_text_color:'', // primary text color
            sender_text_color2:'', // secondary (black if admin)
            message_name:'', // name on banner across top
            an_image:false, // if an image was clicked
            destination:'none', // if image exists
            buffer:10, // buffer at bottom screen
            message:'', // message someone types
            number_lines:'', // numbers lines written
            textheight:30, // height of text input
            last_textheight:30, // height of last textheight
            showing_date:0.7, // width of image
            original_banner:'', // color of banner
            border_length:1,
            image_data:'none',
            messages:[], // messages loaded
            old_timestamp:'', // messages already have 
            sending_message:false, // if currently sending a msg
            show:40, // number messages to show
            isFetching:false, // if currently fetching
            admin:'nobody', // group admin
            padding:10, // padding left and right
            negative_padding_left:0, // padding left when date clicked
            negative_padding_right:0, // padding right when date clicked
            show_date:false, // whether to show date
            keyboard_opened:false, // if keyboard open
            visible:false, // show small image when sending
            visible4:false, // press image --> show modal
            clicked_image:null, // image pressed on 
            selected_users:[], // users to send to
            act_load_color:"white", // activity indicator load color
            roomID:'', // chatID // roomID
            banner_color:'white', // banner color
            loadin:true,
            run_reached_end:false,
            new_mesasge:false, // if banner is going to be To: or name or group 
            messages_connected:'', // async storage whether connected on messages namespace
        }
    }

    async componentDidMount() {    
        AppState.addEventListener('change', this._handleAppStateChange);        
        data = await this.props.navigation.getParam('data') // data passed from feed
        sender_text_color = await AsyncStorage.getItem('text_color')
        user = await AsyncStorage.getItem('user')
        original_banner = '#f9a32c'
        color = data.color
        chatID = data.chatID
        admin1 = data.admin1
        admin2 = data.admin2
        admin3 = data.admin3
        chat_type = data.chat_type
        name = data.name
        num_users = data.num_users
        status_ = ''
        is_anon = false
        ios = 10
        is_admin = false

        // set status invited | joined | left
        if( typeof(global.messages_info[chatID]) == 'undefined' ) {
            status_ = 'invited'
        }
        else {
            status_ = global.messages_info[chatID][7]
            original_banner = await AsyncStorage.getItem('text_color')
        }

        // check if anonymous
        if( admin1 == 'Anonymous' || admin2 == 'Anonymous' || name == 'Anonymous' ) {
            is_admin = true
            is_anon = true
        }
        // check if admin
        else if( admin1 == user || admin2 == user || admin3 == user )  {
            is_admin = true
        }
        // check platform
        if(Platform.OS === 'ios') {
            if ( await Dimensions.get('window').height > 811) {
                ios = 40              
        }}

        // set state of all variables
        await this.setState({
            buffer:ios,
            banner_color:original_banner,
            original_banner:original_banner,
            color:color,
            roomID:chatID,
            chat_type:chat_type,
            is_anon:is_anon,
            status_:status_,
            admin1:admin1,
            admin2:admin2,
            admin3:admin3,
            message_name:name,
            num_users:num_users,
            username:user,
            sender_text_color:sender_text_color,
            is_admin:is_admin
        })

        url = `http://${serverLocation}:80/chat_member_active?userID=${this.state.username}&chatID=${this.state.roomID}`
        await fetch(url)

        await this.socket.on('reconnect', () => { 
            console.log('reconnect')
            this.setState({
                messages:[],
                run_reached_end:true, 
                loadin:false
            })
            this.reached_end()
        })   

        // get messages accordingly
        if(status_ == 'joined') {
            await this.joined()
        }
        else if(status_ == 'invited') {
            await this.invited()
        }
        else if(status_ == 'left') {
            await this.left()
        }
        if(this.state.run_reached_end == true) {
            await this.reached_end()
        }
    }

    _handleAppStateChange = async (nextAppState) => {
        if (this.state.appState.match(/active/) && nextAppState === 'background') {
            // app went to background == turn active off on room members
            url = `http://${serverLocation}:80/chat_member_inactive?userID=${this.state.username}&chatID=${this.state.roomID}`
            fetch(url)
            console.log(url)
            console.log('background')
        }
        else if (this.state.appState.match(/background/) && nextAppState === 'active') {
            // app went to foreground == turn active on on room members

            if( typeof(this.state.roomID) !== 'undefined') {
                data = await this.props.navigation.getParam('x')
                user = await AsyncStorage.getItem('user')
                url = `http://${serverLocation}:80/chat_member_active?userID=${this.state.username}&chatID=${this.state.roomID}`
                fetch(url)
                console.log(url)
                console.log('foreground')
            }
            else {
                    data = await this.props.navigation.getParam('x')
                    user = await AsyncStorage.getItem('user')
                    url =`http://${serverLocation}:80/chat_member_active?userID=${user}&chatID=${data[0]}`
                    fetch(url)
                    console.log(url, 2)
                    console.log('foreground')
                }
        }
        this.setState({appState: nextAppState});
    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    // call messages
    async left() {  
        console.log('LEFT')
        // get async messages
        message_dict = JSON.parse( await AsyncStorage.getItem('messages') ) 
        messages_info = JSON.parse(await AsyncStorage.getItem('messages_info'))
        
        // add new messages
        await this.socket.on('message_', (data) => {
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
    
        admin = false
        // if admin 
        if(this.state.username == this.state.admin1 || this.state.username == this.state.admin2 || this.state.username == this.state.admin3 || this.state.username == 'Anonymous') {
            admin = true
        } 
        // put all asynced messages into messages
        for(key in message_dict[this.state.roomID]) {
            this.state.messages.push(message_dict[this.state.roomID][key])
        }   
        await this.setState({messages:this.state.messages})

        // when to get messages from
        is_date = true
        old_timestamp = global.messages_info[this.state.roomID][5]
        if( this.state.status_ == 'left' && this.state.messages.length > 0 ) {
            is_date = true    
            if(global.messages_info[chatID][5] > this.state.messages[this.state.messages.length - 1][6] ) {
                old_timestamp = this.state.messages[this.state.messages.length - 1][6]
            }
        }  

        // get messages
        if(this.state.messages.length < 41) {
            await this.setState({loadin:true})
            url = `http://${serverLocation}:80/get_messages?`
            await fetch(url, {
                method:'POST',
                headers:{    
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                body: 
                JSON.stringify({
                    chatID:this.state.roomID,
                    old_timestamp:old_timestamp,
                    is_date:is_date
            })})
            .then((response) => response.json())
            .then((responseJson2) => {
                console.log('RESPONSEJSON2 LEFT', responseJson2)
                run_reached_end = true
                if(responseJson2.length == 0) {
                    run_reached_end = false
                }
                this.setState({
                    messages:[...this.state.messages, ...responseJson2], 
                    run_reached_end:run_reached_end,
                    loadin:false,
                })
            })
            .catch((error) => {
                console.log(error)
            }); 
        }         
    }
    async invited() {
        console.log('INVITED')      

        // make new dict items
        global.message_dict[this.state.roomID] = []
        global.messages_info[this.state.roomID] = [this.state.roomID, '#f9a32c', 'block', 'false', "no", 0, this.state.chat_type, 'joined',0]
        AsyncStorage.setItem('messages', JSON.stringify(global.message_dict) )
        AsyncStorage.setItem('messages_info', JSON.stringify(global.messages_info))

        // get async messages
        message_dict = JSON.parse( await AsyncStorage.getItem('messages') ) 
        messages_info = JSON.parse(await AsyncStorage.getItem('messages_info'))
        
        // if already created   
        await this.socket.emit( 'join_chat', {
            'username':this.state.username, 
            'sender_text_color':this.state.sender_text_color, 
            'room':this.state.roomID, 
            'anon':this.state.is_anon
        })      

        // add new messages
        await this.socket.on('message_', (data) => {
            data.data[4] = data.data[4].replace(/["]/g, '')
            if(data.data[5] == this.state.roomID && data.data[2] !== '#9b9b9c') {
                this.state.messages.unshift(data.data)
                this.setState({messages:this.state.messages})   
                if(data.data[2] == '#9b9b9b' ) {
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
    
        admin = false
        // if admin 
        if(this.state.username == this.state.admin1 || this.state.username == this.state.admin2 || this.state.username == this.state.admin3 || this.state.username == 'Anonymous') {
            admin = true
        }
        
        // put all asynced messages into messages
        for(key in message_dict[this.state.roomID]) {
            this.state.messages.push(message_dict[this.state.roomID][key])
        }   
        await this.setState({messages:this.state.messages})

        // when to get messages from
        is_date = false
        old_timestamp = 10000000000000000000
        if( this.state.messages.length > 0 ){
            old_timestamp = this.state.messages[this.state.messages.length - 1][7]
            is_date = true
        }         

        // get messages
        if(this.state.messages.length < 41) {
            await this.setState({loadin:true})
            url = `http://${serverLocation}:80/get_messages?`
            await fetch(url, {
                method:'POST',
                headers:{    
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                body: 
                JSON.stringify({
                    chatID:this.state.roomID,
                    old_timestamp:old_timestamp,
                    is_date:is_date
            })})
            .then((response) => response.json())
            .then((responseJson2) => {
                run_reached_end = true
                if(responseJson2.length == 0) {
                    run_reached_end = false
                }
                for(key in responseJson2) {
                    if( responseJson2[key][0] == this.state.username || responseJson2[key][1] == this.state.username ) {
                        if( responseJson2[key][3].includes('joined the chat') ) {
                        }
                        else {
                            this.state.messages.push(responseJson2[key])
                        }
                    }
                    else {
                        this.state.messages.push(responseJson2[key])
                    }
                }
                this.setState({
                    messages:this.state.messages, 
                    run_reached_end:run_reached_end,
                    status_:'joined',
                    loadin:false,
                },function(){console.log(
                    this.state.messages
                )})
            })
            .catch((error) => {
                console.log(error)
            }); 
        }   
    }   
    async joined() {
        console.log('JOIN')
        // get async messages
        message_dict = JSON.parse( await AsyncStorage.getItem('messages') ) 
        messages_info = JSON.parse( await AsyncStorage.getItem('messages_info') )
        
        // add new messages
        await this.socket.on('message_', (data) => {
            data.data[4] = data.data[4].replace(/["]/g, '')
            console.log(data, 'data')
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
        })   
    
        admin = false
        // if admin 
        if(this.state.username == this.state.admin1 || this.state.username == this.state.admin2 || this.state.username == this.state.admin3 || this.state.username == 'Anonymous') {
            admin = true
        }
        
        // put all asynced messages into messages
        for(key in message_dict[this.state.roomID]) {
            this.state.messages.push(message_dict[this.state.roomID][key])
        }   
        await this.setState({messages:this.state.messages})
        
        // when to get messages from
        is_date = false
        old_timestamp = 100000000000000000000000000
        console.log(this.state.messages, 'MESSAGES')
        if( this.state.messages.length > 0 ) {
            old_timestamp = this.state.messages[this.state.messages.length - 1][7]
        }

        // get messages
        if(this.state.messages.length < 41) {
            await this.setState({loadin:true})
            url = `http://${serverLocation}:80/get_messages?`
            await fetch(url, {
                method:'POST',
                headers:{    
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                body: 
                JSON.stringify({
                    chatID:this.state.roomID,
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
                    loadin:false,
                })
            })
            .catch((error) => {
                console.log(error)
            }); 
        } 
    }

    // end of messages? 
    async reached_end() {
        console.log('REACHED END')
        if(this.state.run_reached_end == true && this.state.loadin == false) {
            console.log('IN')
            // set time data
            old_timestamp = 1000000000000000000
            is_date = true

            if(this.state.messages.length > 0) {
                is_date = false
                old_timestamp = this.state.messages[this.state.messages.length - 1][7]
            }

            // if have left
            if( this.state.status_ == 'left' ) {
                old_timestamp = global.messages_info[chatID][5]
                is_date = true    

                if(global.messages_info[chatID][5] > this.state.messages[this.state.messages.length - 1][6] ) {
                    old_timestamp = this.state.messages[this.state.messages.length - 1][6]
                }
            }         

            url = `http://${serverLocation}:80/get_messages?`
            await fetch(url, {
                method:'POST',
                headers:{    
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                body: 
                JSON.stringify({
                    chatID:this.state.roomID,
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
        if(this.state.sending_message == false && 
            ( this.state.an_image == true || this.state.message.length > 0 ) && 
            global.messages_info[this.state.roomID][7] == 'joined') {   

            await this.setState({sending_message:true})   
            
            // if anonymous
            send_as_anon = this.state.username       
            if(this.state.is_anon == true) {
                send_as_anon = 'Anonymous'
            }

            // emit message and server creates mysql entry w/o image
            await this.socket.emit('sending', { 'sender':send_as_anon, // 'Anonymous' or username
                                                'sender2':this.state.username, // username
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
    
    // keyboard actions
    async open_keyboard() {
        console.log(this.state.textheight)
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
    async num_users() {
        data = await this.props.navigation.getParam('data')
        if(this.state.num_users > 2 || global.messages_info[data.chatID][6] == 1 || this.state.chat_type == 1){
            return 1
        }
        else {
            return 0
        }
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
            maxWidth: 400,
            maxHeight: 400
        }

        await ImagePicker.showImagePicker(options, response => { 
            if(response.didCancel) {
                console.log('User cancelled image picker');
            } 
            else if(response.error) {
                console.log('ImagePicker Error: ', response.error);
            } 
            else {
                this.setState({ 
                    filePath:response,
                    visible:true,
                    an_image:true,
                    image_data:JSON.stringify(response.data),
                })
                body.append('file',{
                    uri:response.uri,
                    name:response.fileName,
                    type:response.type
                })
                body.append('Content-Type', 'image/png')
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

    // view dynamic options
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
        if( this.state.messages[index][2] == '#000000' || this.state.messages[index][2] == '#9b9b9b' ) {
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
        date = date.format('MMM DD, YY').toString()
        return date
    }
    left_date2(index) {
        date = moment(this.state.messages[index][6]*1000).tz(timezone)
        date = date.format('h:mm A').toString()
        return date
    }
    right_date(index) {
        date = moment(this.state.messages[index][6]*1000).tz(timezone)
        date = date.format('MMM DD, YYYY').toString()
        return date
    }
    right_date2(index) {
        date = moment(this.state.messages[index][6]*1000).tz(timezone)
        date = date.format('h:mm A').toString()
        return date
    }
    async change_padding(){
        if(this.state.padding == 10) {
            await this.setState({padding:15, showing_date:0.4, show_date:true, },function(){console.log(this.state.showing_date, this.state.padding)})
        }
        else if(this.state.padding == 15) {
            await this.setState({padding:10, showing_date:0.7, show_date:false,},function(){console.log(this.state.show_date, this.state.padding)})
        }
        
        if(this.state.border_length == 1) {
            await this.setState({border_length:0.99},function() {console.log(this.state.border_length)})
        }
        else if(this.state.border_length == 0.99) {
            await this.setState({border_length:1},function() {console.log(this.state.border_length)})
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
    change_send_color(){
        // if admin 
        if( this.state.admin1 == this.state.username || this.state.admin2 == this.state.username || this.state.admin3 == this.state.username ) {
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
    leave() {
        url = `http://${serverLocation}:80/chat_member_inactive?userID=${this.state.username}&chatID=${this.state.roomID}`
        fetch(url)
        this.props.navigation.navigate("PRIVATE_MESSAGE")
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
                                        source={{ uri:this.show_big_img(this.state.clicked_image) }}
                                        style={{ flex:1, paddingRight:1, paddingLeft:1, width:Dimensions.get('window').width, height:Dimensions.get('window').width-2, }}
                                    />
                                </View>
                                <View style={{flex:1}}></View>
                            </View>
                        </GestureRecognizer>
                    </DialogContent>
                </Dialog>   

                <View style={{
                    height:Dimensions.get('window').height*0.035, 
                    backgroundColor:'#f7f7f7', 
                    justifyContent:'center', 
                    alignContent:'center', 
                    alignItems:'center', 
                    alignSelf:'stretch',
                    opacity:0.8,    
                }}></View>         
                <View style={{
                    height:Dimensions.get('window').height*0.055, 
                    opacity:0.8,
                    backgroundColor:'#f7f7f7',
                    justifyContent:'center', 
                    alignContent:'center', 
                    alignItems:'center', 
                    alignSelf:'stretch', 
                    flexDirection:'row', 
                    borderBottomColor:'#9b9b9b',
                    borderBottomWidth:0.25, 
                }}>
                    <View style={{flex:1, }}>
                        <TouchableOpacity onPress={()=>{this.leave()}}>
                            <Icon 
                                name="chevron-left"
                                color='black'
                                type='entypo'
                                size={25*factor_hor}
                            />
                        </TouchableOpacity>                
                    </View>
                    <View style={{flex:4, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                        <Text style={{color:'black', fontSize:24*factor_hor, fontWeight:'500', fontFamily:'avenir next', }}>{this.state.message_name}</Text>
                    </View>
                    <View style={{flex:1,}}>
                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.push('MESSAGE_SETTINGS', {returned:this.returned.bind(this), data: JSON.stringify({
                                selected_users:this.state.selected_users, 
                                admin1:this.state.admin1, 
                                admin2:this.state.admin2, 
                                admin3:this.state.admin3, 
                                roomID:this.state.roomID, 
                                message_name:this.state.message_name, 
                                is_admin:this.state.is_admin, 
                                blocked:false, 
                                muted:false, 
                                is_anon:this.state.is_anon, 
                                color:this.state.original_banner }) 
                            })
                        }}>
                            <Icon 
                                name="settings"
                                color='black'
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
                                <Text onPress={()=>{this.change_padding()}} style={{textAlign:this.which_side(index), fontFamily:'avenir next', fontSize:(8+6*factor_hor), color:'#9b9b9b', }}>[{this.state.messages[index][0]}]</Text>
                            )}

                            {/* text */}
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
                                        color:this.state.messages[index][2],
                                    }}>{this.state.messages[index][3]}</Text>
                                {this.isImage(index) && ( 
                                <View style={{alignContent:'center', justifyContent:'center', alignItems:'center',}}>
                                    <TouchableOpacity 
                                        style={{flex:1, width:(Dimensions.get('window').width*this.state.showing_date - 30*factor_hor) , height:(Dimensions.get('window').width*0.8 - 30)}}
                                        onPress={() => {Keyboard.dismiss(), this.setState({clicked_image:this.state.messages[index][4]}), this.setState({visible4:true},function(){console.log(this.state.visible4, )})}}>
                                        <FastImage
                                            resizeMode={FastImage.resizeMode.contain}
                                            source={{ uri: this.show_img(index) }}
                                            style={{flex:1, width:(Dimensions.get('window').width*this.state.showing_date - 30*factor_hor) , height:(Dimensions.get('window').width*0.8 - 30),  }}
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
                    {/* buffer */}
                    <View style={{flex:1, }}>
                        {/* select image */}
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
                                    source={{ uri:this.state.filePath.uri }}
                                    style={{  width:30*factor_hor , height:30*factor_hor,}}
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
                            keyboardDismissMode='interactive'
                            onTouchStart={() =>  {this.open_keyboard()}}
                            ref={input => { this.textInput = input }}
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
                    
                    <View style={{flex:1, position:'absolute', bottom:-4*factor_ver, right:7.5*factor_hor,}}>
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
