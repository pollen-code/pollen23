import React, {Component, PropTypes} from 'react';
import {StyleSheet, Dimensions, ScrollView, Text, 
        View, TouchableOpacity, Platform} from 'react-native';
import { Icon } from 'react-native-elements'

var win_height = Dimensions.get('window').height

export default class terms_of_service extends React.Component {
    static navigationOptions = {header: null}

    winHeight() {
        if(Platform.OS === 'ios') {
            if ( Dimensions.get('window').height > 811) {
                return win_height*0.045
            }
            else {
                return win_height*0.03
            }
        }        
        else {
            return win_height*0.03
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
                        <Text style={{textAlign:'center', justifyContent:'center', alignItems:'center', alignContent:'center', fontSize:24*factor_hor, fontFamily:'Avenir next', fontWeight:'500', color:'black'}}>Terms of Service</Text>
                    </View>
                    <View style={{flex:1}}></View>
                </View>    
                       
            <ScrollView>

                <View style={{height:10}}></View>
                <Text style={{fontWeight:'bold', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:2}}>
                    Limitation of Use
                </Text>
                <View style={{height:5}}></View>
                <Text style={{fontFamily:'avenir next', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:5, marginEnd:10, marginStart:10}}>
                    By using Pollen you agree on behalf of yourself or your company not to knowingly or negligently use our services in a way that abuses our network, user accounts, or privacy policy. You agree not to use Pollen for unauthorized advertising, spam, or data collection. You agree to not transmit any copyrighted or protected intellectual property over Pollen. 
                </Text>
                <View style={{height:5}}></View>


                <Text style={{fontFamily:'avenir next', fontWeight:'bold', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:2}}>
                    Right to terminate accounts
                </Text>
                <Text style={{fontFamily:'avenir next', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:5,  marginEnd:10, marginStart:10}}>
                    Pollen retains the right to restrict access to a user’s account at any time when the user breaks our terms of service, privacy policy, or safety policy. Pollen can and will permanently ban individuals who break these policies multiple times, and Pollen retains the right to delete all data on your account if you break these policies. 
                </Text>
                <View style={{height:5}}></View>
                <Text style={{fontFamily:'avenir next', fontWeight:'bold', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:2}}>
                    User generated content
                </Text>
                <Text style={{fontFamily:'avenir next', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:2, marginEnd:10, marginStart:10}}>
                    Pollen takes no responsibility for information, text, links, graphics, photos, videos, or other materials that users upload or send through the platform. By submitting your content to Pollen, you represent and warrant that you have all rights, power, and authority necessary to grant the rights to your content contained within these terms. You retain any ownership rights you have in your content, but you grant Pollen the following license to use that content: when your content is created with or submitted to the platform you grant us a worldwide, royalty-free, perpetual, irrevocable, non-exclusive, transferable, and sublicensable license to use, copy, modify, adapt, prepare derivative works from your content and username. Any ideas, suggestions, and feedback about Pollen or our services that you provide are entirely voluntary, and you agree that Pollen may use such ideas, suggestions, and feedback without compensation or obligation to you. Although we have no obligation to screen, edit, or monitor, your content, we may, in our sole discretion, delete or remove your content at any time and for any reason, including for a violation of our terms of service, privacy policy, or safety policy. 
                </Text>
                <View style={{height:5}}></View>
                <Text style={{fontFamily:'avenir next', fontWeight:'bold', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:2}}>
                    Copyright Infringement
                </Text>
                <View style={{height:5}}></View>
                <Text style={{fontFamily:'avenir next', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:2,  marginEnd:10, marginStart:10}}>
                    If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement and is accessible via Pollen, please notify Pollen at pollenapptechnologies@gmail.com. For your complaint to be valid under the DMCA you must provide the following information in writing: 
                    An electronic or physical signature or a person authorized to act on behalf of the copyright owner. 
                    Identification of the copyrighted work that you claim has been infringed;
                    Identification of the material that is claimed to be infringing and where it is located on Pollen;
                    Information reasonably sufficient to permit Pollen to contact you, such as  your address, telephone number, and email-address;
                    A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or law;
                    A statement made under penalty of perjury, that the above information is accurate, and that you are the copyright owner or are authorized to act on behalf of the owner. 
                </Text>
                <View style={{height:10}}></View>
                <View style={{height:5}}></View>
                <Text style={{fontFamily:'avenir next', fontWeight:'bold', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:2}}>
                    Limitation of Liability
                </Text>
                <View style={{height:5}}></View>
                <Text style={{fontFamily:'avenir next', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:5,  marginEnd:10, marginStart:10}}>
                    You agree that Pollen shall, in no event be liable for any consequential, incidental, indirect, special, punitive, or other loss or damage whatsoever or for loss of business profits. 
                </Text>
                <View style={{height:5}}></View>
                <Text style={{fontFamily:'avenir next', fontWeight:'bold', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:2}}>
                    Advertisement
                </Text>
                <View style={{height:5}}></View>
                <Text style={{fontFamily:'avenir next', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:5,  marginEnd:10, marginStart:10}}>
                    In the future, Pollen will allow advertisers to display ads and other information in certain areas of the platform. These ads will include banners, posts, comments, and rooms. As an advertiser, you warrant and represent that you possess all rights and authority to place advertisements on the Site, including, but not limited to, intellectual property rights, publicity rights, and contractual rights.
                </Text>
                <View style={{height:5}}></View>
                <View style={{height:10}}></View>
                <Text style={{fontFamily:'avenir next', fontWeight:'bold', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:2}}>
                    What data we collect and its purpose
                </Text>
                <View style={{height:5}}></View>
                <Text style={{fontFamily:'avenir next', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:5,  marginEnd:10, marginStart:10}}>
                    We collect a variety of data to ensure Pollen is a useful platform, especially location data, as the basis for Pollen is location. 

                    Firstly, we collect personal data including pseudonym, date of birth, date joined, gender, interests, nationality, career, and education. This data is used for your profile, and it can be updated or masked at any time under modify profile: open app -> feed -> profile -> plus sign -> modify profile. If you grey out any of your information, it means others can not see it. This data is primarily to allow relationships to grow if you are someone who likes making friends or talking to people online. With this information you can connect with those around you about interests, education, etc. 

                    Secondly, we collect personal identifiers including email address and phone number. We need to collect both to create a safe method for account recovery and password changes in addition to ensuring users do not create multiple accounts. Our primary concern was to prevent users from creating two accounts and then anonymously posting to each other in the feed to stir stuff up. To combat this we ask  for your phone number, which we then verify, as it is far harder to create or obtain two verifiable phone numbers compared to two email addresses. As a result we search by phone numbers when created your account, to ensure there are not two with your phone number. We collect your email address and encrypt both it and your password, and then we force account recoveries to be done through email and username, with verification through your phone. This way, if there was ever a hack it would be nearly impossible to gain access to an individual's account. In combination with other data encryption methods, we are able to provide our users a very high level of security. 

                    Finally, we collect location data when the app is open or in the background. We do this for a variety of obvious reasons displayed on the app. Firstly, all posts need access to location to view and to create. Rooms need persistent access to data, as they monitor your data in rooms that require you to be in a local zone, and if you leave this zone Pollen needs to be able to disconnect you from receiving messages. 

                    In the future we plan to use some of our data to help inform targeted ads.
                </Text>
                <View style={{height:5}}></View>
                <Text style={{fontFamily:'avenir next', fontWeight:'bold', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:2}}>
                    Safety Philosophy
                </Text>
                <View style={{height:5}}></View>
                <Text style={{fontFamily:'avenir next', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:5,  marginEnd:10, marginStart:10}}>
                    Pollen is remarkably serious about safety: we aim to set a standard for anonymity and safety on the internet. Given the historical trend of anonymous apps creating toxic environments ending with said app’s death, we believe that creating a safe environment from day one is instrumental to long term success. As such, we have launched Pollen with more safety features from day one compared to any other anonymous social networking including: Whisper, Sarahah, Yik Yak, Tellonym, After Skool, etc. 
                </Text>
                <View style={{height:5}}></View>
                <Text style={{fontFamily:'avenir next', fontWeight:'bold', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:2}}>
                    Safety guidelines
                </Text>
                <View style={{height:5}}></View>
                <Text style={{fontFamily:'avenir next', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:5,  marginEnd:10, marginStart:10}}>
                    No calls for violence.
                    Do not threaten or endanger.
                    Do not directly target or bully.
                    No disturbing content.
                    Do not spam.
                </Text>
                <View style={{height:5}}></View>
                <Text style={{fontFamily:'avenir next', fontWeight:'bold', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:2}}>
                    Failure to Adhere
                </Text>
                <View style={{height:5}}></View>
                <Text style={{fontFamily:'avenir next', textAlign:'left', marginStart:3, fontSize:factor_hor*18, marginTop:5,  marginEnd:10, marginStart:10}}>
                    The failure to adhere with the following guidelines will result in strikes on the user’s account, posts will be taken down, and privileges will be revoked until the user is permanently banned by his or her phone number. More importantly, serious threats and escalated cyberbullying will result in Pollen’s cooperation with police and relevant local authorities.
                </Text>
                <View style={{height:5}}></View>                                
                <Text 
                    onPress={() => Linking.openURL('https://docs.google.com/document/d/1H1zU2qKoTAAduyAlnxh3iaZ-EfhwWcjrS-DzVa0V3QM/edit?usp=sharing')}
                    style={{fontFamily:'avenir next', fontWeight:'bold', textAlign:'left', color:'#0000ff', marginStart:3, fontSize:factor_hor*18, marginTop:2}}>
                    Link to all of Pollen's Policies
                </Text>
                               
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
