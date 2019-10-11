import React, {Component} from 'react';
import {StyleSheet, ScrollView, Dimensions, AsyncStorage,
        TextInput, TouchableHighlight, Alert, Text, View, 
        TouchableOpacity, Platform, 
    } from 'react-native';
import { Icon } from 'react-native-elements';
import Dialog, { DialogContent} from 'react-native-popup-dialog';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import FastImage from 'react-native-fast-image'
import Airplane from './svgs/airplane';

export default class message_settings extends React.PureComponent {
    static navigationOptions = {header: null}
    constructor(props) {
        super(props);
        this.socket = global.socket
        this.state = {

            username:'',
            buffer:10, 

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
            bg_following:'#ececec',
            bg_people:'white',
            following_bw:1,
            people_bw:0, 
            visible4:false, // image
            clicked_image:0, // clicked image
            users1: [],
            imgs1: [],
            is_anon:false,
            block_chat:'',
            visible7:false, // 
            key_:0, //  
            if_group:false,
        }   
    }

    async componentDidMount() {
        ios = 10
        if(Platform.OS === 'ios') {
            if ( Dimensions.get('window').height > 811) {
                ios = 40              
            }
        }
        data = JSON.parse(await this.props.navigation.getParam('data'))
        messages_info = JSON.parse(await AsyncStorage.getItem('messages_info'))
        if_group = false
        console.log('DATA', data, data.is_anon, messages_info)
        chat_type = ''

        if(global.messages_info[data.roomID][6] == 0 ) {
            if(global.messages_info[data.roomID][7] == 'left') {
                if(data.is_anon == true || data.is_anon == 'true') {
                    chat_type = "Can't rejoin anon"
                }
                else {
                    chat_type = 'Unblock Chat'
                }
            }
            else {
                chat_type = 'Block Chat'
            }
        }
        else {
            if( global.messages_info[data.roomID][7] == 'left' ) {
                if_group = true
                chat_type = "Can't rejoin"
            }
            else {
                if_group = true
                chat_type = 'Leave Chat'
            }
        }

        user = await AsyncStorage.getItem('user')
        await this.setState({
            buffer:ios,
            username:user,
            if_group:if_group,
            selected_users:data.selected_users,
            message_name:data.message_name,
            is_admin:data.is_admin,
            is_anon:data.is_anon,
            blocked:data.blocked,
            muted:messages_info[data.roomID][3],
            color:data.color,
            roomID:data.roomID,
            block_chat:chat_type,
            chat_data:messages_info, 
            admin1:data.admin1,
            admin2:data.admin2,
            admin3:data.admin3,
        })

        url = `http://${serverLocation}:80/get_admins?chatID=${this.state.roomID}`
        await fetch(url)             
        .then((response) => response.json())
        .then((responseJson2) => {
            this.setState({
                admins:responseJson2[0],
            })
        })
        .catch((error) => {
            console.log(error)
        });           


        url = `http://${serverLocation}:80/get_imgs?chatID=${this.state.roomID}`
        await fetch(url)             
        .then((response) => response.json())
        .then((responseJson2) => {
            this.setState({
                imgs1:responseJson2,
            })
            console.log(this.state.imgs1[0], 'IMAGES')
        })
        .catch((error) => {
            console.log(error)
        });           

        url = `http://${serverLocation}:80/get_members?chatID=${this.state.roomID}`
        await fetch(url)             
        .then((response) => response.json())
        .then((responseJson2) => {
            this.setState({
                selected_users2:responseJson2,
            })
            console.log(this.state.selected_users2, 'selected2')
        })
        .catch((error) => {
            console.log(error)
        }); 
    }
    async leave() {
        console.log(this.state.block_chat, 'BLOCK CHAT')
        if(this.state.block_chat == 'Unblock Chat' ) {
            // rejoin
            if(this.state.is_anon !== false || this.state.is_anon !== 'false') {
                global.messages_info[this.state.roomID][4] = 'no'
                global.messages_info[this.state.roomID][5] = 0
                global.messages_info[this.state.roomID][7] = 'joined' 
                global.message_dict[this.state.roomID] = []

                await AsyncStorage.setItem('messages_info', JSON.stringify(global.messages_info) )
                await AsyncStorage.setItem('messages', JSON.stringify(global.message_dict) )
                await this.socket.emit('rejoin', {
                                        username:this.state.username,
                                        room:this.state.roomID,
                                        anon:this.state.is_anon
                                    })
                await this.props.navigation.push('PRIVATE_MESSAGE')
            }
        }
        else if(global.messages_info[this.state.roomID][7] !== 'left') {
            // block chat
            global.messages_info[this.state.roomID][4] = 'yes'
            global.messages_info[this.state.roomID][5] = Math.floor(Date.now() / 1000)
            global.messages_info[this.state.roomID][7] = 'left'

            await AsyncStorage.setItem('messages_info', JSON.stringify(global.messages_info) )
            await this.socket.emit( 'leave', {username:this.state.username,room:this.state.roomID,anon:this.state.is_anon, if_group:this.state.if_group, is_admin:this.state.is_admin})        
            await this.props.navigation.push('PRIVATE_MESSAGE')    
        }
    }
    group_and_admin() {
        if(this.state.selected_users > 2 && this.state.is_admin == 'true') {
            return true
        }
        else {
            return false
        }
    }
    group_not_admin() {
        if(this.state.selected_users > 2 && this.state.is_admin == 'false') {
            return true
        }
        else {
            return false
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
            url = `http://${serverLocation}:80/mute_chat?userID=${this.state.username}&chatID=${this.state.roomID}&muted=${this.state.muted}`
            await fetch(url)
            this.state.chat_data[this.state.roomID][3] = this.state.muted
            await AsyncStorage.setItem('messages_info', JSON.stringify(this.state.chat_data) )
        }
        else if(this.state.muted == false || this.state.muted == 'false') {
            await this.setState({muted:true})
            await this.muted()
            url = `http://${serverLocation}:80/mute_chat?userID=${this.state.username}&chatID=${this.state.roomID}&muted=${this.state.muted}`
            await fetch(url)
            this.state.chat_data[this.state.roomID][3] = this.state.muted
            await AsyncStorage.setItem('messages_info', JSON.stringify(this.state.chat_data) )
        }
        console.log(this.state.chat_data, 'muted data')
    }
    press_following() {
        this.setState({
            people_color:'#9b9b9b',
            following_color:'#9b9b9b',
            bg_following:'#ececec',
            bg_people:'white',
            following_bw:1,
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
            following_bw:0,
            people_bw:1, 
            show_members:false,
            show_search:false,
        })
    }
    members_media() {
        if(this.state.people_bw == 1) {
            return false
        }
        else if(this.state.people_bw == 0) {
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
        url = `http://${serverLocation}:80/search_members?chatID=${this.state.roomID}&search_term=${search}`
        await fetch(url)
        .then((response) => response.json())
        .then((responseJson2) => {
            this.setState({selected_users2:responseJson2})
        })
        .catch((error) => {
            console.log(error)
        });     
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
    // image actions
    onSwipeUp(gestureState) {
        this.setState({visible4:false, visible7:false}, function () {console.log(this.state.visible4, this.state.visible7)});
        console.log(this.state.visible4, this.state.visible7)
    }                                                                                                         
    onSwipeDown(gestureState) {
        this.setState({visible4:false, visible7:false}, function () {console.log(this.state.visible4, this.state.visible7)});
        console.log(this.state.visible4, this.state.visible7)
    }
    onSwipeLeft(gestureState) {
        this.setState({visible4:false, visible7:false}, function () {console.log(this.state.visible4, this.state.visible7)});
        console.log(this.state.visible4, this.state.visible7)
    }
    onSwipeRight(gestureState) {
        this.setState({visible4:false, visible7:false}, function () {console.log(this.state.visible4, this.state.visible7)});
        console.log(this.state.visible4, this.state.visible7)
    }
    onSwipe(gestureName, gestureState) {
        
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        this.setState({gestureName: gestureName});
        
        switch (gestureName) {

        case SWIPE_UP:
            this.setState({visible4:false, visible7:false}, function () {console.log(this.state.visible4, this.state.visible7)});
            console.log(this.state.visible4, this.state.visible7)
            break;
          
        case SWIPE_DOWN:    
            this.setState({visible4:false, visible7:false}, function () {console.log(this.state.visible4, this.state.visible7)});
            console.log(this.state.visible4, this.state.visible7)
            break;
        
        case SWIPE_LEFT:
            this.setState({visible4:false, visible7:false}, function () {console.log(this.state.visible4, this.state.visible7)});
            console.log(this.state.visible4, this.state.visible7)
            break;
          
        case SWIPE_RIGHT:
            this.setState({visible4:false, visible7:false}, function () {console.log(this.state.visible4, this.state.visible7)});
            console.log(this.state.visible4, this.state.visible7)
            break;
        }
    }       
    async goprofile2(index) {
        await this.setState({ key_:index },function(){console.log(this.state.key_)})
        if( this.state.is_admin == true && this.state.selected_users2[index][0] !== this.state.username &&
            this.state.admin1 !== this.state.selected_users2[index][0] && this.state.admin2 !== this.state.selected_users2[index][0] && 
            this.state.admin3 !== this.state.selected_users2[index][0] ) {
            await this.setState({ key_:index, visible7:true })
        }
    } 
    search_private() {
        this.props.navigation.navigate('SEARCHED_MESSAGES', {x:[this.state.txt, this.state.roomID, this.state.color]})
    }
    async returned(color){
        console.log('COLOR', color)
        this.setState({banner_color:color, color:color},function(){console.log(this.state.color)})
    }
    async remove_user() {
        if( this.state.admin1 == this.state.selected_users2[this.state.key_][0] || this.state.admin2 == this.state.selected_users2[this.state.key_][0] || this.state.admin3 == this.state.selected_users2[this.state.key_][0] ) {
            return Alert.alert("Can't remove admin")
        }                        
        else {
            // remove DB
            await this.socket.emit('delete_member_from_chat', { 'username':this.state.selected_users2[this.state.key_][0],'room':this.state.roomID })  
           
            // rid on lists
            ind = this.state.selected_users2.indexOf(this.state.selected_users2[this.state.key_]);
            
            await this.state.selected_users2.splice(ind, 1)
            await this.setState({visible7:false})

        }
    }
    async make_admin() {
        if( this.state.admin1 == null || this.state.admin1 == '') {
            url = `http://${serverLocation}:80/make_admin?name=${this.state.selected_users2[this.state.key_][0]}&chatID=${this.state.roomID}&route=1`
            await fetch(url)
            this.state.admins[0] = this.state.selected_users2[this.state.key_][0]
            await this.setState({admins:this.state.admins, visible7:false, admin1:this.state.selected_users2[this.state.key_][0]})
            // emit set admin message
            await this.socket.emit('sending', { 'sender':this.state.username,
            'sender2':this.state.username, 
            'sender_text_color':'#9b9b9b', 
            'message':this.state.selected_users2[this.state.key_][0]+' was made admin', 
            'media':'none', 
            'chatID':this.state.roomID, 
            'roomID':this.state.roomID, 
            })
        }        
        else if( this.state.admin2 == null || this.state.admin2 == '') {
            url = `http://${serverLocation}:80/make_admin?name=${this.state.selected_users2[this.state.key_][0]}&chatID=${this.state.roomID}&route=2`
            await fetch(url)
            this.state.admins[1] = this.state.selected_users2[this.state.key_][0]
            await this.setState({admins:this.state.admins, visible7:false, admin2:this.state.selected_users2[this.state.key_][0]})
            // emit set admin message
            await this.socket.emit('sending', { 'sender':this.state.username,
            'sender2':this.state.username, 
            'sender_text_color':'#9b9b9b', 
            'message':this.state.selected_users2[this.state.key_][0]+' was made admin', 
            'media':'none', 
            'chatID':this.state.roomID, 
            'roomID':this.state.roomID, 
            })
        }
        else if( this.state.admin3 == null || this.state.admin3 == '') {
            url = `http://${serverLocation}:80/make_admin?name=${this.state.selected_users2[this.state.key_][0]}&chatID=${this.state.roomID}&route=3`
            await fetch(url)
            this.state.admins[2] = this.state.selected_users2[this.state.key_][0]
            await this.setState({admins:this.state.admins, visible7:false, admin3:this.state.selected_users2[this.state.key_][0]})
            // emit set admin message
            await this.socket.emit('sending', { 'sender':this.state.username,
            'sender2':this.state.username, 
            'sender_text_color':'#9b9b9b', 
            'message':this.state.selected_users2[this.state.key_][0]+' was made admin', 
            'media':'none', 
            'chatID':this.state.roomID, 
            'roomID':this.state.roomID, 
            })
        }        
        else {
            await this.setState({ visible7:false })
            return Alert.alert('Chat already has three admins')
        }
    }
    async change_name(typedText) {           
        if( global.messages_info[this.state.roomID][7] == 'joined' ) {
            new_name = this.state.txt
            await this.setState({ message_name:new_name })
            url = `http://${serverLocation}:80/update_group_name?chatID=${this.state.roomID}&chat_name=${new_name}`
            console.log(url)
            await fetch(url)
            await this.socket.emit('sending', { 
                    'sender':this.state.username,
                    'sender2':this.state.username, 
                    'sender_text_color':'#9b9b9b', 
                    'message': this.state.username + ' changed the chat name to: '+this.state.txt, 
                    'media':'none', 
                    'chatID':this.state.roomID, 
                    'roomID':this.state.roomID, 
            })
        }
    }
    if_group() {
        // if not group never show
        if(this.state.if_group == false) {
            return false
        }
        if(this.state.if_group == true && this.showing_search() == false ) {
            return true
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
                                        style={{flex:1, backgroundColor: 'black'}}
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
                                                    source={{uri: `http://${serverLocation}/${this.state.clicked_image}` }}
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
                                    width={125}
                                    height={125}
                                    style={{paddingRight:1, justifyContent:'center', alignContent:'center', paddingLeft:1, }}
                                />
                            </TouchableOpacity>
                            <View style={{height:20}}></View>
                            <TouchableOpacity 
                                onPress={() => {this.make_admin()}}
                                style={{width:150, height:30, backgroundColor:'#ECECEC', justifyContent:'center', alignContent:'center', alignItems:'center', borderRadius:20}}>
                                <View style={{width:200, height:40, backgroundColor:'#ECECEC', justifyContent:'center', alignContent:'center', alignItems:'center', borderRadius:20}}>
                                    <Text style={{textAlign:'center', fontFamily:'avenir next', fontSize:20, color:'#878585' }}>make admin</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{height:17.5}}></View>
                            <TouchableOpacity 
                                onPress={()=>{this.remove_user()}}
                                style={{width:150, height:30, backgroundColor:'#ECECEC', justifyContent:'center', alignContent:'center', alignItems:'center', borderRadius:20}}>
                                <View style={{width:200, height:40, backgroundColor:'#ECECEC', justifyContent:'center', alignContent:'center', alignItems:'center', borderRadius:20}}>
                                    <Text style={{textAlign:'center', fontFamily:'avenir next', fontSize:20, color:'red'}}>remove user</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </GestureRecognizer>
                </DialogContent>
            </Dialog>   
             
            {/* buffer */}
            <View style={{height:Dimensions.get('window').height*0.035, backgroundColor:'white', justifyContent:'center', alignContent:'center', alignItems:'center', alignSelf:'stretch'}}>        
            </View>         
            {/* group name */}
            <View style={{height:Dimensions.get('window').height*0.055, borderBottomColor:'#ececec', borderBottomWidth:0.75, flexDirection:'row', backgroundColor:'white', justifyContent:'center', alignContent:'center', alignItems:'center', alignSelf:'stretch'}}>
                <View style={{flex:1, }}>
                    <TouchableOpacity onPress={()=>{
                        this.props.navigation.state.params.returned(this.state.admin1,this.state.admin2,this.state.admin3, this.state.color, this.state.message_name), 
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
                
                { this.state.if_group && (
                <View style={{flex:4, justifyContent:'center', alignContent:'center', alignItems:'center' }}>
                    <TextInput
                        style={{color:'black', textAlign:'center', fontSize:24*factor_ver, fontWeight:'500', fontFamily:'avenir next', }}                    
                        color='black'
                        returnKeyType='next'
                        ref={input => { this.textInput = input }}
                        placeholder={this.state.message_name}
                        placeholderTextColor='black'
                        onChangeText = { (typedText) => { this.setState({txt:typedText}) }}
                        onSubmitEditing = {(typedText) => { this.change_name(typedText) } }
                        >
                    </TextInput>                
                </View>
                )}
                { !this.state.if_group && ( 
                <View style={{flex:4, justifyContent:'center', alignContent:'center', alignItems:'center' }}>
                <Text style={{color:'black', fontSize:24*factor_ver, fontWeight:'500', fontFamily:'avenir next', }}>{this.state.message_name}</Text>
                </View>
                )}
                
                <View style={{flex:1,}}></View>
            </View>            
            
            {/* data */}
            <View style={{flex:1, alignSelf:'stretch'}}>
                {/* chat facts */}
                <View style={{flex:0.4, paddingLeft:20*factor_hor, paddingRight:20*factor_hor, alignSelf:'stretch'}}>      
                    {/* buffer */}
                    <View style={{flex:0.25}}></View>
                    {/* admin names */}
                    <View style={{flex:1, justifyContent:'center', alignContent:'center', flexDirection:'row'}}>
                        <View style={{flex:2, marginRight:20*factor_hor, justifyContent:'center', alignContent:'center'}}>
                            <Text style={{fontSize:20, textAlign:'left', fontWeight:'500', color:'#9b9b9b', fontFamily:'avenir next', }}>Chat admins</Text>
                        </View>
                        <View style={{flex:3, justifyContent:'center', alignContent:'center' }}>
                           
                            <ScrollView horizontal={true}>
                                {this.state.admins.map((item, index) => {
                                    return ( 
                                        <View key={index} style={{justifyContent:'center', alignContent:'center'}}>
                                            <TouchableOpacity 
                                            onPress={() => {this.goProfile(index, this.state.admins[index])}} style={{justifyContent:'center', alignContent:'center'}}>
                                                <Text style={{fontSize:20, textAlign:'left', fontWeight:'500', color:'#9b9b9b', fontFamily:'avenir next', }}>[{this.state.admins[index]}] </Text>
                                            </TouchableOpacity>
                                        </View>
                                )})}
                            </ScrollView>  
                        </View>
                    </View>
                    {/* block convo */}
                    <View style={{flex:1, justifyContent:'center', alignContent:'center', flexDirection:'row'}}>
                        <View style={{flex:2, marginRight:20*factor_hor, justifyContent:'center', alignContent:'center'}}>
                            <Text style={{fontSize:20, textAlign:'left', fontWeight:'500', color:'#9b9b9b', fontFamily:'avenir next', }}>Admin chat</Text>
                        </View>
                        <TouchableOpacity style={{justifyContent:'center', marginTop:3, alignContent:'center'}} onPress={() => {this.props.navigation.navigate('ADMIN_CHAT', {chatID:this.state.roomID})}}>
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
                    <View style={{flex:0.25}}></View>
                    {/* search chat */}
                    <View style={{flex:0.75, flexDirection:'row',  borderRadius:10, backgroundColor:'#ececec'}}>            
                        <View style={{marginStart:9, flex:1, marginTop:7*factor_ver, marginBottom:0, marginEnd:3}}>
                                <Icon 
                                    size={22*factor_hor}
                                    style={{marginBottom:5*factor_ver}}
                                    name="magnifying-glass" 
                                    color='#626364'
                                    type='entypo' 
                                />
                        </View>    
                        <View style={{paddingLeft:2, flex:8,  marginTop:7*factor_ver,}}>
                        <TextInput style={{textAlign:'left', fontSize:20*factor_hor, marginBottom:8*factor_ver,  fontFamily:'Avenir Next' }}
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
                            <Text style={{fontSize:20, textAlign:'left', fontWeight:'500', color:'#9b9b9b', fontFamily:'avenir next', }}>Mute Notifications</Text>
                        </View>
                        <View style={{flex:2, justifyContent:'center', alignContent:'center' }}>
                            <TouchableOpacity onPress={() => {this.click_mute()}}>
                                <Text numberOfLines={2} style={{fontSize:20, textAlign:'left', fontWeight:'500', color:'#9b9b9b', fontFamily:'avenir next', }}>{this.muted()}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* buffer */}
                    <View style={{flex:0.5}}></View>
                </View>
                
                {/* members */}
                <View style={{flex:0.5, paddingLeft:20*factor_hor, paddingRight:20*factor_hor, alignSelf:'stretch'}}>
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
                            <View style={{marginStart:9, flex:1, marginTop:9*factor_ver, marginBottom:0, marginEnd:3}}>
                                    <TouchableOpacity onPress={() => {this.click_search()}}>
                                        <Icon 
                                            size={22*factor_hor}
                                            name="magnifying-glass" 
                                            color='#9b9b9b'
                                            type='entypo' 
                                        />
                                    </TouchableOpacity>
                            </View>    
                            <View style={{paddingLeft:2, flex:7, marginTop:9*factor_ver,}}>
                            <TextInput  style={{textAlign:'left', fontSize:20, fontFamily:'Avenir Next' }}
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
                            { this.if_group() && (
                            <View>
                            <TouchableOpacity onPress={() => {this.props.navigation.navigate('ADD_', {chatID:this.state.roomID} )}}>
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
                            { this.if_group() && (
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
                                                    delayLongPress={450} onLongPress={() => { this.setState({key_:index}), this.goprofile2(index) }}
                                                    onPress={() => {this.goProfile(index, this.state.selected_users2[index])}}>
                                                    <Text style={{textAlign:'center', color:'black', fontSize:20*factor_hor, fontFamily:'avenir next', }}>[ {this.state.selected_users2[index]} ]</Text>
                                                </TouchableOpacity>
                                            </View>
                                    )})}
                                </ScrollView>
                            </View>
                        </View>
                    )}
                    {/* show pictures */}
                    { !this.members_media() && ( 
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
                                                        source={{uri: `http://${serverLocation}/${this.state.imgs1[index][0]}` }}
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
                </View>    
            </View>

        <View style={{
            height:'5%', 
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
        <View style={{height:'5%'}}></View>
        </View>
      );
    }
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
