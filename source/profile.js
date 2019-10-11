import React, {Component} from 'react';
import {StyleSheet, Text, ActivityIndicator, View, 
        Modal, Dimensions, TouchableOpacity, RefreshControl, FlatList, 
        TouchableHighlight, AsyncStorage, Share, Alert } from 'react-native';
import { Icon,  } from 'react-native-elements'
import { ScrollView,} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Platform,} from 'react-native'
import Dialog, { DialogContent, DialogButton, } from 'react-native-popup-dialog';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import FastImage from 'react-native-fast-image'
import Svg, { Path } from 'react-native-svg';
import Speaker from './svgs/speaker'
import Block from  './svgs/block';
import GirlIcon from './svgs/girl_icon';
import BirthdayCake from './svgs/birthday_cake';
import BoyIcon from './svgs/boy_icon';
import Leaderboard from './svgs/leaderboard';
import FlagIcon from './svgs/flag_icon';
import CareerIcon from './svgs/career_icon';
import StarIcon from './svgs/star_icon';
import Eye from './svgs/eye';
import Invite from './svgs/invite';
import ExternalViewProfile from './svgs/external_view';
import Feedback from './svgs/feedback';
import Notifications from './svgs/notifications';
import Advanced from './svgs/advanced';
import Save from './svgs/save';
import ModifyProfile from './svgs/modify_profile';

var win_height = Dimensions.get('window').height
const months_ = ['none','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default class profile extends React.Component {
    static navigationOptions = {header: null};
    constructor(props) {
        super(props);
        this.state = {
            
            // arguments for fetch profile and fetch posts
            username:'', // async 
            sort:'post',
            received_comments:[1,0],
            received_posts:[1,0],

            // profile variables
            user_bio:'',
            gender: '', 
            score:'',  
            education:'',
            job:'',
            birthday:'',
            q1:'',
            q2:'',
            q3:'',
            q4:'',
            q5:'',
            q6:'',
            q7:'',
            q8:'',
            interest1:'',
            interest2:'',
            interest3:'',
            interest4:'',
            interest5:'',
            interest6:'',
            interest7:'',
            interest8:'',
            
            // loading indicators
            animating:true, // for load indicator
            loading:false, // whether a fetch was called and has loaded
            act_load_color:'#ececec', 
            out_of_posts:false, // whether no more posts from backend

            // for posts  
            comments:[],
            clicked_image:0, // tracks key for images
            key_status:0, // secondary track for key
            isFetching:false, 
            show:8,

            // for feed buttons
            posts_weight:'600',
            votes_weight:'400',
            
            // modals
            visible:false, // modal left
            visible2:false, // modal right
            visible3:false, // modal mute

            mute_messages:'',
            mute_rooms:'',
        }
    }
    async componentDidMount() {
        username = await AsyncStorage.getItem('user')
        mute_messages = await AsyncStorage.getItem('mute_messages')
        mute_rooms = await AsyncStorage.getItem('mute_rooms')

        // get profile
        url = `http://${serverLocation}:80/internal_view_profile?username=${username}`
        console.log(url)
        await fetch(url)
        .then((response) => response.json())
        .then((responseJson2) => {
            console.log(responseJson2)
            responseJson2 = responseJson2[0]
            mm = months_[responseJson2[4]]
            console.log(mm)
            this.setState({

                mute_messages:mute_messages,
                mute_rooms:mute_rooms, 

                username:username,
                user_bio:responseJson2[16],

                education:responseJson2[0],
                education_color:responseJson2[1],

                job:responseJson2[2],
                job_color:responseJson2[3], 

                birthday: ( 'Born on '+mm+ ' '+responseJson2[5]+', '+responseJson2[6] ),
                bday_color:responseJson2[7],

                q1:responseJson2[8],
                q2:responseJson2[9],
                q3:responseJson2[10],
                q4:responseJson2[11],
                q5:responseJson2[12],
                q6:responseJson2[13],
                q7:responseJson2[14],
                q8:responseJson2[15],
                
                interest1:responseJson2[18],
                interest1_color:responseJson2[19],

                interest2:responseJson2[20],
                interest2_color:responseJson2[21],

                interest3:responseJson2[22],
                interest3_color:responseJson2[23],

                interest4:responseJson2[24],
                interest4_color:responseJson2[25],

                interest5:responseJson2[26],
                interest5_color:responseJson2[27],

                interest6:responseJson2[28],
                interest6_color:responseJson2[29],

                interest7:responseJson2[30],
                interest7_color:responseJson2[31],

                interest8:responseJson2[32],
                interest8_color:responseJson2[33],

                country:responseJson2[34],
                country_color:responseJson2[35],

                gender:responseJson2[36],
                gender_color2:responseJson2[37],

                number_following:responseJson2[38],
                following_color:responseJson2[39],

                number_followers:responseJson2[40],
                followers_color:responseJson2[41],

                score: ("Score "+responseJson2[42]),
                score_color:responseJson2[43],

            },function(){console.log(
                this.state.username,
                this.state.user_bio,
                this.state.gender,
                this.state.education,
                this.state.job,
                this.state.birthday,
                this.state.q1,
                this.state.q2,
                this.state.q3,
                this.state.q4,
                this.state.q5,
                this.state.q6,
                this.state.q7,
                this.state.q8,
                this.state.interest1,
                this.state.interest2,
                this.state.interest3,
                this.state.interest4,
                this.state.interest5,
                this.state.interest6,
                this.state.interest7,
                this.state.interest8,
                this.state.country,
                this.state.number_following,
                this.state.number_followers,
                this.state.score,

            )}) 
        })
        .catch((error) => {
            console.log(error)
        });  
        // fetch posts
        await this.fetch_posts();
    }
    async reached_end() {
        console.log(this.state.show, this.state.comments.length)
        // if number shown < length of art
        if(this.state.show < (this.state.comments.length) ) {
            // show more posts
            console.log(1)
            this.setState( {show:(this.state.show+8)}, function() {console.log(this.state.show)})
        }
        // if number shown == length of art
        else if(this.state.show >= this.state.comments.length) {
            // if posts left
            if( this.state.out_of_posts == false ) {
                if(this.state.loading_posts == false) {
                    this.setState( {loading_posts:true}, function() {console.log(this.state.loading_posts)})
                    await this.fetch_posts()   
                    await this.setState( {show:(this.state.show+8)}, function() {console.log(this.state.show)})
            }
            // if no posts left
            else if( this.state.out_of_posts == true ) {
                await this.setState( {act_load_color:'white'}, function() {console.log(this.state.act_load_color)})
            }        
        }}

    }  
    async fetch_posts() {
        console.log(this.state.received_comments, this.state.received_posts)
        url = `http://${serverLocation}:80/posts_profile?`
        await fetch(url, {
            method:'POST',
            headers:{    
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
            body: 
            JSON.stringify({
                sort: this.state.sort,
                username: this.state.username,
                received_comments: '['+(this.state.received_comments).toString()+']',
                received_posts: '['+(this.state.received_posts).toString()+']',
            })
            })
            .then((response) => response.json())
            .then((responseJson2) => {
                console.log(responseJson2, 'response')
                if(responseJson2.length > 0) {
                    this.setState({
                        comments: [ ...this.state.comments, ...responseJson2, ] 
                        }, 
                        function() {console.log('comments' ,this.state.comments)
                        })
                    for(key in responseJson2){
                        console.log(responseJson2[key][10])
                        if(responseJson2[key][10] == 'COMMENT') {
                            this.state.received_comments.push(responseJson2[key][3])
                        }
                        else if(responseJson2[key][10] == 'POST') {
                            this.state.received_posts.push(responseJson2[key][3])
                       }
                    }
                    console.log(this.state.received_comments, this.state.received_posts)
                    this.setState( {act_load_color:'#ececec'}, function() {console.log(this.state.act_load_color)})
                }
                else {
                    this.setState( {act_load_color:'white', out_of_posts:true,}, function() {console.log(this.state.act_load_color, this.state.out_of_posts)})                    
                }
            }) 
            .catch((error) => {
                Alert.alert("Please check your connection and try again")
                console.log(error)
            });
            await this.setState( {animating:false}, function(){console.log(this.state.animating)})  
            await this.setState( {loading_posts:false}, function() {console.log(this.state.loading_posts, 'comment length', this.state.comments.length)})      
            await this.setState( {isFetching:false}, function() {console.log( this.state.isFetching)})      
    }

    async posts_click() {
        await this.setState({
            posts_weight:'600',
            votes_weight:'300',
            sort:'post',
            received_comments:[0,1],
            received_posts:[0,1],
            comments:[],
            show:8,
            animating:true,
            out_of_posts:false,
        },function(){console.log(
            this.state.posts_weight,
            this.state.votes_weight,
            this.state.sort,
            this.state.received_comments,
            this.state.received_posts,
            this.state.comments,
            this.state.show,
            this.state.animating,
            this.state.out_of_posts,
        )})
        await this.fetch_posts();
    }
    async votes_click() {
        await this.setState({
            posts_weight:'300',
            votes_weight:'600',
            sort:'vote',
            received_comments:[0,1],
            received_posts:[0,1],
            comments:[],
            show:8,
            animating:true,
            out_of_posts:false,
        },function(){console.log(
            this.state.posts_weight,
            this.state.votes_weight,
            this.state.sort,
            this.state.received_comments,
            this.state.received_posts,
            this.state.comments,
            this.state.show,
            this.state.animating,
            this.state.out_of_posts,
        )})
        await this.fetch_posts();
    }    
    async refresh_feed() {
        await this.setState({
            received_comments:[0,1],
            received_posts:[0,1],
            comments:[],
            show:8,
            animating:true,
            out_of_posts:false,
        })
        await this.fetch_posts();        
    }

    // profile
    q1() {
        if( typeof(this.state.q1) == 'undefined' || this.state.q1 == '""' || this.state.q1 == null ) {
            return 'This'
        }
        else {
            return this.state.q1.replace(/['"]+/g, '')
        }
    }
    q2() {
        if( typeof(this.state.q2) == 'undefined' || this.state.q2 == '""' || this.state.q2 == null ) {
            return 'This'
        }
        else {
            return this.state.q2.replace(/['"]+/g, '')
        }
    }
    q3() {
        console.log(typeof(this.state.q1))
        if( typeof(this.state.q3) == 'undefined' || this.state.q3 == '""' || this.state.q3 == null ) {
            return 'This'
        }
        else {
            return this.state.q3.replace(/['"]+/g, '')
        }
    }
    q4() {
        if( typeof(this.state.q4) == 'undefined' || this.state.q4 == '""' || this.state.q4 == null ) {
            return 'This'
        }
        else {
            return this.state.q4.replace(/['"]+/g, '')
        }
    }
    q5() {
        if( typeof(this.state.q5) == 'undefined' || this.state.q5 == '""' || this.state.q5 == null ) {
            return 'This'
        }
        else {
            return this.state.q5.replace(/['"]+/g, '')
        }
    }
    q6() {
        if( typeof(this.state.q6) == 'undefined' || this.state.q6 == '""' || this.state.q6 == null ) {
            return 'This'
        }
        else {
            return this.state.q6.replace(/['"]+/g, '')
        }
    }
    q7() {
        if( typeof(this.state.q7) == 'undefined' || this.state.q7 == '""' || this.state.q7 == null ) {
            return 'This'
        }
        else {
            return this.state.q7.replace(/['"]+/g, '')
        }
    }
    q8() {
        if( typeof(this.state.q8) == 'undefined' || this.state.q8 == '""' || this.state.q8 == null ) {
            return 'This'
        }
        else {
            return this.state.q8.replace(/['"]+/g, '')
        }
    }    
    country() {
        if(this.state.score.length > 0) {
            if( typeof(this.state.country) == 'undefined' || this.state.country == '""' || this.state.country == null || this.state.country == 'null' ) {
                this.setState({country:'Prefer not to say'})
            }
            else {
                return this.state.country.replace(/['"]+/g, '')
            }        
        }
    }      
    job() {
        if( typeof(this.state.job) == 'undefined' || this.state.job == '""' || this.state.job == null || this.state.job == 'null') {
            return 'None'
        }
        else {
            return this.state.job
        }        
    }   
    i1() {
        console.log("LENGTH OF I1", this.state.interest1, this.state.interest1.length)
        if( typeof(this.state.interest1) == 'undefined' || this.state.interest1 == '""' || this.state.interest1 == null ) {
            return 'Interest'
        }
        else {
            return this.state.interest1.replace(/['"]+/g, '')
        }
    }
    i2() {
        if( typeof(this.state.interest2) == 'undefined' || this.state.interest2 == '""' || this.state.interest2 == null ) {
            return 'Interest'
        }
        else {
            return this.state.interest2.replace(/['"]+/g, '')
        }
    }
    i3() {
        if( typeof(this.state.interest3) == 'undefined' || this.state.interest3 == '""' || this.state.interest3 == null ) {
            return 'Interest'
        }
        else {
            return this.state.interest3.replace(/['"]+/g, '')
        }
    }
    i4() {
        if( typeof(this.state.interest4) == 'undefined' || this.state.interest4 == '""' || this.state.interest4 == null ) {
            return 'Interest'
        }
        else {
            return this.state.interest4.replace(/['"]+/g, '')
        }
    }
    i5() {
        if( typeof(this.state.interest5) == 'undefined' || this.state.interest5 == '""' || this.state.interest5 == null ) {
            return 'Interest'
        }
        else {
            return this.state.interest5.replace(/['"]+/g, '')
        }
    }
    i6() {
        if( typeof(this.state.interest6) == 'undefined' || this.state.interest6 == '""' || this.state.interest6 == null ) {
            return 'Interest'
        }
        else {
            return this.state.interest6.replace(/['"]+/g, '')
        }
    }
    i7() {
        if( typeof(this.state.interest7) == 'undefined' || this.state.interest7 == '""' || this.state.interest7 == null ) {
            return 'Interest'
        }
        else {
            return this.state.interest7.replace(/['"]+/g, '')
        }
    }
    // posts
    which_footer(){
        if(this.state.act_load_color !== 'white') {
            return <ActivityIndicator 
                        size='small' 
                        color={this.state.act_load_color} 
                        style={{height:25,marginTop:10,justifyContent:'center',alignItems: 'center',}}
                    />
        }
        else if(this.state.act_load_color == 'white') {
            return <View style={{
                        height:200*factor_hor, 
                        backgroundColor:'white',
                        alignContent:'center', 
                        borderRadius:20,
                        justifyContent:'center', 
                        alignItems:'center', 
                    }}>
                        <View style={{height:20}}></View>
                        <Text style={{textAlign:'center', fontSize:22*factor_hor, fontFamily:'Avenir Next', color:'#9b9b9b',}}>
                            No posts! :(
                        </Text>
                        <View style={{flex:1,}}></View>
                        <Block
                            width={100*factor_hor}
                            height={100*factor_hor}
                            style={{
                                justifyContent:'center',
                                alignContent:'center',
                                flex: 1,
                                }}
                        />
                        <View style={{height:30}}></View>
                    </View> 
        } 
    } 
    which_gender() {
        if(this.state.gender == 'male')
            return true
        else {
            return false
        }
    }
    check_key(f, index) {
        // add comment height
        this.state.comments[index].push(f.nativeEvent.layout.height)
    }  
    render_image_comments(key) {

        if( typeof(this.state.comments[key][9]) == 'string' ) {
            console.log('IMAGE TRUE')
            return true
        }
        else {
            return false
        }
    }    
    check_color_votes_comments(index) {
        if(this.state.comments[index][4] == 'upvote') {
            return 'rgba(113, 233, 42, 1)'
        }
        else if(this.state.comments[index][4] == 'downvote') {
            return 'rgba(255, 0, 0, 1)'
        }
        else {
            return "black"
        }
    }  
    share_post = async () => {
        try {
            const result = await Share.share({
            title:'Pollen',
            message:'Download Pollen today! '+'https://apps.apple.com/ca/app/pollen-local-anonymous/id1479365533',
            });
            
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared ios
                    this.setState({visible2:false}, function() {console.log(this.state.visible2)})
                    return null
                } 
                else {
                    // shared android
                    this.setState({visible2:false}, function() {console.log(this.state.visible2)})
                    return null
                }
            } 
            else if (result.action === Share.dismissedAction) {
                // dismissed
                this.setState({visible2:false}, function() {console.log(this.state.visible2)})
                return null
            } 
        } 
        catch (error) {
            console.log(error)
        }
    }    

    // decides bottom nav bar height
    check_height() {
        if(Platform.OS === 'ios') {
            if ( Dimensions.get('window').height > 811) {
                return 18*factor_ver
            }
            else {
                return 0
            }
        }
        else {
            return 0
        }
    }
    if_ios() {
        if(Platform.OS === 'ios') {
            if ( Dimensions.get('window').height > 811) {
                return true
            }
        }
        else {
            return true
        }
    }
    is_email() {
        if( global.message_count > 0 ) {
            return true
        }
        else {
            return false
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
    show_date(index) {
        date1 = this.state.comments[index][5] 
        date2 = Math.floor(Date.now()/1000)
        date = date2 - date1
        // minutes
        if(date < 3600) {
            mins = Math.floor(date/60)
            return mins+'m'
        }
        // hours
        else if(date >= 3600 && date < 86400) {
            hours = Math.floor(date/3600)
            return hours+'h'
        }
        // days
        else if(date >= 86400 && date < 604800) {
            days = Math.floor(date/86400)
            return days+'d'
        }
        // weeks
        else if(date > 604800 && date <= 2678400 ) {
            weeks = Math.floor(date/604800)
            return weeks+'w'
        }
        // months
        else if(date > 2678400 && date <= 32140800 ) {
            months = Math.floor(date/2678400)
            return months+'m'
        }
        else {
            years = Math.floor(date/32140800)
            return years+'y'
        }
    }
    onSwipeUp(gestureState) {
        this.setState({visible3:false,}, function () {console.log(this.state.visible3)});
        console.log(this.state.visible3)
    }                                                                                                         
    onSwipeDown(gestureState) {
        this.setState({visible3:false,}, function () {console.log(this.state.visible3)});
        console.log(this.state.visible3)
    }
    onSwipeLeft(gestureState) {
        this.setState({visible3:false,}, function () {console.log(this.state.visible3)});
        console.log(this.state.visible3)
    }
    onSwipeRight(gestureState) {
        this.setState({visible3:false,}, function () {console.log(this.state.visible3)});
        console.log(this.state.visible3)
    }
    onSwipe(gestureName, gestureState) {
        
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        this.setState({gestureName: gestureName});
        
        switch (gestureName) {
            case SWIPE_UP:
                this.setState({visible3:false,}, function () {console.log(this.state.visible3)});
                console.log(this.state.visible3)
                break;
            
            case SWIPE_DOWN:    
                this.setState({visible3:false,}, function () {console.log(this.state.visible3)});
                console.log(this.state.visible3)
                break;
            
            case SWIPE_LEFT:
                this.setState({visible3:false,}, function () {console.log(this.state.visible3)});
                console.log(this.state.visible3)
                break;
            
            case SWIPE_RIGHT:
                this.setState({visible3:false,}, function () {console.log(this.state.visible3)});
                console.log(this.state.visible3)
                break;
        }
    }  
    async mute_messages() {
        console.log(this.state.mute_messages)
        if( this.state.mute_messages == true || this.state.mute_messages == 'true' ) {
            this.setState({mute_messages:false})
            AsyncStorage.setItem('mute_messages', 'false')
            url = `http://${serverLocation}:80/update_mute_messages?userID=${this.state.username}&mute_status=false`
            console.log(url)
            await fetch(url)
            for(key in global.messages_info) {
                // set each dict item to mute convo
                global.messages_info[key][3] = 'false'
            }
            AsyncStorage.setItem('messages_info', JSON.stringify(global.messages_info))
            console.log(global.messages_info)
        }
        else {
            this.setState({mute_messages:true})
            AsyncStorage.setItem('mute_messages', 'true')
            url = `http://${serverLocation}:80/update_mute_messages?userID=${this.state.username}&mute_status=true`
            console.log(url)
            await fetch(url)
            for(key in global.messages_info) {
                // set each dict item to mute convo
                global.messages_info[key][3] = 'true'
            }
            AsyncStorage.setItem('messages_info', JSON.stringify(global.messages_info))
            console.log(global.messages_info)
        }
        this.show_messages();
        
    }  
    async mute_rooms() {
        for(key in global.rooms_info) {
            // set each dict item to mute convo
            
        }
        if( this.state.mute_rooms == true  ||  this.state.mute_rooms == 'true' ) {
            this.setState({mute_rooms:false}, function() {console.log(this.state.mute_rooms)})
            AsyncStorage.setItem('mute_messages', 'false')
            url = `http://${serverLocation}:80/update_mute_rooms?userID=${this.state.username}&mute_status=false`
            console.log(url)
            await fetch(url)
            for(key in global.room_message_info) {
                // set each dict item to mute convo
                global.room_message_info[key][4] = 'false'
            }
            AsyncStorage.setItem('room_messages_info', JSON.stringify(global.room_message_info))
            console.log(global.room_message_info)
        }
        else {
            this.setState({mute_rooms:true}, function() {console.log(this.state.mute_rooms)})
            AsyncStorage.setItem('mute_rooms', 'false')
            url = `http://${serverLocation}:80/update_mute_rooms?userID=${this.state.username}&mute_status=true`
            console.log(url)
            await fetch(url)
            for(key in global.room_message_info) {
                // set each dict item to mute convo
                global.room_message_info[key][4] = 'true'
            }
            AsyncStorage.setItem('room_messages_info', JSON.stringify(global.room_message_info))
            console.log(global.room_message_info)
        }
        this.show_rooms();
    }
    show_messages() {
        // not muted
        if(this.state.mute_messages == 'false' || this.state.mute_messages == false) {
            return 'Mute Messages'
        }
        // muted
        else {
            return 'Unmute Messages'
        }
    }
    show_rooms() {
        if(this.state.mute_rooms == 'false' || this.state.mute_rooms == false) {
            return 'Mute Rooms'
        }
        else {
            return 'Unmute Rooms'
        }
    }

    isMine() {
        if(this.state.sort == 'post') {
            return true
        }
        else {
            return false
        }
    }
    deleteCommment(key) {
        if(this.state.comments[key][10] == "COMMENT") {
            url = `http://${serverLocation}:80/delete_comment?commentID=${this.state.comments[key][3]}`
            fetch(url)
            this.refresh_feed()
        }
        else {
            url = `http://${serverLocation}:80/delete_post?postID=${this.state.comments[key][3]}`
            fetch(url)
            this.refresh_feed()
        }
    }
    render() {
    const config = {velocityThreshold: 0.3,directionalOffsetThreshold: 80};
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#ffbf7e','#ff835e']} style={{flex:1, alignSelf:'stretch'}}>
                <Modal
                        animationType="none"
                        transparent={true}
                        visible={this.state.visible}
                        onRequestClose={() => {}}
                    >  
                    <View style={{height:Dimensions.get('window').height, width:Dimensions.get('window').width, justifyContent:'flex-end', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.8)', opacity:1,}}>
                                        {/* plus icon */}
                                        <View style={{flex:0.05, alignSelf:'stretch'}}></View>
                                        <View style={{flex:0.75, alignSelf:'stretch', }}>
                                            <View style={{height:150*factor_hor, alignSelf:'stretch',}}>
                                                <View style={{flexDirection:'row', flex:0.4 , }}>
                                                    <View style={{flex:0}}></View>
                                                    <View style={{flex:1, alignSelf:'stretch', justifyContent:'center', alignContent:'center' }}>
                                                        <TouchableOpacity onPress={ () => {this.setState({visible:false}, function () {console.log(this.state.visible)})}} style={{marginBottom:0, marginStart:5}}>
                                                            <Icon
                                                                size={factor_hor*35}
                                                                name='plus'
                                                                color='white'
                                                                type='entypo'
                                                            />          
                                                        </TouchableOpacity> 
                                                    </View>
                                                    <View style={{flex:7}}></View>
                                                </View>
                                                <View style={{flex:0.8}}></View>
                                                <View style={{flex:0.1*factor_hor*factor_hor}}></View>
                                            </View>
                                        </View>                                    
                                        <View style={{flex:0.2, alignSelf:'stretch', alignContent:'center', justifyContent:'center', alignItems:'center',}}>
                                            <TouchableHighlight underlayColor={'transparent'} onPress={ () => {this.setState({visible:false}, function () {console.log(this.state.visible)})}}>
                                                <View style={{height:50*factor_hor, marginBottom:15*factor_hor, width:300*factor_hor, borderRadius:15*factor_hor, backgroundColor:'white'}}>
                                                    <Text style={{textAlign:'center', justifyContent:'center', alignContent:'center',
                                                        fontFamily:'Avenir Next', fontSize:factor_hor*24*factor_hor, marginTop:6, color:'black' , opacity:1, fontWeight:'600',                      
                                                        }}>Done</Text>
                                                </View>
                                            </TouchableHighlight>                                    
                                        </View>
                                        {/* images */}
                                        <View style={{height:70*factor_hor, width:70*factor_hor, borderRadius:40, position:'absolute', top:50*factor_hor, left:Dimensions.get('window').width*0.375, backgroundColor:'white', alignSelf:'stretch',justifyContent:'center', alignItems:'center', alignContent:'center', }}>
                                            <TouchableOpacity onPress={()=> { this.props.navigation.navigate('SAVED_POSTS'), this.setState({visible:false}, function(){console.log(this.state.visible)}) }}>
                                                <Save
                                                    width={55*0.875*factor_hor}
                                                    height={55*0.875*factor_hor}
                                                    style={{
                                                        justifyContent:'center',
                                                        alignContent:'center',
                                                        flex: 1,
                                                    }}
                                                />    
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{height:70*factor_hor, width:70*factor_hor,borderRadius:40, position:'absolute', top:130*factor_hor,  left:Dimensions.get('window').width*0.375, backgroundColor:'white', alignSelf:'stretch',justifyContent:'center', alignItems:'center', alignContent:'center', }}>
                                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('BLOCKED_USERS'), this.setState({visible:false}, function(){console.log(this.state.visible)})}}>
                                                <Block
                                                    width={60*0.875*factor_hor}
                                                    height={60*0.875*factor_hor}
                                                    style={{
                                                        justifyContent:'center',
                                                        alignContent:'center',
                                                        flex: 1,
                                                    }}
                                                />
                                            </TouchableOpacity>                            
                                        </View>
                                        <View style={{height:70*factor_hor, width:70*factor_hor,borderRadius:40, position:'absolute', top:200*factor_hor,  left:Dimensions.get('window').width*0.25, backgroundColor:'white', alignSelf:'stretch',alignItems:'center',justifyContent:'center', alignContent:'center', }}>
                                            <TouchableOpacity onPress={() => {this.props.navigation.navigate('MODIFY_PROFILE', {goingback_load:false}), this.setState({visible:false}) }}>
                                                <ModifyProfile
                                                    width={55*0.875*factor_hor}
                                                    height={55*0.875*factor_hor}
                                                    style={{
                                                        justifyContent:'center',
                                                        alignContent:'center',
                                                        flex: 1,
                                                        }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{height:70*factor_hor, width:70*factor_hor,borderRadius:40, position:'absolute', top:235*factor_hor,  left:Dimensions.get('window').width*0.05, backgroundColor:'white', alignSelf:'stretch', alignItems:'center',justifyContent:'center', alignContent:'center', }}>
                                            <TouchableOpacity onPress={() => {this.props.navigation.navigate("EXTERNAL_VIEW_PROFILE", {profileID:this.state.username} ), this.setState({visible:false}, )}}>
                                                <ExternalViewProfile
                                                    width={65*0.875*factor_hor}
                                                    height={65*0.875*factor_hor}
                                                    style={{
                                                        justifyContent:'center',
                                                        alignContent:'center',
                                                        flex: 1,
                                                    }}
                                                />
                                            </TouchableOpacity>                            
                                        </View>
                                        {/* text */}
                                        <View style={{position:'absolute', left:(Dimensions.get('window').width*0.375 + 82.5*factor_hor), top:65*factor_hor}}>
                                            <Text style={{color:'white', fontFamily:'Avenir next', fontWeight:'600', fontSize:22*factor_hor}}>saved posts</Text>
                                        </View>
                                        <View style={{position:'absolute', left:(Dimensions.get('window').width*0.375 + 82.5*factor_hor), top:155*factor_hor}}>
                                            <Text style={{color:'white', fontFamily:'Avenir next', fontWeight:'600',fontSize:22*factor_hor}}>blocked users</Text>
                                        </View>
                                        <View style={{position:'absolute', left:(Dimensions.get('window').width*0.25 + 70*factor_hor), top:250*factor_hor}}>
                                            <Text style={{color:'white', fontFamily:'Avenir next', fontWeight:'600',fontSize:22*factor_hor}}>modify profile</Text>
                                        </View>
                                        <View style={{position:'absolute', left:(Dimensions.get('window').width*0.05 + 30*factor_hor), top:315*factor_hor}}>
                                            <Text style={{color:'white', fontFamily:'Avenir next', fontWeight:'600',fontSize:22*factor_hor}}>external view</Text>
                                        </View>
                </View> 
                </Modal>                    
                <Modal
                        animationType="none"
                        transparent={true}
                        visible={this.state.visible2}
                        onRequestClose={() => {}}
                    >  
                    <View style={{height:Dimensions.get('window').height, width:Dimensions.get('window').width, justifyContent:'flex-end', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.8)', opacity:1,}}>
                                        {/* plus icon */}
                                        <View style={{flex:0.05, alignSelf:'stretch'}}></View>
                                        <View style={{flex:0.735, alignSelf:'stretch', }}>
                                            <View style={{height:150*factor_hor, alignSelf:'stretch',}}>
                                                <View style={{flexDirection:'row', flex:0.4 , }}>
                                                    <View style={{flex:7, alignSelf:'stretch', justifyContent:'center', alignContent:'center' }}></View>
            
                                                    <View style={{flex:1}}>
                                                        <TouchableOpacity onPress={() => {this.setState({visible2:false}), function(){console.log(this.state.visible2)} }} style={{marginBottom:0, marginEnd:5}}>
                                                            <Icon
                                                                size={factor_hor*30}
                                                                name='settings'
                                                                color='white'
                                                                type='MaterialIcons'
                                                            />          
                                                        </TouchableOpacity>                                                  
                                                    </View>
                                                </View>
                                                <View style={{flex:0.8}}></View>
                                                <View style={{flex:0.1*factor_hor*factor_hor}}></View>
                                            </View>
                                        </View>                                    
                                        <View style={{flex:0.2, alignSelf:'stretch', alignContent:'center', justifyContent:'center', alignItems:'center',}}>
                                            <TouchableHighlight underlayColor={'transparent'} onPress={ () => {this.setState({visible2:false}, function () {console.log(this.state.visible2)})}}>
                                                <View style={{height:50*factor_hor, marginBottom:15*factor_hor, width:300*factor_hor, borderRadius:15*factor_hor, backgroundColor:'white'}}>
                                                    <Text style={{textAlign:'center', justifyContent:'center', alignContent:'center',
                                                        fontFamily:'Avenir Next', fontSize:factor_hor*24*factor_hor, marginTop:6, color:'black' , opacity:1, fontWeight:'600',                      
                                                        }}>Done</Text>
                                                </View>
                                            </TouchableHighlight>                                    
                                        </View>
                                        {/* images */}
                                        <View style={{height:70*factor_hor, width:70*factor_hor, borderRadius:40, position:'absolute', top:50*factor_hor, right:Dimensions.get('window').width*0.375, backgroundColor:'white', alignSelf:'stretch',justifyContent:'center', alignItems:'center', alignContent:'center', }}>
                                            <TouchableOpacity onPress={() => {this.share_post()} }>
                                                <Invite
                                                    width={55*0.875*factor_hor}
                                                    height={55*0.875*factor_hor}
                                                    style={{
                                                        justifyContent:'center',
                                                        alignContent:'center',
                                                        flex: 1,
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{height:70*factor_hor, width:70*factor_hor,borderRadius:40, position:'absolute', top:130*factor_hor,  right:Dimensions.get('window').width*0.375, backgroundColor:'white', alignSelf:'stretch',justifyContent:'center', alignItems:'center', alignContent:'center', }}>
                                            <TouchableOpacity onPress={()=>{this.setState({visible2:false}, function(){console.log(this.state.visible2)}),this.props.navigation.navigate('FEEDBACK')}}>
                                                <Feedback
                                                    width={60*0.875*factor_hor}
                                                    height={60*0.875*factor_hor}
                                                    style={{
                                                        justifyContent:'center',
                                                        alignContent:'center',
                                                        flex: 1,
                                                        }}
                                                />                                      
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{height:70*factor_hor, width:70*factor_hor,borderRadius:40, position:'absolute', top:200*factor_hor,  right:Dimensions.get('window').width*0.25, backgroundColor:'white', alignSelf:'stretch',alignItems:'center',justifyContent:'center', alignContent:'center', }}>
                                            <TouchableOpacity onPress={()=>{this.setState({visible3:true, visible2:false}, function(){console.log(this.state.visible2, this.state.visible3)}) }}>
                                                <Notifications
                                                    width={55*0.875*factor_hor}
                                                    height={55*0.875*factor_hor}
                                                    style={{
                                                        justifyContent:'center',
                                                        alignContent:'center',
                                                        flex: 1,
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{height:70*factor_hor, width:70*factor_hor,borderRadius:40, position:'absolute', top:235*factor_hor,  right:Dimensions.get('window').width*0.05, backgroundColor:'white', alignSelf:'stretch', alignItems:'center',justifyContent:'center', alignContent:'center', }}>
                                            <TouchableOpacity onPress={() => {this.props.navigation.navigate('ADVANCED'), this.setState({visible2:false}, function(){console.log(this.state.visible2)})}}>
                                                <Advanced
                                                    width={65*0.875*factor_hor}
                                                    height={65*0.875*factor_hor}
                                                    style={{
                                                        justifyContent:'center',
                                                        alignContent:'center',
                                                        flex: 1,
                                                        }}
                                                />                                  
                                            </TouchableOpacity>
                                        </View>
                                        {/* text */}
                                        <View style={{position:'absolute', right:(Dimensions.get('window').width*0.375 + 82.5*factor_hor), top:65*factor_hor}}>
                                            <Text style={{color:'white', fontFamily:'Avenir next', fontWeight:'600', fontSize:22*factor_hor}}>invite</Text>
                                        </View>
                                        <View style={{position:'absolute', right:(Dimensions.get('window').width*0.375 + 82.5*factor_hor), top:155*factor_hor}}>
                                            <Text style={{color:'white', fontFamily:'Avenir next', fontWeight:'600',fontSize:22*factor_hor}}>feedback</Text>
                                        </View>
                                        <View style={{position:'absolute', right:(Dimensions.get('window').width*0.25 + 70*factor_hor), top:250*factor_hor}}>
                                            <Text style={{color:'white', fontFamily:'Avenir next', fontWeight:'600',fontSize:22*factor_hor}}>notifications</Text>
                                        </View>
                                        <View style={{position:'absolute', right:(Dimensions.get('window').width*0.05 + 30*factor_hor), top:315*factor_hor}}>
                                            <Text style={{color:'white', fontFamily:'Avenir next', fontWeight:'600',fontSize:22*factor_hor}}>advanced</Text>
                                        </View>
                </View> 
                </Modal>                    
                <Dialog          
                    overlayOpacity={0.15}
                    hasOverlay={true}
                    rounded={true}
                    containerStyle={{opacity:1}}
                    visible={this.state.visible3}
                    onTouchOutside={() => {this.setState({visible3:false})}}
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
                            width:275*factor_hor, height:275*factor_hor, backgroundColor: 'white'}}
                        >
                            <View style={{height:Dimensions.get('window').height, width:Dimensions.get('window').width, backgroundColor:'white', justifyContent:'center', alignContent:'center', alignItems:'center'}}>

                                <View style={{height:10}}></View>
                                <TouchableOpacity>
                                    <Speaker
                                        width={125*factor_hor}
                                        height={125*factor_hor}
                                        style={{ paddingRight:1, justifyContent:'center', alignContent:'center', paddingLeft:1, }}
                                    />
                                </TouchableOpacity>
                                <View style={{height:20}}></View>
                                <TouchableOpacity 
                                    onPress={() => {this.mute_messages()}}
                                    style={{width:150*factor_hor, height:30, backgroundColor:'#ECECEC', justifyContent:'center', alignContent:'center', alignItems:'center', borderRadius:20}}>
                                    <View style={{width:200*factor_hor, height:40, backgroundColor:'#ECECEC', justifyContent:'center', alignContent:'center', alignItems:'center', borderRadius:20}}>
                                        <Text style={{textAlign:'center', fontFamily:'avenir next', fontSize:20*factor_hor, color:'black' }}>{this.show_messages()}</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{height:17.5}}></View>
                                <TouchableOpacity 
                                    onPress={()=>{this.mute_rooms()}}
                                    style={{width:150*factor_hor, height:30, backgroundColor:'#ECECEC', justifyContent:'center', alignContent:'center', alignItems:'center', borderRadius:20}}>
                                    <View style={{width:200*factor_hor, height:40, backgroundColor:'#ECECEC', justifyContent:'center', alignContent:'center', alignItems:'center', borderRadius:20}}>
                                        <Text style={{textAlign:'center', fontFamily:'avenir next', fontSize:20*factor_hor, color:'black'}}>{this.show_rooms()}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </GestureRecognizer>
                    </DialogContent>
                </Dialog>   
                
                <View style={{flex:0.05, backgroundColor:'transparent', zIndex:0, flexDirection:'row', alignSelf:'stretch', flexDirection:'row'}}></View>                   
                <View style={{flex:0.95, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
                    {/* name / plus / settings / bio */}
                    <View style={{height:150*factor_hor, alignSelf:'stretch',}}>    
                        <View style={{flex:0.4, flexDirection:'row', textAlign:'center', justifyContent:'center', alignContent:'center', }}>
                            <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                <TouchableOpacity onPress={ () => {this.setState({visible:true}, function () {console.log(this.state.visible)})}} style={{marginBottom:0, marginStart:5}}>
                                    <Icon
                                        size={factor_hor*35}
                                        name='plus'
                                        color='white'
                                        type='entypo'
                                    />          
                                </TouchableOpacity>                                                       
                            </View>
                            <View style={{flex:6, }}></View>
                            <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                <TouchableOpacity onPress={() => {this.setState({visible2:true}), function(){console.log(this.state.visible2)} }} style={{marginBottom:0, marginEnd:5}}>
                                    <Icon
                                        size={factor_hor*30}
                                        name='settings'
                                        color='white'
                                        type='MaterialIcons'
                                    />          
                                </TouchableOpacity>     
                            </View>
                        </View>
                        <View style={{flex:0.8, flexDirection:'row', justifyContent:'center', alignContent:'center', textAlign:'center', }}>
                            <View style={{flex:0.25,}}></View>
                            <View style={{flex:1,}}>
                                <Text style={{color:'white', textAlign:'center', fontWeight:'600', fontFamily:'Avenir Next', fontSize:factor_hor*25}}>{this.state.username}</Text>
                                <Text style={{ textAlign:'center', color:'white', justifyContent:'center', alignContent:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', color:'white'}}>
                                    {this.state.user_bio}                                                
                                </Text>    
                            </View>
                            <View style={{flex:0.25,}}></View>
                        </View>                        
                        <View style={{flex:(0.1*factor_hor*factor_hor), flexDirection:'row' }}></View>
                    </View>     
                    {/* Buffer */}
                    <View style={{height:5*factor_hor, alignSelf:'stretch'}}></View>
                    {/* scrollview */}
                    <ScrollView 
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{flexGrow:1}}>
                            {/* float a b o u t */}
                            <View style={{
                                        position:'absolute',
                                        top: Dimensions.get('window').width*0.02*factor_ver,
                                        left:Dimensions.get('window').width*0.375,
                                        alignSelf:'stretch',
                                        height:Dimensions.get('window').height*0.04/factor_hor,
                                        width:Dimensions.get('window').width*0.25,
                                        borderRadius:20,
                                        backgroundColor:'white',
                                        elevation:1,
                                        borderWidth:0.25,
                                        borderColor:'#FFA66C',
                                        zIndex:1,
                                        justifyContent:'center',
                                        alignContent:'center',
                                        }}>
                                <Text style={{textAlign:'center', justifyContent:'center', alignContent:'center', alignItems:'center', fontFamily:'Avenir next', fontSize:18*factor_hor, color:'#FFA66C'}}>a b o u t</Text>
                            </View>                               
                            {/* Followers */}
                            <View style={{height:Dimensions.get('window').height*0.03, flexDirection:'row', alignSelf:'stretch'}}>
                                <View style={{flex:1,  alignSelf:'stretch'}}></View>
                                <TouchableOpacity onPress={()=>{this.props.navigation.push('FOLLOWING')}}>
                                <View style={{flex:5, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
                                    <Text style={{fontFamily:'avenir next', marginTop:5*factor_ver, textAlign:'right', marginRight:2, color:'white', fontSize:16*factor_hor}}>{this.state.number_followers} following</Text>
                                </View>
                                </TouchableOpacity>
                                <View style={{width:Dimensions.get('window').width*0.30, alignSelf:'stretch'}}></View>
                                <TouchableOpacity onPress={()=>{this.props.navigation.push('FOLLOWERS')}}>
                                <View style={{flex:5, alignSelf:'stretch', justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
                                    <Text style={{fontFamily:'avenir next', marginTop:5*factor_ver, textAlign:'left', marginLeft:0, color:'white', fontSize:16*factor_hor}}>{this.state.number_following} followers</Text>
                                </View>
                                </TouchableOpacity>
                                <View style={{flex:1,  alignSelf:'stretch'}}></View>
                            </View>
                            {/* About */}
                            <View style={{height:Dimensions.get('window').height*0.3, backgroundColor:'transparent', marginLeft:15*factor_hor, marginRight:15*factor_hor, }}>
                                <ScrollView 
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{flexGrow:1}}>
                                    {/* bday */}
                                    <View style={{height:(Dimensions.get('window').height*0.3 - 25*factor_hor)/5, backgroundColor:'white', justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:5*factor_hor,}}>
                                        <View style={{flex:1, }}></View>
                                        <BirthdayCake
                                            width={22.5*factor_hor}
                                            height={22.5*factor_hor}
                                            style={{
                                                marginTop:0,
                                                alignContent:'center',
                                                justifyContent:'center',
                                            }}
                                        />
                                        <View style={{width:7.5*factor_hor, }}></View>
                                        <Text style={{fontFamily:'avenir next', marginBottom:-5*factor_hor, marginTop:5, fontSize:16*factor_hor, textAlign:'center' }}>{this.state.birthday}</Text>                                                          
                                        <View style={{width:7.5*factor_hor, }}></View>
                                        <View style={{width:20*factor_hor, }}></View>
                                        <View style={{flex:1, }}></View>
                                    </View>

                                    {/* leaderboard */}
                                    <View style={{height:(Dimensions.get('window').height*0.3 - 25*factor_hor)/5, backgroundColor:'white', justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:5*factor_hor,}}>
                                        <View style={{flex:1, }}></View>
                                        <Leaderboard
                                            width={25*factor_hor}
                                            height={25*factor_hor}
                                            style={{
                                                marginTop:0,
                                                alignContent:'center',
                                                justifyContent:'center',
                                                }}
                                        />
                                        <View style={{width:7.5*factor_hor, }}></View>
                                        <Text style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}>{this.state.score}</Text>
                                        <View style={{width:7.5*factor_hor, }}></View>
                                        <View style={{width:20*factor_hor, }}></View>
                                        <View style={{flex:1, }}></View>
                                    </View>
                                    {/* gender */}
                                    <View style={{height:(Dimensions.get('window').height*0.3 - 25*factor_hor)/5, backgroundColor:'white', justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:5*factor_hor,}}>
                                        <View style={{flex:1, }}></View>
                                        { this.which_gender() && (
                                            <BoyIcon
                                            width={22.5*factor_hor}
                                            height={22.5*factor_hor}
                                            style={{
                                                    marginTop:0,
                                                    alignContent:'center',
                                                    justifyContent:'center',
                                                    }}
                                            />                     
                                        )}
                                        { !this.which_gender() && (
                                            <GirlIcon    
                                            width={22.5*factor_hor}
                                            height={22.5*factor_hor}
                                            style={{
                                                    marginTop:0,
                                                    alignContent:'center',
                                                    justifyContent:'center',
                                                    }}
                                            />
                                        )}    
                                        <View style={{width:7.5*factor_hor, }}></View>                                
                                        <Text style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}>{this.state.gender.slice(0,1).toUpperCase()}{this.state.gender.slice(1)}</Text>
                                        <View style={{width:7.5*factor_hor, }}></View>
                                        <View style={{width:20*factor_hor, }}></View>
                                        <View style={{flex:1, }}></View>                                
                                    </View>
                                    {/* country */}
                                    <View style={{height:(Dimensions.get('window').height*0.3 - 25*factor_hor)/5, backgroundColor:'white', justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:5*factor_hor,}}>
                                        
                                        <View style={{flex:1, }}></View>
                                        <FlagIcon
                                            width={25*factor_hor}
                                            height={25*factor_hor}
                                            style={{
                                                marginTop:0,
                                                alignContent:'center',
                                                justifyContent:'center',
                                            }}
                                        />
                                        <View style={{width:7.5*factor_hor, }}></View>                                    
                                        <Text style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}>{this.country()}</Text>
                                        <View style={{width:7.5*factor_hor, }}></View>
                                        <View style={{width:20*factor_hor, }}></View>
                                        <View style={{flex:1, }}></View>                                
                                    </View>
                                    {/* job */}
                                    <View style={{height:(Dimensions.get('window').height*0.3 - 25*factor_hor)/5, backgroundColor:'white', justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:5*factor_hor,}}>
                                        
                                        <View style={{flex:1, }}></View>
                                        <CareerIcon
                                            width={25*factor_hor}
                                            height={25*factor_hor}
                                            style={{
                                                marginTop:0,
                                                alignContent:'center',
                                                justifyContent:'center',
                                            }}
                                        />
                                        <View style={{width:7.5*factor_hor, }}></View>                                       
                                        <Text style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}>{this.job()}</Text>
                                        <View style={{width:7.5*factor_hor, }}></View>
                                        <View style={{width:20*factor_hor, }}></View>
                                        <View style={{flex:1, }}></View>  
                                    </View>
                                    {/* interests */}
                                    <View style={{height:(Dimensions.get('window').height*0.3 - 25*factor_hor)/5,  backgroundColor:'white', justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:5*factor_hor,}}>
                                        <View style={{flex:1, }}></View>
                                        <StarIcon
                                            width={25*factor_hor}
                                            height={25*factor_hor}
                                            style={{
                                                marginTop:0,
                                                alignContent:'center',
                                                justifyContent:'center',
                                            }}
                                        />
                                        <View style={{width:7.5*factor_hor, }}></View>                                       
                                        <Text style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}>{this.i1()}</Text>
                                        <View style={{width:7.5*factor_hor, }}></View>
                                        <View style={{width:20*factor_hor, }}></View>
                                        <View style={{flex:1, }}></View>   
                                    </View>
                                    <View style={{height:(Dimensions.get('window').height*0.3 - 25*factor_hor)/5,  backgroundColor:'white', justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:5*factor_hor,}}>
                                        <View style={{flex:1, }}></View>
                                        <StarIcon
                                            width={25*factor_hor}
                                            height={25*factor_hor}
                                            style={{
                                                marginTop:0,
                                                alignContent:'center',
                                                justifyContent:'center',
                                            }}
                                        />
                                        <View style={{width:7.5*factor_hor, }}></View>                                       
                                        <Text style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}>{this.i2()}</Text>
                                        <View style={{width:7.5*factor_hor, }}></View>
                                        <View style={{width:20*factor_hor, }}></View>
                                        <View style={{flex:1, }}></View>   
                                    </View>
                                    <View style={{height:(Dimensions.get('window').height*0.3 - 25*factor_hor)/5,  backgroundColor:'white', justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:5*factor_hor,}}>
                                        <View style={{flex:1, }}></View>
                                        <StarIcon
                                            width={25*factor_hor}
                                            height={25*factor_hor}
                                            style={{
                                                marginTop:0,
                                                alignContent:'center',
                                                justifyContent:'center',
                                            }}
                                        />
                                        <View style={{width:7.5*factor_hor, }}></View>                                       
                                        <Text style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}>{this.i3()}</Text>
                                        <View style={{width:7.5*factor_hor, }}></View>
                                        <View style={{width:20*factor_hor, }}></View>
                                        <View style={{flex:1, }}></View>   
                                    </View>
                                    <View style={{height:(Dimensions.get('window').height*0.3 - 25*factor_hor)/5, backgroundColor:'white', justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:5*factor_hor,}}>
                                        <View style={{flex:1, }}></View>
                                        <StarIcon
                                            width={25*factor_hor}
                                            height={25*factor_hor}
                                            style={{
                                                marginTop:0,
                                                alignContent:'center',
                                                justifyContent:'center',
                                            }}
                                        />
                                        <View style={{width:7.5*factor_hor, }}></View>                                       
                                        <Text style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}>{this.i4()}</Text>
                                        <View style={{width:7.5*factor_hor, }}></View>
                                        <View style={{width:20*factor_hor, }}></View>
                                        <View style={{flex:1, }}></View>   
                                    </View>
                                    <View style={{height:(Dimensions.get('window').height*0.3 - 25*factor_hor)/5,  backgroundColor:'white', justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:5*factor_hor,}}>
                                        <View style={{flex:1, }}></View>
                                        <StarIcon
                                            width={25*factor_hor}
                                            height={25*factor_hor}
                                            style={{
                                                marginTop:0,
                                                alignContent:'center',
                                                justifyContent:'center',
                                            }}
                                        />
                                        <View style={{width:7.5*factor_hor, }}></View>                                       
                                        <Text style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}>{this.i5()}</Text>
                                        <View style={{width:7.5*factor_hor, }}></View>
                                        <View style={{width:20*factor_hor, }}></View>
                                        <View style={{flex:1, }}></View>   
                                    </View>
                                    <View style={{height:(Dimensions.get('window').height*0.3 - 25*factor_hor)/5,  backgroundColor:'white', justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:5*factor_hor,}}>
                                        <View style={{flex:1, }}></View>
                                        <StarIcon
                                            width={25*factor_hor}
                                            height={25*factor_hor}
                                            style={{
                                                marginTop:0,
                                                alignContent:'center',
                                                justifyContent:'center',
                                            }}
                                        />
                                        <View style={{width:7.5*factor_hor, }}></View>                                       
                                        <Text style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}>{this.i6()}</Text>
                                        <View style={{width:7.5*factor_hor, }}></View>
                                        <View style={{width:20*factor_hor, }}></View>
                                        <View style={{flex:1, }}></View>   
                                    </View>
                                    <View style={{height:(Dimensions.get('window').height*0.3 - 25*factor_hor)/5,  backgroundColor:'white', justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:5*factor_hor,}}>
                                        <View style={{flex:1, }}></View>
                                        <StarIcon
                                            width={25*factor_hor}
                                            height={25*factor_hor}
                                            style={{
                                                marginTop:0,
                                                alignContent:'center',
                                                justifyContent:'center',
                                            }}
                                        />
                                        <View style={{width:7.5*factor_hor, }}></View>                                       
                                        <Text style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}>{this.i7()}</Text>
                                        <View style={{width:7.5*factor_hor, }}></View>
                                        <View style={{width:20*factor_hor, }}></View>
                                        <View style={{flex:1, }}></View>   
                                    </View>
                                                                                                                                
                                </ScrollView>    
                            </View>
                            {/* Buffer */}
                            <View style={{marginTop:Dimensions.get('window').height*0.075}}></View>
                            {/* Q's */}
                            <View style={{height:Dimensions.get('window').height*0.35, backgroundColor:'transparent', marginLeft:15*factor_hor, marginRight:15*factor_hor, }}>
                                {/* float Q ' s */}
                                <View style={{
                                            position:'absolute',
                                            top:-15,//Dimensions.get('window').height*0.82/factor_ver ,
                                            left:Dimensions.get('window').width*0.355,
                                            alignSelf:'stretch',
                                            height:Dimensions.get('window').height*0.0375/factor_hor,
                                            width:Dimensions.get('window').width*0.2,
                                            borderRadius:20,
                                            backgroundColor:'white',
                                            elevation:1,
                                            borderWidth:0.25,
                                            borderColor:'#FFA66C',
                                            zIndex:1,
                                            justifyContent:'center',
                                            alignContent:'center',
                                            }}>
                                    <Text style={{textAlign:'center', justifyContent:'center', alignContent:'center', alignItems:'center', fontFamily:'Avenir next', fontSize:18*factor_hor, color:'#FFA66C'}}>Q ' s</Text>
                                </View>  
                                <ScrollView 
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{flexGrow:1}}>
                                    <View style={{height:Dimensions.get('window').height*0.35/4, justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:0*factor_hor,}}>
                                        <View style={{flex:1, alignSelf:'stretch', justifyContent:'center', alignContent:'center', marginRight:1.5, borderRadius:5, backgroundColor:'white'}}>
                                            <Text style={{justifyContent:'center', textAlign:'center', alignContent:'center', fontFamily:'avenir next', marginTop:8, fontSize:16*factor_hor, marginBottom:3*factor_hor }}>favorite movie</Text>
                                            <Text style={{textAlign:'center', fontFamily:'avenir next', fontSize:14*factor_hor, color:'red', }}>{this.q1()}</Text>
                                        </View>
                                        <View style={{flex:1,justifyContent:'center', alignContent:'center', alignSelf:'stretch', marginLeft:1.5, borderRadius:5, backgroundColor:'white'}}>
                                            <Text style={{textAlign:'center',fontFamily:'avenir next', marginTop:8, fontSize:16*factor_hor, marginBottom:3*factor_hor  }}>my song rn</Text>
                                            <Text style={{textAlign:'center', fontFamily:'avenir next', fontSize:14*factor_hor, color:'red', }}>{this.q2()}</Text>
                                        </View>
                                    </View>
                                    <View style={{height:Dimensions.get('window').height*0.35/4, marginTop:3, justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:0*factor_hor,}}>
                                        <View style={{flex:1,justifyContent:'center', alignContent:'center', alignSelf:'stretch', marginRight:1.5, marginTop:3,borderRadius:5, backgroundColor:'white'}}>
                                        <Text style={{textAlign:'center',fontFamily:'avenir next', marginTop:8, fontSize:16*factor_hor, marginBottom:3*factor_hor  }}>single vs taken</Text>
                                            <Text style={{textAlign:'center', fontFamily:'avenir next', fontSize:14*factor_hor, color:'red', }}>{this.q3()}</Text>
                                        </View>
                                        <View style={{flex:1,justifyContent:'center', alignContent:'center', alignSelf:'stretch', marginLeft:1.5, marginTop:3,borderRadius:5, backgroundColor:'white'}}>
                                        <Text style={{textAlign:'center',fontFamily:'avenir next', marginTop:8, fontSize:16*factor_hor, marginBottom:3*factor_hor  }}>best book ever</Text>
                                            <Text style={{textAlign:'center', fontFamily:'avenir next', fontSize:14*factor_hor, color:'red', }}>{this.q4()}</Text>
                                        </View>
                                    </View>
                                    <View style={{height:Dimensions.get('window').height*0.35/4, marginTop:3, justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:0*factor_hor,}}>
                                        <View style={{flex:1,justifyContent:'center', alignContent:'center', alignSelf:'stretch', marginRight:1.5, marginTop:3,borderRadius:5, backgroundColor:'white'}}>
                                        <Text style={{textAlign:'center',fontFamily:'avenir next', marginTop:8, fontSize:16*factor_hor, marginBottom:3*factor_hor  }}>my type of pet</Text>
                                            <Text style={{textAlign:'center', fontFamily:'avenir next', fontSize:14*factor_hor, color:'red', }}>{this.q5()}</Text>
                                        </View>
                                        <View style={{flex:1,justifyContent:'center', alignContent:'center', alignSelf:'stretch', marginLeft:1.5, marginTop:3,borderRadius:5, backgroundColor:'white'}}>
                                        <Text style={{textAlign:'center',fontFamily:'avenir next', marginTop:8, fontSize:16*factor_hor, marginBottom:3*factor_hor  }}>dream travel spot</Text>
                                            <Text style={{textAlign:'center', fontFamily:'avenir next', fontSize:14*factor_hor, color:'red', }}>{this.q6()}</Text>
                                        </View>
                                    </View>
                                    <View style={{height:Dimensions.get('window').height*0.35/4, marginTop:3, justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:0*factor_hor,}}>
                                        <View style={{flex:1,justifyContent:'center', alignContent:'center', alignSelf:'stretch', marginRight:1.5, marginTop:3,borderRadius:5, backgroundColor:'white'}}>
                                        <Text style={{textAlign:'center',fontFamily:'avenir next', marginTop:8, fontSize:16*factor_hor, marginBottom:3*factor_hor  }}>dream job</Text>
                                            <Text style={{textAlign:'center', fontFamily:'avenir next', fontSize:14*factor_hor, color:'red',  }}>{this.q7()}</Text>
                                        </View>
                                        <View style={{flex:1,justifyContent:'center', alignContent:'center', alignSelf:'stretch', marginLeft:1.5,marginTop:3, borderRadius:5, backgroundColor:'white'}}>
                                        <Text style={{textAlign:'center',fontFamily:'avenir next', marginTop:8, fontSize:16*factor_hor, marginBottom:3*factor_hor  }}>can't live without</Text>
                                            <Text style={{textAlign:'center', fontFamily:'avenir next', fontSize:14*factor_hor, color:'red', }}>{this.q8()}</Text>
                                        </View>
                                    </View>
                                </ScrollView>    
                            </View>
                            {/* Buffer */}
                            <View style={{marginTop:Dimensions.get('window').height*0.075}}></View>
                            {/* Posts */}
                            <View style={{height: (Dimensions.get('window').height*0.935 - 240*factor_hor - this.check_height() ), alignSelf:'stretch', }}>
                                {/* float p o s t s | v o t e s */}
                                <View style={{
                                            position:'absolute',
                                            top:-15,//Dimensions.get('window').height*0.82/factor_ver ,
                                            left:Dimensions.get('window').width*0.2885,
                                            alignSelf:'stretch',
                                            height:30,
                                            width:Dimensions.get('window').width*0.425,
                                            borderRadius:20,
                                            backgroundColor:'white',
                                            elevation:1,
                                            borderWidth:0.25,
                                            borderColor:'#FFA66C',
                                            zIndex:1,
                                            justifyContent:'center',
                                            alignContent:'center',
                                            flexDirection:'row',
                                            }}>
                                    <TouchableOpacity style={{flex:1, marginLeft:3, justifyContent:'center', alignContent:'center', alignItems:'center'}} onPress={()=>{this.posts_click()}}>
                                        <View style={{flex:1, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
                                            <Text style={{textAlign:'center', fontWeight:this.state.posts_weight, justifyContent:'center', alignContent:'center', alignItems:'center', fontFamily:'Avenir next', fontSize:18*factor_hor, color:'#FFA66C'}}>p o s t s</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{flex:1, marginRight:3, justifyContent:'center', alignContent:'center', alignItems:'center'}} onPress={()=>{this.votes_click()}}>
                                        <View style={{flex:1, borderLeftColor:'#FFA66C', borderLeftWidth:1, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
                                            <Text style={{textAlign:'center', fontWeight:this.state.votes_weight, justifyContent:'center', alignContent:'center', alignItems:'center', fontFamily:'Avenir next', fontSize:18*factor_hor, color:'#FFA66C'}}>v o t e s</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>   
                                {this.state.animating && ( 
                                    <ActivityIndicator size='large' animating={this.state.animating}
                                        color = "white"
                                        style={{flex:1,marginTop:10,justifyContent: 'center',alignItems: 'center',}}
                                    /> 
                                )}
                                { !this.state.animating && (
                                <FlatList 
                                    showsVerticalScrollIndicator={false}
                                    data={this.state.comments.slice(0,this.state.show)}
                                    extraData={this.state}
                                    
                                    // refresh
                                    // refreshControl={
                                        //<RefreshControl
                                        //  refreshing={this.state.isFetching}
                                        // onRefresh={() => { this.setState({isFetching:true}, function() {console.log(this.state.isFetching)}), this.refresh_feed()} }
                                            //title="Pull to refresh" tintColor="transparent" titleColor="#FC6026"
                                        ///>}

                                    onEndReachedThreshold={0.5}
                                    onEndReached={ () => {this.reached_end();}}
                                    ListFooterComponent={() => this.state.loading_post? null :this.which_footer()}
                                        
                                    initialNumToRender={8} // render 8 at first
                                    maxToRenderPerBatch={8} // render 8 per
                                    style={{flex:1}}
                                    scrollEnabled={!this.state.isSwiping2}
                                    keyExtractor={(item,index) => (index).toString()}
                                    renderItem={({item, index}) => ( 
                                    
                                    <View key={index} onLayout={(f) => {this.check_key(f, index)}} style={{ minHeight:10, alignSelf:'stretch', }}>                          

                                        <TouchableOpacity onPress={() => {
                                                    this.setState({key_status:index},function(){console.log(this.state.key_status,this.state.comments[this.state.key_status][3])})
                                                    this.props.navigation.navigate('VIEW_COMMENT_PROFILE', { x:{postID:this.state.comments[index][3],object_height:this.state.comments[index][12],comment_or_post:this.state.comments[index][10]} })
                                                    }}>
                                        <View style={{
                                            borderTopLeftRadius:15,
                                            borderTopRightRadius:17.5,
                                            borderTopLeftWidth:0.5,
                                            borderTopRightWidth:0.5,
                                            borderLeftColor:'#ececec',
                                            borderLeftWidth:1, 
                                            borderRightColor:'#ececec',
                                            borderRightWidth:1,
                                            borderTopWidth:0.25,
                                            borderTopColor:'#ececec',
                                            backgroundColor:'white',
                                            alignSelf:'stretch'
                                            }}>

                                        <View style={{height:15,}}></View>
                                        <View style={{height:25*factor_hor, flexDirection:'row',  backgroundColor:'white' }}>
                                            <View style={{width:12*factor_hor, }}></View>
                                            <View style={{flex:1, justifyContent:'center', alignContent:'center',backgroundColor:'white'}}>
                                                <TouchableHighlight underlayColor={'transparent'}>
                                                    <Text   
                                                        style={{textAlign:'left', marginStart:5, color:'#9B9B9B', 
                                                        fontSize:18*factor_hor,fontFamily:'Avenir next',
                                                    }}>{this.state.comments[index][0]}</Text>
                                                </TouchableHighlight>                                    
                                            </View>
                                            <View style={{flex:0.4,backgroundColor:'white' }}></View>
                                            <View hitSlop={{top: 10, bottom: 10, left: 20, right: 20}} style={{flex:0.4,backgroundColor:'white' }}>                       
                                            </View>                          
                                            <View style={{width:15*factor_hor,backgroundColor:'white' }}></View> 
                                        </View>
                                        <View style={{height:4*factor_hor}}></View>
                                        <View style={{marginTop:5, marginBottom:0, backgroundColor:'white', alignContent:'center', justifyContent:'center'}}>
                                                    <Text 
                                                        numberOfLines={6}
                                                        style={{textAlign:'left', marginLeft:20, marginEnd:20, marginTop:-10, lineHeight:30, fontFamily:'avenir next', fontSize:factor_hor*18, fontWeight:'normal'}}>{this.state.comments[index][2]}
                                                    </Text>
                                                </View>        
                                        <View>
                                                    { this.render_image_comments(index) && ( 
                                                        <FastImage
                                                        resizeMode={FastImage.resizeMode.contain}
                                                                source={ {uri: `http://${serverLocation}/${this.state.comments[index][9]}` }}
                                                                style={{ flex:1.1, backgroundColor:'white', marginLeft:-1, width:Dimensions.get('window').width, height:Dimensions.get('window').width,}}
                                                    /> )}
                                        </View>                    
                                        </View>
                                        
                                        <View style={{height:40*factor_hor, justifyContent:'center', alignContent:'center', flexDirection:'row', }}>
                                            <View style={{flex:0.3, borderLeftColor:'#ececec',backgroundColor:'white',borderBottomColor:'#ececec', borderBottomLeftRadius:50, borderBottomWidth:1, borderLeftWidth:1,}}>
                                            </View>
                                            <View style={{width:10,backgroundColor:'white' , borderBottomColor:'#ececec',borderBottomWidth:0.25,}}>
                                                <View style={{height:20, marginTop:10*factor_ver, width:20, justifyContent:'center', alignContent:'center',
                                                        alignItems:'center',borderRadius:10}}>
                                                </View>
                                            </View>
                                            <View style={{flex:3,backgroundColor:'white' , paddingLeft:5, flexDirection:'row', justifyContent:'space-around', alignContent:'space-around',borderBottomColor:'#ececec',borderBottomWidth:0.25, }}>
                                                {/* date */}
                                                <View style={{flex:1.15, justifyContent:'center', alignContent:'center',}}>
                                                    <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>                    
                                                </View>
                                                {/* vote */}
                                                <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                                    <Text style={{textAlign:'center', marginEnd:15, fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes_comments(index)}}>{this.state.comments[index][6] - this.state.comments[index][7]}</Text>
                                                </View>
                                                {/* eye */}
                                                <View style={{flex:1,backgroundColor:'white', flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center', }}>
                                                    <View style={{flex:0.45, alignContent:'flex-end', alignItems:'flex-end', marginEnd:10,}}>
                                                        <Eye
                                                            width={20*factor_hor}
                                                            height={20*factor_hor}
                                                            style={{
                                                                justifyContent:'center',
                                                                alignContent:'center',
                                                                flex: 1,
                                                            }}
                                                        />  
                                                    </View>
                                                    <View style={{flex:1,}}>
                                                        <Text style={{color:'#979797', marginEnd:10, textAlign:'left'}}>{this.state.comments[index][1]}</Text>                   
                                                    </View>
                                                </View>                      
                                                {/* trash */}
                                                { this.isMine() && (
                                                <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                                    <TouchableOpacity
                                                        style={{flex:0.5, marginBottom:2*factor_ver }}
                                                        onPress={() => {
                                                            Alert.alert(
                                                                'Are you sure you want to delete?',
                                                                '',
                                                                [
                                                                {text: 'Cancel',onPress: () => console.log('Cancel Pressed'),style:'cancel'},
                                                                {text: 'Yes', onPress: () => { this.deleteCommment(index)}},
                                                                ],
                                                                {cancelable: false},
                                                            );
                                                        }}>
                                                        <Icon 
                                                            type="ionicon" 
                                                            color="#9b9b9b" 
                                                            name="ios-trash"
                                                            size={24*factor_hor}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                )}
                                                <View style={{flex:0.5, justifyContent:'center', alignContent:'center',}}></View>
                                            </View>              
                                            <View style={{flex:0.1, backgroundColor:'white',borderBottomColor:'#ececec', borderRightColor:'#ececec', borderBottomRightRadius:50, borderBottomWidth:1, borderRightWidth:1, }}>
                                        
                                        </View>
                                        </View>                          
                                        </TouchableOpacity>
                                    </View>
                                    
                                    )}/>
                                )}                                 
                            </View>                        
                    </ScrollView> 
                </View>

            </LinearGradient>
            <View 
                style={{
                    position:'absolute',
                    zIndex:3,
                    bottom:20,
                    left:20, 
                    borderRadius:50,
                    width:50, 
                    height:50, 
                    justifyContent:'center', 
                    alignContent:'center', 
                    alignItems:'center',
                    backgroundColor:'white',
                    borderWidth:0.25,
                    borderColor:'#ececec',
                    shadowOffset: { width: 0, height: 0 },
                    shadowColor: 'grey',
                    shadowOpacity: 0.5,
                    shadowRadius: 10,
                    elevation: 3,
                }}>
                    <TouchableOpacity
                        underlayColor={'transparent'} 
                        style={{ width:50,}} 
                        onPress={() =>  this.props.navigation.navigate("ROOMS")}
                    >
                        <Icon 
                            size={15+15*factor_hor}
                            name="chevron-left"
                            color='#36454f'
                            type='entypo'
                        />
                    </TouchableOpacity> 
            </View>
        </View>
    )}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityIndicator: {
        flex: 1,
        alignContent:'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
