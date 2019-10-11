import React from 'react';
import {StyleSheet, Text, Dimensions, AsyncStorage, Keyboard,
    Platform, Alert, View, TouchableOpacity} from 'react-native';
import { Icon, } from 'react-native-elements'
import { TextInput } from 'react-native-gesture-handler';

export default class create_room extends React.Component {
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
            bio:'',
            max_users:0,
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
        username = await AsyncStorage.getItem('user')
        await this.setState({
            username:username,
            latitude:this.user_location.coords.latitude,
            longitude:this.user_location.coords.longitude,
        })         
    }
    async click_anon() {
        await this.setState({is_anon:true, visible7:false, })
        await this.join_room2()
    }
    async click_named() {
        await this.setState({is_anon:false, visible7:false, })
        await this.join_room2()
    }

    async press_following() {
        await this.setState({
            people_color:'#9b9b9b',
            following_color:'white',
            bg_following:'#FF7E65',
            bg_people:'white',
            following_bw:1,
            people_bw:0, 
            selected_list:this.state.following_list
        })
    
    }
    async press_people() {
        await this.setState({
            following_color:'#9b9b9b',
            people_color:'white',
            bg_people:'#FF7E65',
            bg_following:'white',
            following_bw:0,
            people_bw:1, 
            selected_list:this.state.nearme_list
        })
        console.log(this.state.selected_list)
    }
    press_public() {
        // none pressed
        if( (this.state.bg_private == false) && (this.state.bg_public == false)) {
            this.setState({bg_public:true,
                            bg_private:false,
                            bg_public_private:false,
                            private_background_color:'white',
                            public_background_color:'#FF7E65',

                            public_font_color:'white',
                            private_font_color:'#9b9b9b',

            })

        }
        // if private 
        else if(this.state.bg_private == true && this.state.bg_public == false) {
            this.setState({bg_public:true,
                            bg_private:false,
                            bg_public_private:false,
                            private_background_color:'white',
                            public_background_color:'#FF7E65',

                            public_font_color:'white',
                            private_font_color:'#9b9b9b',
            },function(){console.log(
                        this.state.bg_public,
                        this.state.bg_private,
                        this.state.private_background_color,
                        this.state.public_background_color,
                        this.state.private_font_color,
                        this.state.public_font_color,
            )})
         
        }
    }
    press_private() {
        // none pressed
        if(this.state.bg_private == false && this.state.bg_public == false) {
            this.setState({bg_public:false,
                            bg_private:true,
                            bg_public_private:false,
                            private_background_color:'#FF7E65',
                            public_background_color:'white',
                            public_font_color:'#9b9b9b',
                            private_font_color:'white',
            },function(){console.log(
                        this.state.bg_public,
                        this.state.bg_private,
                        this.state.private_background_color,
                        this.state.public_background_color,
                        this.state.private_font_color,
                        this.state.public_font_color,                        

            )})
        }
        // if public
        else if(this.state.bg_private == false && this.state.bg_public == true) {
            this.setState({bg_public:false,
                            bg_private:true,
                            bg_public_private:false,
                            private_background_color:'#FF7E65',
                            public_background_color:'white',
                            public_font_color:'#9b9b9b',
                            private_font_color:'white',
            },function(){console.log(
                            this.state.bg_public,
                            this.state.bg_private,
                            this.state.private_background_color,
                            this.state.public_background_color,
                            this.state.private_font_color,
                            this.state.public_font_color,    
            )})           
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
    friendOrPublic() {
        if(this.state.name.length > 0 && this.state.bio.length > 0 && this.state.friendOrPublic !== '' && this.state.friendOrPublic !== null ) {
            if( this.state.bg_public == true && this.state.max_users == 0) {
                return Alert.alert("Please fill fields")
            }
            if(this.state.bg_public == true) {
                this.props.navigation.navigate("CREATE_ROOM2", {
                    name:this.state.name, 
                    bio:this.state.bio,
                    max_users:this.state.max_users,
                    friendOrPublic:'public'
                })
            }
            else if(this.state.bg_private == true) {
                this.props.navigation.navigate("CREATE_ROOM4", {
                    name:this.state.name, 
                    bio:this.state.bio,
                    max_users:this.state.max_users,
                    friendOrPublic:'friend',
                })
            }
            else {
                return Alert.alert("Please fill fields")
            }
        }
        else {
            return Alert.alert("Please fill fields")
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
                {/* Name */}
                <View style={{height:Dimensions.get('window').height*0.075, justifyContent:'center', alignContent:'center', flexDirection:'row', alignSelf:'stretch'}}>
                    <Text style={{fontSize:20*factor_hor, textAlign:'right' }}>Name:</Text>
                    <View style={{flex:1, marginLeft:5*factor_hor,  marginBottom:30*factor_ver, borderBottomColor:'#9b9b9b', borderBottomWidth:0.25,}}>         
                        <TextInput style={{textAlign:'left',fontSize:factor_hor*20, fontFamily:'avenir next' }}
                                    color='black'
                                    returnKeyType={'done'}
                                    multiline={false}
                                    keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'}
                                    ref={input => { this.textInput = input }}
                                    allowFontScaling={true}
                                    autoCompleteType={"off"}
                                    placeholder='type max numbers of users here'                                                              
                                    placeholderTextColor='white'
                                    maxLength={25}
                                    onChangeText={(typedText) => {this.setState( {name: typedText}, function () {console.log(this.state.name)} )}}
                                    onSubmitEditing={ () => {Keyboard.dismiss()} }
                        />                         
                    </View>
                </View>
                <View style={{height:Dimensions.get('window').height*0.01,}}></View>
                {/* bio */}
                <View style={{height:Dimensions.get('window').height*0.075, justifyContent:'center', alignContent:'center', flexDirection:'row', alignSelf:'stretch'}}>
                    {/* <View style={{flex:0.35, justifyContent:'center', alignContent:'center'}}> */}
                    <Text style={{fontSize:20*factor_hor,textAlign:'right' }}>Bio:</Text>
                    {/* </View> */}
                    <View style={{flex:1, marginLeft:5*factor_hor,  marginBottom:30*factor_ver,  borderBottomColor:'#9b9b9b', borderBottomWidth:0.25,}}>
                        <TextInput 
                            style={{textAlign:'left',fontSize:factor_hor*20, fontFamily:'avenir next' }}
                            color='black'
                            ref={input => { this.textInput = input }}
                            multiline={false}
                            allowFontScaling={true}
                            autoCompleteType={"off"}
                            placeholder='type max numbers of users here'                                                              
                            placeholderTextColor='white'
                            keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'}
                            maxLength={49}
                            onChangeText={(typedText) => {this.setState({bio: typedText}, function () {console.log(this.state.bio)} )}}
                            onSubmitEditing={ () => {Keyboard.dismiss()} }
                            returnKeyType={'done'}
                        /> 
                    </View>
                </View>
                {/* Buffer */}
                <View style={{height:Dimensions.get('window').height*0.01,}}></View>
                {/* Friends vs Private */}
                <View style={{height:Dimensions.get('window').height*0.075, width:300*factor_hor, justifyContent:'center', alignContent:'center', flexDirection:'row', alignSelf:'stretch'}}>
                    {/* public / private */}
                    <View style={{height:40*factor_ver, width:300*factor_hor, flexDirection:'row', }}>
                        <View style={{flex:1, justifyContent:'center', alignContent:'center', borderRadius:10*factor_hor, borderWidth:1, backgroundColor:this.state.public_background_color, borderColor:'#FF7E65'}}>
                            <TouchableOpacity onPress={()=>{this.press_public()}}>
                                <Text style={{color:this.state.public_font_color, fontSize:20*factor_ver, textAlign:'center'}}>Public</Text>
                            </TouchableOpacity>                       
                        </View>
                        <View style={{flex:0.33,}}></View>
                        <View style={{flex:1, justifyContent:'center', alignContent:'center', borderRadius:10*factor_hor, borderWidth:1, backgroundColor:this.state.private_background_color, borderColor:'#FF7E65'}}>
                            <TouchableOpacity onPress={()=>{this.press_private()}}>
                                <Text style={{color:this.state.private_font_color, fontSize:20*factor_ver, textAlign:'center'}}>Friends</Text>
                            </TouchableOpacity>
                        </View>
                    </View>     
                </View>
                {/* Max Users */}
                <View style={{height:Dimensions.get('window').height*0.073, justifyContent:'center', alignContent:'center', flexDirection:'row', alignSelf:'stretch'}}>
                { this.state.bg_public && (
                <Text style={{fontSize:20*factor_hor,textAlign:'right' }}>Max Users:</Text>
                )}
                { this.state.bg_public && (
                <View style={{flex:1, marginLeft:5*factor_hor,  marginBottom:30*factor_ver,  borderBottomColor:'#9b9b9b', borderBottomWidth:0.25,}}>
                    <TextInput style={{textAlign:'left',fontSize:factor_hor*20, fontFamily:'avenir next' }}
                                color='black'
                                keyboardType='number-pad'
                                returnKeyType={ 'done' }
                                onSubmitEditing={ () => {Keyboard.dismiss()} }
                                ref={input => { this.textInput = input }}
                                multiline={false}
                                allowFontScaling={true}
                                autoCompleteType={"off"}
                                placeholder='type max numbers of users here'                                                              
                                placeholderTextColor='white'
                                maxLength={10}
                                onChangeText={(typedText) => {this.setState( {max_users: typedText}, function () {console.log(this.state.max_users)} )}}
                    />  
                </View>
                )}
            </View>
                                     
                <View style={{height:50*factor_ver, flexDirection:'row', borderColor:'#FF7E65', borderWidth:1,borderRadius:10*factor_hor,   }}>              
                        <View style={{flex:1, justifyContent:'center', alignContent:'center', borderRadius:10*factor_hor, backgroundColor:'#FF7E65', opacity:0.25, borderColor:'#FF7E65'}}></View>
                        <TouchableOpacity 
                                hitSlop={ { top: 30, right: 150, bottom: 30, left: 150 } }
                                style={{position:'absolute', top:10*factor_ver, left:Dimensions.get('window').width*0.33, justifyContent:'center', alignContent:'center'}}
                                onPress={()=> this.friendOrPublic()}>
                                <Text style={{color:'#FF7E65', fontSize:24*factor_hor, textAlign:'center'}}>Next</Text>
                        </TouchableOpacity>             
                </View>   
                <View style={{flex:1}}></View>
                                    
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
