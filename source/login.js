import React, {Component} from 'react';
import {StyleSheet, AsyncStorage, Platform,
        KeyboardAvoidingView, TextInput, Text, 
        Dimensions, View, Alert, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image'

var color = null
var factor = Dimensions.get('window').height/812
var win_height = Dimensions.get('window').height

export default class login extends React.Component {
    static navigationOptions = {header: null};
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            password:"",
            user_valid:false
        }
    }

    async final_exit_function() {
        try {         
            url = `http://${serverLocation}:80/color_text?user=${this.state.username}`
            await fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('COLOR', responseJson)
                color = responseJson
                AsyncStorage.setItem('text_color', color)
            })               
                
            url = `http://${serverLocation}:80/check_hash?`
            await fetch(url, {
            method:'POST',
            headers:{    
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
            body: 
            JSON.stringify({
                password:this.state.password,
                username:this.state.username})
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({user_valid:responseJson.response_username}, function() {console.log('response email 2 ' + this.state.user_valid)});    
            })             

            if(this.state.user_valid == 'true'){
                await AsyncStorage.multiSet([
                    ['pass', this.state.password],
                    ['user', this.state.username],
                    ['loggedin_status', 'true'],
                    ['safeMode','false']
                ])
                global.user = this.state.username
                console.log(global.user, 'user')
                await this.props.navigation.push('LOAD_PAGE'); 
            }
            else {
                return Alert.alert('Password invalid', '')
            }
        } 
        catch (error) {
            console.log(error)
            return Alert.alert('Password invalid', '')
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
    return <View style={styles.container}>
            <LinearGradient colors={['#FFBA6F','#FC3004']} style={{flex:1, opacity:0.9, alignSelf:'stretch'}}>
                <View style={{height:this.winHeight()}}></View>
                <View style={{height:Dimensions.get('window').height*0.0675, flexDirection:'row', alignSelf:'stretch'}}>
                        <View style={{flex:0.125, alignContent:'center', justifyContent:'center'}}>
                        <TouchableOpacity hitSlop={{left:25, right:25, top:25, bottom:25}} onPress={()=> this.props.navigation.goBack()}  style={{marginStart:15*factor}} >
                            <Icon 
                                name="chevron-left"
                                color="black"
                                type='entypo'
                                size={30*factor_hor}
                            />
                        </TouchableOpacity>
                        </View>
                    </View>
                <View style={styles.top_logo}>
                    <FastImage 
                        resizeMode={FastImage.resizeMode.contain}
                        source={require('./pollen.png')}
                        style={{flex: 1,width: '66%'}}
                    />
                </View>

                <KeyboardAvoidingView 
                        style={styles.bottom_button} 
                        behavior="padding" 
                        keyboardVerticalOffset={-75*factor_ver}>

                    <View style={{flex:1, flexDirection:'row'}}>
                        <View style={{flex:0.3}}></View>
                    
                        <View style={{flex:0.40, }}>

                            <View style={{flex:0.2, backgroundColor:'white',justifyContent:'center', alignContent:'center', alignItems:'center', borderWidth:0, borderRadius:3, marginBottom:4, shadowColor:"black",shadowOffset:{width: 2,height:2},shadowOpacity: 0.6,shadowRadius: 3,elevation: 2}}>
                                <TextInput 
                                    style={{fontFamily:'avenir next', fontSize:20*factor_hor}}
                                    placeholder='Username'
                                    placeholderTextColor='black'
                                    maxLength={50}
                                    onChangeText={
                                        (typedText) => {
                                            this.setState({username: typedText})
                                        }
                                    }
                                />
                            </View>
                
                            <View style={{flex:0.02}}></View>
                            
                            <View style={{flex:0.2, backgroundColor:'white',justifyContent:'center', alignContent:'center', alignItems:'center', borderWidth:0, borderRadius:3, marginBottom:4, shadowColor:"black",shadowOffset:{width: 2,height:2},shadowOpacity: 0.6,shadowRadius: 3,elevation: 6}}>
                                <TextInput style={{fontFamily:'avenir next', fontSize:22*factor_hor}}
                                    secureTextEntry={true}
                                    placeholder='Password'
                                    placeholderTextColor='black'
                                    onChangeText={
                                        (typedText) => {
                                            this.setState({password: typedText})
                                        }
                                    }
                                    maxLength={50}
                                    allowFontScaling={true}
                                />                                
                            </View>

                            <View style={{flex:0.15, justifyContent:'center', alignItems:'center'}}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('FORGOT_PASSWORD')} >
                                    <Text style={{fontFamily:'avenir next', fontSize:16*factor_hor, color:'black'}}> forgot password </Text>
                                </TouchableOpacity>
                                
                            </View>
                            <View style={{flex:0.1, }}></View>
                            <TouchableOpacity style={{flex:0.2, backgroundColor:'white',justifyContent:'center', alignContent:'center', alignItems:'center', borderWidth:0, borderRadius:3, marginBottom:4, shadowColor:"black",shadowOffset:{width: 2,height:2},shadowOpacity: 0.6,shadowRadius: 3,elevation: 6}} onPress={() => this.final_exit_function()} >
                                <View>
                                    <Text style={{fontFamily:'avenir next', fontSize:24*factor_hor, color:'black'}}>Log In</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:0.3}}></View>
                    </View>


                </KeyboardAvoidingView>
                <View style={{flex:0.25, alignSelf:'stretch',}}></View>
            </LinearGradient>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        },
    top_logo: {
        flex: 0.6,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'stretch',
        },
    bottom_button: {
        flex:0.4,
        justifyContent:'center',
        alignSelf:'stretch',
        flexDirection:'row', 
        },
    
    
});