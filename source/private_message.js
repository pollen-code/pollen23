import React, {Component} from 'react';
import {StyleSheet, TouchableHighlight, Text, Alert,
        Dimensions, AsyncStorage, Platform, View, 
        TouchableOpacity} from 'react-native';
import { Icon, } from 'react-native-elements'
import { TextInput, FlatList } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import moment from  'moment-timezone';

const win_height = Dimensions.get('window').height

export default class private_message extends React.PureComponent {
    static navigationOptions = {header: null}
    constructor(props) {
        super(props);
        this.socket = global.socket
        this.state = {
            search_term:'',
            all:[],
            isFetching:false, 
        }
    }

    async returned(color){
        await this.setState({
            search_term:'',
            all:[], 
            isFetching:false, 
        })    
        await this.get_chat()   
    }
    async componentDidMount() {
        await this.props.navigation.getParam("returning")
        await this.get_chat()
    }
    if_ios() {
        if(Platform.OS === 'ios') {
            if ( Dimensions.get('window').height > 811) {
                return true
            }
        }
        else {
            return true
        }
    }
    async get_chat() {
        message_dict = JSON.parse( await AsyncStorage.getItem('messages') ) 
        messages_info = JSON.parse(await AsyncStorage.getItem('messages_info'))
        username = await AsyncStorage.getItem('user')

        await fetch(`http://${serverLocation}:80/get_chats?userID=${username}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    message_dict:message_dict, 
                    messages_info:messages_info, 
                    conversations:responseJson, 
                    username:username, 
                })
            })
            .catch((error) => {
                console.log(error)
                Alert.alert("Check your connection and try again")
            })      
    }
    get_date1(index) {
        if(this.state.conversations[index][11] == 'no' ) {
            date = moment(this.state.conversations[index][1]*1000).tz(timezone)
            date = date.format('MMMM DD, YYYY').toString()
            return date
        }
    }
    get_date2(index) {
        if(this.state.conversations[index][11] == 'no' ) {
            date = moment(this.state.conversations[index][1]*1000).tz(timezone)
            date = date.format('hh:mm A').toString()
            return date
        }
    }    
    what_name(index) {
        // if privatechat
        if(this.state.conversations[index][2] == 0) {
            // admin is creator
            // second member is non creator

            // if admin or second member anon return anon
            if( this.state.conversations[index][5] == 'Anonymous' || this.state.conversations[index][4] == 'Anonymous') {
                return 'Anonymous'
            }
            else if(this.state.conversations[index][5] == this.state.username) {
                return this.state.conversations[index][4]
            }
            else {
                return this.state.conversations[index][5]
            }
        }
        // if groupchat return chat name
        else {
            return this.state.conversations[index][3]    
        }
    }
    what_members(index) {
        // private
        admin = 0

        if( typeof(this.state.conversations[index][5]) !== 'undefined' && this.state.conversations[index][5] !== '' && this.state.conversations[index][5] !== null) {
            admin = this.state.conversations[index][5]
        }
        else if( typeof(this.state.conversations[index][6]) !== 'undefined' && this.state.conversations[index][6] !== '' && this.state.conversations[index][6] !== null)  {
            admin = this.state.conversations[index][6]
        }
        else if( typeof(this.state.conversations[index][7]) !== 'undefined' && this.state.conversations[index][7] !== '' && this.state.conversations[index][7] !== null) {
            admin = this.state.conversations[index][7]
        }

        if(this.state.conversations[index][2] == 0) {
            return 'by  [ '+ this.state.conversations[index][5].toString() +' ]'
        }
        else {
            users = '[ ' + admin+',  ' + this.state.conversations[index][0] + ' ]'
            return users
        }
        
    }
    what_message(index) {
        chatID = this.state.conversations[index][10]
        if(msg == undefined ) {
            return 'You are invited to the chat'
        }
        else if( global.messages_info[chatID][7] == 'left' ) {
            return 'You left the chat'
        }
        else if( global.messages_info[chatID][7] == 'invited' ) {
            return 'You are invited to the chat'
        }
        else {
            return this.state.conversations[index][8]
        }
    }
    if_left(index) {
        chatID = this.state.conversations[index][10]
        msg = global.messages_info[chatID] 

        if(msg == undefined) {
            return true
        }
        else if( global.messages_info[chatID][7] == 'left' ) {
            return false
        }
        else {
            return true
        }
    }
    search(typedText) {
        if(typedText.length > 0) {
            this.setState({conversations:[]},function(){console.log(this.state.conversations)})

            url = `http://${serverLocation}:80/get_chats_searched?userID=${this.state.username}&search_term=${typedText.toString()}`
            console.log(url)
            fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({conversations:responseJson},function(){console.log(this.state.conversations)})
            })
            .done()      
        }
        else {
            // if on groups
            if(this.state.groups_width == '600') {
                this.setState({conversations:this.state.groups},function(){console.log(this.state.conversations)})
            }
            else {
                this.setState({conversations:this.state.private_chats},function(){console.log(this.state.conversations)})
            }
        }
    }
    what_name2(index) {
        if(this.state.conversations[index][2] == 1) {
            return this.state.conversations[index][3]
        }
        else if(this.state.conversations[index][4] !== this.state.username) {
            return this.state.conversations[index][4]
        }
        else if(this.state.conversations[index][5] !== this.state.username) {
            return this.state.conversations[index][5]            
        }
    }
    what_color(index) {
        if( typeof(messages_info[this.state.conversations[index][10]]) == 'undefined') {
            return '#f9a32c'
        }
        else {
            return messages_info[this.state.conversations[index][10]][1]
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

    render() {
    return (
    <View style={styles.container}>
        <LinearGradient colors={['#FAD15C','#F89335']} style={{ opacity:0.85, alignSelf:'stretch'}}>
            {/* Buffer */}
            <View style={{height: this.winHeight(), }}></View>
            {/* Search */}
            <View style={{height:(20+ win_height*0.015 ),  justifyContent:'center', alignContent:'center', flexDirection:'row', }}>
                    {/* Arrows */}
                    <View style={{flex:0.25, justifyContent:"center", alignContent:'center', alignItems:'center'}}>
                        <TouchableHighlight underlayColor={'transparent'}  onPress={()=> { this.props.navigation.navigate('PRIVATE_MESSAGE_SETTINGS')} }style={{marginStart:4, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                            <Icon 
                                size={10+15*factor_hor}
                                name="select-arrows" 
                                color="black" 
                                type='entypo' 
                            />
                        </TouchableHighlight>
                    </View>
                    {/* Search */}
                    <View style={{flex:1.25, backgroundColor:'#FBD7A0', borderRadius:10*factor_hor,flexDirection:'row'}}>
                        <View style={{flex:1, marginTop:-1,justifyContent:'center', }}>
                            <TouchableHighlight underlayColor={'transparent'} style={{marginStart:9, marginEnd:5}}>
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
                                            onSubmitEditing = {() => { this.click_private(), this.textInput.clear(); this.setState( {search_term:''}) } }
                            >
                            </TextInput>
                        </View>
                    </View> 
                    {/* Post */}
                    <View style={{flex:0.25, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                        <TouchableHighlight underlayColor={'transparent'} onPress={() => {this.props.navigation.push('CREATE_MESSAGE')}} style={{justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                                <Icon 
                                    size={10+15*factor_hor}
                                    name="new-message" 
                                    color="black" 
                                    type='entypo' 
                                />
                        </TouchableHighlight>
                    </View>            
            </View>
            {/* buffer */}
            <View style={{height:10*factor_hor}}></View>
        </LinearGradient>      
                        
        {/* messages */}
        <View style={{flex:1.1, alignSelf:'stretch'}}>
            <FlatList
                data={this.state.conversations}
                extraData={this.state}
                style={{backgroundColor:'white', flex:1}}
                scrollEnabled={!this.state.isSwiping}
                keyExtractor={(item,index) => (index).toString()}
                renderItem={({item, index}) => (                 
                <View key={index} style={{ minHeight:10, alignSelf:'stretch', backgroundColor:'white', }}>   
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.push('VIEW_MESSAGE', {returned: this.returned.bind(this), 
                        data:{
                            chatID:this.state.conversations[index][10], 
                            admin1:this.state.conversations[index][5], 
                            admin2:this.state.conversations[index][6], 
                            admin3:this.state.conversations[index][7],   
                            time_leave:this.state.conversations[index][12], 
                            if_left:this.state.conversations[index][11], 
                            color:this.what_color(index), 
                            num_users:this.state.conversations[index][0], 
                            chat_type:this.state.conversations[index][2], 
                            name:this.what_name2(index)
                            } 
                        })
                    }}>
                    <View style={{height:Dimensions.get('window').height*0.1, borderBottomColor:'#ececec', borderBottomWidth:1, backgroundColor:'white'}}>
                        <View style={{flex:2, backgroundColor:'white', flexDirection:'row', }}>
                            <View style={{flex:4, }}>
                                <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                    {/* nik name */}
                                    <Text style={{ marginStart:20*factor_hor, fontFamily:'Avenir Next', fontSize:18*factor_hor, }}>{this.what_name(index)}</Text>
                                </View>
                            </View>
                            <View style={{flex:3, }}>
                                { this.if_left(index) && ( 
                                <View style={{flex:1, justifyContent:'center', alignContent:'center' }}>
                                    {/* date */}
                                    <Text style={{textAlign:'center', fontSize:14*factor_hor, color:'#9B9B9B', }}>{this.get_date1(index)}</Text>
                                    <Text style={{textAlign:'center', fontSize:14*factor_hor, color:'#9B9B9B', }}>{this.get_date2(index)}</Text>
                                </View>                            
                                )}
                            </View>
                        </View>
                        <View style={{flex:1, backgroundColor:'white', flexDirection:'row',}}>
                            <View style={{flex:4,}}>
                                {/* last message */}
                                <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                    <Text 
                                        style={{ marginStart:20*factor_hor, marginEnd:30, marginBottom:0, fontFamily:'Avenir Next', fontSize:14*factor_hor, color:'grey'}} 
                                        numberOfLines={1}>{this.what_message(index)}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
            </TouchableOpacity>
            </View>
            )}/>        
        </View>
        
        {/* bottom bar */}
        {this.if_ios() && (
        <View style={{borderTopWidth:1, borderTopColor:'#ECECEC', alignSelf:'stretch', backgroundColor:'white', alignItems:'center', alignContent:'space-around', justifyContent:'space-around'}}>
            <View style={{height:50*factor_hor, flexDirection:'row', borderTopWidth:1, borderTopColor:'#ECECEC', alignSelf:'stretch', backgroundColor:'white', opacity:0.9, alignItems:'center', alignContent:'space-around', justifyContent:'space-around'}}> 
                <View style={{width:5}}></View>
                <TouchableHighlight style={{width:50,}} underlayColor={'transparent'} onPress={() =>  {this.props.navigation.navigate('ROOMS')}}>
                    <View>                   
                        <Icon
                            name='door'
                            color="black"
                            type='material-community'
                            size={29*factor_hor}
                        />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={{width:50,}} underlayColor={'transparent'} onPress={() =>  { this.props.navigation.navigate("FEED") }}>
                    <Icon
                        name='text-document'
                        color="black"
                        type='entypo'
                        size={25*factor_hor}
                    />
                </TouchableHighlight>
                <TouchableHighlight style={{width:50,}} underlayColor={'transparent'}>
                    <View> 
                        <Icon
                            name='email'
                            color='#fac45c'
                            size={25*factor_hor}
                        />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor={'transparent'} style={{width:50, }} onPress={() =>  {this.props.navigation.navigate('PROFILE')}}>
                <Icon
                    name='user'
                    color='black'
                    type='entypo'
                    size={25*factor_hor}
                />
            </TouchableHighlight>    
                <View style={{width:5}}></View>
            </View>

            <View style={{height:18*factor_ver, borderColor:'white'}}></View>         
        </View>
        )}
        {!this.if_ios() && (
        <View style={{height:50*factor_hor, flexDirection:'row', borderTopWidth:1, borderTopColor:'#ECECEC', alignSelf:'stretch', alignItems:'center', alignContent:'space-around', justifyContent:'space-around'}}> 
            <View style={{width:5}}></View>
            <TouchableHighlight underlayColor={'transparent'} style={{width:50}} onPress={() =>  {this.props.navigation.navigate('ROOMS')}}>
                <View>                   
                    <Icon
                        name='door'
                        color="black"
                        type='material-community'
                        size={29*factor_hor}
                    />
                </View>
            </TouchableHighlight>
            <TouchableHighlight style={{width:50,}} underlayColor={'transparent'} onPress={() =>  {this.props.navigation.navigate("FEED")}}>
                <Icon
                    name='text-document'
                    color='black'
                    type='entypo'
                    size={25*factor_hor}
                />
            </TouchableHighlight>
            <TouchableHighlight underlayColor={'transparent'} style={{width:50}}>
                <View>
                 
                    <Icon
                        name='email'
                        color='#fac45c'
                        size={25*factor_hor}
                    />
                </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor={'transparent'} onPress={() => {this.props.navigation.navigate('PROFILE')} } style={{width:50,}}>
                <Icon
                    name='user'
                    color='black'
                    type='entypo'
                    size={25*factor_hor}
                />
            </TouchableHighlight>
            <View style={{width:5}}></View>
        </View>
        )}      
      </View>
    )
}}

const styles = StyleSheet.create({
  
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },


});
