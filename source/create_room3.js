import React from 'react';
import {StyleSheet, Text, Dimensions, AsyncStorage, 
    Alert, View, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements'

export default class create_room3 extends React.Component {
    static navigationOptions = {header: null}
    constructor(props) {
        super(props);
        this.socket_rooms = global.socket_rooms
        this.user_location = global.user_position
        this.state = {
            username:'', // username
            bg_private:false,
            bg_public:false,
            bg_public_private:true,
            private_background_color:'white',
            public_background_color:'white',
            public_font_color:'#9b9b9b',
            private_font_color:'#9b9b9b',

            bg_here:false,
            bg_walk:false,
            bg_walk_here:true,
            here_background_color:'white',
            walk_background_color:'white',
            here_font_color:'#9b9b9b',
            walk_font_color:'#9b9b9b',

            bg_admin:false,
            bg_everyone:false,
            bg_admin_everyone:true,
            admin_background_color:'white',
            everyone_background_color:'white',
            admin_font_color:'#9b9b9b',
            everyone_font_color:'#9b9b9b',
            
            bg_named:false,
            bg_anon:false,
            bg_anon_named:true,
            named_background_color:'white',
            anon_background_color:'white',
            named_font_color:'#9b9b9b',
            anon_font_color:'#9b9b9b',       
            
            world_color:'#9b9b9b',
            bg_world:'white',
            city_color:'#9b9b9b',
            bg_city:'white',
            local_color:'#9b9b9b',
            bg_city:'white',
            micro_color:'#9b9b9b',
            bg_micro:'white',
            number_world:'#9b9b9b',
            number_city:'#9b9b9b',
            number_local:'#9b9b9b',
            number_micro:'#9b9b9b',

            people_color:'#9b9b9b',
            following_color:'white',
            bg_following:'#FF7E65',
            bg_people:'white',
            following_bw:1,
            people_bw:0, 

            name:'',
            tags:'',
            max_users:'',
            set_password:'',
            latitude:70,
            longitude:70,
            visible7:false, 

            nearme_list:[],
            following_list:[], 

            selected_list:[],
            }
    }

    async componentDidMount() {
        await this.setState({
            name:await this.props.navigation.getParam('name'),
            bio:await this.props.navigation.getParam('bio'),
            max_users:await this.props.navigation.getParam('max_users'),
            friendOrPublic:await this.props.navigation.getParam('friendOrPublic'),
            radius:await this.props.navigation.getParam('radius'),
            hereOrWalk:await this.props.navigation.getParam('hereOrWalk'),
            password:await this.props.navigation.getParam('password'),
            pubOrPriv:await this.props.navigation.getParam('pubOrPriv'),
            username:await AsyncStorage.getItem('user'),
            latitude:this.user_location.coords.latitude,
            longitude:this.user_location.coords.longitude,
        })        
    }
    _getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
           (position) => {
             this.setState({
               latitude: position.coords.latitude,
               longitude: position.coords.longitude,
               error: null,
             });
           },
           (error) => this.setState({ error: error.message }),
           { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    press_name() {
        // none pressed
        if( (this.state.bg_named == false) && (this.state.bg_anon == false)) {
            this.setState({
                bg_named:true,
                bg_anon:false,
                bg_anon_named:false,
                named_background_color:'#FF7E65',
                anon_background_color:'white',
                named_font_color:'white',
                anon_font_color:'#9b9b9b',

            },function(){console.log(
                        this.state.bg_named,
                        this.state.bg_anon,
                        this.state.named_background_color,
                        this.state.anon_background_color,
                        this.state.named_font_color,
                        this.state.anon_font_color,
            )})

        }
        // if private 
        else if(this.state.bg_named == false && this.state.bg_anon == true) {
            this.setState({bg_named:true,
                bg_anon:false,
                bg_anon_named:false,
                named_background_color:'#FF7E65',
                anon_background_color:'white',
                named_font_color:'white',
                anon_font_color:'#9b9b9b',

            },function(){console.log(
                        this.state.bg_named,
                        this.state.bg_anon,
                        this.state.named_background_color,
                        this.state.anon_background_color,
                        this.state.named_font_color,
                        this.state.anon_font_color,
            )})
         
        }
    }
    press_anon() {
        // none pressed
        if( (this.state.bg_named == false) && (this.state.bg_anon == false)) {
            this.setState({bg_named:false,
                            bg_anon:true,
                            bg_anon_named:false,
                            named_background_color:'white',
                            anon_background_color:'#FF7E65',
                            named_font_color:'#9b9b9b',
                            anon_font_color:'white',

            },function(){console.log(
                        this.state.bg_named,
                        this.state.bg_anon,
                        this.state.named_background_color,
                        this.state.anon_background_color,
                        this.state.named_font_color,
                        this.state.anon_font_color,
            )})
        }
        // if private 
        else if(this.state.bg_named == true && this.state.bg_anon == false) {
            this.setState({bg_named:false,
                bg_anon:true,
                bg_anon_named:false,
                named_background_color:'white',
                anon_background_color:'#FF7E65',
                named_font_color:'#9b9b9b',
                anon_font_color:'white',

            },function(){console.log(
                        this.state.bg_named,
                        this.state.bg_anon,
                        this.state.named_background_color,
                        this.state.anon_background_color,
                        this.state.named_font_color,
                        this.state.anon_font_color,
            )})  
        }
    }
    nameOrAnon() {
        if(this.state.bg_named == true) {
            return 'named'
        }
        else {
            return 'anon'
        }
    }
    press_admin() {
        // none pressed
        if( (this.state.bg_admin == false) && (this.state.bg_everyone == false)) {
            this.setState({bg_admin:true,
                            bg_everyone:false,
                            bg_admin_everyone:false,
                            admin_background_color:'#FF7E65',
                            everyone_background_color:'white',
                            admin_font_color:'white',
                            everyone_font_color:'#9b9b9b',

            },function(){console.log(
                        this.state.bg_everyone,
                        this.state.bg_admin,
                        this.state.admin_background_color,
                        this.state.everyone_background_color,
                        this.state.admin_font_color,
                        this.state.everyone_font_color,
            )})

        }
        // if private 
        else if(this.state.bg_admin == false && this.state.bg_everyone == true) {
            this.setState({bg_admin:true,
                bg_everyone:false,
                bg_admin_everyone:false,
                admin_background_color:'#FF7E65',
                everyone_background_color:'white',
                admin_font_color:'white',
                everyone_font_color:'#9b9b9b',
            },function(){console.log(
                        this.state.bg_everyone,
                        this.state.bg_admin,
                        this.state.admin_background_color,
                        this.state.everyone_background_color,
                        this.state.admin_font_color,
                        this.state.everyone_font_color,
            )})
         
        }
    }
    press_everyone() {
        // none pressed
        if( (this.state.bg_admin == false) && (this.state.bg_everyone == false)) {
            this.setState({bg_admin:false,
                            bg_everyone:true,
                            bg_admin_everyone:false,
                            admin_background_color:'white',
                            everyone_background_color:'#FF7E65',
                            admin_font_color:'#9b9b9b',
                            everyone_font_color:'white',

            },function(){console.log(
                        this.state.bg_everyone,
                        this.state.bg_admin,
                        this.state.admin_background_color,
                        this.state.everyone_background_color,
                        this.state.admin_font_color,
                        this.state.everyone_font_color,
            )})

        }
        // if private 
        else if(this.state.bg_admin == true && this.state.bg_everyone == false) {
            this.setState({bg_admin:false,
                bg_everyone:true,
                bg_admin_everyone:false,
                admin_background_color:'white',
                everyone_background_color:'#FF7E65',
                admin_font_color:'#9b9b9b',
                everyone_font_color:'white',
            },function(){console.log(
                        this.state.bg_everyone,
                        this.state.bg_admin,
                        this.state.admin_background_color,
                        this.state.everyone_background_color,
                        this.state.admin_font_color,
                        this.state.everyone_font_color,
            )})
        }
    }
    adminOrEveryone() {
        if(this.state.bg_admin == true) {
            return 'admin'
        } 
        else {
            return 'everyone'
        }
    }

    what_color(index) {
        // following list
        if( this.state.selected_list[index].length < 5 ) {
            return this.state.selected_list[index][2]
        }
        // people list
        else {
            return this.state.selected_list[index][6]
        }
    }
    async gotoprofile_comments(index) {
        if(this.state.selected_list[index][0] !== 'Anonymous') {
            this.props.navigation.navigate('EXTERNAL_VIEW_PROFILE', {profileID:this.state.selected_list[index][0]}
            )
        }
    } 
    async onPress_color(index) {
        // following list
        if( this.state.selected_list[index].length < 5 ) {
            if(this.state.selected_list[index][2] == 'white') {
                this.state.selected_list[index][2] = '#FF7E65'
            } 
            else {
                this.state.selected_list[index][2] = 'white'
            }
        }
        // people list
        else {
            if(this.state.selected_list[index][6] == 'white') {
                this.state.selected_list[index][6] = '#FF7E65'
            } 
            else {
                this.state.selected_list[index][6] = 'white'
            }            
        }
        await this.setState({selected_list:this.state.selected_list})     
        console.log(this.state.selected_list, 'fuck')   
    }
    async check(string) {
        // emoji regex from the emoji-regex library
        if(string.length > 0) {
            const regex = /\uD83C\uDFF4(?:\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74)\uDB40\uDC7F|\u200D\u2620\uFE0F)|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3]))|\uD83D\uDC69\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83D\uDC69\u200D[\u2695\u2696\u2708])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC68(?:\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])|(?:[#*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDD1-\uDDDD])/g
            if(string.match(regex) || string.match(/[_\W]/)) {
                return false
            }
            else {
                return true
            }
        }
        else {
            return false
        }

    }
    checkNav() {
        if(this.state.bg_admin == false && this.state.bg_everyone == false) {
            return Alert.alert("Please fill fields")
        }
        if(this.state.bg_named == false && this.state.bg_anon == false) {
            return Alert.alert("Please fill fields")
        }
        else {
            this.props.navigation.navigate("CREATE_ROOM4", {
                name:this.state.name,
                bio:this.state.bio,
                max_users:this.state.max_users,
                friendOrPublic:this.state.friendOrPublic,
                radius:this.state.radius,
                hereOrWalk:this.state.hereOrWalk,
                password:this.state.password,
                pubOrPriv:this.state.pubOrPriv,
                nameOrAnon:this.nameOrAnon(),
                adminOrEveryone:this.adminOrEveryone(),
            })
        }
    }

    render() {
      return (
        <View style={styles.container}>
            <View style={{height:'3.5%'}}></View>
            {/* Header */}
            <View style={{height:Dimensions.get('window').height*0.075, alignSelf:'stretch', flexDirection:'row', alignSelf:'stretch'}}>
                <View style={{flex:1, justifyContent:'center', alignContent:'center', alignItems:'center'}}> 
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                        <Icon 
                            name="chevron-left"
                            color="#9B9B9B"
                            type='entypo'
                            size={30*factor_hor}
                        />
                    </TouchableOpacity>
                </View>
                
                    <View style={{flex:5, alignSelf:'stretch', alignContent:'center', justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontSize:30*factor_ver, color:'#FF7E65', fontWeight:'bold', textAlign:'center', alignSelf:'stretch' }}>Create Room</Text>
                    </View>

                <View style={{flex:1}}></View>
            </View>
            {/* Buffer */}
            <View style={{height:Dimensions.get('window').height*0.14,}}></View>
            {/* Holds Questions */}
            <View style={{alignSelf:'stretch', flex:1, marginLeft:35*factor_hor, marginRight:35*factor_hor}}>
                    {/* Name only / allow anon */}
                    <View style={{height:40*factor_ver, flexDirection:'row', }}>
                        <View style={{flex:1, justifyContent:'center', alignContent:'center', borderRadius:10*factor_hor, borderWidth:1, backgroundColor:this.state.named_background_color, borderColor:'#FF7E65'}}>
                            <TouchableOpacity onPress={()=>{this.press_name()}}>
                                <Text style={{color:this.state.named_font_color, fontSize:20*factor_ver, textAlign:'center'}}>Named Only</Text>
                            </TouchableOpacity>                       
                        </View>
                        <View style={{flex:0.33,}}></View>
                        <View style={{flex:1, justifyContent:'center', alignContent:'center', borderRadius:10*factor_hor, borderWidth:1, backgroundColor:this.state.anon_background_color, borderColor:'#FF7E65'}}>
                            <TouchableOpacity onPress={()=>{this.press_anon()}}>
                                <Text style={{color:this.state.anon_font_color, fontSize:20*factor_ver, textAlign:'center'}}>Allow Anon</Text>
                            </TouchableOpacity>
                        </View>
                    </View>        
                    {/* anon true */}
                    { this.state.bg_anon && ( 
                    <View style={{height:Dimensions.get('window').height*0.125,}}>
                        <Text style={{fontSize:18*factor_hor, marginTop:15*factor_hor, textAlign:'center'}}>Allow users to be named or anonymous</Text>
                    </View>
                    )}

                    {/* named true */}
                    { this.state.bg_named && (
                    <View style={{height:Dimensions.get('window').height*0.125,}}>
                        <Text style={{fontSize:18*factor_hor, marginTop:15*factor_hor, textAlign:'center'}}>Require users to be named</Text>
                    </View>
                    )}
                    
                    {/* Buffer */}
                    { this.state.bg_anon_named && (
                    <View style={{height:Dimensions.get('window').height*0.10,}}></View>
                    )}

                    {/* admin only / everyone */}
                    <View style={{height:40*factor_ver, flexDirection:'row', }}>
                        <View style={{flex:1, justifyContent:'center', alignContent:'center', borderRadius:10*factor_hor, borderWidth:1, backgroundColor:this.state.admin_background_color, borderColor:'#FF7E65'}}>
                            <TouchableOpacity onPress={()=>{this.press_admin()}}>
                                <Text style={{color:this.state.admin_font_color, fontSize:20*factor_ver, textAlign:'center'}}>Admin Only</Text>
                            </TouchableOpacity>                       
                        </View>
                        <View style={{flex:0.33,}}></View>
                        <View style={{flex:1, justifyContent:'center', alignContent:'center', borderRadius:10*factor_hor, borderWidth:1, backgroundColor:this.state.everyone_background_color, borderColor:'#FF7E65'}}>
                            <TouchableOpacity onPress={()=>{this.press_everyone()}}>
                                <Text style={{color:this.state.everyone_font_color, fontSize:20*factor_ver, textAlign:'center'}}>Everyone</Text>
                            </TouchableOpacity>
                        </View>
                    </View>   
                    
                    {/* admin true */}
                    { this.state.bg_admin && ( 
                    <View style={{height:Dimensions.get('window').height*0.125,}}>
                        <Text style={{fontSize:18*factor_hor, marginTop:15*factor_hor, textAlign:'center'}}>Only the admin can send messages, other members can only view</Text>
                    </View>
                    )}

                    {/* everyone true */}
                    { this.state.bg_everyone && (
                    <View style={{height:Dimensions.get('window').height*0.125,}}>
                        <Text style={{fontSize:18*factor_hor, marginTop:15*factor_hor, textAlign:'center'}}>Every member can send messages</Text>
                    </View>
                    )}
                    
                    {/* Buffer */}
                    { this.state.bg_admin_everyone && (
                    <View style={{height:Dimensions.get('window').height*0.10,}}></View>
                    )}                                                                
                    
                    <View style={{height:Dimensions.get('window').height*0.02,}}></View>
                    
                    <View style={{height:50*factor_ver, flexDirection:'row', borderColor:'#FF7E65', borderWidth:1, borderRadius:10*factor_hor, }}>
                            <View style={{flex:1, justifyContent:'center', alignContent:'center', borderRadius:10*factor_hor, backgroundColor:'#FF7E65', opacity:0.25, borderColor:'#FF7E65'}}></View>
                            <TouchableOpacity 
                                    hitSlop={{top: 30, right: 150, bottom: 30, left: 150 }}
                                    style={{position:'absolute', top:10*factor_ver, left:Dimensions.get('window').width*0.33, justifyContent:'center', alignContent:'center'}}
                                    onPress={()=> this.checkNav()}>
                                    <Text style={{color:'#FF7E65', fontSize:24*factor_hor, textAlign:'center'}}>Next</Text>
                            </TouchableOpacity>             
                    </View>   
                    <View style={{height:Dimensions.get('window').height*0.03}}></View>
                                       
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
        backgroundColor: 'white',
        marginBottom:20,
      },

    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
});
