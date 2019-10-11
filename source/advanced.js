import React, {Component} from 'react';
import {StyleSheet, Text, AsyncStorage,  View, 
         TouchableOpacity, Alert, Dimensions,} from 'react-native';
import { Icon,  } from 'react-native-elements'
import Svg, { Path } from 'react-native-svg';
import PasswordChange from  './svgs/password_change'

export default class advanced extends React.Component {
    static navigationOptions = {header: null};
    constructor(props) {
        super(props);
        this.state = {
            username:'',
        }
    }

    async componentDidMount() {
        this.setState({ username:(await AsyncStorage.getItem('user')) })
    }

    logout() {
       // this.socket.disconnect()
        Alert.alert(
            'Are you sure you want to log out?',
            '',
            [
              {text: 'Cancel',onPress: () => console.log('Cancel Pressed'),style:'cancel'},
              {text: 'Yes', onPress: () => {this.logoutreset()} },
            ],
            {cancelable: false},
        );
    }
    async logoutreset() {
        // disconnect socket
        url = `http://${serverLocation}:80/update_connection?userID=${this.state.username}`
        await fetch(url)

        await global.socket.disconnect()
        await global.socket_rooms.disconnect()

        global.socket = null 
        global.socket_rooms = null 
        global.user = null

        await AsyncStorage.clear();
        await AsyncStorage.setItem('loggedin_status', 'false')
        
        await this.props.navigation.navigate("SIGNUP_LOGIN")
    }
    change_password() {
        this.props.navigation.navigate("FORGOT_PASSWORD",{any_key:true})
    }

    render() {
    
    return (
    <View style={styles.container}>
        <View style={{height:'5%'}}></View>
        <View style={{height:'5%',  flexDirection:'row', borderBottomColor:'#9B9B9B', borderBottomWidth:0, alignSelf:'stretch', justifyContent:'center', justifyContent:'center', alignItems:'center'}}>
            <View style={{flex:1, marginTop:4*factor_hor, alignSelf:'stretch' }}>
                <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={{marginStart:0}} >
                    <Icon 
                        name="chevron-left"
                        color="#9b9b9b"
                        type='entypo'
                        size={25*factor_hor}
                    />
                </TouchableOpacity>               
            </View>    
            <View style={{flex:7, }}>    
                <Text style={{textAlign:'center', justifyContent:'center', alignItems:'center', alignContent:'center', fontSize:24*factor_hor, fontFamily:'Avenir next', fontWeight:'500', color:'black'}}>Advanced</Text>
            </View>
            <View style={{flex:1}}></View>
        </View>
        
        <View style={{height:'8%',marginLeft:30*factor_hor, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
            <Text style={{fontSize:22*factor_hor, color:'#FC6026', fontFamily:'avenir next', fontWeight:'600'}}>[ {this.state.username} ] </Text>
        </View>
        
        <View style={{flex:1,flexDirection:'row'}}>

            <View style={{alignSelf:'stretch', flex:1,}}>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('HOW_IT_WORKS')}}>
                <View style={{ justifyContent:'center', alignContent:'center', width:Dimensions.get('window').width, height:50*factor_ver, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:10*factor_hor}}>
                    <Text style={{fontFamily:'Avenir Next',marginLeft:30*factor_hor, fontSize:22*factor_hor}}>How It Works</Text>
                </View>           
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('SAFETY')}}>  
                <View style={{ justifyContent:'center', alignContent:'center', width:Dimensions.get('window').width,height:50*factor_ver, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:10*factor_hor}}>
                    <Text style={{fontFamily:'Avenir Next', fontSize:22*factor_hor,marginLeft:30*factor_hor, }}>Safety</Text>
                </View>        
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('PRIVACY_POLICY')}}>
                <View style={{ justifyContent:'center', alignContent:'center', width:Dimensions.get('window').width,height:50*factor_ver, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:10*factor_hor}}>
                    <Text style={{fontFamily:'Avenir Next', fontSize:22*factor_hor,marginLeft:30*factor_hor, }}>Privacy Policy</Text>
                </View>        
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('TERMS_OF_SERVICE')}}>
                <View style={{ justifyContent:'center', alignContent:'center', width:Dimensions.get('window').width,height:50*factor_ver, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:10*factor_hor}}>
                    <Text style={{fontFamily:'Avenir Next', fontSize:22*factor_hor,marginLeft:30*factor_hor, }}>Terms of Service</Text>
                </View>        
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('ACCOUNT_DETAILS')}}>
                <View style={{ justifyContent:'center', alignContent:'center', width:Dimensions.get('window').width,height:50*factor_ver, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:10*factor_hor}}>
                    <Text style={{fontFamily:'Avenir Next', fontSize:22*factor_hor,marginLeft:30*factor_hor, }}>Account Details</Text>
                </View>        
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('REPORT')}}>
                <View style={{ justifyContent:'center', alignContent:'center', width:Dimensions.get('window').width,height:50*factor_ver, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:10*factor_hor}}>
                    <Text style={{fontFamily:'Avenir Next', fontSize:22*factor_hor,marginLeft:30*factor_hor, }}>Report</Text>
                </View>        
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('LICENSE_AGREEMENT', {from:'settings'})}}>
                <View style={{ justifyContent:'center', alignContent:'center', width:Dimensions.get('window').width,height:50*factor_ver, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:10*factor_hor}}>
                    <Text style={{fontFamily:'Avenir Next', fontSize:22*factor_hor,marginLeft:30*factor_hor, }}>License Agreement</Text>
                </View>        
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => {this.change_password()}}>
                <View style={{ justifyContent:'center', alignContent:'center', width:Dimensions.get('window').width,height:50*factor_ver, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:45*factor_hor}}>
                    <Text style={{fontFamily:'Avenir Next', fontSize:22*factor_hor,marginLeft:30*factor_hor,}}>Change Password</Text>
                </View>               
            </TouchableOpacity>

            </View>


        <View style={{flex:0.5, alignSelf:'stretch'}}>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('HOW_IT_WORKS')}}>
                    <View style={{ flexDirection:'row', justifyContent:'center', alignContent:'center', height:50*factor_ver, backgroundColor:'white', marginTop:10*factor_hor}}>
                        <View style={{flex:1}}></View>
                        <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
                        <Icon 
                            name="chevron-right"
                            color="#9b9b9b"
                            type='entypo'
                            size={25*factor_hor}
                        />
                        </View>
                        
                    </View>           
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('SAFETY')}}>  
                <View style={{ flexDirection:'row', justifyContent:'center', alignContent:'center', height:50*factor_ver, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:10*factor_hor}}>
                <View style={{flex:1}}></View>
                        <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
                        <Icon 
                            name="chevron-right"
                            color="#9b9b9b"
                            type='entypo'
                            size={25*factor_hor}
                        />
                        </View>                
                </View>        
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('PRIVACY_POLICY')}}>  
                <View style={{ flexDirection:'row', justifyContent:'center', alignContent:'center', height:50*factor_ver, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:10*factor_hor}}>
                <View style={{flex:1}}></View>
                        <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
                        <Icon 
                            name="chevron-right"
                            color="#9b9b9b"
                            type='entypo'
                            size={25*factor_hor}
                        />
                        </View>                
                </View>        
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('TERMS_OF_SERVICE')}}>
                <View style={{flexDirection:'row', justifyContent:'center', alignContent:'center', height:50*factor_ver, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:10*factor_hor}}>
                <View style={{flex:1}}></View>
                        <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
                        <Icon 
                            name="chevron-right"
                            color="#9b9b9b"
                            type='entypo'
                            size={25*factor_hor}
                        />
                        </View>                    
                </View>        
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('ACCOUNT_DETAILS')}}>
                <View style={{flexDirection:'row', justifyContent:'center', alignContent:'center', height:50*factor_ver, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:10*factor_hor}}>
                <View style={{flex:1}}></View>
                        <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
                        <Icon 
                            name="chevron-right"
                            color="#9b9b9b"
                            type='entypo'
                            size={25*factor_hor}
                        />
                        </View>                    
                </View>        
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('REPORT')}}>
                <View style={{flexDirection:'row', justifyContent:'center', alignContent:'center', height:50*factor_ver, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:10*factor_hor}}>
                <View style={{flex:1}}></View>
                        <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
                        <Icon 
                            name="chevron-right"
                            color="#9b9b9b"
                            type='entypo'
                            size={25*factor_hor}
                        />
                        </View>                    
                </View>        
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('LICENSE_AGREEMENT', {from:'settings'})}}>
                <View style={{flexDirection:'row', justifyContent:'center', alignContent:'center', height:50*factor_ver, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:10*factor_hor}}>
                <View style={{flex:1}}></View>
                        <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
                            <Icon 
                                name="chevron-right"
                                color="#9b9b9b"
                                type='entypo'
                                size={25*factor_hor}
                            />
                        </View>                    
                </View>        
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {this.change_password()}}>
                <View style={{ flexDirection:'row', justifyContent:'center', alignContent:'center', height:50*factor_ver, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:45*factor_hor}}>
                <View style={{flex:1}}></View>
                        <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
                        <PasswordChange
                            height={40}
                            width={40}
                            style={{ marginLeft:5, paddingRight:1, paddingLeft:1, }}
                        /> 
                        </View>                    
                </View>               
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => {this.logout()}}>
                <View style={{ justifyContent:'center', alignContent:'center', width:Dimensions.get('window').width,height:50*factor_ver, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:35*factor_hor,}}>
                </View>        
            </TouchableOpacity>            
        
        </View>
        </View>
        
        <View style={{height:'6%', marginLeft:40*factor_hor, marginRight:40*factor_hor, borderRadius:40, justifyContent:'center', alignContent:'center', backgroundColor:'#F3F3F3', alignSelf:'stretch'}}>
            <TouchableOpacity onPress={()=>{this.logout()}}>
                <Text style={{textAlign:'center', color:'#FC3004', fontSize:22*factor_hor, fontWeight:'500'}}>Log out</Text>
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
    },
  });



