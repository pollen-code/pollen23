import React, {Component} from 'react';
import {StyleSheet, Text, ActivityIndicator, Platform, View, 
        Modal, Alert, TouchableOpacity, RefreshControl, 
        FlatList, TouchableHighlight} from 'react-native';
import { Icon, } from 'react-native-elements'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native'
import { AsyncStorage, Share } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image'
import Block from  './svgs/block';
import SendMessage from './svgs/send_message';
import GirlIcon from './svgs/girl_icon';
import Graduation from './svgs/graduation';
import Following from './svgs/following';
import BirthdayCake from './svgs/birthday_cake';
import BoyIcon from './svgs/boy_icon';
import Leaderboard from './svgs/leaderboard';
import FlagIcon from './svgs/flag_icon';
import CareerIcon from './svgs/career_icon';
import StarIcon from './svgs/star_icon';
import Eye from './svgs/eye';

months_ = ['none','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default class external_view_profile extends React.Component {
    static navigationOptions = {header: null};
    constructor(props) {
        super(props);
        this.state = {
            
            // arguments for fetch profile and fetch posts
            username:'', // async 
            received_comments:[1,0],
            received_posts:[1,0],

            // profile variables
            user_bio:'',
            gender: '', 
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

            blocked:0, 
            following:0, 
            isPrivate:false, 

            // loading indicators
            animating:true, // for load indicator
            loading:false, // whether a fetch was called and has loaded
            act_load_color:'#FC6026', 
            out_of_posts:false, // whether no more posts from backend

            // for posts  
            comments:[],
            clicked_image:0, // tracks key for images
            key_status:0, // secondary track for key
            isFetching:false, 
            show:8,
            posts_pressed:false,
            
            items:[],
            profileID:'',
            gestureName:'none', // for swiping images


            // for feed buttons
            posts_weight:'600',
            votes_weight:'400',
            
            // modals
            visible:false, // modal left
            visible2:false, // modal right
            visible3:false, // modal three dots
            visible4:false, // for swipe
        }
    }

    async componentDidMount() {
        try {
            username = await AsyncStorage.getItem('user')
            profileID = this.props.navigation.getParam('profileID')

            // get profile
            url = `http://${serverLocation}:80/external_view_profile?username=${username}&profileID=${profileID}`
            console.log(url)
            await fetch(url)
            .then((response) => response.json())
            .then((responseJson2) => {
                responseJson2 = responseJson2[0]   
                mm = months_[responseJson2[4]]
                isPrivate = false

                if(responseJson2[39] == 'white') {
                    following_color_ = responseJson2[38] + ' followers'
                }            
                else if (responseJson2[39] == '#ececec') {
                    following_color_ = '[private]'
                }
                if(responseJson2[41] == 'white') {
                    followers_color_ = responseJson2[40] + ' following'
                }            
                else if (responseJson2[41] == '#ececec') {
                    followers_color_ = '[private]'
                }
                if(responseJson2[17] !== '#ececec') {
                    isPrivate = true
                }
                
                this.setState({
                    username:username,
                    profileID:profileID,
                    isPrivate:isPrivate,
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
                    interest4:responseJson2[23],
                    interest5:responseJson2[26],
                    interest6:responseJson2[28],
                    interest7:responseJson2[30],
                    interest8:responseJson2[32],
                    country:responseJson2[34],
                    gender:responseJson2[36],
                    number_following:following_color_,
                    number_followers:followers_color_,
                    score: ("Score "+responseJson2[42]),

                    education_color:responseJson2[1],
                    job_color:responseJson2[3], 
                    bday_color:responseJson2[7],
                    user_bio_color:responseJson2[17],
                    interest1_color:responseJson2[19],
                    interest2_color:responseJson2[21],
                    interest3_color:responseJson2[23],
                    interest4_color:responseJson2[25],
                    interest5_color:responseJson2[27],
                    interest6_color:responseJson2[29],
                    interest7_color:responseJson2[31],
                    interest8_color:responseJson2[33],
                    
                    q1_color:responseJson2[46],
                    q2_color:responseJson2[47],
                    q3_color:responseJson2[48],
                    q4_color:responseJson2[49],
                    q5_color:responseJson2[50],
                    q6_color:responseJson2[51],
                    q7_color:responseJson2[52],
                    q8_color:responseJson2[53],

                    country_color:responseJson2[35],
                    gender_color2:responseJson2[37],
                    following_color:responseJson2[39],
                    followers_color:responseJson2[41],
                    score_color:responseJson2[43],
                    following:responseJson2[44],
                    blocked:responseJson2[45],
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
        catch (error) {
            console.log(error)
        }  
        
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
        url = `http://${serverLocation}:80/posts_profile?`
        await fetch(url, {
            method:'POST',
            headers:{    
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
            body: 
            JSON.stringify({
                sort: 'external',
                username: this.state.profileID,
                received_comments: '['+(this.state.received_comments).toString()+']',
                received_posts: '['+(this.state.received_posts).toString()+']'})
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

    // profile
    birthday() {
        if(this.state.bday_color == 'white') {
            return this.state.birthday
        }
        else {
            return '[private]'
        }
    } 
    user_bio() {
        if(this.state.user_bio_color == 'white') {
            return this.state.user_bio
        }
        else {
            return '[private]'
        }
    } 
    username() {
        if(this.state.user_bio_color == 'white') {
            return this.state.profileID
        }
        else {
            return '[private]'
        }
    } 
    score() {
        if(this.state.score_color == 'white') {
            return this.state.score
        }
        else {
            return '[private]'
        }
    }   
    gender() {
        if(this.state.gender_color2 == 'white') {
            return this.state.gender.slice(0,1).toUpperCase() + this.state.gender.slice(1)
        }
        else {
            return '[private]'
        }
    }  
    country() {
        if(this.state.country_color == 'white') {
            if(this.state.country.length > 0) {
                if( typeof(this.state.country) == 'undefined' || this.state.country == '""' || this.state.country == null || this.state.country == 'null' ) {
                    this.setState({country:'Prefer not to say'})
                }
                else {
                    return this.state.country.replace(/['"]+/g, '')
                }        
            }
        }
        else {
            return '[private]'
        }
    }      
    job() {
        if(this.state.job_color== 'white') {
            if( typeof(this.state.job) == 'undefined' || this.state.job == '""' || this.state.job == null || this.state.job == 'null') {
                return 'None'
            }
            else {
                return this.state.job
            }        
        }
        else {
            return '[private]'
        }
    }  
    education() {
        if(this.state.education_color == 'white') {
            if( typeof(this.state.education) == 'undefined' || this.state.education == '""' || this.state.education == null || this.state.education == 'null') {
                return 'None'
            }
            else {
                return this.state.education
            }        
        }
        else {
            return '[private]'
        }   
    }
    i1() {
        if(this.state.interest1_color == 'white') {
            if( typeof(this.state.interest1) == 'undefined' || this.state.interest1 == '""' || this.state.interest1 == null ) {
                return 'Interest'
            }
            else {
                return this.state.interest1.replace(/['"]+/g, '')
            }
        }
        else {
            return '[private]'
        }
    }
    i2() {
        if(this.state.interest2_color == 'white') {
            if( typeof(this.state.interest2) == 'undefined' || this.state.interest2 == '""' || this.state.interest2 == null ) {
                return 'Interest'
            }
            else {
                return this.state.interest2.replace(/['"]+/g, '')
            }
        }
        else {
            return '[private]'
        }
    }
    i3() {
        if(this.state.interest3_color == 'white') {
            if( typeof(this.state.interest3) == 'undefined' || this.state.interest3 == '""' || this.state.interest3 == null ) {
                return 'Interest'
            }
            else {
                return this.state.interest3.replace(/['"]+/g, '')
            }
        }
        else {
            return '[private]'
        }
    }
    i4() {
        if(this.state.interest4_color == 'white') {
            if( typeof(this.state.interest4) == 'undefined' || this.state.interest4 == '""' || this.state.interest4 == null ) {
                return 'Interest'
            }
            else {
                return this.state.interest4.replace(/['"]+/g, '')
            }
        }
        else {
            return '[private]'
        }
    }
    i5() {
        if(this.state.interest5_color == 'white') {
            if( typeof(this.state.interest5) == 'undefined' || this.state.interest5 == '""' || this.state.interest5 == null ) {
                return 'Interest'
            }
            else {
                return this.state.interest5.replace(/['"]+/g, '')
            }
        }
        else {
            return '[private]'
        }
    }
    i6() {
        if(this.state.interest6_color == 'white') {
            if( typeof(this.state.interest6) == 'undefined' || this.state.interest6 == '""' || this.state.interest6 == null ) {
                return 'Interest'
            }
            else {
                return this.state.interest6.replace(/['"]+/g, '')
            }
        }
        else {
            return '[private]'
        }
    }
    i7() {
        if(this.state.interest7_color == 'white') {
            if( typeof(this.state.interest7) == 'undefined' || this.state.interest7 == '""' || this.state.interest7 == null ) {
                return 'Interest'
            }
            else {
                return this.state.interest7.replace(/['"]+/g, '')
            }
        }
        else {
            return '[private]'
        }
    }

    q1() {
        if(this.state.q1_color == 'white') {
            if( typeof(this.state.q1) == 'undefined' || this.state.q1 == '""' || this.state.q1 == null ) {
                return 'This'
            }
            else {
                return this.state.q1.replace(/['"]+/g, '')
            }
        }
        else {
            return '[private]'
        }
    }
    q2() {
        if(this.state.q2_color == 'white') {
            if( typeof(this.state.q2) == 'undefined' || this.state.q2 == '""' || this.state.q2 == null ) {
                return 'This'
            }
            else {
                return this.state.q2.replace(/['"]+/g, '')
            }
        }
        else {
            return '[private]'
        }
    }
    q3() {
        if(this.state.q3_color == 'white') {
            if( typeof(this.state.q3) == 'undefined' || this.state.q3 == '""' || this.state.q3 == null ) {
                return 'This'
            }
            else {
                return this.state.q3.replace(/['"]+/g, '')
            }
        }
        else {
            return '[private]'
        }
    }
    q4() {
        if(this.state.q4_color == 'white') {
            if( typeof(this.state.q4) == 'undefined' || this.state.q4 == '""' || this.state.q4 == null ) {
                return 'This'
            }
            else {
                return this.state.q4.replace(/['"]+/g, '')
            }
        }
        else {
            return '[private]'
        }
    }
    q5() {
        if(this.state.q5_color == 'white') {
            if( typeof(this.state.q5) == 'undefined' || this.state.q5 == '""' || this.state.q5 == null ) {
                return 'This'
            }
            else {
                return this.state.q5.replace(/['"]+/g, '')
            }
        }
        else {
            return '[private]'
        }
    }
    q6() {
        if(this.state.q6_color == 'white') {
            if( typeof(this.state.q6) == 'undefined' || this.state.q6 == '""' || this.state.q6 == null ) {
                return 'This'
            }
            else {
                return this.state.q6.replace(/['"]+/g, '')
            }
        }
        else {
            return '[private]'
        }
    }
    q7() {
        if(this.state.q7_color == 'white') {
            if( typeof(this.state.q7) == 'undefined' || this.state.q7 == '""' || this.state.q7 == null ) {
                return 'This'
            }
            else {
                return this.state.q7.replace(/['"]+/g, '')
            }
        }
        else {
            return '[private]'
        }
    }
    q8() {
        if(this.state.q8_color == 'white') {
            if( typeof(this.state.q8) == 'undefined' || this.state.q8 == '""' || this.state.q8 == null ) {
                return 'This'
            }
            else {
                return this.state.q8.replace(/['"]+/g, '')
            }
        }
        else {
            return '[private]'
        }
    }

    following_private() {
        // if not private
        if(this.state.number_following !== '[private]') {
            return true
        }
        else {
            return false
        }
    }
    followers_private() {
        // if not private
        if(this.state.number_followers !== '[private]') {
            return true
        }
        else {
            return false
        }
    }

    // posts
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
    which_gender() {
        if(this.state.gender == 'male')
            return true
        else if(this.state.gender == 'female') {
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
    show_block() {
        if(this.state.profileID == this.state.username){
            return "Cant block"
        }
        if(this.state.blocked == 1) {
            return 'Unblock'
        }
        else if(this.state.blocked == 0) {
            return 'Block'
        }      
    }
    async block_unblock() {
        console.log(this.state.blocked)
        if( ( this.state.blocked == 0) && ( this.state.profileID !== this.state.username)  ) {
            try {
                await fetch(`http://${serverLocation}:80/block_poster?route=1&userID=${this.state.username}&blockedID=${this.state.profileID}`)
                this.setState({blocked:1},function(){console.log(this.state.blocked)})
                this.setState({visible3:false}, function() {console.log(this.state.visible3)})
            }
            catch {
                return null
            }
        }
        else if( (this.state.blocked == 1) && (this.state.profileID !== this.state.username)  ) {
            try {
                await fetch(`http://${serverLocation}:80/block_poster?route=2&userID=${this.state.username}&blockedID=${this.state.profileID}`)
                this.setState({blocked:0},function(){console.log(this.state.blocked)})
                this.setState({visible3:false}, function() {console.log(this.state.visible3)})
                }   
            catch {
                return null
            }
        }
    }
    show_follow() {
        if(this.state.following == 1) {
            return 'Following'
        }
        else if(this.state.following == 0) {
            return 'Follow'
        }
    }
    async follow() {
        if(this.state.following == 0) {
            url = `http://${serverLocation}:80/follow?route=1&userID=${this.state.username}&following=${this.state.profileID}`
            await fetch(url)
            this.setState({following:1},function(){console.log(this.state.following)})
        }
        else if (this.state.following == 1) {
            url = `http://${serverLocation}:80/follow?route=2&userID=${this.state.username}&following=${this.state.profileID}`
            await fetch(url)
            this.setState({following:0},function(){console.log(this.state.following)})
                    
        }
        this.setState({visible3:false}),function(){console.log(this.state.visible3)}
    }

    which_size(){
        if(this.state.posts_pressed == false) {
            return (Dimensions.get('window').height*0.935 - 180*factor_hor)
        }
        else {
            return (Dimensions.get('window').height*0.935)
        }
    }
    async send_message(key) {
        if(this.state.can_send == 'success') {
            await this.props.navigation.navigate('NEW_MESSAGE', { data: {name1:this.state.profileID, name2:this.state.profileID, postID:'', from_type:'' }})
            await this.setState({visible3:false}, function() {console.log(this.state.visible3)})
        }
        else {            
                return Alert.alert( this.state.profileID+ this.state.can_send,'',{cancelable: false} );
        }
    }
    async check_send() {
        
        is_anon = false
        poster = this.state.profileID
        
        url = `http://${serverLocation}:80/if_open?username=${this.state.username}&poster=${poster}&anon=${is_anon}&postID=""&from_type=""`
        await fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({can_send:responseJson})
        })
        .done()
    }
    scroll_to_bottom() {
        this.refs.flatList.scrollToOffset({x: 0, y: 0, animated: true})
    }
    what_padding() {
        if(this.state.posts_pressed == true) {
            return 10*factor_ver
        }
        else {
            return 0
        }
    }
    show_date(index) {
        date1 = this.state.comments[index][5] 
        date2 = Math.floor(Date.now()/1000)
        date = date2 - date1
        console.log(date)
        // minutes
        if(date < 3600) {
            mins = Math.floor(date/60)
            console.log(1)
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
            console.log(3)
            return <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{days}d</Text> 
        }
        // weeks
        else if(date > 604800 && date <= 2678400 ) {
            weeks = Math.floor(date/604800)
            console.log(4)
            return <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{weeks}w</Text> 
        }
        // months
        else if(date > 2678400 && date <= 32140800 ) {
            months = Math.floor(date/2678400)
            console.log(5)
            return <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{months}m</Text> 
        }
        else {
            years = Math.floor(date/32140800)
            console.log(6)
            return <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{years}y</Text> 
        }
        this.forceUpdate()
    }


    render() {
    const config = {
            velocityThreshold: 0.2,
            directionalOffsetThreshold: 100
        };
    return (

    <View style={styles.container}>
        
        {/* non nav bar */}
        <LinearGradient colors={['#ffbf7e','#ff835e']} style={{flex:1, alignSelf:'stretch'}}>
            <View style={{flex:0.05, zIndex:0, flexDirection:'row', alignSelf:'stretch', flexDirection:'row'}}></View>                   
            <View style={{flex:0.95, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
               {/* plus symbol and settings */}
               {( !this.state.posts_pressed  && 
                <View>
                {/* name / plus / settings / bio */}
                <View style={{height:130*factor_hor, alignSelf:'stretch',}}>
                    {/* three dots */}
                    {this.state.isPrivate && (
                    <View style={{position:'absolute', justifyContent:'center', alignItems:'center', alignContent:'center', opacity:0.9, width:50, zIndex:2, top:10*factor_hor, right:15*factor_hor}}>
                        <TouchableOpacity onPress={() => {this.check_send(), this.setState({visible3:true}),function(){console.log(this.state.visible3)}}}>
                            <Icon
                                style={{alignContent:'center', justifyContent:'center', alignItems:'center'}}
                                name='dots-three-horizontal'
                                color='black'
                                type='entypo'
                                size={20*factor_hor}
                            />    
                        </TouchableOpacity>
                    </View>
                    )}
                    {/* back */}
                    <View style={{position:'absolute', width:40*factor_hor, zIndex:2, top:10*factor_hor, left:12.5*factor_hor, justifyContent:'center', alignContent:'center'}}>
                            <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={{marginStart:0}} >
                                <Icon 
                                    name="chevron-left"
                                    color="black"
                                    type='entypo'
                                    size={25*factor_hor}
                                />
                            </TouchableOpacity>                                                     
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.visible3}
                    >   
                        <View style={{height:Dimensions.get('window').height, width:Dimensions.get('window').width, justifyContent:'flex-end', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.8)',}}>
                            <View style={{height:80*factor_hor*4, flexDirection:'row', alignSelf:'stretch'}}>
                                    <View style={{flex:1, }}></View>
                                    <View style={{width:80*factor_hor, }}>
                                        {/* buffer */}
                                        <View style={{flex:1.3, }}></View>
                                        {/* message */}
                                        <View style={{height:90*factor_hor,}}>
                                            <TouchableHighlight onPress={()=>{this.send_message()}} underlayColor={'transparent'}>
                                                <View style={{height:80*factor_hor, width:80*factor_hor, alignItems:'center', marginBottom:15*factor_hor, borderRadius:40*factor_hor, backgroundColor:'white'}}>
                                                    <SendMessage
                                                        width={55*factor_hor}
                                                        height={55*factor_hor}
                                                        style={{
                                                            justifyContent:'center',
                                                            alignItems:'center',
                                                            alignContent:'center',
                                                            marginTop:12*factor_ver,
                                                            width: 55*factor_hor,
                                                            height: 55*factor_hor,
                                                        }}
                                                    />                   
                                                </View>
                                            </TouchableHighlight>                                                     
                                        </View>
                                        {/* buffer */}
                                        <View style={{flex:0.3, }}></View>
                                        {/* block */}
                                        <View style={{height:90*factor_hor, }}>
                                            <TouchableHighlight onPress={()=>{this.block_unblock()}} underlayColor={'transparent'}>
                                                <View style={{height:80*factor_hor, alignItems:'center', width:80*factor_hor,marginBottom:15*factor_hor, borderRadius:40*factor_hor, backgroundColor:'white'}}>
                                                    <Block
                                                        width={60*factor_hor}
                                                        height={60*factor_hor}
                                                        style={{
                                                            alignItems:'center',
                                                            justifyContent:'center',
                                                            alignContent:'center',
                                                            marginTop:10*factor_ver,
                                                        }}
                                                    />
                                                </View>
                                            </TouchableHighlight>                                                     
                                        </View>
                                        {/* buffer */}
                                        <View style={{flex:0.3, }}></View>
                                        {/* Follow */}
                                        <View style={{height:90*factor_hor,}}>
                                            <TouchableHighlight onPress={()=>{this.follow()}} underlayColor={'transparent'}>
                                                <View style={{height:80*factor_hor,alignItems:'center', width:80*factor_hor,marginBottom:15*factor_hor, borderRadius:40*factor_hor, justifyContent:'center', alignContent:'center', backgroundColor:'white'}}>
                                                    <Following
                                                        width={50*factor_hor}
                                                        height={50*factor_hor}
                                                        style={{
                                                            alignItems:'center',
                                                            justifyContent:'center',
                                                            alignContent:'center',
                                                        }}
                                                    />            
                                                </View>
                                            </TouchableHighlight>                                                     
                                        </View>
                                        {/* buffer */}
                                        <View style={{flex:1.3, }}></View>
                                    </View>
                                    <View style={{flex:0.1,}}></View>
                                    <View style={{flex:0.9,}}>
                                    {/* buffer */}
                                        <View style={{flex:0.3, }}></View>
                                        <View style={{flex:1, marginBottom:-12.5,}}></View>
                                        {/* Message word */}
                                        <View style={{height:90*factor_hor, width:'100%', justifyContent:'center', alignContent:'center',}}>
                                            <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>Message</Text>
                                        </View>
                                        {/* buffer */}
                                        <View style={{flex:0.3, }}></View>
                                        {/* Block word */}
                                        <View style={{height:90*factor_hor, width:'100%', justifyContent:'center', alignContent:'center',}}>
                                            <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>{this.show_block()}</Text>
                                        </View>
                                        {/* buffer */}
                                        <View style={{flex:0.3, }}></View>
                                        {/* Follow word */}
                                        <View style={{height:90*factor_hor, width:'100%', justifyContent:'center', alignContent:'center',}}>
                                            <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>{this.show_follow()}</Text>
                                        </View>         
                                        {/* buffer */}
                                        <View style={{flex:0.3, }}></View>                                                                                                                                                           
                                        <View style={{flex:1, }}></View>                                             
                                    </View>

                            </View>
                            
                            <View style={{height:50*factor_hor, marginTop:20*factor_hor, justifyContent:'center', alignItems:'center', alignContent:'center', marginBottom:70*factor_ver,}}>      
                                <TouchableHighlight underlayColor={'transparent'} onPress={ () => {this.setState({visible3:false}, function () {console.log(this.state.visible3)})}}>
                                    <View style={{height:50*factor_hor, marginBottom:10, width:300*factor_hor, borderRadius:15*factor_hor, backgroundColor:'white'}}>
                                        <Text style={{textAlign:'center', justifyContent:'center', alignContent:'center',
                                            fontFamily:'Avenir Next', fontSize:factor_hor*24*factor_hor, marginTop:6, color:'black' , opacity:1, fontWeight:'600',                      
                                            }}>Done</Text>
                                    </View>
                                </TouchableHighlight>                                                    
                            </View>
                        </View>
                    </Modal> 
                    <View style={{flex:0.4, flexDirection:'row', textAlign:'center', justifyContent:'center', alignContent:'center', }}>
                    </View>
                    {/* Bio */}
                    <View style={{flex:0.8, flexDirection:'row', justifyContent:'center', alignContent:'center', textAlign:'center', }}>
                        <View style={{flex:0.25,}}></View>
                        <View style={{flex:1,}}>

                            <Text style={{color:'white', textAlign:'center', fontWeight:'600', fontFamily:'Avenir Next', fontSize:factor_hor*25}}>{this.username()}</Text>   
                            <Text numberOfLines={2} style={{ textAlign:'center', justifyContent:'center', alignContent:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', color:'white'}}>{this.user_bio()} </Text>
                                                                
                                
                        </View>
                        <View style={{flex:0.25,}}></View>
                    </View>                        
                    <View style={{flex:(0.1*factor_hor*factor_hor), flexDirection:'row' }}></View>

                </View>     
                {/* Buffer */}
                <View style={{alignSelf:'stretch'}}></View>
                </View>
                )}

                {/* main scrollview */}
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    style={{paddingTop:this.what_padding() }}
                    contentContainerStyle={{flexGrow:1}}>

                {/* questions and account details */}
                {( !this.state.posts_pressed && 
                <View>
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
                                    <Text style={{fontFamily:'avenir next', marginBottom:-5*factor_hor, marginTop:5, fontSize:16*factor_hor, textAlign:'center' }}>{this.birthday()}</Text>                                                          
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
                                        <Text style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}>{this.score()}</Text>
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
                                    <Text style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}>{this.gender()}</Text>
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
                                {/* education */}
                                <View style={{height:(Dimensions.get('window').height*0.3 - 25*factor_hor)/5, backgroundColor:'white', justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:5*factor_hor,}}>
                                    
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
                                    <Text style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}>
                                            {this.education()}
                                    </Text>
                                                                         
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
                                    <Text style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}>
                                            {this.job()}
                                    </Text>
                                                                           
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
                                    
                                    <Text style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}>
                                        {this.i1()}
                                    </Text>
                                                                             
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
                                    
                                    <Text style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}>
                                        {this.i2()}
                                    </Text>
                                                                            
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
                                    
                                    <Text style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}>
                                        {this.i3()}
                                    </Text>
                                                                           
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
                                    
                                    <Text style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}>
                                        {this.i4()}
                                    </Text>
                                                                             
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
                                    
                                    <Text style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}>
                                        {this.i5()}
                                    </Text>                                   
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
                                    
                                    <Text style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}>
                                        {this.i6()}
                                    </Text>
                                                                           
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
                                    
                                    <Text style={{fontFamily:'avenir next', fontSize:16*factor_hor, textAlign:'center' }}>
                                        {this.i7()}
                                    </Text>                                                                     
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
                                        <TextInput style={{textAlign:'center', fontFamily:'avenir next', fontSize:14*factor_hor, color:'red', }}
                                            color='red'
                                            ref={input => { this.textInput = input }}
                                            multiline={false}
                                            placeholder={this.q1()}                                                           
                                            placeholderTextColor='red'
                                            maxLength={20}
                                            onChangeText={(typedText) => {this.setState( {q1:typedText}, function () {console.log(this.state.q1)} )}}
                                        />                                      
                                    </View>
                                    <View style={{flex:1,justifyContent:'center', alignContent:'center', alignSelf:'stretch', marginLeft:1.5, borderRadius:5, backgroundColor:'white'}}>
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
                                    </View>
                                </View>
                                <View style={{height:Dimensions.get('window').height*0.35/4, marginTop:3, justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:0*factor_hor,}}>
                                    <View style={{flex:1,justifyContent:'center', alignContent:'center', alignSelf:'stretch', marginRight:1.5, marginTop:3,borderRadius:5, backgroundColor:'white'}}>
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
                                    </View>
                                    <View style={{flex:1,justifyContent:'center', alignContent:'center', alignSelf:'stretch', marginLeft:1.5, marginTop:3,borderRadius:5, backgroundColor:'white'}}>
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
                                    </View>
                                </View>
                                <View style={{height:Dimensions.get('window').height*0.35/4, marginTop:3, justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:0*factor_hor,}}>
                                    <View style={{flex:1,justifyContent:'center', alignContent:'center', alignSelf:'stretch', marginRight:1.5, marginTop:3,borderRadius:5, backgroundColor:'white'}}>
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
                                    </View>
                                    <View style={{flex:1,justifyContent:'center', alignContent:'center', alignSelf:'stretch', marginLeft:1.5, marginTop:3,borderRadius:5, backgroundColor:'white'}}>
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
                                    </View>
                                </View>
                                <View style={{height:Dimensions.get('window').height*0.35/4, marginTop:3, justifyContent:'center', alignContent:'center', alignItems:'center', flexDirection:'row', borderRadius:5, marginTop:0*factor_hor,}}>
                                    <View style={{flex:1,justifyContent:'center', alignContent:'center', alignSelf:'stretch', marginRight:1.5, marginTop:3,borderRadius:5, backgroundColor:'white'}}>
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
                                    </View>
                                    <View style={{flex:1,justifyContent:'center', alignContent:'center', alignSelf:'stretch', marginLeft:1.5,marginTop:3, borderRadius:5, backgroundColor:'white'}}>
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
                                    </View>
                                </View>
                            </ScrollView>    
                        </View>
                        {/* Buffer */}
                        <View style={{marginTop:Dimensions.get('window').height*0.075}}></View>
                </View>
                )}

                {/* Posts viewed full screen*/}
                { this.state.posts_pressed && (
                <View style={{height:Dimensions.get('window').height, width:Dimensions.get('window').width, position:'absolute', top:0, left:0, alignSelf:'stretch', }}>
                        {/* float p o s t s | v o t e s */}
                        <View style={{height:15, zIndex:2, }}> 
                                <View style={{
                                            position:'absolute',
                                            top:0,
                                            left:Dimensions.get('window').width*0.355,
                                            alignSelf:'stretch',
                                            height:30,
                                            width:Dimensions.get('window').width*0.28,
                                            borderRadius:20,
                                            backgroundColor:'white',
                                            elevation:1,
                                            borderWidth:0.25,
                                            borderColor:'#FFA66C',
                                            zIndex:2,
                                            justifyContent:'center',
                                            alignContent:'center',
                                            flexDirection:'row',
                                            }}>
                                <View style={{flex:1, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
                                    <TouchableOpacity onPress={()=>{ this.setState({posts_pressed:!this.state.posts_pressed}) }}>
                                        <Text style={{textAlign:'center', fontWeight:'300', justifyContent:'center', alignContent:'center', alignItems:'center', fontFamily:'Avenir next', fontSize:18*factor_hor, color:'#FFA66C'}}>p o s t s</Text>
                                    </TouchableOpacity>    
                                </View>
                            </View>                                 
                        </View>
                        {this.state.animating && ( 
                        <ActivityIndicator size='large' animating={this.state.animating}
                            color="#ececec"
                            style={{
                                flex:1,
                                marginTop:10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}/> 
                        )}
                        { !this.state.animating && (
                        <FlatList  
                            showsVerticalScrollIndicator={false}
                            data={this.state.comments.slice(0,this.state.show)}
                            extraData={this.state}
                            
                            // refresh
                            // refreshControl={
                                // <RefreshControl
                                    // refreshing={this.state.isFetching}
                                    // onRefresh={() => { this.setState({isFetching:true}, function() {console.log(this.state.isFetching)}), this.refresh_feed()} }
                                    // title="Pull to refresh" tintColor={'#ececec'} titleColor="transparent"
                                // />}
                            ref = "flatList"
                            onEndReachedThreshold={0.5}
                            onEndReached={() => {this.reached_end()}}
                            ListFooterComponent={() => this.state.loading_post? null :this.which_footer()}
                            initialNumToRender={8}
                            maxToRenderPerBatch={8}
                            style={{flex:1,}}
                            scrollEnabled={!this.state.isSwiping2}
                            keyExtractor={(item,index) => (index).toString()}
                            renderItem={({item, index}) => ( 
                            <View>
                            <View key={index} onLayout={(f) => {this.check_key(f, index)}} style={{minHeight:10, alignSelf:'stretch',}}>
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
                                            <Text style={{textAlign:'left', marginStart:5, color:'#9B9B9B', fontSize:18*factor_hor,fontFamily:'Avenir next',}}>{this.state.comments[index][0]}</Text>
                                        </View>
                                        <View style={{flex:0.4,backgroundColor:'white' }}></View>
                                        <View hitSlop={{top: 10, bottom: 10, left: 20, right: 20}} style={{flex:0.4,backgroundColor:'white' }}>                       
                                        </View>                          
                                        <View style={{width:15*factor_hor,backgroundColor:'white'  }}></View> 
                                    </View>
                                    <View style={{height:4*factor_hor}}></View>
                                    <View style={{marginTop:5, backgroundColor:'white', alignContent:'center', justifyContent:'center'}}>
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
                                            style={{ flex:2,backgroundColor:'white', marginLeft:-1, width:Dimensions.get('window').width, height:Dimensions.get('window').width,}}
                                    /> )}
                                </View>                    
                                </View>
                                <View style={{height:40*factor_hor, justifyContent:'center', alignContent:'center', flexDirection:'row', }}>
                                    <View style={{flex:0.3, borderLeftColor:'#ececec',backgroundColor:'white',borderBottomColor:'#ececec', borderBottomLeftRadius:50, borderBottomWidth:1, borderLeftWidth:1,}}></View>
                                    <View style={{width:10, backgroundColor:'white' , borderBottomColor:'#ececec',borderBottomWidth:0.25,}}>
                                        <View style={{height:20, marginTop:10*factor_ver, width:20, justifyContent:'center', alignContent:'center', alignItems:'center',borderRadius:10}}></View>
                                    </View>
                                    <View style={{flex:3, backgroundColor:'white', paddingLeft:5, flexDirection:'row', justifyContent:'space-around', alignContent:'space-around',borderBottomColor:'#ececec',borderBottomWidth:0.25, }}>
                                        <View style={{flex:1.15, justifyContent:'center', alignContent:'center',}}>
                                            {this.show_date(index)}
                                        </View>
                                        <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                            <Text style={{textAlign:'center', marginEnd:15, fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes_comments(index)}}>{this.state.comments[index][6] - this.state.comments[index][7]}</Text>
                                        </View>
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
                                        <View style={{flex:0.5, justifyContent:'center', alignContent:'center',}}>
                                
                                        </View>
                                    </View>              
                                    <View style={{flex:0.3, backgroundColor:'white',borderBottomColor:'#ececec', borderRightColor:'#ececec', borderBottomRightRadius:50, borderBottomWidth:1, borderRightWidth:1, }}>
                                </View>
                                </View>                          
                            </View>
                            </View>
                            )}/>
                        )}                                 
                        </View>                        
                )}
                {/* posts viewed on scrollview */}
                { !this.state.posts_pressed && (
                <View style={{height:Dimensions.get('window').height*0.735, alignSelf:'stretch', }}>
                        {/* float p o s t s | v o t e s */}
                        <View style={{height:15, zIndex:2, }}> 
                                    <View style={{
                                                position:'absolute',
                                                top:0,
                                                left:Dimensions.get('window').width*0.355,
                                                alignSelf:'stretch',
                                                height:30,
                                                width:Dimensions.get('window').width*0.28,
                                                borderRadius:20,
                                                backgroundColor:'white',
                                                elevation:1,
                                                borderWidth:0.25,
                                                borderColor:'#FFA66C',
                                                zIndex:2,
                                                justifyContent:'center',
                                                alignContent:'center',
                                                flexDirection:'row',
                                                }}>

                                            <View style={{flex:1, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
                                                <TouchableOpacity onPress={()=>{ this.setState({posts_pressed:!this.state.posts_pressed}) }}>
                                                    <Text style={{textAlign:'center', fontWeight:'300', justifyContent:'center', alignContent:'center', alignItems:'center', fontFamily:'Avenir next', fontSize:18*factor_hor, color:'#FFA66C'}}>p o s t s</Text>
                                                </TouchableOpacity>    
                                            </View>

                            </View>                                 
                        </View>
  
                        {this.state.animating && ( 
                        <ActivityIndicator size='large' animating={this.state.animating}
                            color="#ececec"
                            style={{
                                flex:1,
                                marginTop:10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}/> 
                        )}
                        { !this.state.animating && (
                        <FlatList  
                            showsVerticalScrollIndicator={false}
                            data={this.state.comments.slice(0,this.state.show)}
                            extraData={this.state}
                            
                            // refresh
                            // refreshControl={
                                // <RefreshControl
                                    // refreshing={this.state.isFetching}
                                    // onRefresh={() => { this.setState({isFetching:true}, function() {console.log(this.state.isFetching)}), this.refresh_feed()} }
                                    // title="Pull to refresh" tintColor={'#ececec'} titleColor="transparent"
                                // />}
                            ref = "flatList"
                            onEndReachedThreshold={0.5}
                            onEndReached={() => {this.reached_end()}}
                            ListFooterComponent={() => this.state.loading_post? null :this.which_footer()}
                            initialNumToRender={8}
                            maxToRenderPerBatch={8}
                            style={{flex:1,}}
                            scrollEnabled={!this.state.isSwiping2}
                            keyExtractor={(item,index) => (index).toString()}
                            renderItem={({item, index}) => ( 
                            <View>
                            <View key={index} onLayout={(f) => {this.check_key(f, index)}} style={{ minHeight:10, alignSelf:'stretch', }}>
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
                                            <Text style={{textAlign:'left', marginStart:5, color:'#9B9B9B', fontSize:18*factor_hor,fontFamily:'Avenir next',}}>{this.state.comments[index][0]}</Text>
                                        </View>
                                        <View style={{flex:0.4,backgroundColor:'white' }}></View>
                                        <View hitSlop={{top: 10, bottom: 10, left: 20, right: 20}} style={{flex:0.4,backgroundColor:'white' }}>                       
                                        </View>                          
                                        <View style={{width:15*factor_hor,backgroundColor:'white'  }}></View> 
                                    </View>
                                    <View style={{height:4*factor_hor}}></View>
                                    <View style={{marginTop:5, backgroundColor:'white', alignContent:'center', justifyContent:'center'}}>
                                        <Text 
                                            numberOfLines={6}
                                            style={{textAlign:'left', marginLeft:20, marginEnd:20, marginTop:-10, lineHeight:30, fontFamily:'avenir next', fontSize:factor_hor*18, fontWeight:'normal'}}>{this.state.comments[index][2]}
                                        </Text>
                                    </View>        
                                    <View>
                                    { this.render_image_comments(index) && ( 
                                        <FastImage
                                            resizeMode={FastImage.resizeMode.contain}
                                            source={{ uri: `http://${serverLocation}/${this.state.comments[index][9]}` }}
                                            style={{ flex:1.5, backgroundColor:'white', marginLeft:-1, width:Dimensions.get('window').width, height:Dimensions.get('window').width,}}
                                    /> )}
                                </View>                    
                                </View>
                                <View style={{height:40*factor_hor, justifyContent:'center', alignContent:'center', flexDirection:'row', }}>
                                    <View style={{flex:0.3, borderLeftColor:'#ececec',backgroundColor:'white',borderBottomColor:'#ececec', borderBottomLeftRadius:50, borderBottomWidth:1, borderLeftWidth:1,}}></View>
                                    <View style={{width:10, backgroundColor:'white' , borderBottomColor:'#ececec',borderBottomWidth:0.25,}}>
                                        <View style={{height:20, marginTop:10*factor_ver, width:20, justifyContent:'center', alignContent:'center',alignItems:'center',borderRadius:10}}></View>
                                    </View>
                                    <View style={{flex:3, backgroundColor:'white', paddingLeft:5, flexDirection:'row', justifyContent:'space-around', alignContent:'space-around',borderBottomColor:'#ececec',borderBottomWidth:0.25, }}>
                                        <View style={{flex:1.15, justifyContent:'center', alignContent:'center',}}>
                                            {this.show_date(index)}
                                        </View>
                                        <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                            <Text style={{textAlign:'center', marginEnd:15, fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes_comments(index)}}>{this.state.comments[index][6] - this.state.comments[index][7]}</Text>
                                        </View>
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
                                        <View style={{flex:0.5, justifyContent:'center', alignContent:'center',}}>
                                
                                        </View>
                                    </View>              
                                    <View style={{flex:0.3, backgroundColor:'white',borderBottomColor:'#ececec', borderRightColor:'#ececec', borderBottomRightRadius:50, borderBottomWidth:1, borderRightWidth:1, }}>
                                </View>
                                </View>                          
                            </View>
                            </View>
                            )}/>
                        )}                                 
                        </View>                        
                )}
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
