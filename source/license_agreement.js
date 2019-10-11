import React, {Component} from 'react';
import {StyleSheet, Text, View, Linking,
    TouchableOpacity, ScrollView} from 'react-native';
import { Icon } from 'react-native-elements'

export default class license_agreement extends React.Component {
    static navigationOptions = {header: null};
    constructor(props) {
        super(props);
        this.state = {
            from:true,
        }
    }

    async componentDidMount() {
        from = await this.props.navigation.getParam("from")
        if(from == 'settings') {
            this.setState({ from:false})
        }
    }
    
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
                                size={30*factor_hor}
                            />
                        </TouchableOpacity>               
                    </View>    
                    <View style={{flex:7, }}>    
                        <Text style={{textAlign:'center', justifyContent:'center', alignItems:'center', alignContent:'center', fontSize:20*factor_hor, fontFamily:'Avenir next', fontWeight:'500', color:'black'}}>End User License Agreement</Text>
                    </View>
                    <View style={{flex:1}}></View>
                </View>    
                
            <ScrollView 
                style={{flex:1, paddingLeft:5, paddingRight:5}}
            >
                <Text style={{fontSize:16*factor_hor}}>

                    Pollen has a zero tolerance policy towards threats and abuse on the platform.
                    The result of any of the following will result in an immediate ban from the platform.{"\n"}
                </Text>
                <Text style={{fontSize:20*factor_hor, paddingTop:5, paddingLeft:5, borderWidth:1, borderColor:'red'}}>
                    1) Calls for violence{"\n"}
                    2) Directed threats or public endangerment{"\n"}
                    3) Targeted harassment, hate speech, or cyberbullying{"\n"}
                    4) Pornographic, disturbing, or objectionable content{"\n"}
                </Text>
                <Text style={{fontSize:20*factor_hor, color:'red', fontWeight:'600'}}>
                    In serious cases Pollen will work with police to protect the safety of local communities. 
                
                </Text>
                
                <View style={{height:10}}></View>
                <Text style={{fontWeight:'bold', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:2}}>
                    What data we collect and its purpose
                </Text>
                <View style={{height:5}}></View>
                <Text style={{fontFamily:'avenir next', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:5, marginEnd:10, marginStart:10}}>
                    We collect a variety of data to ensure Pollen is a useful platform, especially location data, as the basis for Pollen is location. 

                    Firstly, we collect personal data including pseudonym, date of birth, date joined, gender, interests, nationality, career, and education. This data is used for your profile, and it can be updated or masked at any time under modify profile: open app -> feed -> profile -> plus sign -> modify profile. If you grey out any of your information, it means others can not see it. This data is primarily to allow relationships to grow if you are someone who likes making friends or talking to people online. With this information you can connect with those around you about interests, education, etc. 

                    Secondly, we collect personal identifiers including email address and phone number. We need to collect both to create a safe method for account recovery and password changes in addition to ensuring users do not create multiple accounts. Our primary concern was to prevent users from creating two accounts and then anonymously posting to each other in the feed to stir stuff up. To combat this we ask  for your phone number, which we then verify, as it is far harder to create or obtain two verifiable phone numbers compared to two email addresses. As a result we search by phone numbers when created your account, to ensure there are not two with your phone number. We collect your email address and encrypt both it and your password, and then we force account recoveries to be done through email and username, with verification through your phone. This way, if there was ever a hack it would be nearly impossible to gain access to an individual's account. In combination with other data encryption methods, we are able to provide our users a very high level of security. 

                    Finally, we collect location data when the app is open or in the background. We do this for a variety of obvious reasons displayed on the app. Firstly, all posts need access to location to view and to create. Rooms need persistent access to data, as they monitor your data in rooms that require you to be in a local zone, and if you leave this zone Pollen needs to be able to disconnect you from receiving messages. 

                    In the future we plan to use some of our data to help inform targeted ads.

                </Text>
                <View style={{height:5}}></View>
                <Text style={{fontFamily:'avenir next', fontWeight:'bold', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:2}}>
                    Where user data is stored and for how long
                </Text>
                <Text style={{fontFamily:'avenir next', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:5,  marginEnd:10, marginStart:10}}>
                    User data is stored using AWS. The servers are located in the United States. We store first and second order data (profile, phone number, and email) permanently until the user exercises his or her right to delete the account. We store supporting data (location) for up to 6 months. 
                </Text>
                <View style={{height:5}}></View>
                <Text style={{fontFamily:'avenir next', fontWeight:'bold', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:2}}>
                    How to access your data
                </Text>
                <Text style={{fontFamily:'avenir next', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:2, marginEnd:10, marginStart:10}}>
                    Users can get a copy of their data sent to them by emailing pollenapptechnologies@gmail.com or by viewing the account details section of Pollen: open app -> feed -> profile (see profile data) -> settings -> account details (see phone number). To access location data, we will create an API in the future (September 2019) whereby a user can have a full set of location data sent to his or her email address (in accordance with GDPR). 
                </Text>
                <View style={{height:5}}></View>
                <Text style={{fontFamily:'avenir next', fontWeight:'bold', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:2}}>
                    How we will give notice of policy changes
                </Text>
                <View style={{height:5}}></View>
                <Text style={{fontFamily:'avenir next', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:2,  marginEnd:10, marginStart:10}}>
                    Privacy policy changes will be announced through updates in the app store and play store. 
                </Text>
                <View style={{height:10}}></View>
                <Text 
                    onPress={() => Linking.openURL('https://docs.google.com/document/d/1H1zU2qKoTAAduyAlnxh3iaZ-EfhwWcjrS-DzVa0V3QM/edit?usp=sharing')}
                    style={{fontFamily:'avenir next', fontWeight:'bold', textAlign:'left', color:'#0000ff', marginStart:3, fontSize:factor_hor*18, marginTop:2}}>
                    Link to all of Pollen's Policies
                </Text>
                <View style={{height:20}}></View>
                <View style={{height:20}}></View>
                <Text
                    numberOfLines={2}
                    style={{color:'red', paddingRight:35, paddingLeft:35,
                    textAlign:'center', fontSize:20*factor_hor}}
                >I agree to the end user license agreement
                </Text>
                <View style={{height:20}}></View>
                { this.state.from && (
                <View style={{height:50, width:'100%', flexDirection:'row'}}>
                    <View style={{flex:1}}></View>
                    <View style={{flex:3, borderColor:'grey', borderWidth:1}}>
                        <TouchableOpacity 
                                style={{flex:1, justifyContent:'center', alignContent:'center', 
                                    alignItems:'center', borderRadius:10, alignSelf:'stretch'}} 
                                onPress={() => {this.props.navigation.navigate('SIGNUP_PHONE_VAR');}}
                                >
                              <Text style={{fontFamily:'avenir next', fontSize:factor_ver*25, color:'black'}}>Next</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1}}></View>
                </View>
                )}
                <View style={{height:50}}></View>
            
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
