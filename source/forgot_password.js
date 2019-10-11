import React, {Component} from 'react';
import {StyleSheet, Alert, KeyboardAvoidingView, Dimensions,
        TextInput, Text, Platform, View, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import SporeNoBackground from './svgs/spore_no_background';

var factor = Dimensions.get('window').height/812
var win_height = Dimensions.get('window').height

export default class forgot_password extends React.Component {
    static navigationOptions = {header: null};
    constructor(props) {
        super(props);
        this.state = {
            username:null,
            phone_number:null,
            valid:"false",
            toggle1:false,
            animating:false,
            code:false,
            pickerData:'',
            cca2: 'US',
            email:'',
            clicked:false,
            anykey:false,
           }
        }

    async final_exit_function() {
        if(this.state.clicked == false){
            await this.setState({clicked:true}, function(){console.log(this.state.clicked)})
            try {
                this.setState({animating:true});
                url = `http://${serverLocation}:80/send_email?user_email=${this.state.email.toString()}&username=${this.state.username}`
                await fetch(url)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log('response:', responseJson);
                        this.setState({code:responseJson}, function () {console.log('json response ' + this.state.code, typeof(this.state.code) ) });     
                    })
                    .catch((error) => {
                        console.log(error)
                        return null;
                    });                  
                
                if( this.state.code == 'fail' ){
                    this.setState({animating:false})
                    this.setState({clicked:false})
                    return Alert.alert('Email and username do not match', '')            
                }
                else if( (typeof(this.state.code) == 'string') && (this.state.code.length == 5) ) {
                    console.log('if logging', this.state.code, typeof(this.state.code) )
                    {
                    this.props.navigation.navigate("FORGOT_PASSWORD1", {username:this.state.username, code:this.state.code, any_key2:true}),
                    this.setState({clicked:false})
                    }
                    return null
                }
                else {
                    this.setState({clicked:false})
                    return Alert.alert('Email and username do not match', '')            
                }
            }
                
            catch (error) {
                console.log('err', error)
                this.setState({animating:false})
                return Alert.alert('Email and username do not match', '')    
            }
        }
    }
    async componentDidMount(){
        try {
            if(this.props.navigation.getParam('any_key').length > 0) {
                await this.setState( {anykey:true} , function() {console.log(this.state.anykey)})
            }
        } 
        catch (error) {
            
        }
        
    }
    where_go() {
        if(this.state.anykey==true) { 
            this.props.navigation.navigate("ADVANCED")
            
        }
        else {
            this.props.navigation.goBack();
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
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <View style={styles.container}>
                <LinearGradient colors={['#FFBA6F','#FC3004']} style={{height:Dimensions.get('window').height, opacity:0.9, alignSelf:'stretch'}}>
                    <View style={{height:this.winHeight()}}></View>
                    <View style={{height:Dimensions.get('window').height*0.0675, flexDirection:'row', alignSelf:'stretch'}}>
                        <View style={{flex:0.125, alignContent:'center', justifyContent:'center'}}>
                        <TouchableOpacity hitSlop={{left:25, right:25, top:25, bottom:25}} onPress={()=> this.where_go()}  style={{marginStart:15*factor}} >
                            <Icon 
                                name="chevron-left"
                                color="black"
                                type='entypo'
                                size={30*factor_hor}
                            />
                        </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{height:Dimensions.get('window').height*0.4, justifyContent:'center',alignItems:'center',alignSelf:'stretch',}}>
                        <SporeNoBackground
                            width={325*factor_hor}
                            height={320*factor_ver}
                        />
                    </View>
                    <View style={{height:Dimensions.get('window').height*0.075, alignSelf:'stretch', justifyContent:'center', alignContent:'center', }}>

                    </View>
                    <View style={{height:Dimensions.get('window').height*0.4, justifyContent:'center',alignSelf:'stretch',flexDirection:'row', }}>
                    
                        <View style={{flex:1, flexDirection:'row'}}>
                        <View style={{flex:0.3}}></View>
                        <View style={{flex:0.60,}}>
                            <View style={{flex:0.1,}}></View>
                            <View style={{flex:0.135, backgroundColor:'white',justifyContent:'center', alignContent:'center', alignItems:'center', borderWidth:0.5*factor, borderRadius:3*factor, marginTop:4*factor,shadowColor:"#ececec",shadowOffset:{width: 0,height:0},shadowOpacity: 0.4,shadowRadius:1*factor,elevation: 2*factor}}>
                                <TextInput 
                                    hitSlop={{left:30*factor_hor, right:30*factor_hor, top:15*factor, bottom:15*factor}}
                                    style={{fontFamily:'avenir next', backgroundColor:'white', fontSize:20*factor}}
                                    placeholder='Email Address'
                                    onChangeText={(typedText) => {this.setState({email: typedText})}}
                                    placeholderTextColor='black'
                                    allowFontScaling={true}
                                    autoCompleteType={"off"}
                                />   
                            </View>
                            <View style={{flex:0.01}}></View>
                            <View style={{flex:0.135, backgroundColor:'white',justifyContent:'center', alignContent:'center', alignItems:'center', borderWidth:0.5*factor, borderRadius:3*factor, marginTop:4*factor,shadowColor:"#ececec",shadowOffset:{width: 0,height:0},shadowOpacity: 0.4,shadowRadius:1*factor,elevation: 2*factor}}>
                                <TextInput style={{fontFamily:'avenir next', fontSize:20*factor}}
                                    placeholder='Username'
                                    onChangeText={(typedText) => {this.setState({username: typedText})}}
                                    placeholderTextColor='black'
                                    allowFontScaling={true}
                                    autoCompleteType={"off"}
                                />              
                            </View>

                            <View style={{flex:0.075,}}></View>
                            <TouchableOpacity style={{flex:0.175, backgroundColor:'white', justifyContent:'center', alignItems:'center', borderWidth:0.5*factor, borderRadius:3*factor,shadowColor:"#ececec",shadowOffset:{width: 0,height:0},shadowOpacity: 0.4,shadowRadius:1*factor,elevation: 2*factor}} onPress={() => {this.final_exit_function();}}>
                                <View>
                                    <Text style={{fontFamily:'avenir next', fontSize:22*factor, color:'black'}}>Next</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:0.3}}></View>
                    </View>
                </View>
                </LinearGradient>
            </View>
        </KeyboardAvoidingView>
        );
    }}

const styles = StyleSheet.create({  
    container: {
        flex:1, 
        alignSelf:'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        },
});

    
