import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements'

export default class help_menu extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: "pollen",
        headerTitleStyle: {fontFamily:'avenir next', fontWeight:'normal', fontSize: 24, color:'#FDA04B'},
        headerStyle:{
            backgroundColor:'#FEF7EC',            
        },
        headerLeft: (
            <TouchableOpacity onPress={()=>navigation.goBack()} style={{marginStart:12}} >
                <Icon 
                    name="chevron-left"
                    color="black"
                    type='entypo'
                />
            </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity onPress={()=>navigation.goBack()} style={{marginStart:12}} >
                <Icon 
                    name="settings"
                    color="black"
                    type='entypo'
                />
            </TouchableOpacity>
        )
    })
    render() {
    return (
    <View style={styles.container}>

        <View style={{flex:0.9, alignSelf:'stretch', backgroundColor:'#FEF7EC'}}>
        </View>


        <View style={{flex:0.1, flexDirection:'row', borderTopWidth:1, borderTopColor:'lightgrey', alignSelf:'stretch', backgroundColor:'#FEF7EC', alignItems:'center', alignContent:'space-around', justifyContent:'space-around'}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('MAP')}  style={{marginBottom:12, marginStart:20}}>
                <Icon
                    name='location-pin'
                    color='black'
                    type='entypo'
                />          
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('FEED')} style={{marginBottom:12}}>
                <Icon
                    name='text-document'
                    color='black'
                    type='entypo'
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('PRIVATE_MESSAGE')} style={{marginBottom:12}}>
                <Icon
                    name='email'
                    color='black'
                />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => this.props.navigation.navigate('PROFILE')} style={{marginBottom:12, marginEnd:20}}>
                <Icon
                    name='user'
                    color='black'
                    type='entypo'
                />
            </TouchableOpacity>
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
    backgroundColor: '#FEF7EC',
  },


});
