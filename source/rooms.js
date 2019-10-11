import React, {Component} from 'react';
import {StyleSheet, Text,Animated, Dimensions, Keyboard, Modal,
        TouchableHighlight, AsyncStorage, Platform, RefreshControl,
        Alert, View, TouchableOpacity} from 'react-native';
import { Icon, } from 'react-native-elements'
import { TextInput, FlatList } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Permissions from 'react-native-permissions';
import Pin from './svgs/pin'
import GreyPin from './svgs/grey_pin'
import Following from './svgs/following'
import Locked from './svgs/locked'
import Unlocked from './svgs/unlocked'
import MapView, {Marker, Circle} from 'react-native-maps';

const geolib = require('geolib');
const win_height = Dimensions.get('window').height
const dist = {'world':20000, 'city':20000, 'local':2000, 'micro':200} 
const distance = {'world':10000000, 'city':8000, 'local':800, 'micro':80} 
var my_received_rooms = [0,1]

export default class rooms extends React.Component {
    static navigationOptions = {header: null};
    constructor(props) {
        super(props);
        this.socket_rooms = global.socket_rooms 
        this.user_location = global.user_position 
        this.state = {
            // search
            search_term:'', // search room name
            textInput:'', // text for search

            // fetched data
            loading:false, // if loading rooms
            selected_data: [], // data currently showing
            rooms_data: [], // rooms data
            my_rooms_data: [], // my rooms data
            isFetching:false,
            // background colors
            col1:'#FFA666', // first color in gradient
            col2:'#FF3757', // second color in gradient
            search_bg:'#FFD0AF', // search background color
            page_:'r o o m s', // page currently on 
            is_four_squares:true,
            height_show_page:new Animated.Value(0), // start with show_page closed
            four_squares:new Animated.Value(1), // start with four squares open
            view025:new Animated.Value(Dimensions.get('window').width*0.025), 
            view46:new Animated.Value(Dimensions.get('window').width*0.46), 
            view40:new Animated.Value(Dimensions.get('window').width*0.4), 
            received_rooms:[0,1],
            seenRooms:false,
            username:'', 
            region: {
                latitude:0, 
                longitude:0,
                latitudeDelta:0,
                longitudeDelta:0
            },
            rooms: [],
            posts: [],
            mapLoaded:false, 
        }
    }
    async componentDidMount() {
        seenRooms = await AsyncStorage.getItem('seenRooms')
        if(seenRooms == 'false' || seenRooms == false) {
            this.setState({ seenRooms:true})    
        }
        await Permissions.check('location')
        .then(response => {
            if(response == 'authorized') {
                if( typeof(global.user_position.coords.latitude) == 'undefined') {
                    Alert.alert("Could not get location")
                    return 
                }
            }
            else if(response !== 'authorized') {
                Alert.alert("Please allow access to your location to use Pollen", "Access can be changed in your phone's settings")
                ios = false
                if(Platform.OS === 'ios') {
                    if ( Dimensions.get('window').height > 811) {
                        ios = true                    
                    }
                }
                this.setState({is_ios_x:ios})
                return 
            }
        })
        user = await AsyncStorage.getItem('user')
        await this.setState({username:user})
    }
    async get_rooms() {
        if(this.state.loading == false) {
            this.setState({loading:true})
            url = `http://${serverLocation}:80/show_rooms?`
            await fetch(url, {
                method:'POST',
                headers:{    
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                body: 
                JSON.stringify({
                    userID:this.state.username,  
                    latitude:global.user_position.coords.latitude, 
                    longitude:global.user_position.coords.longitude,          
                    received_rooms: '['+(this.state.received_rooms).toString()+']',
            })})
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    rooms_data:[...this.state.rooms_data, ...responseJson], 
                    loading:false,
                    selected_data:responseJson
                })
            })
            .catch((error) => {
                Alert.alert("Check your connection and try again")
                console.log(error)
            });  
        }          
    }
    async get_my_rooms() {
        if(this.state.loading == false) {
            this.setState({loading:true})
            url = `http://${serverLocation}:80/show_my_rooms?`
            await fetch(url, {
                method:'POST',
                headers:{    
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                body: 
                JSON.stringify({
                    userID:this.state.username
            })})
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                for(key in responseJson) {
                    my_received_rooms.push(responseJson[key][0])
                }
                this.setState({
                    my_rooms_data:[...this.state.my_rooms_data, ...responseJson], 
                    loading:false,
                    selected_data:responseJson
                })
            })
            .catch((error) => {
                Alert.alert("Check your connection and try again")
                console.log(error)
            });  
        }         
    }
    async get_map() { 
        user = await AsyncStorage.getItem('user')
        y = geolib.getBoundsOfDistance({ latitude:this.user_location.coords.latitude, 
            longitude:this.user_location.coords.longitude},  dist['local'])
        y2 = ( y[1]['longitude'] - y[0]['longitude'] )/2
        y3 = ( y[1]['latitude'] - y[0]['latitude'] )/2 
    
        await this.setState({
            region: {
                latitude:this.user_location.coords.latitude, 
                longitude:this.user_location.coords.longitude,
                latitudeDelta:y3,
                longitudeDelta:y2
            },
        })

        // fetch posts
        url = `http://${serverLocation}:80/get_posts_coords?lat_high=${+y[1]['latitude']}&lat_low=${y[0]['latitude']}&long_low=${y[0]['longitude']}&long_high=${y[1]['longitude']}`
        await fetch(url)
        .then((response) => response.json())
        .then((responseJson2) => {
            this.setState({posts:responseJson2})
        })  

        url = `http://${serverLocation}:80/get_rooms_coords?userID=${user}&lat_high=${y[1]['latitude']}&lat_low=${y[0]['latitude']}&long_low=${y[0]['longitude']}&long_high=${y[1]['longitude']}`
        await fetch(url)
        .then((response) => response.json())
        .then((responseJson2) => {
            this.setState({rooms:responseJson2})
        })
    }
    async search(typedText) {
        search_term = typedText
        if(this.state.loading == false) {
            // make rooms
            if(this.state._isRooms == false) {
                await this.press_rooms()
            }

            await this.setState({
                selected_data:[],
                loading:true
            })
            // fetch seaerch
            url = `http://${serverLocation}:80/show_searched_rooms?`
            await fetch(url, {
                method:'POST',
                headers:{    
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                body: 
                JSON.stringify({
                    userID:this.state.username,  
                    latitude:global.user_position.coords.latitude, 
                    longitude:global.user_position.coords.longitude,          
                    search_term:search_term
                })})
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        selected_data:responseJson, 
                        loading:false,
                    })
                })
                .catch((error) => {
                    console.log(error)
                });  
            }        
    }
    room_preview(index) {
        if(this.state.selected_data[index][1] == 'private') {
            this.props.navigation.navigate('REQUEST_ACCESS', {x:this.state.selected_data[index]} )
        }
        else if(this.state.selected_data[index][1] == 'public') {
            this.props.navigation.navigate('ROOM_PREVIEW', {x:this.state.selected_data[index]} )
        }        
    }
    async enter_myroom(index) {
        // go to chat for my room
        roomID = this.state.selected_data[index][0]
        if( global.room_message_info[roomID][6] == 'invited' ) {
            this.props.navigation.navigate('ROOM_PREVIEW', {x:this.state.selected_data[index]} )
        }
        else {
            await this.props.navigation.push('VIEW_ROOM', {x:this.state.selected_data[index]})
        }
    }

    press_select() {
        this.setState({mapLoaded:false})
        this.setState({is_four_squares:true},function(){console.log(this.state.is_four_squares)})
        Animated.timing(this.state.four_squares, {toValue:1, duration:250}).start()
        Animated.timing(this.state.height_show_page, {toValue:0, duration:250}).start()
        Animated.timing(this.state.view40, {toValue:Dimensions.get('window').width*0.4, duration:250}).start()
        Animated.timing(this.state.view46, {toValue:Dimensions.get('window').width*0.46, duration:250}).start()
        Animated.timing(this.state.view025, {toValue:Dimensions.get('window').width*0.025, duration:250}).start()
        this.setState({ 
            col1:'#FFA666', 
            col2:'#FF3757', 
            search_bg:'#FFD0AF', 
            page_:'r o o m s',
        })
    }
    press_settings() {
        this.props.navigation.navigate('ROOMS_SETTINGS')
    }
    async press_my_rooms() {
        await this.setState({selected_data:[]})
        // fetch my rooms
        await this.setState({ 
            _isMap:false,
            _isRooms:false,
            _isMyRooms:true,
            col1:'#FFA667',
            col2:'#FFA667',
            search_bg:'#FFD0AF', 
            page_:'m y  r o o m s',
        },function(){console.log(this.state.selected_data, this.state._isMyRooms, this.state._isRooms, this.state._isMap)})
        await this.setState({is_four_squares:false},function(){console.log(this.state.is_four_squares)})
        await Animated.timing(this.state.four_squares, {toValue:0, duration:250}).start()
        await Animated.timing(this.state.height_show_page, {toValue:1, duration:250}).start()
        await Animated.timing(this.state.view40, {toValue:0, duration:250}).start()
        await Animated.timing(this.state.view46, {toValue:0, duration:250}).start()
        await Animated.timing(this.state.view025, {toValue:0, duration:250}).start()
        await setTimeout(() => {this.get_my_rooms();}, 225);
    }
    async press_map() {
        await this.setState({ 
            selected_data:[],
            _isMap:true,
            _isMyRooms:false,
            _isRooms:false,
            col1:'#FF605D',
            col2:'#FF605D',
            search_bg:'#FFACAB',
            page_:'m a p',
            is_four_squares:false,
        })
        this.get_map()
        await Animated.timing(this.state.four_squares, {toValue:0, duration:0}).start()
        await Animated.timing(this.state.height_show_page, {toValue:1, duration:0}).start()
        await Animated.timing(this.state.view40, {toValue:0, duration:0}).start()
        await Animated.timing(this.state.view46, {toValue:0, duration:0}).start()
        await Animated.timing(this.state.view025, {toValue:0, duration:0}).start()
        await this.setState({mapLoaded:true})
    }
    async press_rooms() {
        await this.setState({selected_data:[]})
        // fetch api for people
        await this.setState({ 
            _isMap:false,
            _isRooms:true,
            _isMyRooms:false,
            col1:'#FF7B60',
            col2:'#FF7B60',
            search_bg:'#FFBAAD',
            page_:'r o o m s',
        })
        await this.setState({is_four_squares:false},function(){console.log(this.state.is_four_squares)})
        await Animated.timing(this.state.four_squares, {toValue:0, duration:250}).start()
        await Animated.timing(this.state.height_show_page, {toValue:1, duration:250}).start()
        await Animated.timing(this.state.view40, {toValue:0, duration:250}).start()
        await Animated.timing(this.state.view46, {toValue:0, duration:250}).start()
        await Animated.timing(this.state.view025, {toValue:0, duration:250}).start()
        await setTimeout(() => {this.get_rooms();}, 225);
    }
    if_ios() {
        if(Platform.OS === 'ios') {
            if ( Dimensions.get('window').height > 811) {
                return true
            }
            else {
                return false
            }
        }
        else {
            return false
        }
    }
    is_email() {
        if( global.message_count > 0 ) {
            return true
        }
        else {
            return false
        }
    }
    what_pin(index) {
        if(this.state.selected_data[index][1] == 'friend') {
            return <Following
                width={20*factor_hor}
                height={20*factor_hor}
                style={{
                        marginRight:5,
                        marginTop:2.5*factor_ver,
                        justifyContent:'center',
                        alignContent:'center',
                        }}
            />
        }
        roomID = this.state.selected_data[index][0] 
        // if in room radius show normal pin
        if(global.room_message_info[roomID][27] == 'in' ||  global.room_message_info[roomID][9] == 'world') {
            return <Pin 
                width={20*factor_hor}
                height={20*factor_hor}
                style={{
                    marginRight:5,
                    justifyContent:'center',
                    alignContent:'center',
                }}
            />
        }
        else if(global.room_message_info[roomID][27] == 'out') {
            return <GreyPin
                width={20*factor_hor}
                height={20*factor_hor}
                    style={{
                        marginRight:5,
                        justifyContent:'center',
                        alignContent:'center',
                }}
            />
        }   
    }
    ifLock(index) {
        if(this.state.selected_data[index][1] == 'private') {
            return true
        }
        else {
            return false
        }
    }
    ifUnlock(index) {
        if(this.state.selected_data[index][1] == 'public') {
            return true
        }
        else {
            return false
        }
    }
    ifFriend(index) {
        if(this.state.selected_data[index][1] == 'friend') {
            return true
        }
        else {
            return false
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
            break;
          
        case SWIPE_DOWN:    
            this.setState({public_visible:false, private_visible:false})
            break;
        
        case SWIPE_LEFT:
            this.setState({public_visible:false, private_visible:false})    
            break;
          
        case SWIPE_RIGHT:
            this.setState({public_visible:false, private_visible:false})
            break;
        }
    }   
    what_color(index) {
        if(this.state.selected_data[index][21] == 'left') {
            return '#9b9b9b'
        }
        else {
            return '#000000'
        }
    }   
    if_invte(index) {
        roomID = this.state.selected_data[index][0]
        if( global.room_message_info[roomID][6] == 'invited' ) {
            return true
        }
        else {
            return false
        }
    }
    async refresh() {
        await this.setState({
            selected_data:[]
        })
        if(this.state.page_ == 'r o o m s') {
            await this.get_rooms();
        }
        else if(this.state.page_ == 'p e o p l e') {
            await this.get_map();
        }
        else if(this.state.page_ == 'm y  r o o m s') {
            await this.get_my_rooms();
        }
        await this.setState({
            isFetching:false
        })
    }
    color(index) {
        return Math.floor(Math.random() * Math.floor(5))
    }
    whatName(index) {
        if(typeof(this.state.selected_data[index][8]) == 'undefined') {
            if(this.state.selected_data[index][9] == this.state.username) {
                return this.state.selected_data[index][10]
            }
            else {
                return this.state.selected_data[index][9]
            }
        }    
        else {
            return this.state.selected_data[index][8]
        }
    }

    render() {
    const config = {velocityThreshold: 0.3,directionalOffsetThreshold: 80};
    return (
    <View style={styles.container}>
        <View style={{flex:1, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
            <Modal
                animationType="none"
                transparent={true}
                visible={this.state.seenRooms}
            >   
                <View style={{height:Dimensions.get('window').height, width:Dimensions.get('window').width, justifyContent:'flex-end', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.8)',}}>
                    <TouchableHighlight
                        onPress={() => {
                            this.setState({ seenRooms:false}), 
                            AsyncStorage.setItem('seenRooms', 'true')
                        }}
                        style={{flex:1,alignSelf:'stretch'}}
                    >
                        <View style={{ 
                            position:'absolute', 
                            top:200*factor_ver, 
                            zIndex:3, 
                            left:37.5*factor_hor, 
                            height:400*factor_hor, 
                            width:300*factor_hor, 
                            backgroundColor:'white',
                            borderRadius:20*factor_hor, 
                            borderColor:'red',
                            borderWidth:1,
                            paddingLeft:10*factor_hor,
                            paddingTop:10*factor_hor,
                            paddingBottom:10*factor_hor, 
                            paddingRight:10*factor_hor,
                            justifyContent:'space-around',
                            alignContent:'space-around',
                        }}>
                            <Text
                                minimumFontScale={0.3}
                                adjustsFontSizeToFit={true}
                                style={{fontSize:20*factor_hor}}
                            >
                                An admin can remove members from a room by pressing and holding someone's
                                name or by pressing and holding their name in room settings</Text>
                            <Text
                                minimumFontScale={0.3}
                                adjustsFontSizeToFit={true}
                                style={{fontSize:20*factor_hor}}
                            >
                                The admin can press and hold the send button to send an admin message.
                            </Text>
                            <Text
                                minimumFontScale={0.3}
                                adjustsFontSizeToFit={true}
                                style={{fontSize:20*factor_hor}}
                            >
                                The admin can change the room name and bio by clicking them in room settings.
                            </Text>
                            <Text
                                minimumFontScale={0.3}
                                adjustsFontSizeToFit={true}
                                style={{fontSize:20*factor_hor}}
                            >
                                Press the room's name to see a map and the room's radius.
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </Modal> 
            <LinearGradient colors={[this.state.col1,this.state.col2]} style={{flex:1, opacity:1, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
                {/* Buffer */}
                <View style={{height:this.winHeight(), }}></View>
                {/* Search */}
                <View style={{height:(20+ win_height*0.015 ),  justifyContent:'center', alignContent:'center', flexDirection:'row', }}>
                    {/* Arrows */}
                    <View style={{flex:0.25, justifyContent:"center", alignContent:'center', alignItems:'center'}}>
                        <TouchableHighlight underlayColor={'transparent'}  onPress={()=> { this.press_select(), this.textInput.clear(), Keyboard.dismiss()   }} style={{marginStart:4, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                            <Icon 
                                size={10+15*factor_hor}
                                name="select-arrows" 
                                color="black" 
                                type='entypo' 
                            />
                        </TouchableHighlight>
                    </View>
                    {/* Search */}
                    <View style={{flex:1.25, backgroundColor:'#FBD7A0', backgroundColor:this.state.search_bg, borderRadius:10*factor_hor,flexDirection:'row'}}>
                        <View style={{flex:1.25, marginTop:-1,justifyContent:'center',  }}>
                            <TouchableHighlight underlayColor={'transparent'} style={{marginStart:9, marginEnd:5, zIndex:3,}}>
                                        <Icon 
                                            size={20*factor_hor}
                                            name="magnifying-glass" 
                                            color='#626364' /// black
                                            type='entypo' 
                                        />
                            </TouchableHighlight>
                        </View>
                        <View style={{flex:7.5, justifyContent:'center', alignContent:'center', alignItems:'flex-start'}}>
                            <TextInput      style={{textAlign:'left',fontSize:factor_hor*20, marginRight:-10, fontFamily:'Avenir Next' }}
                                            hitSlop={{ "left":15, "right":60, "top":10, "down":10}}
                                            color='black'
                                            ref={input => { this.textInput = input }}
                                            placeholder=' Search'
                                            placeholderTextColor='#626364'///black
                                            onChangeText = { (typedText) => { this.search(typedText) }}
                                            onSubmitEditing = {(typedText) => { Keyboard.dismiss() } }
                            >    
                            </TextInput>
                        </View>
                    </View> 
                    {/* profile */}
                    <View style={{flex:0.25, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                        <TouchableHighlight underlayColor={'transparent'} onPress={()=> {this.props.navigation.navigate('PROFILE')} }  style={{justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                                <Icon 
                                    size={10+15*factor_hor}
                                    name="user" 
                                    color="black" 
                                    type='entypo' 
                                />
                        </TouchableHighlight>
                    </View>            
                
                    {/* Post */}
                    <View style={{flex:0.25, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                            <TouchableHighlight underlayColor={'transparent'} onPress={()=> {this.props.navigation.navigate('CREATE_ROOM')} }  style={{justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                                    <Icon 
                                        size={10+15*factor_hor}
                                        name="new-message" 
                                        color="black" 
                                        type='entypo' 
                                    />
                            </TouchableHighlight>
                        </View>            
                </View>

                {/* four squares */}
                {/* { this.state.is_four_squares && ( */}
                <View style={{flex:1}}>
                <Animated.View style={{flex:this.state.four_squares, justifyContent:'center', alignContent:'center', }}>
                    <View style={{flex:0.3, alignSelf:'stretch'}}></View>
                    {/* 4 boxes */}
                    <Animated.View style={{paddingLeft:Dimensions.get('window').width*0.025, paddingRight:Dimensions.get('window').width*0.025, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
                        <View style={{flexDirection:'row', alignSelf:'stretch'}}>
                            <TouchableOpacity onPress={() => {this.press_rooms()}}>
                                <Animated.View style={{width:this.state.view46, height:this.state.view40,justifyContent:'center', alignContent:'center', borderRadius:10*factor_hor, backgroundColor:'white', alignSelf:'stretch'}}>
                                    <Text style={{color:'#FFA666', fontSize:22*factor_hor, fontFamily:'avenir next', fontWeight:'400', textAlign:'center'}}>r o o m s</Text>
                                </Animated.View>
                            </TouchableOpacity>
                            <View style={{width:Dimensions.get('window').width*0.03,alignSelf:'stretch'}}></View>
                            <TouchableOpacity onPress={() => {this.press_my_rooms()}}>
                                <Animated.View style={{width:this.state.view46, height:this.state.view40,justifyContent:'center', alignContent:'center', borderRadius:10*factor_hor, backgroundColor:'white', alignSelf:'stretch'}}>
                                    <Text style={{color:'#FFA666', fontSize:22*factor_hor, fontFamily:'avenir next', fontWeight:'400', textAlign:'center'}}>m y  r o o m s</Text>
                                </Animated.View>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:Dimensions.get('window').width*0.03,}}></View>
                        <View style={{flexDirection:'row', alignSelf:'stretch'}}>
                            <TouchableOpacity onPress={() => {this.press_map()}}>
                                <Animated.View style={{width:this.state.view46, height:this.state.view40, justifyContent:'center', alignContent:'center', borderRadius:10*factor_hor, backgroundColor:'white', alignSelf:'stretch'}}>
                                    <Text style={{color:'#FFA666', fontSize:22*factor_hor, fontFamily:'avenir next', fontWeight:'400', textAlign:'center'}}>m a p</Text>
                                </Animated.View>
                            </TouchableOpacity>
                            <View style={{width:Dimensions.get('window').width*0.03,  alignSelf:'stretch'}}></View>
                            <TouchableOpacity onPress={() => {this.press_settings()}}>
                                <Animated.View style={{width:this.state.view46, height:this.state.view40, justifyContent:'center', alignContent:'center', borderRadius:10*factor_hor, backgroundColor:'white', alignSelf:'stretch'}}>
                                    <Text style={{color:'#FFA666', fontSize:22*factor_hor, fontFamily:'avenir next', fontWeight:'400', textAlign:'center'}}>s e t t i n g s</Text>
                                </Animated.View>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>

                    {/* buffer */}
                    <View style={{flex:0.3, alignSelf:'stretch'}}></View>
                </Animated.View>
                {/* )} */}
                
                {/* flatlist */}
                <Animated.View style={{flex:this.state.height_show_page , alignSelf:'stretch'}}>
                    <View style={{ flex:1, borderTopLeftRadius:10*factor_hor,borderTopRightRadius:10*factor_hor, marginLeft:7*factor_hor, marginRight:7*factor_hor, marginTop:7*factor_hor, backgroundColor:'white' }}>
                        <View style={{height:25}}>
                            <Text style={{ color:this.state.col1, fontFamily:'avenir next', fontSize:17*factor_hor, marginLeft:15, marginTop:5, }}>{this.state.page_}</Text>
                        </View>
                        {/* buffer */}
                        <View style={{height:10}}></View>
                        {/* data list */}
                        {this.state._isMap && ( 
                            <View style={{flex:1, alignSelf:'stretch'}}>
                                {this.state.mapLoaded && (
                                <View style={{flex:1, alignContent:'center', alignSelf:'stretch', justifyContent:'center'}}>
                                    <MapView
                                        {...this.state}
                                        style={{flex:1}}
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
                                        { this.state.posts.map((item, index) => {
                                            return (
                                                <Marker 
                                                key={index}
                                                coordinate={{
                                                    latitude:this.state.posts[index][0],
                                                    longitude:this.state.posts[index][1]
                                                }}
                                                >
                                                <View
                                                    style={{
                                                    height: 12,
                                                    width: 12,
                                                    borderRadius: 5,
                                                    backgroundColor: `rgba(255, ${180 / this.color(index)}, 0, ${this.color(index)/6})`
                                                    }}
                                                />
                                                </Marker>
                                            );
                                        })}
                                        { this.state.rooms.map((item, index) => {
                                            return (
                                            <Circle
                                            key={index}
                                            center={{
                                                latitude: this.state.rooms[index][0],
                                                longitude: this.state.rooms[index][1]
                                            }}
                                            radius={ distance[this.state.rooms[index][2]] }
                                            strokeColor={ 'rgba(252, 48, 4, 0)' }
                                            strokeWidth={1}
                                            fillColor={ `rgba(252, 48, 4, 0.1)` }
                                            />
                                            )}
                                            )}
                                        { this.state.rooms.map((item, index) => {
                                            return (
                                            <Marker coordinate={{latitude:this.state.rooms[index][0],
                                                    longitude:this.state.rooms[index][1]}}
                                            />
                                            )
                                        })}                
                                    </MapView>  
                                </View>
                                )}
                            </View>
                        )}
                        {!this.state._isMap && (
                        <FlatList
                            // refresh
                            refreshControl={
                            <RefreshControl
                                tintColor={'#ececec'}
                                refreshing={this.state.isFetching}
                                onRefresh={() => { this.setState({isFetching:true}, function() {console.log(this.state.isFetching)}), this.refresh()} }
                            />}
                            showsVerticalScrollIndicator={false}
                            data={this.state.selected_data}
                            extraData={this.state}
                            keyExtractor={(item,index) => (index).toString()}
                            renderItem={({item, index}) => ( 
                            <View key={index} style={{paddingRight:15*factor_hor, paddingLeft:15*factor_hor}}>
                                { this.state._isRooms && (
                                <TouchableOpacity onPress={()=>{this.room_preview(index)}}>
                                    <View style={{height:30*factor_hor, flexDirection:'row', justifyContent:'center', alignContent:'center'}}>
                                        {/* pinned or not */}
                                        <View style={{flex:0.25,justifyContent:'center', alignContent:'center', alignSelf:'stretch',}}></View>
                                        <View style={{flex:1, flexDirection:'row', justifyContent:'center',  alignContent:'center', alignSelf:'stretch',}}>
                                            <View style={{flex:1}}></View>
                                            { this.ifLock(index) && (
                                            <Locked
                                                width={20*factor_hor}
                                                height={20*factor_hor}
                                                style={{
                                                    marginRight:5,
                                                    justifyContent:'center',
                                                    alignContent:'center',
                                                }}
                                            />
                                            )}   
                                            { this.ifUnlock(index) && (
                                            <Unlocked
                                                width={20*factor_hor}
                                                height={20*factor_hor}
                                                style={{
                                                    marginRight:5,
                                                    justifyContent:'center',
                                                    alignContent:'center',
                                                }}
                                            />
                                            )}                                                         
                                        </View>
                                        {/* room name */}
                                        <Text style={{fontSize:20*factor_hor, fontFamily:'avenir next', textAlign:'center'}}> {this.whatName(index)} </Text>
                                        {/* number of people */}
                                        <View style={{flex:1,justifyContent:'center', alignContent:'center', alignSelf:'stretch',}}>
                                            <Text style={{fontSize:16*factor_hor, marginLeft:5, color:this.state.col1, fontFamily:'avenir next', textAlign:'left'}}>{this.state.selected_data[index][16]}</Text>
                                        </View> 
                                        <View style={{flex:0.25,justifyContent:'center', alignContent:'center', alignSelf:'stretch',}}></View>
                                    </View>
                                </TouchableOpacity>
                                )}
                                { this.state._isMyRooms && (
                                <TouchableOpacity onPress={()=>{this.enter_myroom(index)}}>
                                    <View style={{height:30*factor_hor, flexDirection:'row', justifyContent:'center', alignContent:'center'}}>
                                        {/* pinned or not */}
                                        <View style={{flex:1}}></View> 
                                        {this.what_pin(index)}
                                        {/* room name */}
                                        { this.if_invte(index) && (
                                        <Text style={{fontSize:20*factor_hor, color:this.what_color(index), fontFamily:'avenir next', textAlign:'center'}}>{this.state.selected_data[index][8]}*</Text>
                                        )}
                                        { !this.if_invte(index) && (
                                        <Text style={{fontSize:20*factor_hor, color:this.what_color(index), fontFamily:'avenir next', textAlign:'center'}}> {this.state.selected_data[index][8]} </Text>
                                        )}
                                        {/* number of people */}
                                        <View style={{flex:1, justifyContent:'center', alignContent:'center', alignSelf:'stretch',}}>
                                            <Text style={{fontSize:16*factor_hor, marginLeft:5, color:this.state.col1, fontFamily:'avenir next', textAlign:'left'}}>{this.state.selected_data[index][16]}</Text>
                                        </View> 
                                    </View>
                                </TouchableOpacity>
                                )}
                            </View>
                        )}>
                        </FlatList>
                        )}
                    </View>
                </Animated.View>
                </View>
        </LinearGradient>
        </View>
        <View 
            style={{
                position:'absolute',
                zIndex:3,
                bottom:20*factor_hor,
                left:20*factor_hor, 
                borderRadius:50,
                width:50, 
                height:50, 
                justifyContent:'center', 
                alignContent:'center', 
                alignItems:'center',
                backgroundColor:'white',
                borderWidth:0.25,
                borderColor:'#ececec',
                shadowOffset: { width: 0, height: 0 },
                shadowColor: '#f7f7f7',
                shadowOpacity: 1,
                shadowRadius: 7.5,
                elevation: 3,
            }}>
                <TouchableOpacity
                    underlayColor={'transparent'} 
                    style={{ width:50,}} 
                    onPress={() =>  this.props.navigation.navigate("FEED")}
                >
                    <Icon
                        name='text-document'
                        color='#ff835e'
                        type='entypo'
                        size={25*factor_hor}
                    />
                </TouchableOpacity> 
        </View>
    </View>
    )}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
});


