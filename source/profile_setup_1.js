import React, {Component} from 'react';
import {StyleSheet, TextInput, Alert, Text, AsyncStorage, 
        View, Dimensions, TouchableOpacity, Platform,
        KeyboardAvoidingView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class profile_setup_1 extends React.Component {
    static navigationOptions = {header: null};
    state={
        toggle1:false,
        toggle2:false,
        toggle4:false,
    }
    constructor(props) {
            super(props);
            this.state = {
                referal:"",
                b1:"", // mm
                b2:"", // dd
                b3:"", // yyyy
                ethnicity:"",
                isCheck_male:false,
                isCheck_female:false,
                isCheck_prefer:false,
                bg1:"#ECECEC",
                bg2:"#ECECEC",
               }
    }

    async check(string) {
        // emoji regex from the emoji-regex library
        const regex = /\uD83C\uDFF4(?:\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74)\uDB40\uDC7F|\u200D\u2620\uFE0F)|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3]))|\uD83D\uDC69\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83D\uDC69\u200D[\u2695\u2696\u2708])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC68(?:\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])|(?:[#*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDD1-\uDDDD])/g
        if(string.match(regex) || string.match(/[_\W]/)) {
            return false
        }
        else {
            return true
        }
    }
    exit_function_gender() {
        if( ((this.state.isCheck_female == true) && (this.state.isCheck_male == false )) || ((this.state.isCheck_female == false) && (this.state.isCheck_male == true) )) 
               {
                [console.log(this.state.isCheck_female + '  ' + this.state.isCheck_male + '  ' + this.state.isCheck_prefer )]
               }        
        else
                return alert('Please pick a gender');
    }
    exit_function_ethnicity() {
                if( ((this.state.isCheck_prefer == true) && (this.state.ethnicity == '' )) || ((this.state.isCheck_prefer == false) && (this.state.ethnicity != '' ))) 
                       {
                        [console.log(this.state.isCheck_prefer + '   ' + this.state.ethnicity )]
                       }
                else
                        return alert('Please pick an ethnicity or select prefer not to say');
    }
    exit_function_birthday() {
        try {
                if(
                ( this.state.b1 > 0 && this.state.b1 < 13 ) && 
                ( this.state.b2 > 0 && this.state.b2 < 32 ) && 
                ( this.state.b3 > 1900 && this.state.b3 < 2020 )
                ) 
                        {
                        [console.log( this.state.b1 + '   ' + this.state.b2 + '   ' + this.state.b3 )]
                        }
                else
                        return alert("Please pick a valid birthday in the format MM DD YYYY");
        }           
        catch (error) {
                        console.log(error)
        }
    }
    async final_exit_function() {

        _referal = await this.check(this.state.referal)
        _b1 = await this.check(this.state.b1)
        _b2 = await this.check(this.state.b2)
        _b3 = await this.check(this.state.b3)
        _nation = await this.check(this.state.ethnicity)

        if(_referal == true) {
            if(_b1 == true) { 
                if(_b2 == true) { 
                    if(_b3 == true) { 
                        if(_referal == true && _nation) {
                            try {
                                if( 
                                ( ( (this.state.isCheck_female == true) && (this.state.isCheck_male == false) ) || ( (this.state.isCheck_female == false && this.state.isCheck_male == true)) ) &&
                                ( ((this.state.isCheck_prefer == true) && (this.state.ethnicity == '' )) || ((this.state.isCheck_prefer == false && this.state.ethnicity != '' )))  &&
                                (( this.state.b1 > 0 && this.state.b1 < 13 ) && 
                                ( this.state.b2 > 0 && this.state.b2 < 32 ) && 
                                ( this.state.b3 > 1900 && this.state.b3 < 2002 )) 
                                ) {   
                                    AsyncStorage.multiSet([ 
                                        ['ref', this.state.referal],
                                        ['birth1', this.state.b1],
                                        ['birth2', this.state.b2],
                                        ['birth3', this.state.b3],
                                        ['eth', this.state.ethnicity],
                                        ['gender_male', this.state.isCheck_female],
                                        ['gender_female', this.state.isCheck_male],
                                        ['pref', this.state.isCheck_prefer],
                                    ])
                                    this.props.navigation.navigate('PROFILE_SETUP_2');
                                }
                                else {
                                    Alert.alert("Pollen is only for individuals 17 years or older", "")
                                }
                            } 
                            catch (error) {
                                console.log(error)
                            }
                        }
                        else {
                            Alert.alert('Please enter a valid ethnicity', '')    
                        }
                    }
                    else {
                        Alert.alert('Please enter a valid year', '')
                    }
                }
                else {
                    Alert.alert('Please enter a valid month', '')
                }
            }
            else {
                Alert.alert('Please enter a valid day', '')
            }
        }
        else {
            Alert.alert('Referal name is not valid', '')
        }
    }
    pref_check() {
            if(this.state.isCheck_prefer == false){
                this.setState({isCheck_prefer:true} , function() {console.log(this.state.isCheck_prefer)})}    
            
            else if( this.state.isCheck_prefer == true)
            {this.setState({isCheck_prefer:false}, function() {console.log(this.state.isCheck_prefer)})} 
    }
    female_check() {

        // male unclicked
        if(this.state.isCheck_male == false) {
            if(this.state.isCheck_female == false){
                this.setState({isCheck_female:true} , function() {console.log('f',this.state.isCheck_female,'m',this.state.isCheck_male)})    
                this.setState( {bg2:'#bcbcbc'})
            }
            else if( this.state.isCheck_female == true)
            {this.setState({isCheck_female:false}, function() {console.log('f',this.state.isCheck_female,'m',this.state.isCheck_male)})
            this.setState( {bg2:'#ECECEC'})
        } 
        }
        // clicked
        else if(this.state.isCheck_male == true) {
            if(this.state.isCheck_female == false){
                this.setState({isCheck_female:true} , function() {console.log('f',this.state.isCheck_female,'m',this.state.isCheck_male)})
                this.setState({isCheck_male:false} , function() {console.log('f',this.state.isCheck_female,'m',this.state.isCheck_male)})
                this.setState( {bg2:'#bcbcbc'})
                this.setState( {bg1:'#ECECEC'})
            }           
        }

    }        
    male_check() {
        // female not clicked
        if(this.state.isCheck_female == false &&
            this.state.isCheck_male == false) {
                this.setState({isCheck_male:true} , function() {console.log('m',this.state.isCheck_male,'m',this.state.isCheck_female)})
                this.setState( {bg1:'#bcbcbc'})
        }            
        if( this.state.isCheck_male == true &&
            this.state.isCheck_female == false) {
                this.setState({isCheck_male:false}, function() {console.log('m',this.state.isCheck_male,'f',this.state.isCheck_female)})
                this.setState( {bg2:'#ECECEC'})
                this.setState( {bg1:'#bcbcbc'}) 
        }
        else if(this.state.isCheck_female == true){
            this.setState({isCheck_male:true} , function() {console.log('m',this.state.isCheck_male,'f',this.state.isCheck_female)})
            this.setState({isCheck_female:false} , function() {console.log('f',this.state.isCheck_female,'m',this.state.isCheck_male)})
            this.setState( {bg1:'#bcbcbc'} )
            this.setState( {bg2:'#ECECEC'})
        }
    }
    _onPress4(){
        const newState4 = !this.state.toggle4;
        this.setState({toggle4:newState4})
        
    }

    render() {
        const {toggle4} = this.state
        const bg4 = toggle4?'#bcbcbc':"#ECECEC"
        return (
        <View style={styles.container}>
        <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={-75} behavior="padding" enabled>
        <LinearGradient colors={['#FFBA6F','#FC3004']} style={{height:Dimensions.get('window').height, width:Dimensions.get('window').width, opacity:0.9, alignSelf:'stretch'}}>
            <View style={{flex:0.03,  alignSelf:'stretch'}}> 
            </View>
                <View style={{flex:0.1, flexDirection:'row',  alignSelf:'stretch'}}>
                    <View style={{flex:0.2, paddingTop:2, marginVertical:0, paddingRight:7, justifyContent:'center'}}>
                </View>
            </View>
            {/* TELL US A BIT ABOUT YOU */}
            <View style={{flex:0.05, marginBottom:30,alignSelf:'stretch', justifyContent:'center'}}>
                <Text style={{textAlign:'center', color:'black',fontFamily:'avenir next', justifyContent:'center', alignContent:'center', fontSize:factor_hor*26, alignItems:"center"}}>
                    Tell us a bit about you
                </Text>
            </View>   
            {/* DID ANYONE REFER YOU */}
            <View style={{flex:0.075, marginTop:4,marginBottom:2,flexDirection:'row', alignSelf:'stretch', justifyContent:'center',}}>
                <View style={{flexDirection:'row', flex:0.25,}}></View>
                <View style={{flexDirection:'row',flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center', borderWidth:1, borderColor:'white', borderRadius:1, shadowColor:'grey', shadowOpacity:0.7, shadowRadius:3, elevation:5, shadowOffset:{height:1, width:1}}}>
                    <TextInput style={{fontFamily:'avenir next', textAlign:'center', justifyContent:'center', fontSize:factor_ver*20}}
                        placeholder={'Did anyone refer you?'}
                        maxLength={50}
                        placeholderTextColor={'grey'}
                        onChangeText={(typedText) => {this.setState({referal: typedText})}} 
                        allowFontScaling={true}
                        autoCompleteType={"off"}
                        keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'}
                    />
                </View>
                <View style={{flexDirection:'row',flex:0.25, backgroundColor:'cyon'}}></View>
            </View> 
            {/* GENDER */}
            <View style={{flex:0.10, alignSelf:'stretch', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                <Text style={{fontFamily:'avenir next', textAlign:'center', color:'black', fontSize:factor_ver*24}}>
                    <Text style={{fontFamily:'avenir next', color:'white', textAlign:'center', fontSize:factor_ver*24}}></Text>Gender</Text>
            </View>
            {/* GENDER */}
            <View style={{flex:0.05, flexDirection:'row', justifyContent:'center', alignContent:'center'}}>
                <View style={{flex:0.5, }}></View>        
                <View style={{flex:0.5, marginStart:0,  alignContent:'center', justifyContent:'center', alignItems:'center' }}>
                    <TouchableOpacity 
                        onPress={()=>{this.checkClicked1;this.male_check();}} 
                        style={{backgroundColor:this.state.bg1, width:30, height:30, borderRadius:15}}>
                    </TouchableOpacity>
                </View>   
                <View style={{flex:0.5, alignContent:'center', alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontFamily:'avenir next', marginEnd:18, fontSize:factor_ver*18, borderRadius:2}}>Male</Text>
                </View>       
                <View style={{flex:0.5, alignContent:'center', justifyContent:'center', alignItems:'center' }}>
                        <TouchableOpacity 
                            onPress={()=> {this.checkClicked2;this.female_check();}} 
                            style={{backgroundColor:this.state.bg2, width:30, height:30, borderRadius:15}}>
                        </TouchableOpacity>
                </View>   
                <View style={{flex:0.5, alignContent:'center', alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontFamily:'avenir next', fontSize:factor_ver*18, borderRadius:2}}>Female</Text>
                </View>  
                <View style={{flex:0.5, }}></View>        
            </View>
            <View style={{flex:0.02}}></View>
            {/* BIRTHDAY */}
            <View style={{flex:0.15, alignSelf:'stretch', }}>
                <View style={{flex:0.66, alignSelf:'stretch', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                    <Text style={{fontFamily:'avenir next', textAlign:'center', color:'black', fontSize:factor_ver*24}}>
                    <Text style={{fontFamily:'avenir next', color:'white',  textAlign:'center', fontSize:factor_ver*24}}></Text>Birthday</Text>
                </View>
                <View style={{flex:0.33, flexDirection:'row',}}>
                    <View style={{flex:1, }}></View>
                    <View style={{fontFamily:'avenir next', flex:1.5, backgroundColor:'white',justifyContent:'center', alignContent:'center', alignItems:'center', borderWidth:0.1,borderColor:'white', borderRadius:1, marginTop:4, shadowColor:"black",shadowOffset:{width: 0,height:0},shadowOpacity: 0.4,shadowRadius: 3,elevation: 6}}>
                        <TextInput 
                            placeholder='MM'
                            maxLength={2}
                            keyboardType='numeric'
                            returnKeyType={ 'done' }
                            onChangeText={(typedText) => {this.setState({b1: typedText})}} 
                            allowFontScaling={true}
                            autoCompleteType={"off"}
                        />
                    </View>
                    <View style={{flex:0.3, }}></View>
                    <View style={{fontFamily:'avenir next', flex:1, backgroundColor:'white',justifyContent:'center', alignContent:'center', alignItems:'center', borderWidth:0.1,borderColor:'white', borderRadius:1, marginTop:4, shadowColor:"black",shadowOffset:{width: 0,height:0},shadowOpacity: 0.4,shadowRadius: 3,elevation: 6}}>
                        <TextInput 
                            placeholder='DD'
                            maxLength={2}
                            keyboardType='numeric'
                            returnKeyType={'done'}
                            onChangeText={(typedText) => {this.setState({b2: typedText})}}     
                            allowFontScaling={true}
                            autoCompleteType={"off"}
                        />
                    </View>
                    <View style={{flex:0.3, }}></View>
                    <View style={{fontFamily:'avenir next', flex:1.5, backgroundColor:'white',justifyContent:'center', alignContent:'center', alignItems:'center', borderWidth:0.1,borderColor:'white', borderRadius:1, marginTop:4, shadowColor:"black",shadowOffset:{width: 0,height:0},shadowOpacity: 0.4,shadowRadius: 3,elevation: 6}}>
                        <TextInput 
                            placeholder='YYYY'
                            maxLength={4}
                            returnKeyType={'done'}
                            keyboardType='numeric'
                            onChangeText={(typedText) => {this.setState({b3: typedText})}}     
                            allowFontScaling={true}
                            autoCompleteType={"off"}
                        />
                    </View>

                    <View style={{flex:1, }}></View>
                </View>
            </View>

            {/* SPACE */}
            <View style={{flex:0.02}}></View>

            {/* ETHNICITY */}
            <View style={{flex:0.15, alignSelf:'stretch', }}>
                <View style={{flex:0.5, alignSelf:'stretch', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                    <Text style={{fontFamily:'avenir next', textAlign:'center', color:'black', fontSize:factor_ver*24}}>
                    <Text style={{fontFamily:'avenir next', color:'white', textAlign:'center', fontSize:factor_ver*24}}></Text>Nationality</Text>
                </View>

                <View style={{flex:0.5, flexDirection:'row',}}>
                    <View style={{flex:0.5, }}></View>
                    <View style={{flex:1,backgroundColor:'white', justifyContent:'center', alignContent:'center', alignItems:'center', borderWidth:0.1,borderColor:'white', borderRadius:1, marginTop:8, marginBottom:6, shadowColor:"black",shadowOffset:{width: 0,height:0},shadowOpacity: 0.4,shadowRadius: 3,elevation: 6}}>
                        <TextInput 
                            maxLength={50}
                            style={{fontFamily:'avenir next', fontSize:factor_ver*16}} placeholder='Type something...'
                            onChangeText={(typedText) => {this.setState({ethnicity: typedText})}} 
                            allowFontScaling={true}
                            autoCompleteType={"off"}
                            keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'}
                        />
                    </View>
                    <View style={{flex:0.5,}}></View>
                </View>

            </View>

            {/* PREFER NOT TO SAY */}
            <View style={{flex:0.09, alignSelf:'stretch', }}>
                <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:0.2, }}></View>
                    <View style={{flex:0.2, alignContent:'center', justifyContent:'center', alignItems:'center' }}>
                        <TouchableOpacity onPress={()=> {this._onPress4(); this.pref_check();}}
                                          style={{backgroundColor:bg4, width:30, height:30, borderRadius:15}}>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:0.6, justifyContent:'center', alignItems:'flex-start'}}>
                        <Text style={{
                            fontFamily:'avenir next', 
                            color:'black', 
                            fontSize:factor_ver*18, 
                            textAlign:'left', 
                            justifyContent:'center', 
                            alignContent:'center', 
                            alignItems:'center'
                        }}>Prefer not to say</Text>
                    </View>
                </View>
            </View>

            {/* NEXT VIEW */}
            <View style={{flex:0.15, alignSelf:'stretch', }}>
                <View style={{flex:2.5, flexDirection:'row',}}>
                    <View style={{flex:3, }}></View>
                    <View style={{flex:5, marginTop:10, marginBottom:10,  backgroundColor:'white', alignContent:'center', justifyContent:'center', borderColor:'white', borderWidth:1, borderRadius:2,shadowColor:"black",shadowOffset:{width: 0,height:0},shadowOpacity: 0.6,shadowRadius: 4,elevation: 6}}>
                        <TouchableOpacity 
                        style={{justifyContent:'center', alignContent:'center', alignItems:'center', borderRadius:4, alignSelf:'stretch'}} 
                        onPress={() => {
                                        this.exit_function_birthday();
                                        this.exit_function_ethnicity();
                                        this.exit_function_gender();
                                        this.final_exit_function();
                                }}
                        >
                            <Text style={{fontFamily:'avenir next', fontSize:factor_ver*25, color:'black'}}>Next</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:3, }}></View>
                </View>
                <View style={{flex:1.5, }}></View>
            </View>
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
