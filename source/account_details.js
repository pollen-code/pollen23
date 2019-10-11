import React, {Component} from 'react';
import {StyleSheet, Text, AsyncStorage,  View, 
         TouchableOpacity, ScrollView, Alert, Dimensions,} from 'react-native';
import { Icon,  } from 'react-native-elements'
import moment from  'moment-timezone';
import PasswordChange from  './svgs/password_change'

export default class account_details extends React.Component {

    static navigationOptions = {header: null};
    
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            email:'',
            phone:'',
            date_joined:'',
            account_status:'',
            account_standing:'',
        }
    }

    async componentDidMount() {

        userID = await AsyncStorage.getItem('user')
        await this.setState({username:userID})
        url = `http://${serverLocation}:80/account_details?userID=${userID}`
        console.log(url)
        await fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson, 'account details')
            date = moment(responseJson[0][0]*1000).tz(timezone)
            date = date.format('MMM, DD YYYY').toString()

            standing = 'Good'
            if( responseJson[0][3] == 'Two strikes of three' || 
                responseJson[0][3] == 'One strike of three') {
                standing = 'Okay'
            }
            else if(responseJson[0][3] == 'Three strikes of three') {
                standing = 'Bad'
            }

            this.setState({
                date_joined:date,
                phone:responseJson[0][1].replace("%2B", ""),
                status:responseJson[0][2],
                account_status:responseJson[0][2],
                account_standing:standing,
                email:responseJson[0][4],
            })
        })
        .catch((error) => {
            console.log(error)
            Alert.alert('Please check your connection and try again')
        });  
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
    logoutreset() {
        // disconnect socket
        global.socket.disconnect()
        global.socket_rooms.disconnect()
        console.log(global.socket, 'socket disconnected')

        // reset globals
        global.socket = null 
        global.socket_rooms = null 
        global.user = null

        // clear async
        AsyncStorage.clear();
        AsyncStorage.setItem('loggedin_status', 'false')
        
        // go login
        this.props.navigation.navigate("SIGNUP_LOGIN")
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
            <Text style={{fontSize:22*factor_hor, color:'#FC6026', fontFamily:'avenir next', textAlign:'center', fontWeight:'600'}}>[ {this.state.username} ] </Text>
            </View>
            <View style={{flex:1}}></View>
        </View>
        
        <View style={{height:'4%',marginLeft:30*factor_hor, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
        </View>
        
        <View style={{flex:1, flexDirection:'row'}}>

            <View style={{alignSelf:'stretch', flex:1,}}>          
                <View style={{ justifyContent:'center', flexDirection:'row', alignContent:'center', width:Dimensions.get('window').width,height:50*factor_hor, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:10*factor_hor}}>
                    <Text style={{fontFamily:'Avenir Next', fontSize:22*factor_hor,marginLeft:30*factor_hor,fontWeight:'500', }}>Phone</Text>
                    <Text style={{textAlign:'left', fontFamily:'Avenir Next',marginLeft:20*factor_hor, fontWeight:'400', fontSize:20*factor_hor}}>{this.state.phone}</Text>
                    <View style={{flex:1}}></View>
                </View>        
                <View style={{ justifyContent:'center', flexDirection:'row', alignContent:'center', width:Dimensions.get('window').width,height:50*factor_hor, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:10*factor_hor}}>
                    <Text style={{fontFamily:'Avenir Next', fontSize:22*factor_hor,marginLeft:30*factor_hor,fontWeight:'500', }}>Date Joined</Text>
                    <Text style={{textAlign:'left', fontFamily:'Avenir Next',marginLeft:20*factor_hor, fontWeight:'400', fontSize:20*factor_hor}}>{this.state.date_joined}</Text>
                    <View style={{flex:1}}></View>
                </View>        
                <View style={{ justifyContent:'center', flexDirection:'row', alignContent:'center', width:Dimensions.get('window').width,height:50*factor_hor, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:10*factor_hor}}>
                    <Text style={{fontFamily:'Avenir Next', fontSize:22*factor_hor,marginLeft:30*factor_hor,fontWeight:'500', }}>Account Status</Text>
                    <TouchableOpacity onPress={() => {this.props.navigation.navigate('ACCOUNT_PRESTATUS', {'account_standing':this.state.account_standing, 'account_status':this.state.account_status} )}}>
                        <Text style={{textAlign:'left', fontFamily:'Avenir Next',marginLeft:20*factor_hor, fontWeight:'400', fontSize:20*factor_hor}}>{this.state.account_status}</Text>
                    </TouchableOpacity>
                    <View style={{flex:1}}></View>
                </View>  
                <View style={{ justifyContent:'center', flexDirection:'row', width:Dimensions.get('window').width, height:50*factor_hor, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:10*factor_hor}}>
                    <Text style={{textAlign:'left', fontFamily:'Avenir Next',marginLeft:30*factor_hor, fontWeight:'500', fontSize:22*factor_hor}}>Account Standing</Text>
                    <Text style={{textAlign:'left', fontFamily:'Avenir Next',marginLeft:20*factor_hor, fontWeight:'400', fontSize:20*factor_hor}}>{this.state.account_standing}</Text>
                <View style={{flex:1}}></View>
                </View> 
                <TouchableOpacity onPress={() => {this.change_password()}}>      
                <View style={{ justifyContent:'center', alignContent:'center', width:Dimensions.get('window').width,height:50*factor_hor, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:45*factor_hor}}>
                    <Text style={{fontFamily:'Avenir Next', fontSize:22*factor_hor,marginLeft:30*factor_hor,fontWeight:'500',}}>Change Password</Text>
                </View>               
            </TouchableOpacity>
            </View>


        <View style={{flex:0.01, alignSelf:'stretch'}}>
            <View style={{ flexDirection:'row', justifyContent:'center', alignContent:'center', height:50*factor_hor, backgroundColor:'white', marginTop:10*factor_hor}}>
                <View style={{flex:1}}></View>
                <View style={{flex:1, justifyContent:'center', alignContent:'center'}}></View>
            </View>           
            <View style={{ flexDirection:'row', justifyContent:'center', alignContent:'center', height:50*factor_hor, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:10*factor_hor}}>
            <View style={{flex:1}}></View>
                    <View style={{flex:1, justifyContent:'center', alignContent:'center'}}></View>                
            </View>        
            <View style={{flexDirection:'row', justifyContent:'center', alignContent:'center', height:50*factor_hor, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:10*factor_hor}}>
            <View style={{flex:1}}></View>
                    <View style={{flex:1, justifyContent:'center', alignContent:'center'}}></View>                    
            </View>        
            <View style={{flexDirection:'row', justifyContent:'center', alignContent:'center', height:50*factor_hor, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:10*factor_hor}}>
            <View style={{flex:1}}></View>
                    <View style={{flex:1, justifyContent:'center', alignContent:'center'}}></View>                    
            </View>        
            

                <View style={{ flexDirection:'row', justifyContent:'center', alignContent:'center', height:50*factor_hor, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:45*factor_hor}}>
                <View style={{flex:1}}></View>
                        <View style={{position:'absolute', right:20*factor_hor, top:5*factor_ver, zIndex:2, justifyContent:'center', alignContent:'center'}}>
                        <TouchableOpacity onPress={() => { this.change_password()}}>
                            <PasswordChange
                                height={40} 
                                width={40}
                                style={{ marginLeft:5, paddingRight:1, paddingLeft:1, }}
                            /> 
                        </TouchableOpacity>
                        </View>                    
                </View>               
            
            
            <View style={{ justifyContent:'center', alignContent:'center', width:Dimensions.get('window').width,height:50*factor_hor, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:35*factor_hor,}}></View>        
        
        </View>
        </View>
        
        <View style={{height:'6%', marginLeft:40*factor_hor, marginRight:40*factor_hor, borderRadius:40, justifyContent:'center', alignContent:'center', backgroundColor:'white', alignSelf:'stretch'}}>
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



