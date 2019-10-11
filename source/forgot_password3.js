import React, {Component} from 'react';
import {StyleSheet, Text, View, AsyncStorage, 
        TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

var routechoice = 'SIGNUP_LOGIN'

export default class forgot_password3 extends React.Component {
    static navigationOptions = {header: null};

    async componentDidMount() {
        if(await AsyncStorage.getItem('loggedin_status') == true || await AsyncStorage.getItem('loggedin_status') == 'true') {
            routechoice = 'SIGNUP_LOGIN'
        }
    }

    render() {
      return (

        <View style={styles.container}>
        <LinearGradient colors={['#FFBA6F','#FC3004']} style={{flex:1, opacity:0.9, alignSelf:'stretch'}}>
            <View style={{flex:1, alignSelf:'stretch', }}></View>
            <View style={{flex:1, alignSelf:'stretch', }}></View>
            <View style={{flex:1, alignSelf:'stretch', }}></View>
            <View style={{flex:1, alignSelf:'stretch', alignContent:'center', alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontFamily:'avenir next', textAlign:'center', fontSize:20, color:'black'}}>
                    Your password has been reset
                </Text>
            </View>
            <View style={{flex:1, alignSelf:'stretch',}}></View>
            <View style={{flex:1, alignSelf:'stretch',}}></View>
            <View style={{flex:1, alignSelf:'stretch',}}></View>
            <View style={{flex:0.75, flexDirection:'row',  alignSelf:'stretch'}}>
                <View style={{flex:1.2,alignSelf:'stretch'}}></View>
                <View style={{flex:1,alignSelf:'stretch', backgroundColor:'white', alignContent:'space-around', justifyContent:'space-around', alignText:'center', borderColor:'grey', borderWidth:1, borderRadius:1,shadowColor:"black",shadowOffset:{width: 0,height:0},shadowOpacity: 0.4,shadowRadius:2,elevation: 2}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate(routechoice)}>
                        <Text style={{fontFamily:'avenir next', textAlign:'center', fontSize:24*factor_ver, color:'black'}}>Done</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1.2,alignSelf:'stretch'}}></View>
            </View>
            <View style={{flex:1, alignSelf:'stretch', }}></View>
            <View style={{flex:1, alignSelf:'stretch', }}></View>
            
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
        backgroundColor: '#FEF7EC',
      },
    
    });
