import React, {Component} from 'react';
import {StyleSheet, Alert, AsyncStorage, Dimensions, KeyboardAvoidingView, 
        TextInput, Text, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import SporeNoBackground from './svgs/spore_no_background';

export default class forgot_password2 extends React.Component {
    static navigationOptions = {header: null};
    constructor(props) {
        super(props);
        this.state = {
            confirm_password:"",
            password:"",
            username:"",   
        }
    }
    
    async retrieveSessionToken() {
            try {
              const token1 = this.props.navigation.getParam('username')
              console.log('TOKEN!', token1)
              this.setState({username:token1});
              return token1
            }
            catch(error){
                return null;
            } 
    }
    async componentDidMount() {       
        await this.retrieveSessionToken();        
    }
    saveData2 (login) {
        AsyncStorage.setItem('loggedin_status', login)
    }         
    saveData1 (password) {
            AsyncStorage.setItem('pass', password)
    }
    async final_exit_function() {
        try {
            if((this.state.confirm_password == this.state.password) && (this.state.password != '') && 
                this.state.password.length > 7) {
                    url = `http://${serverLocation}:80/update_password?`
                    await fetch(url, {
                        method:'POST',
                        headers:{    
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json'
                                },
                        body: 
                        JSON.stringify({
                            password:this.state.password,
                            username:this.state.username
                    })})
                    .then((response) => response.json())
                    .then((responseJson2) => {
                        console.log(responseJson2)
                        if (responseJson2=='success'){
                            console.log('success')
                            this.saveData2('true');
                            this.saveData1(this.state.password);
                            AsyncStorage.setItem('user', this.state.username)
                            this.props.navigation.navigate('FORGOT_PASSWORD3');                     
                            }
                    })
                    .catch((error) => {
                        Alert.alert('Check your connection and location settings and try again')
                    });     
                }
            else {
                    return Alert.alert('Please make sure your passwords match and are longer than 7 characters', '')
                }
            } 
        catch (error) {
            return Alert.alert('Please make sure your passwords match and are longer than 7 characters', '')
        }
    }

    render() {
        return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <LinearGradient colors={['#FFBA6F','#FC3004']} style={{height:Dimensions.get('window').height, opacity:0.9, alignSelf:'stretch'}}>
                    <View style={{flex:0.03,  alignSelf:'stretch'}}> 
                    </View>
                    <View style={{flex:0.1}}></View>
                    <View style={styles.top_logo}>
                        <SporeNoBackground
                            width={325*factor_hor}
                            height={320*factor_ver}
                        />
                    </View>
                    <View style={{flex:0.1}}></View>
                    <View style={styles.bottom_button}>

                    <View style={{flex:1, flexDirection:'row'}}>
                        <View style={{flex:0.3}}></View>
                    
                        <View style={{flex:0.60, }}>
                        
                            <View style={{flex:0.1,}}></View>

                            <View style={{flex:0.12, backgroundColor:'white',justifyContent:'center', alignContent:'center', alignItems:'center', borderWidth:0.25, borderRadius:1, marginBottom:4, shadowColor:"grey",shadowOpacity: 0.4,shadowRadius:3*factor_hor,elevation: 6}}>
                                    <TouchableOpacity>
                                        
                                            <TextInput style={{fontFamily:'avenir next', fontSize:20*factor_ver}}
                                                placeholder='New Password'
                                                placeholderTextColor='black'
                                                secureTextEntry={true}
                                                maxLength={20}
                                                onChangeText={
                                                    (typedText) => {
                                                        this.setState({password: typedText})
                                                    }
                                                }
                                            />

                                    </TouchableOpacity>
                            </View>
                            <View style={{flex:0.12, backgroundColor:'white',justifyContent:'center', alignContent:'center', alignItems:'center', borderWidth:0.25, borderRadius:1*factor_hor, marginTop:4,shadowColor:"grey",shadowOffset:{width: 0,height:0},shadowOpacity: 0.4,shadowRadius: 3*factor_hor,elevation: 6}}>
                                <TouchableOpacity >
                                    
                                    <TextInput style={{fontFamily:'avenir next', fontSize:20*factor_ver}}
                                    
                                        placeholder='Confirm Password'
                                        placeholderTextColor='black'
                                        allowFontScaling={true}
                                        secureTextEntry={true}
                                        maxLength={20}
                                        onChangeText={
                                            (typedText) => {
                                                this.setState({confirm_password: typedText})
                                            }
                                        }
                                    />                                
                                </TouchableOpacity>
                            </View>

                            <View style={{flex:0.1, }}></View>
                            <TouchableOpacity onPress={() => this.final_exit_function() } style={{flex:0.15, backgroundColor:'white', justifyContent:'center', alignItems:'center', borderWidth:0.25, borderRadius:1*factor_hor,shadowColor:"grey",shadowOffset:{width: 0,height:0},shadowOpacity: 0.4,shadowRadius: 1*factor_ver,elevation: 6}}>
                                <View>
                                    <Text style={{fontFamily:'avenir next', fontSize:20*factor_ver, color:'black'}}>Next</Text>
                                </View>
                            </TouchableOpacity>


                        </View>
                    
                        <View style={{flex:0.3}}></View>
                    </View>
                </View>
                </LinearGradient>
            </KeyboardAvoidingView>
        </View>
        );
    }
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'stretch',
    },
    top_logo: {
        flex: 0.75,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'stretch',
       
    },
    bottom_button: {
        flex:0.7,
        justifyContent:'center',
        alignSelf:'stretch',
        flexDirection:'row', 

    },
});

    
