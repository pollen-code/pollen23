import React, {Component} from 'react';
import {StyleSheet, Text,  
        Dimensions, AsyncStorage, View, 
        TouchableOpacity} from 'react-native';
import { Icon, } from 'react-native-elements'
import { ScrollView, } from 'react-native-gesture-handler';

export default class choose_text_color extends React.Component {
    static navigationOptions = {header: null}
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            color:'',
        }
    }

    async componentDidMount() {        
        username = await AsyncStorage.getItem('user')
        color = await AsyncStorage.getItem('text_color')
        this.setState({username:username, color:color})
    }

    async change_color(color) {
        await this.setState({color:color},function(){console.log(this.state.color)})
        await AsyncStorage.setItem('text_color', color)
    }

    render() {
    return (
    <View style={styles.container}>
        <View style={{height:Dimensions.get('window').height*0.05, flexDirection:'row'}}></View>
        <View style={{height:Dimensions.get('window').height*0.045, flexDirection:'row'}}>
            <View style={{flex:0.25, justifyContent:'center', alignContent:'center', alignItems:'center', alignSelf:'stretch'}}>
                    <TouchableOpacity onPress={()=>{ 
                                                    this.props.navigation.state.params.returned(this.state.color), 
                                                    this.props.navigation.goBack() 
                                                }}>
                        <Icon
                            name='chevron-left'
                            color="black"
                            type='entypo'
                            size={25*factor_hor}
                            style={{marginTop:7*factor_hor}}
                        />      
                    </TouchableOpacity>
            </View>
            <View style={{flex:1, justifyContent:'center', alignContent:'center',  alignSelf:'stretch'}}>
            
                <Text style={{fontSize:20, fontFamily:'avenir next', textAlign:'center'}}>Pick Text Color</Text>
            
            </View>
            <View style={{flex:0.25, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
                <View style={{height:20, width:20, backgroundColor:this.state.color, borderRadius:100}}></View>
            </View>
        </View>
        
        <View style={{height:Dimensions.get('window').height*0.025, flexDirection:'row'}}></View>
        <ScrollView style={{flexGrow:1, alignSelf:'stretch'}}>
            <View style={{height:Dimensions.get('window').height*0.15, justifyContent:'space-around', alignContent:'space-around', flexDirection:'row', alignSelf:'stretch', }}>
                <TouchableOpacity onPress={() => {this.change_color('#E31B1B')}}>
                    <View style={{height:90*factor_ver, width:90*factor_ver, justifyContent:'center', alignContent:'center', alignItems:'center', backgroundColor:'#E31B1B', borderRadius:100,}}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.change_color('#0080CD')}}>
                    <View style={{height:90*factor_ver, width:90*factor_ver, justifyContent:'center', alignContent:'center', alignItems:'center', backgroundColor:'#0080CD', borderRadius:100,}}></View>
                </TouchableOpacity>   
                <TouchableOpacity onPress={() => {this.change_color('#BF3B73')}}>
                    <View style={{height:90*factor_ver, width:90*factor_ver, justifyContent:'center', alignContent:'center', alignItems:'center', backgroundColor:'#BF3B73', borderRadius:100,}}></View>
                </TouchableOpacity>
            </View>      
            <View style={{height:Dimensions.get('window').height*0.15, justifyContent:'space-around', alignContent:'space-around', flexDirection:'row', alignSelf:'stretch', }}>
                <TouchableOpacity onPress={() => {this.change_color('#FD6494')}}>
                    <View style={{height:90*factor_ver, width:90*factor_ver, justifyContent:'center', alignContent:'center', alignItems:'center', backgroundColor:'#FD6494', borderRadius:100,}}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.change_color('#F3790E')}}>
                    <View style={{height:90*factor_ver, width:90*factor_ver, justifyContent:'center', alignContent:'center', alignItems:'center', backgroundColor:'#F3790E', borderRadius:100,}}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.change_color('#3BC826')}}>
                    <View style={{height:90*factor_ver, width:90*factor_ver, justifyContent:'center', alignContent:'center', alignItems:'center', backgroundColor:'#3BC826', borderRadius:100,}}></View>
                </TouchableOpacity>
            </View> 
            <View style={{height:Dimensions.get('window').height*0.15, justifyContent:'space-around', alignContent:'space-around', flexDirection:'row', alignSelf:'stretch', }}>
                <TouchableOpacity onPress={() => {this.change_color('#3C006A')}}>
                    <View style={{height:90*factor_ver, width:90*factor_ver, justifyContent:'center', alignContent:'center', alignItems:'center', backgroundColor:'#3C006A', borderRadius:100,}}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.change_color('#0F8BFF')}}>
                    <View style={{height:90*factor_ver, width:90*factor_ver, justifyContent:'center', alignContent:'center', alignItems:'center', backgroundColor:'#0F8BFF', borderRadius:100,}}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.change_color('#6F2DEF')}}>
                    <View style={{height:90*factor_ver, width:90*factor_ver, justifyContent:'center', alignContent:'center', alignItems:'center', backgroundColor:'#6F2DEF', borderRadius:100,}}></View>
                </TouchableOpacity>
            </View> 
            <View style={{height:Dimensions.get('window').height*0.15, justifyContent:'space-around', alignContent:'space-around', flexDirection:'row', alignSelf:'stretch',}}>
                <TouchableOpacity onPress={() => {this.change_color('#0AC8CC')}}>                
                    <View style={{height:90*factor_ver, width:90*factor_ver, justifyContent:'center', alignContent:'center', alignItems:'center', backgroundColor:'#0AC8CC', borderRadius:100,}}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.change_color('#C086D9')}}>
                    <View style={{height:90*factor_ver, width:90*factor_ver, justifyContent:'center', alignContent:'center', alignItems:'center', backgroundColor:'#C086D9', borderRadius:100,}}></View>
                </TouchableOpacity>                
                <TouchableOpacity onPress={() => {this.change_color('#6FCEFF')}}>
                    <View style={{height:90*factor_ver, width:90*factor_ver, justifyContent:'center', alignContent:'center', alignItems:'center', backgroundColor:'#6FCEFF', borderRadius:100,}}></View>
                </TouchableOpacity>
            </View> 
            <View style={{height:Dimensions.get('window').height*0.15, justifyContent:'space-around', alignContent:'space-around', flexDirection:'row', alignSelf:'stretch', }}>
                <TouchableOpacity onPress={() => {this.change_color('#0D587A')}}>
                    <View style={{height:90*factor_ver, width:90*factor_ver, justifyContent:'center', alignContent:'center', alignItems:'center', backgroundColor:'#0D587A', borderRadius:100,}}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.change_color('#0F5933')}}>
                    <View style={{height:90*factor_ver, width:90*factor_ver, justifyContent:'center', alignContent:'center', alignItems:'center', backgroundColor:'#0F5933', borderRadius:100,}}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.change_color('#A2055E')}}>
                    <View style={{height:90*factor_ver, width:90*factor_ver, justifyContent:'center', alignContent:'center', alignItems:'center', backgroundColor:'#A2055E', borderRadius:100,}}></View>
                </TouchableOpacity>
                
            </View> 
            <View style={{height:Dimensions.get('window').height*0.15, justifyContent:'space-around', alignContent:'space-around', flexDirection:'row', alignSelf:'stretch', }}>
      
                <TouchableOpacity onPress={() => {this.change_color('#BA28F0')}}>
                    <View style={{height:90*factor_ver, width:90*factor_ver, justifyContent:'center', alignContent:'center', alignItems:'center', backgroundColor:'#BA28F0', borderRadius:100,}}></View>
                </TouchableOpacity>
            </View> 
        </ScrollView>

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
