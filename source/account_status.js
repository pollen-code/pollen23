import React, {Component} from 'react';
import {StyleSheet, Text, AsyncStorage,  View, 
         TouchableOpacity, Alert, Dimensions,} from 'react-native';
import { Icon,  } from 'react-native-elements'

export default class account_status extends React.Component {
    static navigationOptions = {header: null};
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            status:'',
        }
    }

    async componentDidMount() {
        status = await this.props.navigation.getParam('status')
        userID = await AsyncStorage.getItem('user')
        await this.setState({ 
            username:userID,
            status:status,
        })
    }

    // color of header Active | Inactive
    active_inactive() {
        if(this.state.status == 'Active') {
            return 'rgba(113, 233, 42, 1)'
        }
        else {
            return 'rgba(255, 191, 121, 1)'
        }
    }
    // return Activate | Deactive
    is_active() {
        // return word
        if(this.state.status == 'Active') {
            return 'Deactivate'
        }
        else {
            return 'Activate'
        }
    }
    // color Activate | Deactivate
    is_active_color() {
        if(this.state.status !== 'Active') {
            return 'rgba(113, 233, 42, 1)'
        }
        else { 
            return 'rgba(255, 191, 121, 1)' 
        }
    }


    // functions
    async delete_account() {
        Alert.alert(
            'Are you sure you want to delete your account?',
            '',
            [
              {text: 'Cancel',onPress: () => console.log('Cancel Pressed'),style:'cancel'},
              {text: 'Yes', onPress: () => {

                Alert.alert(
                    'Deleting your account is permanent and can not be reversed? Do you wish to continue?'
                    ,'',
                    [
                      {text: 'Cancel',onPress: () => console.log('Cancel Pressed'),style:'cancel'},
                      {text: 'Yes', onPress: () => {this.delete_account2()} },
                    ],
                    {cancelable: false},
                );

              } },
            ],
            {cancelable: false},
        );
    }
    async delete_account2() {
        Alert.alert('Account deleted')
        // delete account
        url = `http://${serverLocation}:80/delete_account?userID=${this.state.username}`
        console.log(url)
        await fetch(url)     
        this.logoutreset()
    }

    async activate_deactivate() {
        // change active -> deactive
        if(this.state.status == 'Active') {
            Alert.alert(
                'Deactivating your account is a semi-permanent method of shutting down your account. Are you sure you wish to proceed?'
                ,'',
                [
                    {text: 'Cancel',onPress: () => console.log('Cancel Pressed'),style:'cancel'},
                    {text: 'Yes', onPress: () => {Alert.alert(
                                        'Once you deactivate your account you can re-login and navigate to this page to reactivate your account. Do you want to deactivate your account?'
                                        ,'',
                                        [
                                        {text: 'Cancel',onPress: () => console.log('Cancel Pressed'),style:'cancel'},
                                        {text: 'Yes', onPress: () => {this.deactivate_account()} },
                                        ],
                                        {cancelable: false},
                                    );} },
                ],
                {cancelable: false},
            );

        }
        if(this.state.status == 'Inactive') {
            // reactivate account
            this.setState({status:'Active'})
            url = `http://${serverLocation}:80/change_status?userID=${this.state.username}&status=Active`
            console.log(url)
            await fetch(url)            
            this.is_active()
        }
    }
    async deactivate_account() {
        await this.setState({status:'Inactive'})
        // get profile
        url = `http://${serverLocation}:80/change_status?userID=${this.state.username}&status=Inactive`
        await fetch(url)            

        await this.is_active()
        await this.logoutreset()
        await Alert.alert('Account deactivated', '')
    }
    async logoutreset() {
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

    render() {
    return (
    <View style={styles.container}>
        <View style={{height:'5%'}}></View>
        <View style={{height:'4%',  flexDirection:'row', borderBottomColor:'#9B9B9B', borderBottomWidth:0, alignSelf:'stretch', justifyContent:'center', justifyContent:'center', alignItems:'center'}}>
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
                <Text style={{textAlign:'center', justifyContent:'center', alignItems:'center', alignContent:'center', fontSize:24*factor_hor, fontFamily:'Avenir next', fontWeight:'500', color:'black'}}>Account Status</Text>
            </View>
            <View style={{flex:1}}></View>
        </View>
        
        {/* Active | Inactive */}
        <View style={{height:'25%', width:'100%', justifyContent:'center', 
            alignContent:'center', alignContent:'center', alignSelf:'stretch' }}>
            <Text style={{fontSize:35*factor_hor, fontWeight:'500', fontFamily:'avenir next',  textAlign:'center', color:this.active_inactive()}}>{this.state.status}</Text>
        </View>

        {/* buffer */}
        <View style={{height:'3%',marginLeft:30*factor_hor, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}></View>

        {/* deactivate account button */}
        <View style={{height:'6%', marginLeft:40*factor_hor, marginRight:40*factor_hor, borderRadius:40, justifyContent:'center', alignContent:'center', backgroundColor:'#F3F3F3', alignSelf:'stretch'}}>
            <TouchableOpacity onPress={()=>{this.activate_deactivate()}}>
                <Text style={{textAlign:'center', color:this.is_active_color(), fontSize:25*factor_hor, fontWeight:'500'}}>{this.is_active()}</Text>
            </TouchableOpacity>
        </View>
        
        {/* deactiuvate description */}
        <View style={{height:'17.5%', paddingRight:25*factor_hor, paddingLeft:25*factor_hor, width:Dimensions.get('window').width, justifyContent:'center', alignContent:'center' }}>
        
            <Text style={{fontSize:18, fontWeight:'400', fontFamily:'avenir next', textAlign:'left'}}>
                Deactivate your account if you do not want to lose your data with Pollen. 
                This option allows you to retain the right to reactivate your account. 
            </Text>
        
        </View>
        
        {/* buffer */}
        <View style={{height:'7.5%',marginLeft:30*factor_hor, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}></View>

        {/* delete account */}
        <View style={{height:'6%', marginLeft:40*factor_hor, marginRight:40*factor_hor, borderRadius:40, justifyContent:'center', alignContent:'center', backgroundColor:'#F3F3F3', alignSelf:'stretch'}}>
            <TouchableOpacity onPress={()=>{this.delete_account()}}>
                <Text style={{textAlign:'center', color:'#FC3004', fontSize:22*factor_hor, fontWeight:'600'}}>Delete Account</Text>
            </TouchableOpacity>
        </View>
        
        {/* delete words */}
        <View style={{height:'7.5%', paddingLeft:25*factor_hor, paddingRight:25*factor_hor, width:Dimensions.get('window').width, }}>
            <Text style={{fontSize:18, marginTop:20*factor_ver, fontWeight:'400', fontFamily:'avenir next', textAlign:'left'}}>
                Permanently delete your account.
            </Text>
        </View>
        
        {/* bottom buffer */}
        <View style={{flex:1}}></View>
        
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



