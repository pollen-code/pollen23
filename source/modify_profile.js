import React, {Component} from 'react';
import {StyleSheet, Text, Image, ActivityIndicator, View, 
        Modal, Alert, TouchableOpacity, RefreshControl, FlatList, 
        TouchableHighlight} from 'react-native';
import { Icon } from 'react-native-elements'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native'
import { AsyncStorage } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { Platform } from 'react-native'
import FastImage from 'react-native-fast-image'
import Block from  './svgs/block';
import GirlIcon from './svgs/girl_icon';
import Graduation from './svgs/graduation';
import BirthdayCake from './svgs/birthday_cake';
import BoyIcon from './svgs/boy_icon';
import Leaderboard from './svgs/leaderboard';
import FlagIcon from './svgs/flag_icon';
import CareerIcon from './svgs/career_icon';
import StarIcon from './svgs/star_icon';
import Eye from './svgs/eye';

anyone_can_sees = '#41f4cd'
nobody_sees = '#F44268'
months_ = ['none','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default class modify_profile extends React.Component {
    static navigationOptions = {header: null};
    constructor(props) {
        super(props);
        this.state = {
            
            // arguments for fetch profile and fetch posts
            username:'', // async 
            sort:'post',
            received_comments:[1,0],
            received_posts:[1,0],
            color_changed_white_post:[0,1],
            color_changed_grey_post:[0,1],
            color_changed_white_comment:[0,1],
            color_changed_grey_comment:[0,1],
            // profile variables
            user_bio:'Click to add a bio, click to grey to make private',
            gender: '', // async
            gender_color:'', // async
            score:'',  
            gender_backend:'',
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
            textInput:'',

            bday_color:'white',
            score_color:'white',
            education_color:'white',
            gender_color2:'white',
            country_color:'white',
            job_color:'white', 
            user_bio_color:'white',
            interest1_color:'white',
            interest2_color:'white',
            interest3_color:'white',
            interest4_color:'white',
            interest5_color:'white',
            interest6_color:'white',
            interest7_color:'white',
            interest8_color:'white',
            q1_color:'white',
            q2_color:'white',
            q3_color:'white',
            q4_color:'white',
            q5_color:'white',
            q6_color:'white',
            q7_color:'white',
            q8_color:'white',
            following_color:'white',
            followers_color:'white',
            
            // loading indicators
            animating:true, // for load indicator
            loading:false, // whether a fetch was called and has loaded
            act_load_color:'#FC6026', 
            out_of_posts:false, // whether no more posts from backend
            goingback_load:false, // for stopping repeated goback attempts
            // for posts  
            comments:[],
            clicked_image:0, // tracks key for images
            key_status:0, // secondary track for key
            isFetching:false, 
            show:8,
            items:[],

            gestureName:'none', // for swiping images


            // for feed buttons
            posts_weight:'600',
            votes_weight:'400',
            
            // modals
            visible:false, // modal left
            visible2:false, // modal right
            visible4:false, // for swipe
            
        }
    }
    async componentDidMount() {
        username = await AsyncStorage.getItem('user')
        url = `http://${serverLocation}:80/internal_view_profile?username=${username}`
        await fetch(url)
        .then((response) => response.json())
        .then((responseJson2) => {
            responseJson2 = responseJson2[0]
            mm = months_[responseJson2[4]]   
            this.setState({
                username:username,
                user_bio:responseJson2[16],
                education:responseJson2[0],
                job:responseJson2[2],
                birthday: ( 'Born on '+ mm + ' '+responseJson2[5]+', '+responseJson2[6] ),
                q1:responseJson2[8],
                q2:responseJson2[9],
                q3:responseJson2[10],
                q4:responseJson2[11],
                q5:responseJson2[12],
                q6:responseJson2[13],
                q7:responseJson2[14],
                q8:responseJson2[15],
                interest1:responseJson2[18],
                interest2:responseJson2[20],
                interest3:responseJson2[22],
                interest4:responseJson2[24],
                interest5:responseJson2[26],
                interest6:responseJson2[28],
                interest7:responseJson2[30],
                interest8:responseJson2[32],
                country:responseJson2[34],
                gender:responseJson2[36],
                number_following:responseJson2[38],
                number_followers:responseJson2[40],
                score: ("Score "+responseJson2[42]),
                education_color:responseJson2[1],
                job_color:responseJson2[3], 
                bday_color:responseJson2[7],
                interest1_color:responseJson2[19],
                interest2_color:responseJson2[21],
                interest3_color:responseJson2[23],
                interest4_color:responseJson2[25],
                interest5_color:responseJson2[27],
                interest6_color:responseJson2[29],
                interest7_color:responseJson2[31],
                interest8_color:responseJson2[33],
                country_color:responseJson2[35],
                gender_color2:responseJson2[37],
                following_color:responseJson2[39],
                followers_color:responseJson2[41],
                score_color:responseJson2[43],
                q1_color:responseJson2[44],
                q2_color:responseJson2[45],
                q3_color:responseJson2[46],
                q4_color:responseJson2[47],
                q5_color:responseJson2[48],
                q6_color:responseJson2[49],
                q7_color:responseJson2[50],
                q8_color:responseJson2[51],
                user_bio_color:responseJson2[17]
        })})
        .catch((error) => {
            console.log(error)
        });  
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
                    this.setState( {act_load_color:'#FC6026'}, function() {console.log(this.state.act_load_color)})
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
    async refresh_feed() {
        await this.setState({
            received_comments:[0,1],
            received_posts:[0,1],
            comments:[],
            show:8,
            animating:true,
            out_of_posts:false,
        },function(){console.log(
            this.state.out_of_posts,
            this.state.received_comments,
            this.state.received_posts,
            this.state.comments,
            this.state.show,
            this.state.animating,
        )})
        await this.fetch_posts();        
    }

    async goingback() {
        if(this.state.goingback_load == false) {
            await this.setState({goingback_load:true},function(){console.log(this.state.goingback_load)})
            url = `http://${serverLocation}:80/modify_profile?`
            await fetch(url, {
                method:'POST',
                headers:{    
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                body: 
                JSON.stringify({
                    q1:this.state.q1,
                    q2:this.state.q2,
                    q3:this.state.q3,
                    q4:this.state.q4,
                    q5:this.state.q5,
                    q6:this.state.q6,
                    q7:this.state.q7,
                    q8:this.state.q8,
                    interest1:this.state.interest1,
                    interest2:this.state.interest2,
                    interest3:this.state.interest3,
                    interest4:this.state.interest4,
                    interest5:this.state.interest5, 
                    interest6:this.state.interest6, 
                    interest7:this.state.interest7,  
                    interest8:this.state.interest8,
                    career:this.state.job,
                    education:this.state.education,
                    user_bio:this.state.user_bio,

                    privacy_user_bio:this.state.user_bio_color,
            
                    privacy_followers:this.state.followers_color,
                    privacy_following:this.state.following_color,
                    
                    privacy_birthday:this.state.bday_color,
                    privacy_score:this.state.score_color,
                    privacy_gender:this.state.gender_color2,
                    privacy_country:this.state.country_color,
                    privacy_education:this.state.education_color,
                    privacy_career:this.state.job_color,
                    privacy_interest1:this.state.interest1_color,
                    privacy_interest2:this.state.interest2_color,
                    privacy_interest3:this.state.interest3_color,
                    privacy_interest4:this.state.interest4_color,
                    privacy_interest5:this.state.interest5_color,
                    privacy_interest6:this.state.interest6_color,
                    privacy_interest7:this.state.interest7_color,
                    privacy_interest8:this.state.interest8_color,

                    privacy_q1:this.state.q1_color,
                    privacy_q2:this.state.q2_color,
                    privacy_q3:this.state.q3_color,
                    privacy_q4:this.state.q4_color,
                    privacy_q5:this.state.q5_color,
                    privacy_q6:this.state.q6_color,
                    privacy_q7:this.state.q7_color,
                    privacy_q8:this.state.q8_color,
        
                    color_changed_white_post:'['+this.state.color_changed_white_post+']',
                    color_changed_grey_post:'['+this.state.color_changed_grey_post+']',
                    color_changed_white_comment:'['+this.state.color_changed_white_comment+']',
                    color_changed_grey_comment:'['+this.state.color_changed_grey_comment+']',
                    userID:this.state.username
                })
            })
            .then((response) => response.json())
            .then((responseJson2) => {
                console.log(responseJson2, 'response')
            }) 
            .catch((error) => {
                console.log(error)
            });            
            this.setState({goingback_load:false},function(){console.log(this.state.goingback_load)})
            this.props.navigation.push('PROFILE')
        }
    }

    // profile
    q1() {
        if( typeof(this.state.q1) == 'undefined' || this.state.q1 == '""' || this.state.q1 == null ) {
            return 'This'
        }
        else {
            return this.state.q1.replace(/['"]/g, '')
        }
    }
    q2() {
        if( typeof(this.state.q2) == 'undefined' || this.state.q2 == '""' || this.state.q2 == null ) {
            return 'This'
        }
        else {
            return this.state.q2.replace(/['"]/g, '')
        }
    }
    q3() {
        if( typeof(this.state.q3) == 'undefined' || this.state.q3 == '""' || this.state.q3 == null ) {
            return 'This'
        }
        else {
            return this.state.q3.replace(/['"]/g, '')
        }
    }
    q4() {
        if( typeof(this.state.q4) == 'undefined' || this.state.q4 == '""' || this.state.q4 == null ) {
            return 'This'
        }
        else {
            return this.state.q4.replace(/['"]/g, '')
        }
    }
    q5() {
        if( typeof(this.state.q5) == 'undefined' || this.state.q5 == '""' || this.state.q5 == null ) {
            return 'This'
        }
        else {
            return this.state.q5.replace(/['"]/g, '')
        }
    }
    q6() {
        if( typeof(this.state.q6) == 'undefined' || this.state.q6 == '""' || this.state.q6 == null ) {
            return 'This'
        }
        else {
            return this.state.q6.replace(/['"]/g, '')
        }
    }
    q7() {
        if( typeof(this.state.q7) == 'undefined' || this.state.q7 == '""' || this.state.q7 == null ) {
            return 'This'
        }
        else {
            return this.state.q7.replace(/['"]/g, '')
        }
    }
    q8() {
        if( typeof(this.state.q8) == 'undefined' || this.state.q8 == '""' || this.state.q8 == null ) {
            return 'This'
        }
        else {
            return this.state.q8.replace(/['"]/g, '')
        }
    }    
    country() {
        if(this.state.score.length > 0) {
            if( typeof(this.state.country) == 'undefined' || this.state.country == '""' || this.state.country == null || this.state.country == 'null' ) {
                this.setState({country:'Prefer not to say'})
            }
            else {
                return this.state.country.replace(/['"]/g, '')
            }        
        }
    }      
    job() {
        if( typeof(this.state.job) == 'undefined' || this.state.job == '""' || this.state.job == null || this.state.job == 'null') {
            return 'None'
        }
        else {
            return this.state.job.replace(/['"]/g, '')
        }        
    }  
    education() {
        if( typeof(this.state.education) == 'undefined' || this.state.education == '""' || this.state.education == null || this.state.education == 'null') {
            return 'None'
        }
        else {
            return this.state.education.replace(/['"]/g, '')
        }        
    }  
    i1() {
        if( typeof(this.state.interest1) == 'undefined' || this.state.interest1 == '""' || this.state.interest1 == null ) {
            return 'Interest'
        }
        else {
            return this.state.interest1.replace(/['"]/g, '')
        }
    }
    i2() {
        if( typeof(this.state.interest2) == 'undefined' || this.state.interest2 == '""' || this.state.interest2 == null ) {
            return 'Interest'
        }
        else {
            return this.state.interest2.replace(/['"]/g, '')
        }
    }
    i3() {
        if( typeof(this.state.interest3) == 'undefined' || this.state.interest3 == '""' || this.state.interest3 == null ) {
            return 'Interest'
        }
        else {
            return this.state.interest3.replace(/['"]/g, '')
        }
    }
    i4() {
        if( typeof(this.state.interest4) == 'undefined' || this.state.interest4 == '""' || this.state.interest4 == null ) {
            return 'Interest'
        }
        else {
            return this.state.interest4.replace(/['"]/g, '')
        }
    }
    i5() {
        if( typeof(this.state.interest5) == 'undefined' || this.state.interest5 == '""' || this.state.interest5 == null ) {
            return 'Interest'
        }
        else {
            return this.state.interest5.replace(/['"]/g, '')
        }
    }
    i6() {
        if( typeof(this.state.interest6) == 'undefined' || this.state.interest6 == '""' || this.state.interest6 == null ) {
            return 'Interest'
        }
        else {
            return this.state.interest6.replace(/['"]/g, '')
        }
    }
    i7() {
        if( typeof(this.state.interest7) == 'undefined' || this.state.interest7 == '""' || this.state.interest7 == null ) {
            return 'Interest'
        }
        else {
            return this.state.interest7.replace(/['"]/g, '')
        }
    }

    async change_user_bio() {
        if(this.state.user_bio_color == 'white') {
            this.setState({
            bday_color:'#ececec',
            score_color:'#ececec',
            education_color:'#ececec',
            gender_color2:'#ececec',
            country_color:'#ececec',
            job_color:'#ececec', 
            user_bio_color:'#ececec',
            interest1_color:'#ececec',
            interest2_color:'#ececec',
            interest3_color:'#ececec',
            interest4_color:'#ececec',
            interest5_color:'#ececec',
            interest6_color:'#ececec',
            interest7_color:'#ececec',
            interest8_color:'#ececec',
            q1_color:'#ececec',
            q2_color:'#ececec',
            q3_color:'#ececec',
            q4_color:'#ececec',
            q5_color:'#ececec',
            q6_color:'#ececec',
            q7_color:'#ececec',
            q8_color:'#ececec',
            following_color:'#ececec',
            followers_color:'#ececec',
        })
        for(key in this.state.comments){
            this.state.comments[key][11] = '#ececec'
            this.setState({comments:this.state.comments})
        }
        await fetch(`http://${serverLocation}:80/change_posts?username=${this.state.username}&route=1`)
        }

        else if(this.state.user_bio_color == '#ececec') {
            this.setState({
                bday_color:'white',
                score_color:'white',
                education_color:'white',
                gender_color2:'white',
                country_color:'white',
                job_color:'white', 
                user_bio_color:'white',
                interest1_color:'white',
                interest2_color:'white',
                interest3_color:'white',
                interest4_color:'white',
                interest5_color:'white',
                interest6_color:'white',
                interest7_color:'white',
                interest8_color:'white',
                q1_color:'white',
                q2_color:'white',
                q3_color:'white',
                q4_color:'white',
                q5_color:'white',
                q6_color:'white',
                q7_color:'white',
                q8_color:'white',
                following_color:'white',
                followers_color:'white',
        })
        for(key in this.state.comments){
            if(this.state.comments[key][0] !== 'Anonymous') {
                this.state.comments[key][11] = 'white'
                this.setState({comments:this.state.comments})
            }
        }
        await fetch(`http://${serverLocation}:80/change_posts?username=${this.state.username}&route=2`)
        }        
    }
    change_bday() {
        if(this.state.bday_color == 'white') {
            this.setState({bday_color:'#ececec'})
        }
        else if(this.state.bday_color == '#ececec') {
            this.setState({bday_color:'white'})
        }
    }
    change_score() {
        if(this.state.score_color == 'white') {
            this.setState({score_color:'#ececec'})
        }
        else if(this.state.score_color == '#ececec') {
            this.setState({score_color:'white'})
        }
    }
    change_gender() {
        if(this.state.gender_color2 == 'white') {
            this.setState({gender_color2:'#ececec'})
        }
        else if(this.state.gender_color2 == '#ececec') {
            this.setState({gender_color2:'white'})
        }
    }
    change_country() {
        if(this.state.country_color == 'white') {
            this.setState({country_color:'#ececec'})
        }
        else if(this.state.country_color == '#ececec') {
            this.setState({country_color:'white'})
        }
    }
    change_job() {
        if(this.state.job_color == 'white') {
            this.setState({job_color:'#ececec'})
        }
        else if(this.state.job_color == '#ececec') {
            this.setState({job_color:'white'})
        }
    }
    change_education() {
        if(this.state.education_color == 'white') {
            this.setState({education_color:'#ececec'})
        }
        else if(this.state.education_color == '#ececec') {
            this.setState({education_color:'white'})
        }
    }
    change_q1() {
        if(this.state.q1_color == 'white') {
            this.setState({q1_color:'#ececec'})
        }
        else if(this.state.q1_color == '#ececec') {
            this.setState({q1_color:'white'})
        }
    }
    change_q2() {
        if(this.state.q2_color == 'white') {
            this.setState({q2_color:'#ececec'})
        }
        else if(this.state.q2_color == '#ececec') {
            this.setState({q2_color:'white'})
        }
    }
    change_q3() {
        if(this.state.q3_color == 'white') {
            this.setState({q3_color:'#ececec'})
        }
        else if(this.state.q3_color == '#ececec') {
            this.setState({q3_color:'white'})
        }
    }
    change_q4() {
        if(this.state.q4_color == 'white') {
            this.setState({q4_color:'#ececec'})
        }
        else if(this.state.q4_color == '#ececec') {
            this.setState({q4_color:'white'})
        }
    }
    change_q5() {
        if(this.state.q5_color == 'white') {
            this.setState({q5_color:'#ececec'})
        }
        else if(this.state.q5_color == '#ececec') {
            this.setState({q5_color:'white'})
        }
    }
    change_q6() {
        if(this.state.q6_color == 'white') {
            this.setState({q6_color:'#ececec'})
        }
        else if(this.state.q6_color == '#ececec') {
            this.setState({q6_color:'white'})
        }
    }
    change_q7() {
        if(this.state.q7_color == 'white') {
            this.setState({q7_color:'#ececec'})
        }
        else if(this.state.q7_color == '#ececec') {
            this.setState({q7_color:'white'})
        }
    }
    change_q8() {
        if(this.state.q8_color == 'white') {
            this.setState({q8_color:'#ececec'})
        }
        else if(this.state.q8_color == '#ececec') {
            this.setState({q8_color:'white'})
        }
    }
    change_interest1() {
        if(this.state.interest1_color == 'white') {
            this.setState({interest1_color:'#ececec'})
        }
        else if(this.state.interest1_color == '#ececec') {
            this.setState({interest1_color:'white'})
        }
    }
    change_interest2() {
        if(this.state.interest2_color == 'white') {
            this.setState({interest2_color:'#ececec'})
        }
        else if(this.state.interest2_color == '#ececec') {
            this.setState({interest2_color:'white'})
        }
    }
    change_interest3() {
        if(this.state.interest3_color == 'white') {
            this.setState({interest3_color:'#ececec'})
        }
        else if(this.state.interest3_color == '#ececec') {
            this.setState({interest3_color:'white'})
        }
    }
    change_interest4() {
        if(this.state.interest4_color == 'white') {
            this.setState({interest4_color:'#ececec'})
        }
        else if(this.state.interest4_color == '#ececec') {
            this.setState({interest4_color:'white'})
        }
    }
    change_interest5() {
        if(this.state.interest5_color == 'white') {
            this.setState({interest5_color:'#ececec'})
        }
        else if(this.state.interest5_color == '#ececec') {
            this.setState({interest5_color:'white'})
        }
    }
    change_interest6() {
        if(this.state.interest6_color == 'white') {
            this.setState({interest6_color:'#ececec'})
        }
        else if(this.state.interest6_color == '#ececec') {
            this.setState({interest6_color:'white'})
        }
    }
    change_interest7() {
        if(this.state.interest7_color == 'white') {
            this.setState({interest7_color:'#ececec'})
        }
        else if(this.state.interest7_color == '#ececec') {
            this.setState({interest7_color:'white'})
        }
    }
    change_post(index) {
        if( this.state.comments[index][11] == "white" || this.state.comments[index][11] == "white") {
            return 'white'
        }
        else if( this.state.comments[index][11] == "#ececec" || this.state.comments[index][11] == "#ececec") {
            return '#ececec'
        }
    }
    change_comments(index) {
        //changing to grey
        if( this.state.comments[index][11] == "white" || this.state.comments[index][11] == "white") {
            this.state.comments[index][11] = "#ececec" 
            this.setState({comments:this.state.comments})
            // POST
            if( this.state.comments[index][10] == 'POST' ) {
                // put clicked ID into grey post array
                this.state.color_changed_grey_post.push(this.state.comments[index][3])
                // take clicked ID out of white post array
                var indexx = this.state.color_changed_white_post.indexOf(this.state.comments[index][3]);
                if (indexx > -1) {
                    this.state.color_changed_white_post.splice(indexx, 1);
                }

            }
            // COMMENT
            else if ( this.state.comments[index][10] == 'COMMENT' ) {
                this.state.color_changed_grey_comment.push(this.state.comments[index][3])
                var indexx = this.state.color_changed_white_comment.indexOf(this.state.comments[index][3]);
                if (indexx > -1) {
                    this.state.color_changed_white_comment.splice(indexx, 1);
                }
            }
        }
        // changing to white
        else if( this.state.comments[index][11] == "#ececec" || this.state.comments[index][11] == "#ececec") {
            this.state.comments[index][11] = "white" 
            this.setState({comments:this.state.comments})
            // POST
            if( this.state.comments[index][10] == 'POST' ) {
                this.state.color_changed_white_post.push(this.state.comments[index][3])
                var indexx = this.state.color_changed_grey_post.indexOf(this.state.comments[index][3]);
                if (indexx > -1) {
                  this.state.color_changed_grey_post.splice(indexx, 1);
                }
            }
            // COMMENT
            else if ( this.state.comments[index][10] == 'COMMENT' ) {
                this.state.color_changed_white_comment.push(this.state.comments[index][3])
                var indexx = this.state.color_changed_grey_comment.indexOf(this.state.comments[index][3]);
                if (indexx > -1) {
                  this.state.color_changed_grey_comment.splice(indexx, 1);
                }
            }
        }      
    }
    change_followers() {
        if(this.state.followers_color == 'white') {
            this.setState({followers_color:'#ececec'})
        }
        else if(this.state.followers_color == '#ececec') {
            this.setState({followers_color:'white'})
        }
    }
    change_following() {
        if(this.state.following_color == 'white') {
            this.setState({following_color:'#ececec'})
        }
        else if(this.state.following_color == '#ececec') {
            this.setState({following_color:'white'})
        }
    } 
    which_gender() {
        if(this.state.gender == 'male')
            return true
        else if(this.state.gender == 'female') {
            return false
        }
    }   

    which_footer(){
        if(this.state.act_load_color !== 'white') {
            return <ActivityIndicator size='small' animating color ={this.state.act_load_color} style={{height:25,marginTop:10,justifyContent: 'center',alignItems: 'center',}}/>
        }
        else if( this.state.act_load_color == 'white') {
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
    show_date(index) {
        date1 = this.state.comments[index][5] 
        date2 = Math.floor(Date.now()/1000)
        date = date2 - date1
        // minutes
        if(date < 3600) {
            mins = Math.floor(date/60)
            return <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{mins}m</Text> 
        }
        // hours 
        else if(date >= 3600 && date < 86400) {
            hours = Math.floor(date/3600)
            return <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{hours}h</Text> 
        }
        // days
        else if(date >= 86400 && date < 604800) {
            days = Math.floor(date/86400)
            return <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{days}d</Text> 
        }
        // weeks
        else if(date > 604800 && date <= 2678400 ) {
            weeks = Math.floor(date/604800)
            return <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{weeks}w</Text> 
        }
        // months
        else if(date > 2678400 && date <= 32140800 ) {
            months = Math.floor(date/2678400)
            return <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{months}m</Text> 
        }
        else {
            years = Math.floor(date/32140800)
            return <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{years}y</Text> 
        }
    }

    render() {
    const config = {velocityThreshold: 0.2,directionalOffsetThreshold: 100};
    return (
    <View style={styles.container}>
        
        {/* non nav bar */}
        <LinearGradient colors={['#ffbf7e','#ff835e']} style={{flex:1, alignSelf:'stretch'}}>
            
            <View style={{flex:0.05, backgroundColor:'transparent', zIndex:0, flexDirection:'row', alignSelf:'stretch', flexDirection:'row'}}></View>                   
            <View style={{flex:0.935, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
                {/* name / plus / settings / bio */}
                <View style={{height:145*factor_hor, alignSelf:'stretch',}}>

                            <View style={{flex:0.4, flexDirection:'row', textAlign:'center', justifyContent:'center', alignContent:'center', }}>
                                <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                    <TouchableOpacity onPress={()=>{this.goingback()}} style={{marginStart:0}} >
                                        <Icon 
                                            name="chevron-left"
                                            color="black"
                                            type='entypo'
                                            size={25*factor_hor}
                                        />
                                    </TouchableOpacity>                                                     
                                </View>
                                <View style={{flex:6, }}></View>
                                <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>                                 
                                </View>
                            </View>
                            <View style={{flex:0.8, flexDirection:'row', justifyContent:'center', alignContent:'center', textAlign:'center', }}>
                                <View style={{flex:0.25,}}></View>
                                <View style={{flex:1,}}>

                                    <TouchableOpacity onPress={()=>{this.change_user_bio()}}>
                                        <Text style={{color:this.state.user_bio_color, textAlign:'center', fontWeight:'600', fontFamily:'Avenir Next', fontSize:factor_hor*25}}>{this.state.username}</Text>   
                                    </TouchableOpacity>
                                    <View style={{flex:1}}>
                                            <TextInput style={{ textAlign:'center', justifyContent:'center', alignContent:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', }}
                                                color={this.state.user_bio_color}
                                                ref={input => { this.textInput = input }}
                                                multiline={true}
                                                placeholder={this.state.user_bio}                                                             
                                                placeholderTextColor={this.state.user_bio_color}
                                                maxLength={40}
                                                onChangeText={(typedText) => {this.setState( {user_bio:typedText}, function () {console.log(this.state.user_bio)} )}}
                                            />                                   
                                    </View> 
                                </View>
                                <View style={{flex:0.25,}}></View>
                            </View>                        
                            <View style={{flex:(0.1*factor_hor*factor_hor), flexDirection:'row' }}>
                            </View>

                        </View>     
                {/* Buffer */}
                <View style={{height:0*factor_hor, alignSelf:'stretch'}}></View>
                {/* scrollview */}
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow:1}}>
                        {/* float a b o u t */}
                        <View style={{
                                    position:'absolute',
                                    top: Dimensions.get('window').width*0.02*factor_ver,
                                    left:Dimensions.get('window').width*0.37,
                                    alignSelf:'stretch',
                                    height:Dimensions.get('window').height*0.0375/factor_hor,
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
                        <View style={{height:Dimensions.get('window').height*0.03, flexDirection:'row', alignSelf:'stretch'}}></View>
                        {/* About */}
                        <View style={{height:Dimensions.get('window').height*0.3, backgroundColor:'transparent', marginLeft:15*factor_hor, marginRight:15*factor_hor, }}>
                            <ScrollView 
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{flexGrow:1}}>
                                {/* bday */}
                                <TouchableOpacity onPress={()=>{this.change_bday()}}>
                                <View style={{height:(Dimensions.get('window').height*0.3 - 25*factor_hor)/5, backgroundColor:this.state.bday_color, justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:5*factor_hor,}}>
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
                                </TouchableOpacity>
                                {/* leaderboard */}
                                <TouchableOpacity onPress={() =>{this.change_score()}}>
                                    <View style={{height:(Dimensions.get('window').height*0.3 - 25*factor_hor)/5, backgroundColor:this.state.score_color, justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:5*factor_hor,}}>
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
                                </TouchableOpacity>
                                {/* gender */}
                                <TouchableOpacity onPress={() =>{this.change_gender()}}>
                                <View style={{height:(Dimensions.get('window').height*0.3 - 25*factor_hor)/5, backgroundColor:this.state.gender_color2, justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:5*factor_hor,}}>
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
                                </TouchableOpacity>
                                {/* country */}
                                <TouchableOpacity onPress={() =>{this.change_country()}}>
                                <View style={{height:(Dimensions.get('window').height*0.3 - 25*factor_hor)/5, backgroundColor:this.state.country_color, justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:5*factor_hor,}}>
                                    
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
                                </TouchableOpacity>
                                {/* education */}
                                <TouchableOpacity onPress={() =>{this.change_education()}}>
                                <View style={{height:(Dimensions.get('window').height*0.3 - 25*factor_hor)/5, backgroundColor:this.state.education_color, justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:5*factor_hor,}}>
                                    
                                    <View style={{flex:1, }}></View>
                                    <Graduation
                                        width={25*factor_hor}
                                        height={25*factor_hor}
                                        style={{
                                            marginTop:0,
                                            alignContent:'center',
                                            justifyContent:'center',
                                        }}
                                    />
                                    <View style={{width:7.5*factor_hor, }}></View>                                       
                                    <TextInput style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}
                                        color='black'
                                        ref={input => { this.textInput = input }}
                                        multiline={false}
                                        placeholder={this.education()}                                                             
                                        placeholderTextColor='black'
                                        maxLength={30}
                                        onChangeText={(typedText) => {this.setState( {education:typedText}, function () {console.log(this.state.education)} )}}
                                    />                                      
                                    <View style={{width:7.5*factor_hor, }}></View>
                                    <View style={{width:20*factor_hor, }}></View>
                                    <View style={{flex:1, }}></View>  
                                </View>
                                </TouchableOpacity>
                               {/* job */}
                                <TouchableOpacity onPress={() =>{this.change_job()}}>
                                <View style={{height:(Dimensions.get('window').height*0.3 - 25*factor_hor)/5, backgroundColor:this.state.job_color, justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:5*factor_hor,}}>
                                    
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
                                    <TextInput style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}
                                        color='black'
                                        ref={input => { this.textInput = input }}
                                        multiline={false}
                                        placeholder={this.job()}                                                             
                                        placeholderTextColor='black'
                                        maxLength={30}
                                        onChangeText={(typedText) => {this.setState( {job:typedText}, function () {console.log(this.state.job)} )}}
                                    />                                      
                                    <View style={{width:7.5*factor_hor, }}></View>
                                    <View style={{width:20*factor_hor, }}></View>
                                    <View style={{flex:1, }}></View>  
                                </View>
                                </TouchableOpacity>
                                {/* interests */}
                                <TouchableOpacity onPress={() =>{this.change_interest1()}}>
                                <View style={{height:(Dimensions.get('window').height*0.3 - 25*factor_hor)/5,  backgroundColor:this.state.interest1_color, justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:5*factor_hor,}}>
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
                                    
                                    <TextInput style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}
                                        color='black'
                                        ref={input => { this.textInput = input }}
                                        multiline={false}
                                        placeholder={this.i1()}                                                            
                                        placeholderTextColor='black'
                                        maxLength={30}
                                        onChangeText={(typedText) => {this.setState( {interest1:typedText}, function () {console.log(this.state.interest1)} )}}
                                    />                                       
                                    <View style={{width:7.5*factor_hor, }}></View>
                                    <View style={{width:20*factor_hor, }}></View>
                                    <View style={{flex:1, }}></View>   
                                </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() =>{this.change_interest2()}}>
                                <View style={{height:(Dimensions.get('window').height*0.3 - 25*factor_hor)/5,  backgroundColor:this.state.interest2_color, justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:5*factor_hor,}}>
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
                                    
                                    <TextInput style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}
                                        color='black'
                                        ref={input => { this.textInput = input }}
                                        multiline={false}
                                        placeholder={this.i2()}                                                            
                                        placeholderTextColor='black'
                                        maxLength={30}
                                        onChangeText={(typedText) => {this.setState( {interest2:typedText}, function () {console.log(this.state.interest2)} )}}
                                    />                                       
                                    <View style={{width:7.5*factor_hor, }}></View>
                                    <View style={{width:20*factor_hor, }}></View>
                                    <View style={{flex:1, }}></View>   
                                </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() =>{this.change_interest3()}}>
                                <View style={{height:(Dimensions.get('window').height*0.3 - 25*factor_hor)/5,  backgroundColor:this.state.interest3_color, justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:5*factor_hor,}}>
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
                                    
                                    <TextInput style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}
                                        color='black'
                                        ref={input => { this.textInput = input }}
                                        multiline={false}
                                        placeholder={this.i3()}                                                            
                                        placeholderTextColor='black'
                                        maxLength={30}
                                        onChangeText={(typedText) => {this.setState( {interest3:typedText}, function () {console.log(this.state.interest3)} )}}
                                    />                                       
                                    <View style={{width:7.5*factor_hor, }}></View>
                                    <View style={{width:20*factor_hor, }}></View>
                                    <View style={{flex:1, }}></View>   
                                </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() =>{this.change_interest4()}}>
                                <View style={{height:(Dimensions.get('window').height*0.3 - 25*factor_hor)/5,  backgroundColor:this.state.interest4_color, justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:5*factor_hor,}}>
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
                                    
                                    <TextInput style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}
                                        color='black'
                                        ref={input => { this.textInput = input }}
                                        multiline={false}
                                        placeholder={this.i4()}                                                            
                                        placeholderTextColor='black'
                                        maxLength={30}
                                        onChangeText={(typedText) => {this.setState( {interest4:typedText}, function () {console.log(this.state.interest4)} )}}
                                    />                                       
                                    <View style={{width:7.5*factor_hor, }}></View>
                                    <View style={{width:20*factor_hor, }}></View>
                                    <View style={{flex:1, }}></View>   
                                </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() =>{this.change_interest5()}}>
                                <View style={{height:(Dimensions.get('window').height*0.3 - 25*factor_hor)/5,  backgroundColor:this.state.interest5_color, justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:5*factor_hor,}}>
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
                                    
                                    <TextInput style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}
                                        color='black'
                                        ref={input => { this.textInput = input }}
                                        multiline={false}
                                        placeholder={this.i5()}                                                            
                                        placeholderTextColor='black'
                                        maxLength={30}
                                        onChangeText={(typedText) => {this.setState( {interest5:typedText}, function () {console.log(this.state.interest5)})}}
                                    />                                       
                                    <View style={{width:7.5*factor_hor, }}></View>
                                    <View style={{width:20*factor_hor, }}></View>
                                    <View style={{flex:1, }}></View>   
                                </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() =>{this.change_interest6()}}>
                                <View style={{height:(Dimensions.get('window').height*0.3 - 25*factor_hor)/5,  backgroundColor:this.state.interest6_color, justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:5*factor_hor,}}>
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
                                    
                                    <TextInput style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}
                                        color='black'
                                        ref={input => { this.textInput = input }}
                                        multiline={false}
                                        placeholder={this.i6()}                                                            
                                        placeholderTextColor='black'
                                        maxLength={30}
                                        onChangeText={(typedText) => {this.setState( {interest6:typedText}, function () {console.log(this.state.interest6)} )}}
                                    />                                       
                                    <View style={{width:7.5*factor_hor, }}></View>
                                    <View style={{width:20*factor_hor, }}></View>
                                    <View style={{flex:1, }}></View>   
                                </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() =>{this.change_interest7()}}>
                                <View style={{height:(Dimensions.get('window').height*0.3 - 25*factor_hor)/5,  backgroundColor:this.state.interest7_color, justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:5*factor_hor,}}>
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
                                    
                                    <TextInput style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}
                                        color='black'
                                        ref={input => { this.textInput = input }}
                                        multiline={false}
                                        placeholder={this.i7()}                                                            
                                        placeholderTextColor='black'
                                        maxLength={30}
                                        onChangeText={(typedText) => {this.setState( {interest7:typedText}, function () {console.log(this.state.interest7)} )}}
                                    />                                       
                                    <View style={{width:7.5*factor_hor, }}></View>
                                    <View style={{width:20*factor_hor, }}></View>
                                    <View style={{flex:1, }}></View>   
                                </View>
                                </TouchableOpacity>

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
                                    
                                        <View style={{flex:1, alignSelf:'stretch', justifyContent:'center', alignContent:'center', marginRight:1.5, borderRadius:5, backgroundColor:this.state.q1_color}}>
                                        <TouchableOpacity onPress={() => {this.change_q1()}}>
                                        <Text style={{justifyContent:'center', textAlign:'center', alignContent:'center', fontFamily:'avenir next', marginTop:8, fontSize:16*factor_hor, marginBottom:3*factor_hor }}>favorite movie</Text>
                                        <TextInput style={{textAlign:'center', fontFamily:'avenir next', fontSize:14*factor_hor, color:'red', }}
                                            color='red'
                                            ref={input => { this.textInput = input }}
                                            multiline={false}
                                            placeholder={this.q1()}                                                           
                                            placeholderTextColor='red'
                                            maxLength={20}
                                            onChangeText={(typedText) => {this.setState( {q1:typedText}, function () {console.log(this.state.q1)} )}}
                                        /> 
                                        </TouchableOpacity>                                     
                                    </View>
                                    
                                        <View style={{flex:1,justifyContent:'center', alignContent:'center', alignSelf:'stretch', marginLeft:1.5, borderRadius:5, backgroundColor:this.state.q2_color}}>
                                        <TouchableOpacity onPress={() => {this.change_q2()}}>
                                        <Text style={{textAlign:'center',fontFamily:'avenir next', marginTop:8, fontSize:16*factor_hor, marginBottom:3*factor_hor  }}>my song rn</Text>
                                        <TextInput style={{textAlign:'center', fontFamily:'avenir next', fontSize:14*factor_hor, color:'red', }}
                                            color='red'
                                            ref={input => { this.textInput = input }}
                                            multiline={false}
                                            placeholder={this.q2()}                                                         
                                            placeholderTextColor='red'
                                            maxLength={20}
                                            onChangeText={(typedText) => {this.setState( {q2:typedText}, function () {console.log(this.state.q2)} )}}
                                        /> 
                                        </TouchableOpacity>
                                    </View>
                                    
                                </View>
                                <View style={{height:Dimensions.get('window').height*0.35/4, marginTop:3, justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:0*factor_hor,}}>
                                    
                                    <View style={{flex:1,justifyContent:'center', alignContent:'center', alignSelf:'stretch', marginRight:1.5, marginTop:3,borderRadius:5, backgroundColor:this.state.q3_color}}>
                                    <TouchableOpacity onPress={() => {this.change_q3()}}>
                                    <Text style={{textAlign:'center',fontFamily:'avenir next', marginTop:8, fontSize:16*factor_hor, marginBottom:3*factor_hor  }}>single vs taken</Text>
                                    <TextInput style={{textAlign:'center', fontFamily:'avenir next', fontSize:14*factor_hor, color:'red', }}
                                            color='red'
                                            ref={input => { this.textInput = input }}
                                            multiline={false}
                                            placeholder={this.q3()}                                                           
                                            placeholderTextColor='red'
                                            maxLength={20}
                                            onChangeText={(typedText) => {this.setState( {q3:typedText}, function () {console.log(this.state.q3)} )}}
                                        /> 
                                    </TouchableOpacity>
                                    </View>
                                    
                                    
                                    <View style={{flex:1,justifyContent:'center', alignContent:'center', alignSelf:'stretch', marginLeft:1.5, marginTop:3,borderRadius:5, backgroundColor:this.state.q4_color}}>
                                    <TouchableOpacity onPress={() => {this.change_q4()}}>
                                    <Text style={{textAlign:'center',fontFamily:'avenir next', marginTop:8, fontSize:16*factor_hor, marginBottom:3*factor_hor  }}>best book ever</Text>
                                        <TextInput style={{textAlign:'center', fontFamily:'avenir next', fontSize:14*factor_hor, color:'red', }}
                                            color='red'
                                            ref={input => { this.textInput = input }}
                                            multiline={false}
                                            placeholder={this.q4()}                                                         
                                            placeholderTextColor='red'
                                            maxLength={20}
                                            onChangeText={(typedText) => {this.setState( {q4:typedText}, function () {console.log(this.state.q4)} )}}
                                        /> 
                                    </TouchableOpacity>
                                    </View>
                                    
                                </View>
                                <View style={{height:Dimensions.get('window').height*0.35/4, marginTop:3, justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:0*factor_hor,}}>
                                    
                                    <View style={{flex:1,justifyContent:'center', alignContent:'center', alignSelf:'stretch', marginRight:1.5, marginTop:3,borderRadius:5, backgroundColor:this.state.q5_color}}>
                                    <TouchableOpacity onPress={() => {this.change_q5()}}>
                                    <Text style={{textAlign:'center',fontFamily:'avenir next', marginTop:8, fontSize:16*factor_hor, marginBottom:3*factor_hor  }}>my type of pet</Text>
                                    <TextInput style={{textAlign:'center', fontFamily:'avenir next', fontSize:14*factor_hor, color:'red', }}
                                            color='red'
                                            ref={input => { this.textInput = input }}
                                            multiline={false}
                                            placeholder={this.q5()}                                                         
                                            placeholderTextColor='red'
                                            maxLength={20}
                                            onChangeText={(typedText) => {this.setState( {q5:typedText}, function () {console.log(this.state.q5)} )}}
                                        />    
                                    </TouchableOpacity>                                 
                                    </View>
                                    
                                    
                                    <View style={{flex:1,justifyContent:'center', alignContent:'center', alignSelf:'stretch', marginLeft:1.5, marginTop:3,borderRadius:5, backgroundColor:this.state.q6_color}}>
                                    <TouchableOpacity onPress={() => {this.change_q6()}}>
                                    <Text style={{textAlign:'center',fontFamily:'avenir next', marginTop:8, fontSize:16*factor_hor, marginBottom:3*factor_hor  }}>dream travel spot</Text>
                                        <TextInput style={{textAlign:'center', fontFamily:'avenir next', fontSize:14*factor_hor, color:'red', }}
                                            color='red'
                                            ref={input => { this.textInput = input }}
                                            multiline={false}
                                            placeholder={this.q6()}                                                         
                                            placeholderTextColor='red'
                                            maxLength={20}
                                            onChangeText={(typedText) => {this.setState( {q6:typedText}, function () {console.log(this.state.q6)} )}}
                                        /> 
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                
                                <View style={{height:Dimensions.get('window').height*0.35/4, marginTop:3, justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:0*factor_hor,}}>
                                    
                                    <View style={{flex:1,justifyContent:'center', alignContent:'center', alignSelf:'stretch', marginRight:1.5, marginTop:3,borderRadius:5, backgroundColor:this.state.q7_color}}>
                                    <TouchableOpacity onPress={()=> {this.change_q7()}}>
                                    <Text style={{textAlign:'center',fontFamily:'avenir next', marginTop:8, fontSize:16*factor_hor, marginBottom:3*factor_hor  }}>dream job</Text>

                                        <TextInput style={{textAlign:'center', fontFamily:'avenir next', fontSize:14*factor_hor, color:'red', }}
                                            color='red'
                                            ref={input => { this.textInput = input }}
                                            multiline={false}
                                            placeholder={this.q7()}                                                         
                                            placeholderTextColor='red'
                                            maxLength={20}
                                            onChangeText={(typedText) => {this.setState( {q7:typedText}, function () {console.log(this.state.q7)} )}}
                                        /> 
                                    </TouchableOpacity>
                                    </View>
                                    
                                    
                                    <View style={{flex:1,justifyContent:'center', alignContent:'center', alignSelf:'stretch', marginLeft:1.5,marginTop:3, borderRadius:5, backgroundColor:this.state.q8_color}}>
                                    <TouchableOpacity onPress={() => {this.change_q8()}}>
                                    <Text style={{textAlign:'center',fontFamily:'avenir next', marginTop:8, fontSize:16*factor_hor, marginBottom:3*factor_hor  }}>can't live without</Text>
                                    <TextInput style={{textAlign:'center', fontFamily:'avenir next', fontSize:14*factor_hor, color:'red', }}
                                            color='red'
                                            ref={input => { this.textInput = input }}
                                            multiline={false}
                                            placeholder={this.q8()}                                                         
                                            placeholderTextColor='red'
                                            maxLength={20}
                                            onChangeText={(typedText) => {this.setState( {q8:typedText}, function () {console.log(this.state.q8)} )}}
                                        /> 
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            
                            </ScrollView>    
                        </View>
                        {/* Buffer */}
                        <View style={{marginTop:Dimensions.get('window').height*0.075}}></View>
                        {/* Posts */}
                        <View style={{height: (Dimensions.get('window').height*0.935 - 180*factor_hor - this.check_height() ), alignSelf:'stretch', }}>
                            {/* float p o s t s | v o t e s */}
                            <View style={{
                                        position:'absolute',
                                        top:-15,
                                        left:Dimensions.get('window').width*0.355,
                                        alignSelf:'stretch',
                                        height:30,
                                        width:Dimensions.get('window').width*0.285,
                                        borderRadius:50,
                                        backgroundColor:'white', 
                                        elevation:1,
                                        borderWidth:0.25,
                                        borderColor:'#FFA66C',
                                        zIndex:1,
                                        justifyContent:'center',
                                        alignContent:'center',
                                        flexDirection:'row',
                                        }}>

                                        <View style={{flex:1, borderRadius:50, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
                                            <Text style={{textAlign:'center', fontWeight:'300', justifyContent:'center', alignContent:'center', alignItems:'center', fontFamily:'Avenir next', fontSize:18*factor_hor, color:'#FFA66C'}}>p o s t s</Text>
                                        </View>
                            </View>   
                            {this.state.animating && ( 
                            <ActivityIndicator size='large' animating={this.state.animating}
                                color = "white"
                                style={{
                                    flex:1,
                                    marginTop:10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                            }}/> 
                            )}
                            { !this.state.animating && (
                            <FlatList 
                                data={this.state.comments.slice(0,this.state.show)}
                                extraData={this.state}
                                showsVerticalScrollIndicator={false}
                                // refresh
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isFetching}
                                        onRefresh={() => { this.setState({isFetching:true}, function() {console.log(this.state.isFetching)}), this.refresh_feed()} }
                                        title="" tintColor="transparent" titleColor="#ececec"
                                    />}

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
                                    <TouchableOpacity onPress={() => {this.change_comments(index)}}>
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
                                        backgroundColor:this.change_post(index),
                                        alignSelf:'stretch'
                                        }}>

                                    <View style={{height:15,}}></View>
                                    <View style={{height:25*factor_hor, flexDirection:'row',  backgroundColor:this.change_post(index) }}>
                                        <View style={{width:12*factor_hor, }}></View>
                                        <View style={{flex:1, justifyContent:'center', alignContent:'center',backgroundColor:this.change_post(index)}}>
                                            <Text style={{textAlign:'left', marginStart:5, color:'#9B9B9B', fontSize:18*factor_hor,fontFamily:'Avenir next',}}>{this.state.comments[index][0]}</Text>
                                        </View>
                                        <View style={{flex:0.4,backgroundColor:this.change_post(index) }}></View>
                                        <View hitSlop={{top: 10, bottom: 10, left: 20, right: 20}} style={{flex:0.4,backgroundColor:this.change_post(index) }}>                       
                                        </View>                          
                                        <View style={{width:15*factor_hor,backgroundColor:this.change_post(index)  }}></View> 
                                    </View>
                                    <View style={{height:4*factor_hor}}></View>
                                    <View style={{marginTop:5, marginBottom:0, backgroundColor:this.change_post(index), alignContent:'center', justifyContent:'center'}}>
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
                                                style={{ flex:1.1,backgroundColor:this.change_post(index), marginLeft:-1, width:Dimensions.get('window').width, height:Dimensions.get('window').width, }}
                                        /> )}
                                    </View>                    
                                    </View>
                                    
                                    <View style={{height:40*factor_hor, justifyContent:'center', alignContent:'center', flexDirection:'row', }}>
                                        <View style={{flex:0.3, borderLeftColor:'#ececec',backgroundColor:this.change_post(index),borderBottomColor:'#ececec', borderBottomLeftRadius:50, borderBottomWidth:1, borderLeftWidth:1,}}>
                                        </View>
                                        <View style={{width:10,backgroundColor:this.change_post(index) , borderBottomColor:'#ececec',borderBottomWidth:0.25,}}>
                                            <View style={{height:20, marginTop:10*factor_ver, width:20, justifyContent:'center', alignContent:'center',
                                                    alignItems:'center',borderRadius:10}}>
                                            </View>
                                        </View>
                                        <View style={{flex:3,backgroundColor:this.change_post(index) , paddingLeft:5, flexDirection:'row', justifyContent:'space-around', alignContent:'space-around',borderBottomColor:'#ececec',borderBottomWidth:0.25, }}>
                                            <View style={{flex:1.15, justifyContent:'center', alignContent:'center',}}>
                                                {this.show_date(index)}
                                            </View>
                                            <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                                <Text style={{textAlign:'center', marginEnd:15, fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes_comments(index)}}>{this.state.comments[index][6] - this.state.comments[index][7]}</Text>
                                            </View>
                                            <View style={{flex:1,backgroundColor:this.change_post(index), flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center', }}>
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
                                            <View style={{flex:0.5, justifyContent:'center', alignContent:'center',}}>
                                    
                                            </View>
                                        </View>              
                                        <View style={{flex:0.3, backgroundColor:this.change_post(index),borderBottomColor:'#ececec', borderRightColor:'#ececec', borderBottomRightRadius:50, borderBottomWidth:1, borderRightWidth:1, }}>
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

  activityIndicator: {
    flex: 1,
    alignContent:'center',
    justifyContent: 'center',
    alignItems: 'center',
    },

  scrollbuff: {
    backgroundColor:'white', 
    borderBottomRightRadius:10, 
    borderBottomLeftRadius:10,
  },

});
