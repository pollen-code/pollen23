import React, {Component} from 'react';
import {StyleSheet, Alert, TextInput, Text, Dimensions, 
        AsyncStorage, View, TouchableOpacity, Platform, 
        KeyboardAvoidingView} from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image'

var win_height = Dimensions.get('window').height

export default class profile_setup_2 extends React.Component {
    static navigationOptions = {header: null};
    constructor(props) {
        super(props);
        this.state = {
            education:"",
            career:"",
            interests:"",
            i1:"",
            i2:"",
            i3:"",
            i4:"",
            i5:"",
            i6:"",
            i7:"",
            i8:"",
            three_fill:0
        }
    }
    
    async check(string) {
        // emoji regex from the emoji-regex library
        const regex = /\uD83C\uDFF4(?:\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74)\uDB40\uDC7F|\u200D\u2620\uFE0F)|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3]))|\uD83D\uDC69\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83D\uDC69\u200D[\u2695\u2696\u2708])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC68(?:\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])|(?:[#*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDD1-\uDDDD])/g
        string = string.replace(/[ ]/g, '')
        if(string.match(regex) || string.match(/[_\W]/)) {
            return false
        }
        else {
            return true
        }
    }
    exit_function_education () {
        try {
            if(this.state.education != ''){
                console.log(this.state.education)                
            }

            else
                Alert.alert('Please enter your most recent place of education', '')
            } 
        catch (error) {
                            console.log(error)
                        }
    }                         
    async final_exit_function () {
        
        _edu = await this.check(this.state.education)
        _career = await this.check(this.state.career)
        _i1 = await this.check(this.state.i1)
        _i2 = await this.check(this.state.i2)
        _i3 = await this.check(this.state.i3)
        _i4 = await this.check(this.state.i4)
        _i5 = await this.check(this.state.i5)
        _i6 = await this.check(this.state.i6)
        _i7 = await this.check(this.state.i7)
        _i8 = await this.check(this.state.i8)
        
        if( _edu == true && _career == true && _i1 == true &&
            _i2 == true && _i3 == true && _i4 == true && 
            _i5 == true && _i6 == true && _i7 == true &&
            _i8 == true ) {
            try {
                if( (this.state.education != '') )

                    {
                        this.props.navigation.navigate('THANK_YOU');
                        this.saveData1( this.state.education );
                        this.saveData2( this.state.career );
                        this.saveData3( this.state.i1 );
                        this.saveData4( this.state.i2 ); 
                        this.saveData5( this.state.i3 ); 
                        this.saveData6( this.state.i4 ); 
                        this.saveData7( this.state.i5 ); 
                        this.saveData8( this.state.i6 ); 
                        this.saveData9( this.state.i7 ); 
                        this.saveData10( this.state.i8 ); 
                        
                    } 
                
                else
                    return Alert.alert('Please enter three or more interests', '');
                }
            catch (error) {
                            console.log(error)
            }
        }
        else {
            Alert.alert('Check to ensure there are no special characters', '')
        }
    }
    saveData1 (education) {
        let edu = education
        AsyncStorage.setItem('edu', education)
    }
    saveData2 (career) {
        let car = career
        AsyncStorage.setItem('car', career)
    }
    saveData3 (i1) {
        AsyncStorage.setItem('interest1', JSON.stringify(i1))
    }
    saveData4 (i2) {
        AsyncStorage.setItem('interest2', JSON.stringify(i2))
    }        
    saveData5 (i3) {
        AsyncStorage.setItem('interest3', JSON.stringify(i3))
    }              
    saveData6 (i4) {
        AsyncStorage.setItem('interest4', JSON.stringify(i4))
    }              
    saveData7 (i5) {
        AsyncStorage.setItem('interest5', JSON.stringify(i5))
    }              
    saveData8 (i6) {
        AsyncStorage.setItem('interest6', JSON.stringify(i6))
    }              
    saveData9 (i7) {
        AsyncStorage.setItem('interest7', JSON.stringify(i7))
    }              
    saveData10 (i8) {
        AsyncStorage.setItem('interest8', JSON.stringify(i8))
    }     
    winHeight() {
        if(Platform.OS === 'ios') {
            if ( Dimensions.get('window').height > 811) {
                return win_height*0.045
            }
            else {
                return (win_height*0.015+12)
            }
        }        
        else {
            return (win_height*0.015+12)
        }
    }         

    render() {
    return (

        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <LinearGradient colors={['#FFBA6F','#FC3004']} style={{height:Dimensions.get('window').height, width:Dimensions.get('window').width, opacity:0.9, alignSelf:'stretch'}}>           
                <View style={{height:this.winHeight()}}></View>
                <View style={{height:Dimensions.get('window').height*0.0675, flexDirection:'row', alignSelf:'stretch'}}>
                            <View style={{flex:0.125, alignContent:'center', justifyContent:'center'}}>
                            <TouchableOpacity hitSlop={{left:25, right:25, top:25, bottom:25}} onPress={()=> {this.props.navigation.goBack()}}  style={{marginStart:15*factor_hor}} >
                                <Icon 
                                    style={{opacity:0.9}}
                                    name="chevron-left"
                                    color="black"
                                    type='entypo'
                                    size={30*factor_hor}
                                />
                            </TouchableOpacity>
                            </View>
                        </View>
                
                
                
                <View style={{flex:0.15, justifyContent:'center', alignItems:'center', alignContent:'center'}}>
                    <FastImage source={require('./pollen.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                            marginBottom:20,
                            justifyContent:'center',
                            alignContent:'center',
                            flex: 1,
                            width: '53%',
                        }}
                    /> 
                </View>
                <View style={{flex:0.2, alignSelf:'stretch', }}>
                    <View style={{flex:0.7, alignContent:'center', alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontFamily:'avenir next', fontSize:factor_ver*24, marginEnd:7}}>
                            <Text style={{fontFamily:'avenir next', color:'#FDA04B'}}></Text>
                            Education
                        </Text>
                        <Text style={{fontFamily:'avenir next', color:'white'}}>  
                            past or present
                        </Text>
                    </View>
                    <View style={{flex:0.3, flexDirection:'row', marginBottom:10}}>
                        <View style={{flex:0.5}}></View>
                        <View style={{flex:2, backgroundColor:'white', alignContent:'center', justifyContent:'center', borderColor:'grey', borderWidth:0.1, borderRadius:2,shadowColor:"black",shadowOffset:{width: 0,height:factor_ver*0},shadowOpacity: 0.4,shadowRadius: 3,elevation: 6}}>
                            <TouchableOpacity 
                                style={{fontFamily:'avenir next', fontSize:factor_ver*20, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                                <TextInput
                                    onChangeText={(typedText) => {this.setState({education: typedText})}} 
                                    maxLength={40}
                                    allowFontScaling={true}
                                    autoCompleteType={"off"}
                                    keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'}
                                    placeholder='university name' >
                                </TextInput>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:0.5}}></View>
                    </View>
                </View>
                <View style={{flex:0.2, alignSelf:'stretch',}}>
                    <View style={{flex:0.7,  alignContent:'center', alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontFamily:'avenir next', fontSize:factor_ver*24, marginEnd:7}}>
                            <Text style={{fontFamily:'avenir next', color:'#FDA04B'}}></Text>
                            Career
                        </Text>
                        <Text style={{fontFamily:'avenir next', color:'white'}}>  
                            past or present
                        </Text>
                    </View>
                    <View style={{flex:0.3, flexDirection:'row', marginBottom:10}}>
                        <View style={{flex:0.5}}></View>
                        <View style={{flex:2, backgroundColor:'white', alignContent:'space-between', justifyContent:'center', borderColor:'grey', borderWidth:0.1, borderRadius:2,shadowColor:"black",shadowOffset:{width: 0,height:factor_ver*0},shadowOpacity: 0.4,shadowRadius: 3,elevation: 6}}>
                            <TouchableOpacity style={{fontFamily:'avenir next', fontSize:factor_ver*20, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                                <TextInput
                                    onChangeText={(typedText) => {this.setState({career: typedText})}} 
                                    maxLength={40}
                                    allowFontScaling={true}
                                    autoCompleteType={"off"}
                                    keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'}
                                    placeholder='what you do'>
                                </TextInput>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:0.5}}></View>
                    </View>
                </View>

                <View style={{flex:0.4, alignSelf:'stretch',}}>

                    <View style={{flex:0.3, alignContent:'center', alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontFamily:'avenir next', fontSize:factor_ver*24, marginEnd:7}}>
                            <Text style={{fontFamily:'avenir next', color:'#FDA04B'}}></Text>
                            Interests
                        </Text>
                        <Text style={{fontFamily:'avenir next', color:'white'}}>  
                            name at least three interests
                        </Text>
                    </View>

                    <View style={{flex:0.4, flexDirection:'row', alignSelf:'stretch'}}>
                            <View style={{flex:0.25, }}></View>
                            <View style={{flex:1, justifyContent:'space-around', alignContent:'space-around', }}>
                                <TextInput
                                    onChangeText={(typedText) => {this.setState({'i1': typedText})}}  
                                    maxLength={30}
                                    allowFontScaling={true}
                                    autoCompleteType={"off"}
                                    keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'}
                                    style={{fontFamily:'avenir next', height:factor_ver*35, marginEnd:2, marginStart:2,borderRadius:10,backgroundColor:'white'}}placeholderTextColor='grey' placeholder='X' textAlign='center'>
                                </TextInput>
                                <TextInput
                                    onChangeText={(typedText) => {this.setState({'i2': typedText})}}  
                                    allowFontScaling={true}
                                    autoCompleteType={"off"}
                                    keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'}
                                    maxLength={30} 
                                    style={{fontFamily:'avenir next', height:factor_ver*35, marginEnd:2, marginStart:2,borderRadius:10,backgroundColor:'white'}}placeholderTextColor='grey' placeholder='X' textAlign='center'>
                                </TextInput>                 

                            </View>
                            <View style={{flex:1, justifyContent:'space-around', alignContent:'space-around', }}>
                                <TextInput
                                        onChangeText={(typedText) => {this.setState({'i3': typedText})}}  
                                        maxLength={30}
                                        allowFontScaling={true}
                                        autoCompleteType={"off"}
                                        keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'} 
                                        style={{fontFamily:'avenir next', height:factor_ver*35, marginEnd:2, marginStart:2,borderRadius:10,backgroundColor:'white'}}placeholderTextColor='grey' placeholder='X' textAlign='center'>
                                </TextInput>                        
                                <TextInput
                                        onChangeText={(typedText) => {this.setState({'i4': typedText})}}  
                                        maxLength={30}
                                        allowFontScaling={true}
                                        autoCompleteType={"off"}
                                        keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'} 
                                        style={{fontFamily:'avenir next', height:factor_ver*35, marginEnd:2, marginStart:2,borderRadius:10,backgroundColor:'white'}}placeholderTextColor='grey' placeholder='X' textAlign='center'>
                                </TextInput>                        
                            </View>
                            <View style={{flex:1, justifyContent:'space-around', alignContent:'space-around',}}>
                                <TextInput
                                        onChangeText={(typedText) => {this.setState({'i5': typedText})}}  
                                        maxLength={30}
                                        allowFontScaling={true}
                                        autoCompleteType={"off"}
                                        keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'} 
                                        style={{fontFamily:'avenir next', height:factor_ver*35, marginEnd:2, marginStart:2,borderRadius:10,backgroundColor:'white'}}placeholderTextColor='grey' placeholder='X' textAlign='center'>
                                </TextInput>                        
                                <TextInput
                                        onChangeText={(typedText) => {this.setState({'i6': typedText})}}  
                                        maxLength={30}
                                        allowFontScaling={true}
                                        autoCompleteType={"off"}
                                        keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'} 
                                        style={{fontFamily:'avenir next', height:factor_ver*35, marginEnd:2, marginStart:2,borderRadius:10,backgroundColor:'white'}}placeholderTextColor='grey' placeholder='X' textAlign='center'>
                                </TextInput>                        
                            </View>
                            <View style={{flex:0.25, }}></View>
                    </View>
                    <View style={{flex:0.02, flexDirection:'row',  alignSelf:'stretch'}}></View>
                    <View style={{flex:0.2, flexDirection:'row',  alignSelf:'stretch'}}>
                    
                        <View style={{flex:1,}}></View>
                        <View style={{flex:1.5, marginEnd:3, justifyContent:'space-around', alignContent:'space-around',  flexDirection:'row'}}>
                            <TextInput
                                onChangeText={(typedText) => {this.setState({'i7': typedText})}}  
                                maxLength={30}
                                allowFontScaling={true}
                                autoCompleteType={"off"}
                                keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'} 
                                style={{fontFamily:'avenir next', height:factor_ver*35, width:110*factor_hor, marginEnd:2, marginStart:2,borderRadius:10,backgroundColor:'white'}}placeholderTextColor='grey' placeholder='X' textAlign='center'>
                            </TextInput>  
                        </View>    
                        <View style={{flex:1.5, marginEnd:3, justifyContent:'space-around', alignContent:'space-around',  flexDirection:'row'}}>
                            <TextInput
                                onChangeText={(typedText) => {this.setState({'i8': typedText})}}  
                                maxLength={30}
                                allowFontScaling={true}
                                autoCompleteType={"off"}
                                keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'} 
                                style={{fontFamily:'avenir next', width:110*factor_hor, height:factor_ver*35, marginEnd:2, marginStart:2,borderRadius:10,backgroundColor:'white'}}placeholderTextColor='grey' placeholder='X' textAlign='center'>
                            </TextInput>                       
                        </View>                                                             
                        <View style={{flex:1, }}></View>
                    
                    </View>

                </View>
                <View style={{flex:0.2, alignSelf:'stretch', }}>
                    <View style={{flex:3, flexDirection:'row',}}>
                        <View style={{flex:3, }}></View>
                        <View style={{flex:4, marginTop:20*factor_ver, marginBottom:20*factor_ver, borderRadius:4, backgroundColor:'white', alignContent:'center', justifyContent:'center', borderColor:'#9b9b9b', borderWidth:0.25,shadowColor:"#9b9b9b",shadowOffset:{width: 0,height:factor_ver*0},shadowOpacity: 0.4,shadowRadius:3,elevation: 3}}>
                            <TouchableOpacity 
                                    style={{justifyContent:'center', alignContent:'center', alignItems:'center', alignSelf:'stretch'}} 
                                    onPress={ () => {
                                            this.exit_function_education();
                                            this.final_exit_function()
                                    }}>
                                <Text style={{fontFamily:'avenir next', fontSize:factor_ver*30, color:'black'}}>Done</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:3, }}></View>
                    </View>
                    <View style={{flex:1, }}></View>
                </View>
                <View style={{flex:0.05}}></View>
            </LinearGradient> 
            </KeyboardAvoidingView>
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
