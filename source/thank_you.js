import React, {Component} from 'react';
import {StyleSheet, Text, Alert, View, AsyncStorage,} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image'

const EntityAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'LOAD_PAGE' })],
});

export default class thank_you extends React.Component {
    static navigationOptions = {header: null};
    constructor(props) {
        super(props);
        this.state = {
            username:'NULL',
            phone_number:'NULL'
        }
    }

    async retrieveSessionToken() {
        const token1 = await AsyncStorage.getItem('phone_number');  
        const token = await AsyncStorage.getItem('user');
        const token2 = await AsyncStorage.getItem('term_agreement');
        const token3 = await AsyncStorage.getItem('loc');
        const token4 = await AsyncStorage.getItem('pass');
        const token5 = await AsyncStorage.getItem('ref');
        const token6 = await AsyncStorage.getItem('birth1');
        const token7 = await AsyncStorage.getItem('birth2');
        const token8 = await AsyncStorage.getItem('birth3');
        const token9 = await AsyncStorage.getItem('eth');
        const token10 = await AsyncStorage.getItem('gender_male');
        const token11 = await AsyncStorage.getItem('gender_female');
        const token12 = await AsyncStorage.getItem('pref');
        const token13 = await AsyncStorage.getItem('edu');
        const token14 = await AsyncStorage.getItem('car');
        const token15 = await AsyncStorage.getItem('interest1');
        const token16 = await AsyncStorage.getItem('interest2');
        const token17 = await AsyncStorage.getItem('interest3');
        const token18 = await AsyncStorage.getItem('interest4');
        const token19 = await AsyncStorage.getItem('interest5');
        const token20 = await AsyncStorage.getItem('interest6');
        const token21 = await AsyncStorage.getItem('interest7');
        const token22 = await AsyncStorage.getItem('interest8');
        const token23 = await AsyncStorage.getItem('user_email');

        if (token !== null) {
        this.setState({username:token},  function () {console.log('json response username ' + this.state.username ) });
            // if male true    
            if(token10 == 'true') {
                url = `http://${serverLocation}:80/signup?`
                await fetch(url, {
                    method:'POST',
                    headers:{    
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                    body: 
                    JSON.stringify({
                            username:token,
                            phone_number:token1.replace('+', '%2B'),
                            term_agreement:token2,
                            pass:token4.toString(),
                            location_agreement:token3,
                            referal:token5,
                            b1:token6,
                            b2:token7,
                            b3:token8,
                            ethnicity:token9,
                            gender:'male',
                            education:token13,
                            career:token14,
                            interest8:token15,
                            interest1:token16,
                            interest2:token17,
                            interest3:token18,
                            interest4:token19,
                            interest5:token20,
                            interest6:token21,
                            interest7:token22,
                            email:token23.toString() 
                        })
                    })
                    .then((response) => response.json())
                    .then((responseJson2) => {
                        console.log(responseJson2)
                        AsyncStorage.multiSet([ 
                            ['q1', 'xxx'],
                            ['q2', 'xxx'],
                            ['q3', 'xxx'],
                            ['q4', 'xxx'],
                            ['q5', 'xxx'],
                            ['q6', 'xxx'],
                            ['q7', 'xxx'],
                            ['q8', 'xxx'],
                            ['seenFeed', 'false'],
                            ['seenRooms', 'false'],
                            ['safeMode', 'false'],
                            ['text_color', '#f9a32c'],
                            ['loggedin_status', 'true']
                        ])
                        setTimeout( () => {this.load()}, 1000); 
                    })
                    .catch((error) => {
                        Alert.alert("Please check your connection and try again")
                    }); 
            }
            // if female true
            else if( token11 == 'true') {         
                url = `http://${serverLocation}:80/signup?`
                await fetch(url, {
                    method:'POST',
                    headers:{    
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                    body: JSON.stringify({
                            username:token,
                            phone_number:token1.replace('+', '%2B'),
                            term_agreement:token2,
                            pass:token4.toString(),
                            location_agreement:token3,
                            referal:token5,
                            b1:token6,
                            b2:token7,
                            b3:token8,
                            ethnicity:token9,
                            gender:'female',
                            education:token13,
                            career:token14,
                            interest8:token15,
                            interest1:token16,
                            interest2:token17,
                            interest3:token18,
                            interest4:token19,
                            interest5:token20,
                            interest6:token21,
                            interest7:token22,
                            email:token23.toString() 
                        })
                    })
                    .then((response) => response.json())
                    .then((responseJson2) => {
                        console.log(responseJson2)
                        AsyncStorage.multiSet([ 
                            ['q1', 'xxx'],
                            ['q2', 'xxx'],
                            ['q3', 'xxx'],
                            ['q4', 'xxx'],
                            ['q5', 'xxx'],
                            ['q6', 'xxx'],
                            ['q7', 'xxx'],
                            ['q8', 'xxx'],
                            ['seenFeed', 'false'],
                            ['seenRooms', 'false'],
                            ['safeMode', 'false'],
                            ['text_color', '#f9a32c'],
                            ['loggedin_status', 'true']
                        ])
                        setTimeout( () => {this.load()}, 1000); 
                    })
                    .catch((error) => {
                        console.log(error)
                        Alert.alert("Please check your connection and try again")
                    }); 
            }
        }
    }

    componentDidMount() {
        this.retrieveSessionToken();
    }
    load = () => {
        this.props.navigation.dispatch(EntityAction);    
    }

    render() {
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#FFBA6F','#FC3004']} style={{flex:1, opacity:0.9, alignSelf:'stretch'}}>
            <View style={{flex:1.8, alignSelf:'stretch', alignContent:'center', alignItems:'center', justifyContent:'center', }}>
            
            <View style={{flex:0.8}}></View>
                <Text style={{ marginTop:15, fontFamily:'avenir next', textAlign:'center', fontSize: 30*factor_hor, color:'white'}}>Thank you for joining!</Text>
                <Text style={{ marginTop:15, fontFamily:'avenir next', fontSize: 20*factor_hor, textAlign:'center',color:'white'}}>You will be logged in now</Text>
            </View>

            <View style={{flex:4, alignSelf:'stretch', alignContent:'center', justifyContent:'center', alignItems:'center'}}>
                          
                <FastImage source={require('./spore_no_background.png')}
                    resizeMode={FastImage.resizeMode.contain}
                    style={{
                        flex: 1,
                        width: '80%',
                    marginTop:25*factor_ver}}
                />
                
                <FastImage source={require('./pollen.png')}
                    resizeMode={FastImage.resizeMode.contain}
                    style={{
                        justifyContent:'center',
                        alignContent:'center',
                        flex: 1,
                        width: '40%',
                        resizeMode: 'contain' }}
                />
            </View>
           
            <View style={{flex:0.5, flexDirection:'row', alignSelf:'stretch', alignContent:'center', justifyContent:'center', alignItems:'center', justifyContent:'center', }}>
                    <View style={{flex:0.2}}></View>
                    <View style={{flex:0.8, justifyContent:'center', alignContent:'center', alignItems:'center', textAlign:'center'}}>
                       
                    </View>
                    <View style={{flex:0.2}}></View>
            </View>
            <View style={{flex:1}}></View>
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
    
    });

