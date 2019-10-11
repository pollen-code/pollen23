import React from 'react';
import {StyleSheet, Text,  
        Dimensions, AsyncStorage, View, 
        TouchableOpacity} from 'react-native';
import { Icon, } from 'react-native-elements'

export default class private_message extends React.Component {
    static navigationOptions = {header: null}
    constructor(props) {
        super(props);
        this.state = {
            open_to_msgs_from:'',
            allow_anon:'',
            invisible_mode:'',
            sender_text_color:'',
            username:'',
        }
    }
    
    async componentDidMount() {
        username = await AsyncStorage.getItem('user')
        url = `http://${serverLocation}:80/get_message_settings?userID=${username}`
        console.log(url)
        await fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            responseJson = responseJson[0]
            console.log(responseJson)
            this.setState({
                username:username, 
                open_to_msgs_from:responseJson[0], 
                allow_anon:responseJson[3],
                invisible_mode:responseJson[2],
                sender_text_color:responseJson[1],
            })
        })
    }
    
    async finalize() {
        url = `http://${serverLocation}:80/update_message_settings?userID=${this.state.username}&open_to=${this.state.open_to_msgs_from}&invisible=${this.state.invisible_mode}&allow_anon=${this.state.allow_anon}&color=%23${this.state.sender_text_color.slice(1)}`
        console.log(url)
        await fetch(url)
        await this.props.navigation.goBack()
    }
    async returned(color) {
        if(color.length > 1) {
            console.log(color, 'COLOR')
            this.setState({sender_text_color:color},function(){console.log(this.state.sender_text_color)})
        }
    }    

    click_anyone(){
        this.setState({open_to_msgs_from:'everyone'})
    }
    click_followers(){
        this.setState({open_to_msgs_from:'followers'})
    }
    click_following(){
        this.setState({open_to_msgs_from:'following'})

    }
    click_noone(){
        this.setState({open_to_msgs_from:'noone'})

    }

    click_anyone_color(){
        if(this.state.open_to_msgs_from == 'everyone') {
            return 'white'
        }
        else {
            return '#979797'
        }
    }  
    click_followers_color(){
        if(this.state.open_to_msgs_from == 'followers') {
            return 'white'
        }
        else {
            return '#979797'
        }
    }
    click_following_color(){
        if(this.state.open_to_msgs_from == 'following') {
            return 'white'
        }
        else {
            return '#979797'
        }
    }
    click_noone_color(){
        if(this.state.open_to_msgs_from == 'noone') {
            return 'white'
        }
        else {
            return '#979797'
        }
    }

    click_anyone_bgcolor(){
        if(this.state.open_to_msgs_from == 'everyone') {
            return '#f9a32c'
        }
        else {
            return 'white'
        }
    }  
    click_followers_bgcolor(){
        if(this.state.open_to_msgs_from == 'followers') {
            return '#f9a32c'
        }
        else {
            return 'white'
        }
    }
    click_following_bgcolor(){
        if(this.state.open_to_msgs_from == 'following') {
            return '#f9a32c'
        }
        else {
            return 'white'
        }
    }
    click_noone_bgcolor(){
        if(this.state.open_to_msgs_from == 'noone') {
            return '#f9a32c'
        }
        else {
            return 'white'
        }
    }


    click_anonymous_yes(){
        this.setState({allow_anon:'yes'})
    }
    click_anonymous_no(){
        this.setState({allow_anon:'no'})
    }
    anonymous_no_color(){
        if(this.state.allow_anon == 'no') {
            return 'white'
        }
        else {
            return '#979797'
        }
    }
    anonymous_yes_color() {
        if(this.state.allow_anon == 'yes') {
            return 'white'
        }
        else {
            return '#979797'
        }
    }
    anonymous_no_colorbg(){
        if(this.state.allow_anon == 'no') {
            return '#f9a32c'
        }
        else {
            return 'white'
        }
    }
    anonymous_yes_colorbg() {
        if(this.state.allow_anon == 'yes') {
            return '#f9a32c'
        }
        else {
            return 'white'
        }
    }

    click_invisible_yes(){
        this.setState({invisible_mode:'yes'})
    }
    click_invisible_no(){
        this.setState({invisible_mode:'no'})
    }
    invisible_no_color(){
        if(this.state.invisible_mode == 'no') {
            return 'white'
        }
        else {
            return '#979797'
        }
    }
    invisible_yes_color() {
        if(this.state.invisible_mode== 'yes') {
            return 'white'
        }
        else {
            return '#979797'
        }
    }
    invisible_no_colorbg(){
        if(this.state.invisible_mode == 'no') {
            return '#f9a32c'
        }
        else {
            return 'white'
        }
    }
    invisible_yes_colorbg() {
        if(this.state.invisible_mode == 'yes') {
            return '#f9a32c'
        }
        else {
            return 'white'
        }
    }
 
    render() {
    return (
    <View style={styles.container}>
     
        <View style={{height:Dimensions.get('window').height*0.05, flexDirection:'row'}}></View>
        <View style={{height:Dimensions.get('window').height*0.045, flexDirection:'row'}}>
            <View style={{flex:0.25, justifyContent:'center', alignContent:'center', alignItems:'center', alignSelf:'stretch'}}>
                    <TouchableOpacity onPress={()=>{ this.finalize() }}>
                        <Icon
                            name='chevron-left'
                            color="black"
                            type='entypo'
                            size={30*factor_hor}
                            style={{marginTop:7*factor_hor}}
                        />      
                    </TouchableOpacity>
            </View>
            <View style={{flex:1, justifyContent:'center', alignContent:'center',  alignSelf:'stretch'}}>
            
                <Text style={{fontSize:25*factor_hor, fontWeight:'500', fontFamily:'avenir next', textAlign:'center'}}>Message Settings</Text>
            
            </View>
            <View style={{flex:0.25, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
                <View style={{height:20, width:20, backgroundColor:this.state.color, borderRadius:100}}></View>
            </View>
        </View>
        

        <View style={{flex:1, alignSelf:'stretch'}}>
        
            {/* accept from name */}
            <View style={{height:Dimensions.get('window').height*0.1, justifyContent:'center', alignContent:'center', alignSelf:'stretch' }}>
                <Text style={{textAlign:'center', fontWeight:'500', fontSize:20}}>Accept messages from</Text>
            </View>
            {/* accept click */}
            <View style={{height:Dimensions.get('window').height*0.05,paddingRight:20*factor_hor,paddingLeft:20*factor_hor,flexDirection:'row', alignSelf:'stretch' }}>
                <View style={{flex:1,justifyContent:'center', alignContent:'center',backgroundColor:this.click_anyone_bgcolor(),  borderRadius:10*factor_ver,borderWidth:1,borderColor:'#f9a32c'}}>
                    <TouchableOpacity onPress={() => {this.click_anyone()}}>
                        <Text style={{textAlign:'center',color:this.click_anyone_color(), fontSize:19*factor_hor, fontFamily:'avenir next'}}>Anyone</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width:Dimensions.get('window').height*0.01, alignSelf:'stretch' }}></View>
                <View style={{flex:2,borderRadius:10*factor_ver,justifyContent:'center', backgroundColor:this.click_followers_bgcolor(), alignContent:'center', borderWidth:1, borderColor:'#f9a32c'}}>
                    <TouchableOpacity onPress={() => {this.click_followers()}}>
                        <Text style={{textAlign:'center', color:this.click_followers_color(), fontSize:20*factor_hor,fontFamily:'avenir next'}}>Followers & Following</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* buffer */}
            <View style={{height:Dimensions.get('window').height*0.01, alignSelf:'stretch' }}></View>
            {/* accept click */}
            <View style={{height:Dimensions.get('window').height*0.05,paddingRight:40*factor_hor, paddingLeft:40*factor_hor,flexDirection:'row', alignSelf:'stretch' }}>
                <View style={{flex:1.62,justifyContent:'center', alignContent:'center', borderRadius:10*factor_ver,backgroundColor:this.click_following_bgcolor(), borderWidth:1,borderColor:'#f9a32c'}}>
                    <TouchableOpacity onPress={() => {this.click_following()}}>
                        <Text style={{textAlign:'center', color:this.click_following_color(), fontSize:20*factor_hor,fontFamily:'avenir next'}}>Following Only</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{width:Dimensions.get('window').height*0.01, alignSelf:'stretch' }}></View>
                <View style={{flex:1, justifyContent:'center', alignContent:'center', borderRadius:10*factor_ver,backgroundColor:this.click_noone_bgcolor(),borderWidth:1,borderColor:'#f9a32c'}}>
                    <TouchableOpacity onPress={() => {this.click_noone()}}>
                        <Text style={{textAlign:'center', color:this.click_noone_color(), fontSize:20*factor_hor, fontFamily:'avenir next'}}>No One</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* buffer */}
            <View style={{height:Dimensions.get('window').height*0.01, alignSelf:'stretch' }}></View>
            
            {/* anonymous name */}
            <View style={{height:Dimensions.get('window').height*0.1, justifyContent:'center', alignContent:'center', alignSelf:'stretch' }}>
                <Text style={{textAlign:'center', fontWeight:'500', fontSize:20}}>Allow anonymous messages?</Text>
            </View>
            {/* anonymous clicks */}
            <View style={{height:Dimensions.get('window').height*0.05, flexDirection:'row', alignSelf:'stretch' }}>
                <View style={{flex:1}}></View>
                <View style={{flex:2, borderColor:'#f9a32c', justifyContent:'center', alignContent:'center',borderWidth:1, backgroundColor:this.anonymous_yes_colorbg(),borderRadius:10*factor_ver,}}>
                    <TouchableOpacity onPress={() => {this.click_anonymous_yes()}}>
                        <Text style={{textAlign:'center', color:this.anonymous_yes_color(), fontSize:20*factor_hor, fontFamily:'avenir next'}}>Yes</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:0.5}}></View>
                <View style={{flex:2, borderColor:'#f9a32c', justifyContent:'center', alignContent:'center', borderWidth:1, backgroundColor:this.anonymous_no_colorbg(), borderRadius:10*factor_ver,}}>
                    <TouchableOpacity onPress={() => {this.click_anonymous_no()}}>
                        <Text style={{textAlign:'center', color:this.anonymous_no_color(), fontSize:20*factor_hor, fontFamily:'avenir next'}}>No</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1,}}></View>
            </View>
            
            {/* buffer */}
            <View style={{height:Dimensions.get('window').height*0.035, alignSelf:'stretch' }}></View>
            {/* invisible name */}
            <View style={{height:Dimensions.get('window').height*0.05, justifyContent:'center', alignContent:'center', alignSelf:'stretch' }}>
                <Text style={{textAlign:'center', fontWeight:'500', fontSize:20}}>Invisible mode</Text>
            </View>
            <View style={{height:Dimensions.get('window').height*0.025, justifyContent:'center', alignContent:'center', alignSelf:'stretch' }}>
                <Text style={{textAlign:'center', fontWeight:'300', fontSize:16}}>If you want to be visible</Text>
            </View>
            {/* buffer */}
            <View style={{height:Dimensions.get('window').height*0.035, justifyContent:'center', alignContent:'center', alignSelf:'stretch' }}></View> 
            {/* invisible clicks */}
            <View style={{height:Dimensions.get('window').height*0.05, flexDirection:'row', alignSelf:'stretch' }}>
                <View style={{flex:1}}></View>
                <View style={{flex:2, borderColor:'#f9a32c', justifyContent:'center', alignContent:'center',borderWidth:1, backgroundColor:this.invisible_yes_colorbg(),borderRadius:10*factor_ver,}}>
                    <TouchableOpacity onPress={() => {this.click_invisible_yes()}}>
                        <Text style={{textAlign:'center', color:this.invisible_yes_color(), fontSize:20*factor_hor, fontFamily:'avenir next'}}>On</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:0.5}}></View>
                <View style={{flex:2, borderColor:'#f9a32c', justifyContent:'center', alignContent:'center', borderWidth:1, backgroundColor:this.invisible_no_colorbg(), borderRadius:10*factor_ver,}}>
                    <TouchableOpacity onPress={() => {this.click_invisible_no()}}>
                        <Text style={{textAlign:'center', color:this.invisible_no_color(), fontSize:20*factor_hor, fontFamily:'avenir next'}}>Off</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1,}}></View>
            </View>
            {/* buffer */}
            <View style={{height:Dimensions.get('window').height*0.025, justifyContent:'center', alignContent:'center', alignSelf:'stretch' }}></View>        
            
            {/* color name */}
            <View style={{height:Dimensions.get('window').height*0.1, justifyContent:'center', alignContent:'center', alignSelf:'stretch' }}>
                <Text style={{textAlign:'center', fontWeight:'500', fontSize:20}}>Your message color:</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <View style={{flex:1, alignItems:'center', justifyContent:'center', alignContent:'center'}}>
                    <TouchableOpacity onPress={() => {
                                                        this.props.navigation.push('CHOOSE_TEXT_COLOR', {returned: this.returned.bind(this)} )
                                                    }}>
                        <View style={{height:80*factor_hor, borderRadius:100, width:80*factor_hor, backgroundColor:this.state.sender_text_color, alignSelf:'stretch' }}></View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

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
