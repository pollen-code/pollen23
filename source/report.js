import React, {Component} from 'react';
import {StyleSheet, Text, AsyncStorage, View, 
    TouchableOpacity, } from 'react-native';
import { Icon, } from 'react-native-elements'
import { TextInput } from 'react-native-gesture-handler';

export default class report extends React.Component {
    static navigationOptions = {header: null};
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            feedback_comment:'',
            feedback_comment_length:1000,
        }
    }

    async componentDidMount() {
      this.setState({username:(await AsyncStorage.getItem('user'))},function(){console.log(this.state.username)}) 
    }    
    async make_feedback() {
      url = `http://${serverLocation}:80/feedback?route=2&route=2&userID=${this.state.username}&feedback_comment=${this.state.feedback_comment}`
      console.log(url)
      await fetch(url)
      this.textInput.clear()
      this.props.navigation.goBack()
    }

    render() {
    
    return (
    <View style={styles.container}>
        <View style={{flex:0.05,alignSelf:'stretch'}}></View>
        
        <View style={{flex:1, backgroundColor:'white', alignSelf:'stretch', borderColor:"#FC6026", borderWidth:2,}}>
            
            <View style={{flex:0.075, flexDirection:'row'}}>
                <View style={{flex:0.75, justifyContent:'center', alignItems:'center', alignContent:'center'}}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={{marginStart:0}} >
                        <Icon 
                            name="chevron-left"
                            color="#979797"
                            type='entypo'
                            size={25*factor_hor}
                        />
                    </TouchableOpacity>                
                </View>
                <View style={{flex:4, }}></View>
                <View style={{flex:1.5, justifyContent:'center', alignContent:'center'}}>
                    <TouchableOpacity>
                    <View style={{borderColor:"#FC6026", borderWidth:1, height:30, borderRadius:20, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                        <Text style={{fontFamily:'Avenir next', fontSize:20*factor_hor, color:"#FC6026"}}>{this.state.feedback_comment_length}</Text>
                    </View>           
                    </TouchableOpacity>     
                </View>                
                <View style={{flex:0.15, }}></View>
                <View style={{flex:1.5, justifyContent:'center', alignContent:'center'}}>
                    <TouchableOpacity onPress={() => {this.make_feedback()}}>
                    <View style={{borderColor:"#FC6026", borderWidth:1, height:30, borderRadius:20, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                        <Text style={{fontFamily:'Avenir next', fontSize:20*factor_hor, color:"#FC6026"}}>Done</Text>
                    </View>           
                    </TouchableOpacity>     
                </View>
                <View style={{flex:0.5, }}></View>
            </View>
            <View style={{flex:0.925, }}>
              <TextInput style={{textAlign:'left',fontSize:factor_hor*18, marginLeft:20*factor_hor, marginRight:20*factor_hor, marginTop:7, backgroundColor:'white', fontFamily:'avenir next' }}
                  color='black'
                  ref={input => { this.textInput = input }}
                  multiline={true}
                  placeholder='please report a negative experience or send us an email directly at pollenapptechnologies@gmail.com'
                  placeholderTextColor='#979797'
                  maxLength={1000}
                  onChangeText={
                      (typedText) => {
                                      this.setState( {feedback_comment: typedText}, function () {console.log(this.state.feedback_comment)} )
                                      this.setState( {feedback_comment_length: 1000 - typedText.length}, function () {console.log(typedText)})
                                      }
                                  }
                  onSubmitEditing={ () => {this.make_feedback()}}
              />  
            </View>
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
    },
  });