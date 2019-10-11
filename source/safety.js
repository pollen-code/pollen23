import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements'

export default class safety extends React.Component {
    static navigationOptions = {header: null};
    render() {
      return (

        <View style={styles.container}>
            <View style={{height:'5%'}}></View>
            <View style={{height:'5%',  flexDirection:'row', borderBottomColor:'#9B9B9B', borderBottomWidth:0, alignSelf:'stretch', justifyContent:'center', justifyContent:'center', alignItems:'center'}}>
                    <View style={{flex:1, marginTop:4*factor_hor, alignSelf:'stretch' }}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={{marginStart:0}}>
                            <Icon 
                                name="chevron-left"
                                color="#9b9b9b"
                                type='entypo'
                                size={25*factor_hor}
                            />
                        </TouchableOpacity>               
                    </View>    
                    <View style={{flex:7, }}>    
                        <Text style={{textAlign:'center', justifyContent:'center', alignItems:'center', alignContent:'center', fontSize:24*factor_hor, fontFamily:'Avenir next', fontWeight:'500', color:'black'}}>Safety</Text>
                    </View>
                    <View style={{flex:1}}></View>
                </View>    
                
            <View style={{flex:0.05}}></View>
            <View style={{marginStart:10*factor_hor, marginEnd:10*factor_hor, flex:0.5, }}>
                <Text style={{fontSize:26*factor_hor, fontWeight:'600', textAlign:'center'}}>Pollen</Text>
                <Text style={{fontSize:22*factor_hor, marginTop:5*factor_hor, textAlign:'center',  }}>No calls for violence</Text>
                <Text style={{fontSize:22*factor_hor, marginTop:5*factor_hor,textAlign:'center',  }}>Do not threaten or endanger</Text>
                <Text style={{fontSize:22*factor_hor, marginTop:5*factor_hor,textAlign:'center',  }}>Do not directly target or bully</Text>
                <Text style={{fontSize:22*factor_hor, marginTop:5*factor_hor,textAlign:'center',  }}>No disturbing content</Text>
                <Text style={{fontSize:22*factor_hor, marginTop:5*factor_hor,textAlign:'center',  }}>Do not spam</Text>
            </View>
            <View style={{marginStart:10*factor_hor, marginTop:0*factor_hor, marginEnd:10*factor_hor, flex:0.5, }}>
                <Text style={{fontSize:26*factor_hor, fontWeight:'600', textAlign:'center'}}>If You Break the Rules</Text>
                <Text style={{fontSize:22*factor_hor, marginTop:5*factor_hor,textAlign:'center',  }}>In serious cases we coorporate with police</Text>
                <Text style={{fontSize:22*factor_hor, marginTop:5*factor_hor, textAlign:'center',  }}>First a suspension</Text>
                <Text style={{fontSize:22*factor_hor, marginTop:5*factor_hor,textAlign:'center',  }}>Then a longer suspension</Text>
                <Text style={{fontSize:22*factor_hor, marginTop:5*factor_hor,textAlign:'center',  }}>Finally a permanent ban</Text>
            </View>
            <View style={{marginStart:10*factor_hor, marginTop:0*factor_hor, marginEnd:10*factor_hor, flex:0.5, }}>
                <Text style={{fontSize:26*factor_hor, fontWeight:'600', textAlign:'center'}}>How You Can Help</Text>
                <Text style={{fontSize:22*factor_hor, marginTop:5*factor_hor, textAlign:'center',  }}>Flag posts against conduct</Text>
                <Text style={{fontSize:22*factor_hor, marginTop:5*factor_hor,textAlign:'center',  }}>Block problematic users</Text>
                <Text style={{fontSize:22*factor_hor, marginTop:5*factor_hor,textAlign:'center',  }}>Downvote hateful posts</Text>
                <Text style={{fontSize:22*factor_hor, marginTop:5*factor_hor,textAlign:'center',  }}>Become a moderator</Text>
            </View> 
            <View style={{flex:0.05}}></View>           
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
