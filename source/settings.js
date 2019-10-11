import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements'

export default class settings extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'pollen',
        headerTitleStyle: {fontWeight:'normal', fontSize: 24, color:'#FDA04B'},
        headerStyle:{
            backgroundColor:'#F9F7F4',            
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
            <TouchableOpacity onPress={()=>navigation.goBack()} style={{marginEnd:12}} >
                <Text style={{fontFamily:'avenir next', fontSize:20, fontWeight:'500', color:'#9B9B9B'}}>Done</Text>
            </TouchableOpacity>
        )
    })

    render() {
    return (
        <View style={styles.container}>

        <View style={{flex:1, alignSelf:'stretch', justifyContent:'center', alignContent:'center', alignItems:'center', backgroundColor:'#FEF7EC'}}>  
        
            {/* top horizontal bar containing username and edit profile button*/}
            <View style={{flex:0.12, flexDirection:'row', alignSelf:'stretch', backgroundColor:'#FEF7EC'}}>
                {/* username box*/}
                <View style={{flex:0.5, backgroundColor:"#FEF7EC", justifyContent:'center'}}>
                    <Text style={{fontFamily:'avenir next', fontSize:25, fontWeight:'500', color:'#FDA04B', textAlign:'left', marginLeft:20}}>username</Text>
                </View>
                {/* buffer between username and edit profile */}
                <View style={{flex:0.2, backgroundColor:'#FEF7EC'}}></View>
                {/* edit profile button box*/}
                <View style={{flex:0.29, backgroundColor:"#FEF7EC", justifyContent:'center'}}>
                   <TouchableOpacity style={{}}>
                        <Text style={{fontFamily:'avenir next',paddingEnd:5, paddingBottom:5, paddingTop:5, paddingStart:5, fontSize:18, color:'#FDA04B', textAlign:'center', borderRadius:8, borderColor:'#FDA04B', borderWidth:1}}>edit profile</Text>
                    </TouchableOpacity>
                </View>
                {/* buffer after edit profile button */}
                <View style={{flex:0.05, backgroundColor:'#FEF7EC'}}></View>
            </View>  
            {/* horizontal account bar*/}
            <View style={{ flex:0.08, alignSelf:'stretch', backgroundColor:'white', justifyContent:'center', borderColor:'#979797', borderWidth:1}}>
                <TouchableOpacity style={{flexDirection:'row', alignContent:'center', justifyContent:'center' }}>

                    <View style={{flex:3.5, alignContent:'center', marginTop:0}}>
                        <Text style={{fontFamily:'avenir next', fontSize:25, fontWeight:'500', color:'black', textAlign:'left', marginLeft:20}}>Account</Text>
                    </View>
                    <View style={{flex:1, marginTop:4}}>
                        <Icon 
                            style={{justifyContent:'center' }}
                            size={25}
                            name="chevron-right" 
                            color="black" 
                            type='entypo' 
                        />
                    </View>
                </TouchableOpacity>
            </View>
            {/* horizontal privacy and safety bar*/}
            <View style={{ flex:0.08, alignSelf:'stretch', backgroundColor:'white', justifyContent:'center', borderColor:'#979797', borderWidth:1}}>
                <TouchableOpacity style={{flexDirection:'row', alignContent:'center', justifyContent:'center' }}>

                    <View style={{flex:3.5, alignContent:'center', marginTop:0}}>
                        <Text style={{fontFamily:'avenir next', fontSize:25, fontWeight:'500', color:'black', textAlign:'left', marginLeft:20}}>Privacy and Safety</Text>
                    </View>
                    <View style={{flex:1, marginTop:4}}>
                        <Icon 
                            style={{justifyContent:'center' }}
                            size={25}
                            name="chevron-right" 
                            color="black" 
                            type='entypo' 
                        />
                    </View>
                </TouchableOpacity>
            </View>
            {/* horizontal notifications bar*/}
            <View style={{flex:0.08, alignSelf:'stretch', backgroundColor:'white', justifyContent:'center', borderColor:'#979797', borderWidth:1}}>
                <TouchableOpacity style={{flexDirection:'row', alignContent:'center', justifyContent:'center' }}>

                    <View style={{flex:3.5, alignContent:'center', marginTop:0}}>
                        <Text style={{fontFamily:'avenir next', fontSize:25, fontWeight:'500', color:'black', textAlign:'left', marginLeft:20}}>Notifications</Text>
                    </View>
                    <View style={{flex:1, marginTop:4}}>
                        <Icon 
                            style={{justifyContent:'center' }}
                            size={25}
                            name="chevron-right" 
                            color="black" 
                            type='entypo' 
                        />
                    </View>
                </TouchableOpacity>
            </View>
            {/* buffer space between bar clusters*/}
            <View style={{flex:0.08, alignSelf:'stretch', backgroundColor:'#FEF7EC'}}></View>
            {/* horizontal display and sound bar*/}
            <View style={{flex:0.08, alignSelf:'stretch', backgroundColor:'white', justifyContent:'center', borderColor:'#979797', borderWidth:1}}>
                <TouchableOpacity style={{flexDirection:'row', alignContent:'center', justifyContent:'center' }}>

                    <View style={{flex:3.5, alignContent:'center', marginTop:0}}>
                        <Text style={{fontFamily:'avenir next', fontSize:25, fontWeight:'500', color:'black', textAlign:'left', marginLeft:20}}>Display and Sound</Text>
                    </View>
                    <View style={{flex:1, marginTop:4}}>
                        <Icon 
                            style={{justifyContent:'center' }}
                            size={25}
                            name="chevron-right" 
                            color="black" 
                            type='entypo' 
                        />
                    </View>
                </TouchableOpacity>
            </View>
            {/* horizontal accessibility bar*/}
            <View style={{flex:0.08, alignSelf:'stretch', backgroundColor:'white', justifyContent:'center', borderColor:'#979797', borderWidth:1}}>
                <TouchableOpacity style={{flexDirection:'row', alignContent:'center', justifyContent:'center' }}>

                    <View style={{flex:3.5, alignContent:'center', marginTop:0}}>
                        <Text style={{fontFamily:'avenir next', fontSize:25, fontWeight:'500', color:'black', textAlign:'left', marginLeft:20}}>Accessibility</Text>
                    </View>
                    <View style={{flex:1, marginTop:4}}>
                        <Icon 
                            style={{justifyContent:'center' }}
                            size={25}
                            name="chevron-right" 
                            color="black" 
                            type='entypo' 
                        />
                    </View>
                </TouchableOpacity>
            </View>
            {/* horizontal data usage bar*/}
            <View style={{flex:0.08, alignSelf:'stretch', backgroundColor:'white', justifyContent:'center', borderColor:'#979797', borderWidth:1}}>
                <TouchableOpacity style={{flexDirection:'row', alignContent:'center', justifyContent:'center' }}>

                    <View style={{flex:3.5, alignContent:'center', marginTop:0}}>
                        <Text style={{fontFamily:'avenir next', fontSize:25, fontWeight:'500', color:'black', textAlign:'left', marginLeft:20}}>Data Usage</Text>
                    </View>
                    <View style={{flex:1, marginTop:4}}>
                        <Icon 
                            style={{justifyContent:'center' }}
                            size={25}
                            name="chevron-right" 
                            color="black" 
                            type='entypo' 
                        />
                    </View>
                </TouchableOpacity>
            </View>
            {/* horizontal about Pollen bar*/}
            <View style={{flex:0.08, alignSelf:'stretch', backgroundColor:'white', justifyContent:'center', borderColor:'#979797', borderWidth:1}}>
                <TouchableOpacity style={{flexDirection:'row', alignContent:'center', justifyContent:'center' }}>

                    <View style={{flex:3.5, alignContent:'center', marginTop:0}}>
                        <Text style={{fontFamily:'avenir next', fontSize:25, fontWeight:'500', color:'black', textAlign:'left', marginLeft:20}}>About Pollen</Text>
                    </View>
                    <View style={{flex:1, marginTop:4}}>
                        <Icon 
                            style={{justifyContent:'center' }}
                            size={25}
                            name="chevron-right" 
                            color="black" 
                            type='entypo' 
                        />
                    </View>
                </TouchableOpacity>
            </View>
            {/* buffer space at bottom of page*/}
            <View style={{flex:0.24, alignSelf:'stretch', backgroundColor:'#FEF7EC'}}></View>

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
