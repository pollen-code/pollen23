import React, {Component} from 'react';
import {StyleSheet, Text, Dimensions, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image'
import Svg, { Path } from 'react-native-svg';
import Pollen from './svgs/pollen'
import SporeNoBackground from './svgs/spore_no_background'

const {height, width} = Dimensions.get('window'); 
var size_frac = height/812

export default class signup_login extends React.Component {
    static navigationOptions = {header: null};
    
    render() {
      return ( 
        <View style={styles.container}>
           <LinearGradient colors={['#FFBA6F','#FC3004']} style={{flex:1, opacity:0.9, alignSelf:'stretch'}}>
            <View style={{flex:1.5,}}>
                <View style={{flex:0.15}}></View>
                <View style={{flex:1, alignItems:'center', }}>
                <FastImage source={require('./spore_no_background.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{
                                flex: 0.75,
                                paddingTop:150,
                                width: '90%',
                                resizeMode: 'contain' }}
                            >
                </FastImage>    
                <FastImage source={require('./pollen.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{
                                flex: 0.5,
                                marginBottom:50,
                                justifyContent:'center',
                                alignContent:'center',
                                width: '40%',
                                resizeMode: 'contain' }}
                            >
                </FastImage>                  
                </View>
            </View>

            <View style={{flex:0.6, alignContent:'center', justifyContent:'center'}}>
                <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:0.3}}></View>
                
                    <View style={{flex:0.40, }}>
                    
                        <View style={{flex:0.1, }}></View>
                        <TouchableOpacity style={{height:'20%', backgroundColor:'white',justifyContent:'center', alignContent:'center', alignItems:'center', borderWidth:0.25, borderRadius:3, marginBottom:4, shadowColor:"#9b9b9b",shadowOffset:{width: 0,height:0},shadowOpacity: 0.4,shadowRadius: 3,elevation: 6}} onPress={() => this.props.navigation.navigate('SIGNUP')} >
                            <View>
                                        <Text style={{fontFamily:'avenir next', color:'black', fontSize: 22*size_frac}}>Sign Up</Text>
                            </View>
                        </TouchableOpacity>
            

                        <TouchableOpacity style={{height:'20%', backgroundColor:'white',justifyContent:'center', alignContent:'center', alignItems:'center', borderWidth:0.25, borderRadius:3, marginTop:4, shadowColor:"#9b9b9b",shadowOffset:{width: 0,height:0},shadowOpacity: 0.4,shadowRadius: 3,elevation: 6}} onPress={() => this.props.navigation.navigate('LOGIN')}>
                            <View>  
                                <Text style={{fontFamily:'avenir next', color:'black', fontSize:22*size_frac}}>Log In</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                
                    <View style={{flex:0.3}}></View>

                
                </View>

            </View>
        </LinearGradient>
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

