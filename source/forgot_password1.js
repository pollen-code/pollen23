import React, {Component} from 'react';
import {StyleSheet, Alert, TextInput, Text, 
        View, TouchableOpacity, KeyboardAvoidingView, 
        Platform, Dimensions} from 'react-native';
import { Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';

var factor = Dimensions.get('window').height/812
var win_height = Dimensions.get('window').height

export default class forgot_password1 extends React.Component {
    static navigationOptions = {header: null};
    constructor(props) {
        super(props);
        this.state = {
            username:null,
            n1:"",
            n2:"",
            n3:"",
            n4:"",
            n5:"",
            valid:'false',
           }
    }
    
    async componentDidMount() {
        const token1 = this.props.navigation.getParam('username')
        this.setState({username:token1}); 
    }
    async final_exit_function() {
            try {   
                code = this.props.navigation.getParam('code')
                console.log(this.state.n1+this.state.n2+this.state.n3+this.state.n4+this.state.n5)
                if( (this.state.n1+this.state.n2+this.state.n3+this.state.n4+this.state.n5) == code){
                    this.props.navigation.navigate('FORGOT_PASSWORD2', {username:this.state.username});  
                    return null
                }
                else
                    return Alert.alert('5 digit code does not match.', '')
                }
            catch (error) {
                console.log(error)
                return Alert.alert('5 digit code does not match.', '')    
            }
    }
    where_go() {
        this.props.navigation.goBack();
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
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
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
                    
                <View style={{flex:5, alignSelf:'stretch', }}>
                </View>
                <View style={{flex:2, alignSelf:'stretch', alignContent:'center', alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontFamily:'avenir next', textAlign:'center', marginEnd:35, marginStart:35, color:'black', fontSize:22*factor_ver}}>Enter the five digit code sent to your email, it may be in your spam folder</Text>
                </View>
                <View style={{flex:2.5, flexDirection:'row', }}>

                    <TextInput 
                        maxLength={1}
                        keyboardType='numeric'
                        returnKeyType={ 'done' }
                        onChangeText={
                        (typedText) => {this.setState({'n1': typedText})}} 
                        style={{fontFamily:'avenir next', flex:1, textAlign:'center', 
                        backgroundColor:'white',fontSize:30*factor_ver,  alignContent:'center', 
                        borderColor:'black', borderWidth:0.25, borderRadius:2,shadowColor:"black",
                        shadowOffset:{width: 2,height:0},shadowOpacity: 0.6,shadowRadius: 4,
                        elevation:6, margin:20*factor_ver}}>

                    </TextInput>
                    <TextInput 
                        maxLength={1}
                        keyboardType='numeric'
                        returnKeyType={ 'done' }
                        onChangeText={
                            (typedText) => {
                                this.setState({'n2': typedText})
        
                            }
                        } 
                        style={{fontFamily:'avenir next', flex:1, textAlign:'center', backgroundColor:'white',fontSize:30*factor_ver,  alignContent:'center', borderColor:'black', borderWidth:0.25, borderRadius:2,shadowColor:"black",shadowOffset:{width: 2,height:0},shadowOpacity: 0.6,shadowRadius: 4,elevation: 6, margin:20*factor_ver}}>

                    </TextInput> 
                    <TextInput 
                        maxLength={1}
                        keyboardType='numeric'
                        returnKeyType={ 'done' }
                        onChangeText={
                            (typedText) => {
                                this.setState({'n3': typedText})
        
                            }
                        } 
                        style={{fontFamily:'avenir next', flex:1, textAlign:'center', backgroundColor:'white',fontSize:30*factor_ver,  alignContent:'center', justifyContent:'center', borderColor:'black', borderWidth:0.25, borderRadius:2,shadowColor:"black",shadowOffset:{width: 2,height:0},shadowOpacity: 0.6,shadowRadius: 4,elevation: 6, margin:20*factor_ver}}>

                    </TextInput>
                    <TextInput 
                        maxLength={1}
                        keyboardType='numeric'
                        returnKeyType={ 'done' }
                        onChangeText={
                            (typedText) => {
                                this.setState({'n4': typedText})
        
                            }
                        } 
                        style={{fontFamily:'avenir next', flex:1, textAlign:'center', backgroundColor:'white',fontSize:30*factor_ver,  alignContent:'center', justifyContent:'center', borderColor:'black', borderWidth:0.25, borderRadius:2,shadowColor:"black",shadowOffset:{width: 2,height:0},shadowOpacity: 0.6,shadowRadius: 4,elevation: 6, margin:20*factor_ver}}>

                    </TextInput>
                    <TextInput 
                        maxLength={1}
                        keyboardType='numeric'
                        returnKeyType={ 'done' }
                        onChangeText={
                            (typedText) => {
                                this.setState({'n5': typedText})
        
                            }
                        } 
                        style={{fontFamily:'avenir next', flex:1, textAlign:'center', backgroundColor:'white',fontSize:30*factor_ver,  alignContent:'center', justifyContent:'center', borderColor:'black', borderWidth:0.25, borderRadius:2,shadowColor:"black",shadowOffset:{width: 2,height:0},shadowOpacity: 0.6,shadowRadius: 4,elevation: 6, margin:20*factor_ver}}>

                    </TextInput>  
                                                                                
                </View>

                <View style={{flex:2, alignSelf:'stretch', alignContent:'center', alignContent:'center', alignItems:'center', justifyContent:'center'}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('LOGIN') }>
                        <Text style={{fontFamily:'avenir next', textAlign:'center' , color:'black', fontSize:19*factor_ver}}>Retry</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flex:0.2, alignSelf:'stretch', }}></View>

                <View style={{flex:1.5,  justifyContent:'center', alignItems:'center', borderWidth:0, borderRadius:2,shadowColor:"#FEF7EC",shadowOffset:{width: 0,height:0},shadowOpacity: 0.4,shadowRadius: 3,elevation: 6, }}>
                    <TouchableOpacity onPress={() => 
                                    {this.final_exit_function()}}>
                        <Text style={{fontFamily:'avenir next', fontSize:27*factor_ver, color:'black',marginEnd:50, marginStart:50}}>Next</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flex:5.5, alignSelf:'stretch', }}></View>
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
        alignSelf:'stretch'
      },
    
    });
