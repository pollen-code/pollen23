import React from 'react';
import {StyleSheet, Alert, Switch, AsyncStorage,
        KeyboardAvoidingView, Text, Dimensions,
        Platform, View, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements'
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import FastImage from 'react-native-fast-image';

var win_height = Dimensions.get('window').height

export default class signup extends React.Component {
    static navigationOptions = {header:null}; 
    constructor(props) {
        super(props);
        this.state = {
            phone_number:"",
            username:"",
            password:"",
            email:'',
            confirm_password:"",
            location_agreement:false,
            terms_of_service_agreement:false, 
            user_valid:false,
            visible7:false, 
            phone_number:'',
            validSignup:true, 
        }
    }

    onSwipeUp(gestureState) {
        this.setState({visible4:false,visible9:false,visible7:false}, function () {console.log(this.state.visible4,this.state.visible9, this.state.visible7)});
        console.log(this.state.visible4,this.state.visible9, this.state.visible7)
    }                                                                                                         
    onSwipeDown(gestureState) {
        this.setState({visible4:false,visible9:false,visible7:false}, function () {console.log(this.state.visible4,this.state.visible9, this.state.visible7)});
        console.log(this.state.visible4,this.state.visible9, this.state.visible7)
    }
    onSwipeLeft(gestureState) {
        this.setState({visible4:false,visible9:false,visible7:false}, function () {console.log(this.state.visible4,this.state.visible9, this.state.visible7)});
        console.log(this.state.visible4,this.state.visible9, this.state.visible7)
    }
    onSwipeRight(gestureState) {
        this.setState({visible4:false,visible9:false,visible7:false}, function () {console.log(this.state.visible4,this.state.visible9, this.state.visible7)});
        console.log(this.state.visible4,this.state.visible9, this.state.visible7)
    }
    onSwipe(gestureName, gestureState) {
        
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        this.setState({gestureName: gestureName});
        
        switch (gestureName) {

        case SWIPE_UP:
            this.setState({visible4:false,visible9:false,visible7:false}, function () {console.log(this.state.visible4,this.state.visible9, this.state.visible7)});
            console.log(this.state.visible4,this.state.visible9, this.state.visible7)
            break;
            
        case SWIPE_DOWN:    
            this.setState({visible4:false,visible9:false,visible7:false}, function () {console.log(this.state.visible4,this.state.visible9, this.state.visible7)});
            console.log(this.state.visible4,this.state.visible9, this.state.visible7)
            break;
        
        case SWIPE_LEFT:
            this.setState({visible4:false,visible9:false,visible7:false}, function () {console.log(this.state.visible4,this.state.visible9, this.state.visible7)});
            console.log(this.state.visible4,this.state.visible9, this.state.visible7)
            break;
            
        case SWIPE_RIGHT:
            this.setState({visible4:false,visible9:false,visible7:false}, function () {console.log(this.state.visible4,this.state.visible9, this.state.visible7)});
            console.log(this.state.visible4,this.state.visible9, this.state.visible7)
            break;
        }
    }  

    async finalize() {
        this.setState({validSignup:true})
        
        user_valid = await this.check_username(this.state.username)
        user_pass = await this.check_password(this.state.password)

        await fetch(`http://${serverLocation}:80/check_duplicate_user?username=${this.state.username.toString()}`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if(responseJson.response_username !== true && responseJson.response_username !== 'true') {
                    Alert.alert('Username is taken', '')
                    this.setState({validSignup:false})
                }
            })
        
        url = `http://${serverLocation}:80/check_duplicate_phone?phone=${this.state.phone_number.replace('+', '%2B')}&country_code=+1`
        console.log(url, 'URL')
        await fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {   
                if(responseJson.response_email !== true && responseJson.response_email !== 'true') {
                    Alert.alert("Phone number already in use", '')
                    this.setState({validSignup:false})
                }
            })

        if(this.state.confirm_password !== this.state.password || this.state.password.length < 7) { 
            this.setState({validSignup:false})
            return Alert.alert('Passwords must match and be more than 7 characters long');
        } 
        if(this.state.terms_of_service_agreement == false || this.state.location_agreement == false) {   
            this.setState({validSignup:false})
            Alert.alert('Please accept terms of service and safety guidelines')
        } 
        
        if(this.state.validSignup == true) {  
            AsyncStorage.multiSet([ 
                ['phone_number', this.state.phone_number],
                ['user', this.state.username],
                ['pass', this.state.password],
                ['loc', this.state.location_agreement],
                ['term_agreement', this.state.terms_of_service_agreement],
                ['user_email', this.state.email],
            ])
            this.props.navigation.navigate('LICENSE_AGREEMENT');
        }
    }

d
    onChangeFunction(newState) {
        this.setState(newState, () => ("Changed", "==> " + this.state))
    }
    async check_username(string) {
        // emoji regex from the emoji-regex library
        const regex = /\uD83C\uDFF4(?:\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74)\uDB40\uDC7F|\u200D\u2620\uFE0F)|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3]))|\uD83D\uDC69\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83D\uDC69\u200D[\u2695\u2696\u2708])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC68(?:\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])|(?:[#*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDD1-\uDDDD])/g
        string = string.replace(/[_]/g, '')
        if(string.match(regex) || string.match(/[_\W]/)) {
            this.setState({validSignup:false})
            Alert.alert("Invalid username, only letters, numbers, and underscores", "")
        }
    }
    async check_password(string) {
        // emoji regex from the emoji-regex library
        const regex = /\uD83C\uDFF4(?:\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74)\uDB40\uDC7F|\u200D\u2620\uFE0F)|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3]))|\uD83D\uDC69\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83D\uDC69\u200D[\u2695\u2696\u2708])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC68(?:\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])|(?:[#*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDD1-\uDDDD])/g
        string = string.replace(/[*?_!@]/g, '')
        if(string.match(regex) || string.match(/[_\W]/)) {
            this.setState({validSignup:false})
            Alert.alert('Please create a valid password', 'Special characters may include: _, !, *, @, ?')
        }
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
        const config = {velocityThreshold: 0.2,directionalOffsetThreshold: 100};
        return (  
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <LinearGradient colors={['#FFBA6F','#FC3004']} style={{height:Dimensions.get('window').height, opacity:1, alignSelf:'stretch'}}>
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

            <Dialog          
                overlayOpacity={0.15}
                hasOverlay={true}
                rounded={true}
                containerStyle={{opacity:1}}
                visible={this.state.visible7}
                onTouchOutside={() => {this.setState({visible7:false})}}
            >
                <DialogContent>
                    <GestureRecognizer
                        onSwipe={(direction, state) => this.onSwipe(direction, state)}

                        onSwipeUp={ (state) => this.onSwipeUp(state) }
                        onSwipeDown={ (state) => this.onSwipeDown(state) }
                        onSwipeLeft={ (state) => this.onSwipeLeft(state) }
                        onSwipeRight={ (state) => this.onSwipeRight(state) }
                        
                        config={config}
                        style={{ justifyContent:'center', alignContent:'center', alignItems:'center',
                        width:275*factor_hor, height:500*factor_ver, backgroundColor: 'white',
                    }}
                    >
                        <View style={{ paddingLeft:20*factor_hor, paddingRight:20*factor_hor, height:Dimensions.get('window').height, width:Dimensions.get('window').width, backgroundColor:'white', justifyContent:'center', alignContent:'center', alignItems:'center'}}>

                            {/* why phone numbers? */}
                            <View style={{ width:275*factor_hor, height:100*factor_ver}}>
                                <Text
                                    numberOfLines={3} 
                                    style={{fontFamily:'avenir next', fontSize:24*factor_hor, textAlign:'center', justifyContent:'center', alignContent:'center' }}>
                                    Why do we verify your phone number?
                                </Text>
                            </View>
                            <View style={{height:10}}></View>
                            
                            {/* Prevent bots and spam */}
                            <View style={{ width:275*factor_hor, height:40*factor_ver}}>
                                <Text
                                    numberOfLines={6} 
                                    style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center', justifyContent:'center', alignContent:'center' }}>
                                    1. To prevent bots and spam.
                                </Text>
                            </View>
                            <View style={{height:10}}></View>
                            
                            {/* Enable permanent bans */}
                            <View style={{ width:275*factor_hor, height:160*factor_ver}}>
                                <Text
                                    numberOfLines={6} 
                                    style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center', justifyContent:'center', alignContent:'center' }}>
                                    2. To enforce bans. Previous anonymous apps similar to Pollen did not enforce bans and the results were bad. Now, the app store requires the ability to block users on social networks.
                                </Text>
                            </View>
                            
                            {/* One account per user */}
                            <View style={{ width:275*factor_hor, height:100*factor_ver}}>
                                <Text
                                    numberOfLines={5} 
                                    style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center', justifyContent:'center', alignContent:'center' }}>
                                    3. To ensure each user has one account. Otherwise users could post anonymously to themselves to create undue attention.
                                </Text>
                            </View>
                            
                        </View>
                    </GestureRecognizer>
                </DialogContent>
            </Dialog>   
             
            <View style={{flex:0.08, alignSelf:'stretch', justifyContent:'center', alignContent:'center'}}>
                <Text style={{fontFamily:'Avenir next', fontWeight:'400', textAlign:'center', color:'white', fontSize:factor_ver*35, alignItems:'center', }}>Welcome to pollen!</Text>
            </View>
            <View style={{flex:0.04,alignSelf:'stretch', justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontFamily:'Avenir next', color:'white', fontSize:factor_ver*20}}>Be you, have fun.</Text>
            </View>
            <View style={{flex:0.3, alignSelf:'stretch', alignContent:'center', justifyContent:'center', alignItems:'center'}}>
                <FastImage 
                    source={require('./spore_no_background.png')}
                    resizeMode={FastImage.resizeMode.contain}
                    style={{flex: 1,width: '53%',}}>
                </FastImage>  
            </View>
            
            <View style={{flex:0.3, flexDirection:'row', alignSelf:'stretch', justifyContent:'center', alignContent:'center'}}>
                <View style={{flex:0.15,}}></View>
                <View style={{flex:0.65, }}>
                    <TextInput  
                        style={{
                            fontFamily:'avenir next', 
                            backgroundColor:'white', 
                            borderRadius:7*factor_ver, 
                            height:35*factor_ver, 
                            textAlign:'center', 
                            marginBottom:5*factor_ver, 
                            fontSize:factor_ver*18, 
                            shadowColor:"black", 
                            shadowOffset:{width: 0,height:0},
                            shadowOpacity: 0.3, 
                            shadowRadius:1.5*factor_ver, 
                            elevation:2
                        }}
                        placeholder='Phone Number'  
                        maxLength={15}
                        allowFontScaling={true}
                        autoCompleteType={"off"}
                        keyboardType={'number-pad'}
                        onChangeText={(typedText) => {this.setState({phone_number: typedText})}}  
                    > 
                    </TextInput>
                    <TextInput  
                            style={{fontFamily:'avenir next', backgroundColor:'white', 
                                borderRadius:7*factor_ver, height:35*factor_ver, textAlign:'center', 
                                marginBottom:5*factor_ver, fontSize:factor_ver*18, shadowColor:"black", 
                                shadowOffset:{width: 0,height:0}, shadowOpacity: 0.3, 
                                shadowRadius:1.5*factor_ver, elevation:2}}
                            placeholder='Username'  
                            maxLength={15}
                            allowFontScaling={true}
                            autoCompleteType={"off"}
                            keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'}
                            onChangeText={(typedText) => {this.setState({username: typedText})}}  
                    > 
                    </TextInput>
                    <TextInput 
                        style={{
                            fontFamily:'avenir next', 
                            backgroundColor:'white', 
                            borderRadius:7*factor_ver, 
                            height:35*factor_ver, 
                            textAlign:'center', 
                            marginBottom:15*factor_ver, 
                            fontSize:factor_ver*18,
                            shadowColor:"black", 
                            shadowOffset:{width: 0,height:0}, 
                            shadowOpacity: 0.3, 
                            shadowRadius:1.5*factor_ver, 
                            elevation:2
                        }}
                            placeholder='Email Address'  
                            maxLength={50}
                            allowFontScaling={true}
                            autoCompleteType={"off"}
                            keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'}
                            onChangeText={(typedText) => {this.setState({email: typedText})}}   
                    > 
                    </TextInput>
                    <TextInput style={{fontFamily:'avenir next', backgroundColor:'white', borderRadius:7*factor_ver, height:35*factor_ver, textAlign:'center', marginBottom:5*factor_ver, fontSize:factor_ver*18,
                    shadowColor:"black", shadowOffset:{width: 0,height:0}, shadowOpacity: 0.3, shadowRadius:1.5*factor_ver, elevation:2}}
                                placeholder='Password'
                                secureTextEntry={true}
                                allowFontScaling={true}
                                autoCompleteType={"off"}
                                keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'}
                                maxLength={30}
                                onChangeText={
                                    (typedText) => {
                                        this.setState({password: typedText})
                                    }
                                }
                    > 
                    </TextInput>
                    <TextInput style={{fontFamily:'avenir next', backgroundColor:'white', borderRadius:7*factor_ver, height:35*factor_ver, textAlign:'center', marginBottom:10*factor_ver, fontSize:factor_ver*18,
                                shadowColor:"black", shadowOffset:{width:0,height:0}, shadowOpacity: 0.3, shadowRadius:1.5*factor_ver, elevation:2}}
                                placeholder='Confirm Password'
                                secureTextEntry={true}
                                allowFontScaling={true}
                                autoCompleteType={"off"}
                                keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'}
                                maxLength={30}
                                onChangeText={
                                    (typedText) => {
                                        this.setState({confirm_password: typedText})
                                    }
                                }
                    > 
                    </TextInput>

                </View>
                <View style={{flex:0.15, alignSelf:'stretch', }}>
                    <View style={{
                        position:'absolute', 
                        top:1*factor_ver, 
                        left:10*factor_hor, 
                        width:30*factor_ver,
                        height:30*factor_ver,
                        borderRadius:40,
                        backgroundColor:'#ececec',
                    }}>
                        <TouchableOpacity 
                            style={{flex:1}}
                            onPress={() => {this.setState({visible7:!this.state.visible7})}}>
                            <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
                                <Text style={{fontSize:16*factor_ver, textAlign:'center', color:'#5e5e5e'}}>?</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>                
            </View>

            <View style={{flex:0.02}}></View>

            <View style={{flex:0.125, alignSelf:'stretch'}}>
                <View style={{flex:1, flexDirection:'row'}}>  
                    <View style={{flex:0.1/factor_ver,}}></View>
                    <View style={{flex:0.8, justifyContent:'space-evenly', alignContent:'flex-end', alignItems:'center'}}>                    
                        <Text style={{fontFamily:'avenir next', marginStart:5/factor_ver, textAlign:'right',fontSize:factor_ver*16, }}>I agree to pollen's <Text style={{color:'white', fontWeight:'500', fontFamily:'Avenir Next'}} onPress={() => this.props.navigation.navigate('SAFETY')}> safety guidelines</Text></Text>
                        <Text style={{fontFamily:'avenir next', marginStart:5/factor_ver, textAlign:'right',fontSize:factor_ver*16, marginTop:8*factor_ver}}>I agree to pollen's <Text style={{color:'white', fontWeight:'500', fontFamily:'Avenir Next'}} onPress={() => this.props.navigation.navigate('TERMS_OF_SERVICE')}> terms of service</Text></Text>
                       
                    </View>          

                    <View style={{flex:0.2, justifyContent:'space-around',alignContent:'center',alignItems:'flex-start' }}>
                        <Switch onValueChange={(value) => this.onChangeFunction({location_agreement: value})}
                            value={this.state.location_agreement}
                            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                            size={5}
                        ></Switch>
                        <Switch onValueChange={(value) => this.onChangeFunction({terms_of_service_agreement: value})}
                            value={this.state.terms_of_service_agreement}
                            style={{ transform: [{ scaleX:0.8 }, { scaleY:0.8 }] }}
                        ></Switch>
                      
                    </View>          
                </View>
            </View>
            <View style={{flex:0.25, flexDirection:'row', alignSelf:'stretch'}}>
                  <View style={{flex:0.3,flexDirection:'row', }}></View>
                  <View style={{flex:0.5,flexDirection:'column', }}>
                      <View style={{flex:0.2, }}></View>
                      <View style={{flex:0.3, backgroundColor:'white', alignContent:'center', justifyContent:'center', borderColor:'lightgrey', borderWidth:0.5, borderRadius:10*factor_ver,shadowColor:"lightgrey",shadowOffset:{width: 0,height:0},shadowOpacity: 0.4,shadowRadius: 10,elevation: 3}}>
                          <TouchableOpacity 
                                style={{justifyContent:'center', alignContent:'center', alignItems:'center', alignSelf:'stretch'}} 
                                onPress={ () => {   
                                                    this.finalize();
                                                }
                                        }
                            >
                              <Text style={{fontFamily:'avenir next', fontSize:factor_ver*25, color:'black'}}>Next</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
                  <View style={{flex:0.3,flexDirection:'row', }}></View>
            </View>
        </LinearGradient>
        </KeyboardAvoidingView>
      );
    }
  }



const styles = StyleSheet.create({
  
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    
    top_logo: {
        flex: 0.6,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'stretch',
        backgroundColor:'black'
      },
    
    bottom_button: {
        flex:0.4,
        justifyContent:'center',
        alignSelf:'stretch',
        flexDirection:'row', 
      },
    
    
    });

