import React, {Component} from 'react';
import {StyleSheet, Text, Dimensions, AsyncStorage, 
    Platform, Alert, View, TouchableOpacity} from 'react-native';
import { Icon, } from 'react-native-elements'
import { TextInput, } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Dialog, { DialogContent, DialogButton, } from 'react-native-popup-dialog';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import AnonIcon from './svgs/anon_icon'
import WhiteLock from './svgs/white_lock'

const geolib = require('geolib');
var win_height = Dimensions.get('window').height
var received_rooms = [0,1]

export default class request_access extends React.Component {
    static navigationOptions = {header: null};
    constructor(props) {
        super(props);
        this.socket_rooms = global.socket_rooms
        this.state = {
            password:'',
            loading:false,
            visible7:false, 
        }
    }
    async componentDidMount() {
        user = await AsyncStorage.getItem('user')
        x = this.props.navigation.getParam("x")
        await this.setState({roomID:x[0], username:user, x:x, loading:true})
        console.log(this.state.x)
    }

    async join_room2() {
        
        member1 = this.state.username
        member2 = null

        if(this.state.is_anon == true  || this.state.is_anon == 'true' ) {
            member1 = 'Anonymous'
            member2 = this.state.username
        }

        global.room_message_info[this.state.x[0]] = [
            this.state.x[0],    
            member1,
            member2,
            "#FF7D61",
            false,
            null,
            'joined',
            this.state.x[1], // public
            this.state.x[2], // walk
            this.state.x[3], // world
            this.state.x[4], // name
            this.state.x[5], // admin onlt
            this.state.x[6], // num users
            this.state.x[7], // tags
            this.state.x[8], // name
            this.state.x[9], // admin1
            this.state.x[10], // admin2
            this.state.x[11], // admin3
            this.state.x[12], // lat
            this.state.x[13], // long
            this.state.x[14], // time
            this.state.x[15], // password
            this.state.x[16], // member count
            this.state.x[17], // room bio
            null, // admin4 
            null, // admin5 
            null, // admin5, 
            'in'
            ]
        global.room_message_dict[this.state.x[0]] = []
        
        AsyncStorage.setItem('room_messages', JSON.stringify(global.room_message_dict))
        AsyncStorage.setItem('room_messages_info', JSON.stringify(global.room_message_info))
        await this.socket_rooms.emit('joining_room', { 
                                    'room':this.state.x[0],
                                    'userID':this.state.username,
                                    'is_anon':this.state.is_anon
        })

        await this.props.navigation.navigate('VIEW_ROOM', {x:this.state.x})
    }

    async request_access() {
        // correct password
        if(this.state.password == this.state.x[15]) {
            // if allow anon room show dialog
            if( this.state.x[4] !== 'name' ) {
                // --> show dialog --> check if join as anon or username --> join room2
                await this.setState({visible7:true})
            }
            // otherwise build and enter room
            else {
                // build dict item
                global.room_message_info[this.state.x[0]] = [
                    this.state.x[0],    
                    this.state.username,
                    null,
                    "#FF7D61",
                    false,
                    null,
                    'joined',
                    this.state.x[1], // public
                    this.state.x[2], // walk
                    this.state.x[3], // world
                    this.state.x[4], // name
                    this.state.x[5], // admin onlt
                    this.state.x[6], // num users
                    this.state.x[7], // tags
                    this.state.x[8], // name
                    this.state.x[9], // admin1
                    this.state.x[10], // admin2
                    this.state.x[11], // admin3
                    this.state.x[12], // lat
                    this.state.x[13], // long
                    this.state.x[14], // time
                    this.state.x[15], // password
                    this.state.x[16], // member count
                    this.state.x[17], // room bio
                    null, // admin4 
                    null, // admin5 
                    null, // admin5, 
                    'in'
                    ]
                global.room_message_dict[this.state.x[0]] = []
                
                AsyncStorage.setItem('room_messages', JSON.stringify(global.room_message_dict))
                AsyncStorage.setItem('room_messages_info', JSON.stringify(global.room_message_info))
                
                await this.socket_rooms.emit('joining_room', { 
                                            'room':this.state.x[0],
                                            'userID':this.state.username,
                                            'is_anon':false
                })

                await this.props.navigation.navigate('VIEW_ROOM', {x:this.state.x})
            }      
        }
        // fail password --> request access
        else {
            // request access
            Alert.alert(
                'Incorrect password, access requested',
                '',
                [
                {text:'Ok',  onPress: () => {this.props.navigation.goBack()}},
                ],
                {cancelable: false},
            );
            url = `http://${serverLocation}:80/request_access?roomID=${this.state.roomID}&requestorID=${this.state.username}`
            await fetch(url)
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

    onSwipeLeft(gestureState) {
        this.props.navigation.goBack()
    }
    onSwipe(gestureName, gestureState) {
        
        const {SWIPE_LEFT} = swipeDirections;
        this.setState({gestureName: gestureName});
        
        switch (gestureName) {
        
        case SWIPE_LEFT:
            this.setState({public_visible:false, private_visible:false})    
            this.props.navigation.goBack()
            break;
        }
    }      

    render() {
    const config = {velocityThreshold: 0.3,directionalOffsetThreshold: 80};
    return (
    <View style={styles.container}>
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
        <View style={{flex:1, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
            <LinearGradient colors={['#FFA666', '#FF3757']} style={{flex:1, paddingLeft:30*factor_hor, paddingRight:30*factor_hor, opacity:1, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
                    <View style={{height:this.winHeight(), }}></View>
                    <View style={{flex:1, }}>
                        <TouchableOpacity style={{position:'absolute', flexDirection:'row', left:-10, top:10, zIndex:2, alignItems:'stretch', height:40, width:40, }} onPress={()=>{this.props.navigation.goBack()}}>
                            <Icon 
                                name="chevron-left"
                                color="white"
                                type='entypo'
                                size={30*factor_hor}
                            />
                            <View style={{flex:1}}></View>
                        </TouchableOpacity>
            
                        <View style={{height:win_height*0.02, }}></View>
                        <View style={{height:win_height*0.1, justifyContent:'center', alignContent:'center', }}>
                            <Text numberOfLines={1} style={{fontSize:28*factor_hor, textAlign:'center', fontFamily:'avenir next', color:'white', fontWeight:'600'}}>{this.state.x[8]}</Text>
                        </View>
                        <View style={{height:win_height*0.015, }}></View>
                        <View style={{height:win_height*0.1,}}>
                            <Text numberOfLines={2} style={{fontSize:22*factor_hor, fontWeight:'600', textAlign:'center', fontFamily:'avenir next', color:'white', }}>{this.state.x[17]}</Text>
                        </View>
                        <View style={{height:win_height*0.2, justifyContent:'center', alignItems:'center', alignContent:'center', }}>
                            <WhiteLock
                                width={Dimensions.get('window').width*0.25}
                                height={Dimensions.get('window').width*0.25}
                                style={{
                                        justifyContent:'center',
                                        alignContent:'center',
                                        }}
                            />                             
                        </View>
                        <View style={{height:win_height*0.1, justifyContent:'center', alignContent:'center',}}>
                            <Text style={{fontSize:24*factor_hor, color:'white', fontWeight:'500', textAlign:'center', fontFamily:'avenir next', }}>This room is private</Text>
                        </View>
                        <View style={{flex:1,  }}>
                            <View style={{flex:0,}}></View>
                            <View style={{flex:1.75, }}>
                                <View style={{flex:1,}}></View>
                                <View style={{flex:1, justifyContent:'center', alignContent:'center', }}>
                                    <Text style={{fontSize:20*factor_hor, color:'white', fontWeight:'400', textAlign:'center', fontFamily:'avenir next', fontWeight:'300'}}>Enter passcode</Text>
                                </View>
                                <View style={{flex:0.25,}}></View>
                                <View style={{flex:0.8, flexDirection:'row'}}>
                                        <View style={{flex:1, }}></View>
                                        <View style={{flex:1.75, borderRadius:10, }}>
                                            <TextInput 
                                                    style={{fontFamily:'avenir next', backgroundColor:'white', borderRadius:7*factor_ver, flex:1, textAlign:'center', fontSize:factor_ver*18,}}
                                                    placeholder='*****'
                                                    placeholderTextColor='#FF3757'
                                                    secureTextEntry={true}
                                                    maxLength={20}
                                                    onChangeText={(typedText) => {this.setState({password: typedText})}}
                                            > 
                                            </TextInput>
                                        </View>
                                        <View style={{flex:1, }}></View>
                                </View>
                            </View>
                            <View style={{flex:1, }}></View>
                            <TouchableOpacity
                                onPress={() => {this.request_access()}}
                                style={{flex:0.5, justifyContent:'center', alignContent:'center', borderRadius:10*factor_hor, backgroundColor:'#ececec'}}>
                                <View style={{ flex:1.25, justifyContent:'center', alignContent:'center', borderRadius:10*factor_hor, backgroundColor:'white'}}>
                                    <Text style={{textAlign:'center', color:'#FF3757', fontFamily:'avenir next', fontSize:22*factor_hor,}}>
                                        Request Access
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{flex:0.5, }}></View>
                        </View>
                    </View>
                    <View style={{height:this.winHeight(), }}></View>

            </LinearGradient>
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
