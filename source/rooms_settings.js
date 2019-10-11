import React, {Component} from 'react';
import {StyleSheet, Text, Alert, Dimensions, View, 
    AsyncStorage, TouchableOpacity} from 'react-native';
import { Icon, SearchBar } from 'react-native-elements'
import moment from  'moment-timezone';

export default class rooms_settings extends React.Component {
    static navigationOptions = {header: null}
    constructor(props) {
        super(props);
        this.state = {
            open_to_msgs_from:'',
            allow_anon:'',
            invisible_mode:'',
            sender_text_color:'',
            username:'',

            world:false,
            city:false, 
            local:false,
            micro:false, 
            
        }
    }

    async componentDidMount() {
        username = await AsyncStorage.getItem('user')
        url = `http://${serverLocation}:80/get_rooms_info?userID${username}`
        await fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            responseJson = responseJson[0]

            world = false
            city = false
            local = false
            micro = false

            if( responseJson[1] == 'world' ) {
                world = true
                city = true
                local = true
                micro = true
            }
            else if( responseJson[1] == 'city' ) {
                world = false
                city = true
                local = true
                micro = true
            }
            else if( responseJson[1] == 'local' ) {
                world = false
                city = false
                local = true
                micro = true
            }
            else if( responseJson[1] == 'micro' ) {
                world = false
                city = false
                local = false
                micro = true
            }

            this.setState({
                username:username, 
                open_to_msgs_from:responseJson[0], 
                invisible_mode:responseJson[2],
                world:world,
                city:city,
                local:local,
                micro:micro,    
            }, console.log(
                this.state.world, 
                this.state.city, 
                this.state.local, 
                this.state.micro))
        })
        .catch((error) => {
            Alert.alert('Check your connection and try again')
        })  
    }
    async finalize() {
        radius = 'world'
        if(this.state.world == true){
            radius = 'world'
        }
        else if(this.state.city == true){
            radius = 'city'
        }
        else if(this.state.local == true){
            radius = 'local'
        }
        else if(this.state.micro == true){
            radius = 'micro'
        }
        url = `http://${serverLocation}:80/update_rooms_info?userID=${this.state.username}&accept_room_invites_from=${this.state.open_to_msgs_from}&see_rooms_from=${radius}&invisible_mode=${this.state.invisible_mode}`
        fetch(url)
        .then((response) => response.json())
        .then((responseJson2) => {
            console.log(responseJson2)
        })
        .catch((error) => {
            console.log(error)
        })  
        this.props.navigation.push('ROOMS')
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
            return '#FF7E65'
        }
        else {
            return 'white'
        }
    }  
    click_followers_bgcolor(){
        if(this.state.open_to_msgs_from == 'followers') {
            return '#FF7E65'
        }
        else {
            return 'white'
        }
    }
    click_following_bgcolor(){
        if(this.state.open_to_msgs_from == 'following') {
            return '#FF7E65'
        }
        else {
            return 'white'
        }
    }
    click_noone_bgcolor(){
        if(this.state.open_to_msgs_from == 'noone') {
            return '#FF7E65'
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
            return '#FF7E65'
        }
        else {
            return 'white'
        }
    }
    invisible_yes_colorbg() {
        if(this.state.invisible_mode == 'yes') {
            return '#FF7E65'
        }
        else {
            return 'white'
        }
    }

    world_bg(){
        if( this.state.world == true ) {
            return '#FF7E65'
        }
        else {
            return 'white'
        }
    }
    city_bg(){
        if( this.state.world == true || this.state.city == true ) {
            return '#FF7E65'
        }
        else {
            return 'white'
        }
    }
    local_bg(){
        if( this.state.world == true || this.state.city == true || this.state.local == true ) {
            return '#FF7E65'
        }
        else {
            return 'white'
        }
    }
    micro_bg(){
        if( this.state.world == true || this.state.city == true || this.state.local == true || this.state.micro == true ) {
            return '#FF7E65'
        }
        else {
            return 'white'
        }
    }

    world_text(){
        if(this.state.world == true) {
            return 'white'
        }
        else {
            return '#979797'
        }
    }
    city_text(){
        if(this.state.city == true) {
            return 'white'
        }
        else {
            return '#979797'
        }
    }
    local_text(){
        if(this.state.local == true) {
            return 'white'
        }
        else {
            return '#979797'
        }
    }
    micro_text(){
        if(this.state.micro == true) {
            return 'white'
        }
        else {
            return '#979797'
        }
    }

    async click_world(){
        if(this.state.world == true) {
            await this.setState({
                world:false,
                city:false,
                local:false,
                micro:false, 
            })
        }
        else if(this.state.world == false) {
            await this.setState({
                world:true,
                city:true,
                local:true,
                micro:true, 
            })
        }
        await console.log(this.state.world, this.state.city, this.state.local, this.state.micro)
    }
    async click_city(){
        if(this.state.city == true) {
            await this.setState({
                world:false,
                city:false,
                local:false,
                micro:false, 
            })
        }
        else if(this.state.city == false) {
            await this.setState({
                world:false,
                city:true,
                local:true,
                micro:true, 
            })
        }
        await console.log(this.state.world, this.state.city, this.state.local, this.state.micro)
    }
    async click_local(){
        if(this.state.local == true) {
            await this.setState({
                world:false,
                city:false,
                local:false,
                micro:false, 
            })
        }
        else if(this.state.local == false) {
            await this.setState({
                world:false,
                city:false,
                local:true,
                micro:true, 
            })
        }
        await console.log(this.state.world, this.state.city, this.state.local, this.state.micro)
    }
    async click_micro(){
        if(this.state.micro == true) {
            await this.setState({
                world:false,
                city:false,
                local:false,
                micro:false, 
            })
        }
        else if(this.state.micro == false) {
            await this.setState({
                world:false,
                city:false,
                local:false,
                micro:true, 
            })
        }
        await console.log(this.state.world, this.state.city, this.state.local, this.state.micro)
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
                            size={25*factor_hor}
                            style={{marginTop:7*factor_hor}}
                        />      
                    </TouchableOpacity>
            </View>
            <View style={{flex:1, justifyContent:'center', alignContent:'center',  alignSelf:'stretch'}}>
            
                <Text style={{fontSize:25, fontWeight:'500', fontFamily:'avenir next', textAlign:'center'}}>Rooms Settings</Text>
            
            </View>
            <View style={{flex:0.25, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
                <View style={{height:20, width:20, backgroundColor:this.state.color, borderRadius:100}}></View>
            </View>
        </View>
        

        <View style={{flex:1, alignSelf:'stretch'}}>
            <View style={{height:Dimensions.get('window').height*0.035,}}></View>
            {/* accept from name */}
            <View style={{height:Dimensions.get('window').height*0.1, justifyContent:'center', alignContent:'center', alignSelf:'stretch' }}>
                <Text style={{textAlign:'center', fontWeight:'500', fontSize:20}}>Accept room invites from</Text>
            </View>
            {/* accept click */}
            <View style={{height:Dimensions.get('window').height*0.05,paddingRight:20*factor_hor,paddingLeft:20*factor_hor,flexDirection:'row', alignSelf:'stretch' }}>
                <View style={{flex:1,justifyContent:'center', alignContent:'center',backgroundColor:this.click_anyone_bgcolor(),  borderRadius:10*factor_ver,borderWidth:1,borderColor:'#FF7E65'}}>
                    <TouchableOpacity onPress={() => {this.click_anyone()}}>
                        <Text style={{textAlign:'center',color:this.click_anyone_color(), fontSize:19*factor_hor, fontFamily:'avenir next'}}>Anyone</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width:Dimensions.get('window').height*0.01, alignSelf:'stretch' }}></View>
                <View style={{flex:2,borderRadius:10*factor_ver,justifyContent:'center', backgroundColor:this.click_followers_bgcolor(), alignContent:'center', borderWidth:1, borderColor:'#FF7E65'}}>
                    <TouchableOpacity onPress={() => {this.click_followers()}}>
                        <Text style={{textAlign:'center', color:this.click_followers_color(), fontSize:20*factor_hor,fontFamily:'avenir next'}}>Followers & Following</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* buffer */}
            <View style={{height:Dimensions.get('window').height*0.01, alignSelf:'stretch' }}></View>
            {/* accept click */}
            <View style={{height:Dimensions.get('window').height*0.05,paddingRight:40*factor_hor, paddingLeft:40*factor_hor,flexDirection:'row', alignSelf:'stretch' }}>
                <View style={{flex:1.62,justifyContent:'center', alignContent:'center', borderRadius:10*factor_ver,backgroundColor:this.click_following_bgcolor(), borderWidth:1,borderColor:'#FF7E65'}}>
                    <TouchableOpacity onPress={() => {this.click_following()}}>
                        <Text style={{textAlign:'center', color:this.click_following_color(), fontSize:20*factor_hor,fontFamily:'avenir next'}}>Following Only</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{width:Dimensions.get('window').height*0.01, alignSelf:'stretch' }}></View>
                <View style={{flex:1, justifyContent:'center', alignContent:'center', borderRadius:10*factor_ver,backgroundColor:this.click_noone_bgcolor(),borderWidth:1,borderColor:'#FF7E65'}}>
                    <TouchableOpacity onPress={() => {this.click_noone()}}>
                        <Text style={{textAlign:'center', color:this.click_noone_color(), fontSize:20*factor_hor, fontFamily:'avenir next'}}>No One</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* buffer */}
            <View style={{height:Dimensions.get('window').height*0.01, alignSelf:'stretch' }}></View>
            
            
            {/* buffer */}
            <View style={{height:Dimensions.get('window').height*0.075, alignSelf:'stretch' }}></View>
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
                <View style={{flex:2, borderColor:'#FF7E65', justifyContent:'center', alignContent:'center',borderWidth:1, backgroundColor:this.invisible_yes_colorbg(),borderRadius:10*factor_ver,}}>
                    <TouchableOpacity onPress={() => {this.click_invisible_yes()}}>
                        <Text style={{textAlign:'center', color:this.invisible_yes_color(), fontSize:20*factor_hor, fontFamily:'avenir next'}}>On</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:0.5}}></View>
                <View style={{flex:2, borderColor:'#FF7E65', justifyContent:'center', alignContent:'center', borderWidth:1, backgroundColor:this.invisible_no_colorbg(), borderRadius:10*factor_ver,}}>
                    <TouchableOpacity onPress={() => {this.click_invisible_no()}}>
                        <Text style={{textAlign:'center', color:this.invisible_no_color(), fontSize:20*factor_hor, fontFamily:'avenir next'}}>Off</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1,}}></View>
            </View>

            {/* buffer */}
            <View style={{height:Dimensions.get('window').height*0.075, justifyContent:'center', alignContent:'center', alignSelf:'stretch' }}></View>        
            
            {/* color name */}
            <View style={{height:Dimensions.get('window').height*0.1, justifyContent:'center', alignContent:'center', alignSelf:'stretch' }}>
                <Text style={{textAlign:'center', fontWeight:'500', fontSize:20}}>See rooms from</Text>
            </View>
            {/* world city local micro */}
            <View style={{height:Dimensions.get('window').height*0.045, flexDirection:'row', justifyContent:'center', alignContent:'center', alignSelf:'stretch' }}>
                <View style={{flex:0.5, }}></View>
                <View style={{flex:1.2, borderColor:'#FF7E65', borderWidth:1, justifyContent:'center', alignContent:'center', backgroundColor:this.world_bg(), borderRadius:10*factor_hor, }}>
                    <TouchableOpacity onPress={()=>{this.click_world()}}>
                        <Text style={{color:this.world_text(), textAlign:'center', fontFamily:'avenir next', fontSize:20*factor_hor}}>World</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:0.25, }}></View>
                
                <View style={{flex:1, borderColor:'#FF7E65', borderWidth:1, justifyContent:'center', alignContent:'center', backgroundColor:this.city_bg(), borderRadius:10*factor_hor, }}>
                    <TouchableOpacity onPress={()=>{this.click_city()}}>
                        <Text style={{color:this.city_text(), textAlign:'center', fontFamily:'avenir next', fontSize:20*factor_hor}}>City</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:0.25, }}></View>
                <View style={{flex:1, borderColor:'#FF7E65', borderWidth:1, justifyContent:'center', alignContent:'center', backgroundColor:this.local_bg(), borderRadius:10*factor_hor, }}>
                    <TouchableOpacity onPress={()=>{this.click_local()}}>
                        <Text style={{color:this.local_text(), textAlign:'center', fontFamily:'avenir next', fontSize:20*factor_hor}}>Local</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:0.25, }}></View>
                <View style={{flex:1, borderColor:'#FF7E65', borderWidth:1, justifyContent:'center', alignContent:'center', backgroundColor:this.micro_bg(), borderRadius:10*factor_hor, }}>
                    <TouchableOpacity onPress={()=>{this.click_micro()}}>
                        <Text style={{color:this.micro_text(), textAlign:'center', fontFamily:'avenir next', fontSize:20*factor_hor}}>Micro</Text>
                    </TouchableOpacity>    
                </View>
                <View style={{flex:0.5, }}></View>
            </View>        
            
            <View style={{height:Dimensions.get('window').height*0.045, flexDirection:'row', justifyContent:'center', alignContent:'center', alignSelf:'stretch' }}>
                <View style={{flex:0.5, }}></View>
                <View style={{flex:1.2}}>
                    <Text style={{color:'#FF7E65', textAlign:'center', fontFamily:'avenir next', fontSize:12*factor_hor}}>Anywhere</Text>
                </View>
                <View style={{flex:0.25, }}></View>
                <View style={{flex:1}}>
                    <Text style={{color:'#FF7E65', textAlign:'center', fontFamily:'avenir next', fontSize:12*factor_hor}}>8000m</Text>
                </View>
                <View style={{flex:0.25, }}></View>
                <View style={{flex:1}}>
                    <Text style={{color:'#FF7E65', textAlign:'center', fontFamily:'avenir next', fontSize:12*factor_hor}}>800m</Text>
                </View>
                <View style={{flex:0.25, }}></View>
                
                <View style={{flex:1}}>
                    <Text style={{color:'#FF7E65', textAlign:'center', fontFamily:'avenir next', fontSize:12*factor_hor}}>80m</Text>
                </View>
                <View style={{flex:0.5, }}></View>
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
