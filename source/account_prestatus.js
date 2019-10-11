import React, {Component} from 'react';
import {StyleSheet, Text, AsyncStorage,  View,  
         TouchableOpacity, Alert, Dimensions,} from 'react-native';
import { Icon,  } from 'react-native-elements'

export default class account_prestatus extends React.Component {
    static navigationOptions = {header: null};
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            status:'',
            standing:'',
        }
    }

    async componentDidMount() {
        
        userID = await AsyncStorage.getItem('user')
        standing = await this.props.navigation.getParam('account_standing')
        status = await this.props.navigation.getParam('account_status')
        this.setState({
            username:userID, 
            status:status,
            standing:standing
        })
    }

    standing_color() {
        if(this.state.standing == 'Good') {
            return 'rgba(113, 233, 42, 1)'
        }
        else if(this.state.standing == 'One strike of three') {
            return 
        }
        else if(this.state.standing == 'Two strikes of three') {
            return 
        }
        else if(this.state.standing == 'Three strikes of three') {
            return `rgba(252, 48, 4, 0.8)`
        }
    }
    status_color() { 
        if(this.state.status == 'Active') {
            return 'rgba(113, 233, 42, 1)'
        }
        else {
            return `rgba(252, 48, 4, 0.8)`
        }
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
            <Text style={{fontSize:25*factor_hor, fontFamily:'avenir next', textAlign:'center', fontWeight:'600'}}>Account Status</Text>
            </View>
            <View style={{flex:1}}></View>
        </View>
        
        <View style={{height:'4%',marginLeft:30*factor_hor, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
        </View>
        
        <View style={{flex:1,flexDirection:'row'}}>

            <View style={{alignSelf:'stretch', flex:1,}}>
            <View style={{ justifyContent:'center', flexDirection:'row',  width:Dimensions.get('window').width, height:50*factor_hor, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:10*factor_hor}}>
                <Text style={{textAlign:'left', fontFamily:'Avenir Next',marginLeft:30*factor_hor, fontWeight:'500', fontSize:22*factor_hor}}>Standing</Text>
                <Text style={{textAlign:'left', color:this.standing_color(), fontFamily:'Avenir Next',marginLeft:20*factor_hor, fontWeight:'600', fontSize:22*factor_hor}}>{this.state.standing}</Text>
                <View style={{flex:1}}></View>
            </View>           
            <View style={{ justifyContent:'center', flexDirection:'row', alignContent:'center', width:Dimensions.get('window').width,height:50*factor_hor, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:10*factor_hor}}>
                <Text style={{fontFamily:'Avenir Next', fontSize:22*factor_hor,marginLeft:30*factor_hor,fontWeight:'500', }}>Status</Text>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('ACCOUNT_STATUS', {status:this.state.status})}}>
                    <Text style={{textAlign:'left', color:this.status_color(), fontFamily:'Avenir Next',marginLeft:20*factor_hor, fontWeight:'600', fontSize:22*factor_hor}}>{this.state.status}</Text>
                </TouchableOpacity>
                <View style={{flex:1}}></View>
            </View>        
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



