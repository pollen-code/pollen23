import React, {Component} from 'react';
import {StyleSheet, FlatList, TouchableOpacity, Text, Dimensions, 
        Modal, ActivityIndicator, RefreshControl, View, Share,
        TouchableHighlight, AsyncStorage, Platform,} from 'react-native';
import { Icon, } from 'react-native-elements'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import LinearGradient from 'react-native-linear-gradient';
import Swipeable from 'react-native-swipeable';
import FastImage from 'react-native-fast-image'
import Share_ from './svgs/share';
import SendMessage from './svgs/send_message';
import Block from  './svgs/block';
import FlagIcon from './svgs/flag_icon';
import Save from './svgs/save';
import Eye from './svgs/eye';
import Hot from './svgs/hot';
import New from './svgs/new';

var factor_hor2 = Dimensions.get('window').width/275 // sizing factors
var art = []
var comments = [] 
var received_comments = [0,1] 
var height_ = 0

export default class view_comment_profile extends React.Component {
    static navigationOptions = {header: null};
    constructor(props) {
        super(props);
        this.state = {
            // user related
            username:'',
            sort:'new',
            
            // comments
            comments:[],
            visible3:false, // for comment image
            visible5:false, // for comment modal
            key_status:'0', // for comment
            received_comments:[0,1],
            clicked_image_comments:0, // image key for comment image clicked 
            gestureNameComments:'none', 

            // posts
            art:[], // set art to inherited post
            visible:false, // for post modal
            gestureName: 'none', 
            key_status_post:'0',
            clicked_image:0, // whether a comment image or other clicked
            received_posts:[0,1],
            
            // extra
            visible2:false, // select arrows
            animating:true, // initial load indicator
            show:8, // show 8 posts
            loading_posts:false, // stop overload feed 
            isFetching:false, // fetching for refresh
            act_load_color:"#FC6026", // activity indicator load color

        }
    }
    
    async componentDidMount() {
        await this.nav_out();
        x = await this.props.navigation.getParam('x')
        console.log(x, x.comment_or_post, x.postID, x.object_height)
        await this.setState({
            postID:x.postID,
            comment_or_post:x.comment_or_post,
            object_height:x.object_height,
            username: await AsyncStorage.getItem('user'),
        })          
        
        url = `http://${serverLocation}:80/get_item?`
        await fetch(url, {
            method:'POST',
            headers:{    
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
            body: 
            JSON.stringify({
                postID:this.state.postID,
                comment_or_post:this.state.comment_or_post,
                username:this.state.username,
            })
        })
        .then((response) => response.json())
        .then((responseJson2) => {
            console.log(responseJson2, 'LOADED')
            responseJson2[0].push(this.state.object_height)
            art = responseJson2[0]
            this.setState({art:art})
            comments = [ [art[7],art[8],art[8],art[1],art[20],art[0],art[11],art[12],art[13],art[14],art[15],art[18],art[5],art[16],"#EF532A","#EF532A",art[19],1,art[21]] ]
            this.setState({
                comments: comments 
            })
            this.setState( {act_load_color:'#FC6026'}, function() {console.log(this.state.act_load_color)})
        }) 
        .catch((error) => {
            console.log(error)
        });

        await this.fetch_comments();
    }
    async fetch_comments() {
        console.log(' fetch comments')
        // recieve comment
        url = `http://${serverLocation}:80/show_comment?`
        await fetch(url, {
            method:'POST',
            headers:{    
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
            body: 
            JSON.stringify({
                postID: art[8],
                sort: this.state.sort,
                username: this.state.username,
                received_comments: '['+(received_comments).toString()+']',
            })
            })
            .then((response) => response.json())
            .then((responseJson2) => {
                console.log(responseJson2)
                if(responseJson2.length > 0) {
                this.setState({
                        comments: [ ...this.state.comments, ...responseJson2, ] 
                        }, 
                        function() {console.log('comments' ,this.state.comments)
                        })
                    comments = this.state.comments
                    for(key in responseJson2){
                        received_comments.push(responseJson2[key][1])
                    }
                    this.setState( {act_load_color:'#FC6026'}, function() {console.log(this.state.act_load_color)})
                }
                else {
                    this.setState( {act_load_color:'white'}, function() {console.log(this.state.act_load_color)})                    
                }
            }) 
            .catch((error) => {
                console.log(error)
            });
            console.log('show ', this.state.show)
            await this.setState( {animating:false}, function(){console.log(this.state.animating)})  
            await this.setState( {loading_posts:false}, function() {console.log(this.state.loading_posts, 'comment length', this.state.comments.length)})      
            await this.update_views();
    }    
    async reached_end() {
        // if number shown < length of art
        if(this.state.show < (this.state.comments.length-1) ) {
            // show more posts
            console.log(1)
            this.setState( {show:(this.state.show+8)}, function() {console.log(this.state.show)})
        }
        // if number shown == length of art
        else if(this.state.show == (this.state.comments.length-1) ) {
            console.log(2)
            // call more posts
                // then show more posts
            if(this.state.loading_posts == false) {
                this.setState( {loading_posts:true}, function() {console.log(this.state.loading_posts)})
                await this.fetch_comments()   
                await this.setState( {show:(this.state.show+8)}, function() {console.log(this.state.show)})
        }}
        else if(this.state.show > (this.state.comments.length -1)) {
            // no more posts
            console.log(3)
            if(this.state.act_load_color !== 'white'){
                await this.setState( {act_load_color:'white'}, function() {console.log(this.state.act_load_color)})
            }
        }

    }  
    async update_views() {
        
        remainder = this.state.comments.length % 64
        quotient = Math.floor(this.state.comments.length/64)
        slice_domain = quotient*64 

        try {
            if( this.state.comments.length  > 64 )
            {
                fetch(`http://${serverLocation}:80/update_comment_views?received_posts=${'['+(received_comments.slice(slice_domain)).toString()+']'}&null_column=`)
                .then((response) => response.json())
                .then((responseJson2) => {console.log(responseJson2)})
                .catch((error) => {
                    console.log(error)
                });   
            }
            else {
                fetch(`http://${serverLocation}:80/update_comment_views?received_posts=${'['+(received_comments).toString()+']'}&null_column=`)
                .then((response) => response.json())
                .then((responseJson2) => {console.log(responseJson2)})
                .catch((error) => {
                    console.log(error)
                });   
            }
        } 
        catch (error) {
            console.log(error)    
        }
    }      
    async refresh_feed() {
        comments = [ comments[0] ]
        received_comments = [1,2]
        await this.setState( 
        {
            comments:comments,
            animating:true,
            show:8,
        },
        function() {console.log(
            this.state.comments,
            this.state.animating,
            this.state.show,
        )})
        await this.fetch_comments();
        await this.setState({isFetching:false}, function() {console.log(this.state.isFetching)})
        
    }        
    // sort
    async new_click() {
        if(this.state.sort == 'hot') {
            comments = [ comments[0] ]
            received_comments = [1,2]
            await this.setState( 
            {
                comments:comments,
                animating:true,
                show:8,
                sort:'new',
            },
            function() {console.log(
                this.state.comments,
                this.state.animating,
                this.state.show,
                this.state.sort,
            )})
            await this.fetch_comments();
            await this.setState({isFetching:false}, function() {console.log(this.state.isFetching)})
        }
        await this.setState({visible2:false},function(){console.log(this.state.visible2)})        
    }
    async hot_click() {
        if(this.state.sort == 'new') {
            comments = [ comments[0] ]
            received_comments = [1,2]
            await this.setState( 
            {
                comments:comments,
                animating:true,
                show:8,
                sort:'hot',
            },
            function() {console.log(
                this.state.comments,
                this.state.animating,
                this.state.show,
                this.state.sort,
            )})
            await this.fetch_comments();
            await this.setState({isFetching:false}, function() {console.log(this.state.isFetching)})
        }
        await this.setState({visible2:false},function(){console.log(this.state.visible2)})
    }
    // comments
    check_key(f, index) {
        // add comment height
        comments[index].push(f.nativeEvent.layout.height)
        this.state.comments[index].push(f.nativeEvent.layout.height)
        height_ = height_ + 1 

    }    
    check_color_votes_comments(index) {
        if(this.state.comments[index][6] == 'upvote') {
            return 'rgba(113, 233, 42, 1)'
        }
        else if(this.state.comments[index][6] == 'downvote') {
            return 'rgba(255, 0, 0, 1)'
        }
        else {
            return "black"
        }
    }      
    async voteup_comments(key) {

        if(key == 0) {
            await this.voteup();
        }

        else {
            if( (this.state.comments[key][6] == 'downvote') ) { 
                this.state.comments[key][6] = 'upvote' 
                this.state.comments[key][7] = this.state.comments[key][7] + 1
                this.state.comments[key][8] = this.state.comments[key][8] - 1
                await fetch(`http://${serverLocation}:80/vote_comment?route=1&username=${this.state.username}&commentID=${this.state.comments[key][1]}`);
                comments = this.state.comments
            }
            else if( (this.state.comments[key][6] == 'upvote') ) {
                this.state.comments[key][6] = null 
                this.state.comments[key][7] = this.state.comments[key][7] - 1
                await fetch(`http://${serverLocation}:80/vote_comment?route=2&username=${this.state.username}&commentID=${this.state.comments[key][1]}`);
                comments = this.state.comments
            }
            else if( (comments[key][6] == null) ) { 
                this.state.comments[key][6] = 'upvote' 
                this.state.comments[key][7] = this.state.comments[key][7] + 1 
                url = `http://${serverLocation}:80/vote_comment?route=3&username=${this.state.username}&commentID=${this.state.comments[key][1]}`
                console.log(url)
                await fetch(url);
                comments = this.state.comments
            }
        }
    }
    async votedown_comments(key) {
        if(key == 0) {
            await this.votedown();
        }
        else {
            //* already upvoted then click downvote
            if( this.state.comments[key][6] == 'upvote' ) { 
                this.state.comments[key][6] = 'downvote' 
                this.state.comments[key][7] = this.state.comments[key][7] - 1 //* switch upvote to upvote - 1 count
                this.state.comments[key][8] = this.state.comments[key][8] + 1 //* switch downvote to downvote + 1 count
                await fetch(`http://${serverLocation}:80/vote_comment?route=4&username=${this.state.username}&commentID=${this.state.comments[key][1]}`);
                comments = this.state.comments
            }
            //* click downvote on comment thats already downvoted
            else if( this.state.comments[key][6] == 'downvote' ) { // set personal vote status to downvote
                this.state.comments[key][6] = null //* set to no vote
                this.state.comments[key][8] = this.state.comments[key][8] - 1 //* make downvote count - 1
                await fetch(`http://${serverLocation}:80/vote_comment?route=5&username=${this.state.usernam}&commentID=${this.state.comments[key][1]}`);
                comments = this.state.comments
            }
            //* no votes 
            else if( this.state.comments[key][6] == null ) { 
                this.state.comments[key][6] = 'downvote' //* set personal vote status to downvote
                this.state.comments[key][8] = this.state.comments[key][8] + 1 //* downvotes + 1
                await fetch(`http://${serverLocation}:80/vote_comment?route=6&username=${this.state.username}&commentID=${this.state.comments[key][1]}`);
                comments = this.state.comments
            }
        }
    }
    render_image_comments(key) {

        if( this.state.comments[key][4] == 'picture' ) {
            console.log('IMAGE TRUE')
            return true
        }
        else {
            return false
        }
    }    
    clicked_image_comments(key) {
        // see dialog
        this.setState( {visible3:true, clicked_image_comments:key},function(){console.log(this.state.visible3, this.state.clicked_image_comments)} ) 
    }
    gotoprofile_comments(key) {
        if(this.state.comments[key][5] !== 'Anonymous') {
            this.props.navigation.navigate('PROFILE_EXTERNAL_VIEW', {profile_clicked:this.state.comments[key][5]}
            )
        }
    }     
    onSwipeUpComments(gestureState) {
        this.setState({visible3:false}, function () {console.log(this.state.visible3)});
        console.log(this.state.visible3)
    }                                                                                                         
    onSwipeDownComments(gestureState) {
        this.setState({visible3:false}, function () {console.log(this.state.visible3)});
        console.log(this.state.visible3)
    } 
    onSwipeLeftComments(gestureState) {
        this.setState({visible3:false}, function () {console.log(this.state.visible3)});
        console.log(this.state.visible3)
    } 
    onSwipeRightComments(gestureState) {
        this.setState({visible3:false}, function () {console.log(this.state.visible3)});
        console.log(this.state.visible3)
    }  
    onSwipeComments(gestureName, gestureState) {
        
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        this.setState({gestureName: gestureName});
        switch (gestureName) {

        case SWIPE_UP:
            this.setState({visible3:false}, function () {console.log(this.state.visible3)});
            console.log(this.state.visible3)
            break;
          
        case SWIPE_DOWN:    
            this.setState({visible3:false}, function () {console.log(this.state.visible3)});
            console.log(this.state.visible3)
            break;
        
        case SWIPE_LEFT:
            this.setState({visible3:false}, function () {console.log(this.state.visible3)});
            console.log(this.state.visible3)
            break;
          
        case SWIPE_RIGHT:
            this.setState({visible3:false}, function () {console.log(this.state.visible3)});
            console.log(this.state.visible3)
            break;
        }
    }       
    // post
    voteup () {
        if( (this.state.art[11] == 'downvote') ) { 
            this.state.art[11] = 'upvote' 
            this.state.art[12] = this.state.art[12] + 1
            this.state.art[13] = this.state.art[13] - 1
            this.state.comments[0][6] = 'upvote' 
            this.state.comments[0][7] = this.state.comments[0][7] + 1
            this.state.comments[0][8] = this.state.comments[0][8] - 1 
            fetch(`http://${serverLocation}:80/vote_post?route=1&username=${this.state.username}&postID=${this.state.art[8]}`);
        }
        else if( (this.state.art[11] == 'upvote') ) {
            this.state.art[11] = null 
            this.state.art[12] = this.state.art[12] - 1
            this.state.comments[0][6] = null
            this.state.comments[0][7] = this.state.comments[0][7] - 1
            fetch(`http://${serverLocation}:80/vote_post?route=2&username=${this.state.username}&postID=${this.state.art[8]}`);
        }
        else if( (art[11] == null) ) { 
            this.state.art[11] = 'upvote' 
            this.state.art[12] = this.state.art[12] + 1 
            this.state.comments[0][6] = 'upvote' 
            this.state.comments[0][7] = this.state.comments[0][7] + 1
            fetch(`http://${serverLocation}:80/vote_post?route=3&username=${this.state.username}&postID=${this.state.art[8]}`);
        }
        art = this.state.art
        comments = this.state.comments
    }
    votedown () {
        if( (this.state.art[11] == 'upvote') ) { 
            this.state.art[11] = 'downvote' 
            this.state.art[12] = this.state.art[12] - 1
            this.state.art[13] = this.state.art[13] + 1
            this.state.comments[0][6] = 'downvote' 
            this.state.comments[0][7] = this.state.comments[0][7] - 1
            this.state.comments[0][8] = this.state.comments[0][8] + 1             
            fetch(`http://${serverLocation}:80/vote_post?route=4&username=${this.state.username}&postID=${this.state.art[8]}`);
        }
        else if( (art[11] == 'downvote') ) {
            this.state.art[11] = null
            this.state.art[13] = this.state.art[13] - 1
            this.state.comments[0][6] = null 
            this.state.comments[0][8] = this.state.comments[0][8] - 1 
            fetch(`http://${serverLocation}:80/vote_post?route=5&username=${this.state.username}&postID=${this.state.art[8]}`);
        }
        else if( (this.state.art[11] == null) ) { 
            this.state.art[11] = 'downvote' 
            this.state.art[13] = this.state.art[13] + 1 
            this.state.comments[0][6] = 'downvote' 
            this.state.comments[0][8] = this.state.comments[0][8] + 1 
            fetch(`http://${serverLocation}:80/vote_post?route=6&username=${this.state.username}&postID=${this.state.art[8]}`);
        }
        art = this.state.art
        comments = this.state.comments
    }     
    // if visible true
    async share_post() {
    try {
        if (this.state.art[20] == 'picture' || this.state.art[20] == 'video') {
        const result = await Share.share({
        title:'pollen',
        message:this.state.art[7],
        url:this.state.art[18],
        });
        
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared ios
                    this.setState({visible:false}, function() {console.log(this.state.visible)})
                    return null
                } 
                else {
                    // shared android
                    this.setState({visible:false}, function() {console.log(this.state.visible)})
                    return null
                }
            } 
            else if (result.action === Share.dismissedAction) {
                // dismissed
                this.setState({visible:false}, function() {console.log(this.state.visible)})
                return null
            }
        }

        else {
            const result = await Share.share({
            message:this.state.art[7],
            title:'pollen',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared ios
                    this.setState({visible:false}, function() {console.log(this.state.visible)})
                    return null
                } 
                else {
                    // shared android
                    this.setState({visible:false}, function() {console.log(this.state.visible)})
                    return null
                }
            } 
            else if (result.action === Share.dismissedAction) {
                // dismissed
                this.setState({visible:false}, function() {console.log(this.state.visible)})
                return null
            }                
        }            
    } 
    catch (error) {
        console.log(error)
    }
    }      
    block_post_post() {
        if(this.state.comments[0][16] == 'Block' ) {
            return 'Block'
        }
        else if(this.state.comments[0][16] == 'Unblock' ){
            return 'Unblock'
        }
        else if (this.state.comments[0][12] == this.state.username) {
            return 'Cant block'
        }
    }   
    block_post() {
        if( (this.state.comments[0][16] == 'Block') && (this.state.art[0] !== this.state.username)  ) {
            try {
                fetch(`http://${serverLocation}:80/block_poster?route=1&userID=${this.state.username}&blockedID=${this.state.art[0]}&postID=${this.state.art[8]}&post_or_comment=post` )
                this.state.art[19] = 'Unblock'
                this.state.comments[0][16] = 'Unblock'
                art = this.state.art
                comments = this.state.comments
            }
            catch {
                return null
            }
        }
        else if( (this.state.comments[0][16] == 'Unblock') && (this.state.art[0] !== this.state.username)  ) {
            try {
                fetch(`http://${serverLocation}:80/block_poster?route=2&userID=${this.state.username}&blockedID=${this.state.art[0]}&postID=${this.state.art[8]}&post_or_comment=post`)
                this.state.art[19] = 'Block'
                this.state.comments[0][16] = 'Unblock'
                art = this.state.art
                comments = this.state.comments
                }   
            catch {
                return null
            }
        }
        else if( this.state.art[0] == this.state.username ) {
            this.state.art[19] = 'Cant Block'
            this.state.comments[0][16] = 'Cant Block'
            art = this.state.art
            comments = this.state.comments
        }
        this.setState({visible:false}, function() {console.log(this.state.visible)})
    }
    flag_post_post() {
        if(this.state.comments[0][10] == 1) {
            return 'Flagged'
        }
        else if(this.state.comments[0][10] == 0){
            return 'Flag'
        }
    }
    flag_post() {
        if(this.state.comments[0][10] == 0) {
            try {
                fetch('http://18.191.215.230:80/flag_post?route=1&userID='+(this.state.username)+'&postID='+this.state.art[8]+'&posterID='+this.state.art[0])
                this.state.art[15] = 1
                this.state.comments[0][10] = 1
                art = this.state.art
                comments = this.state.comments
            }
            catch {
                return null
            }
        }
        else if(this.state.comments[0][10] == 1) {
            try {
                fetch(`http://${serverLocation}:80/flag_post?route=2&userID=${this.state.username}&postID=${this.state.art[8]}&posterID=${this.state.art[0]}`)
                this.state.art[15] = 0
                this.state.comments[0][10] = 0
                art = this.state.art
                comments = this.state.comments
                }   
            catch {
                return null
            }
        }
        this.setState({visible:false}, function() {console.log(this.state.visible)})
    }
    saved_post_post() { 
        if(this.state.comments[0][9] == 1) {
            return 'Saved'
        }
        else if(this.state.comments[0][9] == 0){
            return 'Save'
            }
    }
    saved_post() {
        if(this.state.comments[0][9] == 0) {
            try {
                fetch(`http://${serverLocation}:80/save_post?route=1&userID=${this.state.username}&postID=${this.state.art[8]}`)
                this.state.comments[0][9] = 1
                this.state.art[14] = 1
                comments = this.state.comments
                art = this.state.art
            }
            catch {
                return null
            }
        }
        else if(this.state.comments[0][9] == 1) {
            try {
                fetch(`http://${serverLocation}:80/save_post?route=2&userID=${this.state.username}&postID=${this.state.art[8]}`)
                this.state.art[14] = 0
                this.state.comments[0][9] = 0
                comments = this.state.comments
                art = this.state.art
                }   
            catch {
                return null
                }
        }
        this.setState({visible:false}, function() {console.log(this.state.visible)})
    }  
    // if visible5 true
    saved_comment_comment(key) {
        if(this.state.comments[key][9] == 1) {
            return 'Saved'
        }
        else if(this.state.comments[key][9] == 0){
            return 'Save'
        }
    }
    async saved_comment(key) {
        if(this.state.comments[key][9] == 0) {
            try {
                fetch(`http://${serverLocation}:80/save_comment?route=1&userID=${this.state.username}&commentID=${this.state.comments[key][1]}`)
                this.state.comments[key][9] = 1
                this.setState( {comments:comments} ) 
                comments = this.state.comments
            }
            catch {
                return null
            }
        }
        else if(this.state.comments[key][9] == 1) {
            try {
                fetch(`http://${serverLocation}:80/save_comment?route=2&userID=${this.state.username}&commentID=${this.state.comments[key][1]}`)
                this.state.comments[key][9] = 0
                this.setState( {comments:comments} ) 
                comments = this.state.comments
                }   
            catch {
                return null
                }
            }
        await this.setState( {visible5:false}, function() {console.log(this.state.visible5)} )                                
    }
    block_comment_comment(key) {
        if( this.state.comments[key][5] == this.state.username ) {
            return "Can't block"
        }
        else if(this.state.comments[key][16] == 'Block') {
            return 'Block'
        }
        else if(this.state.comments[key][16] == 'Unblock'){
            return 'Unblock'
        }
    }
    async block_comment(key) {
        if( (this.state.comments[key][16] == 'Block') && ( this.state.comments[key][5] !== this.state.username ) ) {
            try {
                fetch(`http://${serverLocation}:80/block_poster?route=1&userID=${this.state.username}&blockedID=${this.state.comments[key][5]}&postID=${this.state.comments[key][1]}&post_or_comment=comment` )
                this.state.comments[key][16] = 'Unblock'
                this.setState( {comments:comments} ) 
                comments = this.state.comments
            }
            catch {
                return null
            }
        }
        else if( (this.state.comments[key][16] == 'Unblock') && ( this.state.comments[key][5] !== this.state.username ) ) {
            try {
                fetch(`http://${serverLocation}:80/block_poster?route=1&userID=${this.state.username}&blockedID=${this.state.comments[key][5]}&postID=${this.state.comments[key][1]}&post_or_comment=comment` )
                this.state.comments[key][16] = 'Block'
                this.setState( {comments:comments} )
                comments = this.state.comments    
            }   
            catch {
                return null
            }
        }
        await this.setState( {visible5:false}, function() {console.log(this.state.visible5)} )                
    }
    flag_comment_comment(key) {
        if(this.state.comments[key][10] == 1) {
            return 'Flagged'
        }
        else if(this.state.comments[key][10] == 0){
            return 'Flag'
        }
    }
    async flag_comment(key) {
        if(this.state.comments[key][10] == 0) {
            try {
                fetch(`http://${serverLocation}:80/flag_comment?route=1&userID=${this.state.username}&commentID=${this.state.comments[key][1]}&commenterID=${this.state.comments[key][5]}`)
                this.state.comments[key][10] = 1
                this.setState( {comments:comments} ) 
                comments = this.state.comments
            }
            catch {
                return null
            }
        }
        else if(this.state.comments[key][10] == 1) {
            try {
                fetch(`http://${serverLocation}:80/flag_comment?route=2&userID=${this.state.username}&commentID=${this.state.comments[key][1]}&commenterID=${this.state.comments[key][5]}`)
                this.state.comments[key][10] = 0
                this.setState( {comments:comments} )
                comments = this.state.comments
            }   
            catch {
                return null
                }
            }
        await this.setState( {visible5:false}, function() {console.log(this.state.visible5)} )                
        
    }  
    async share_comment(index) {
        try {
            if (this.state.comments[index][4] == 'picture' || this.state.comments[index][4] == 'video') {
            const result = await Share.share({
            title:'pollen',
            message:this.state.comments[index][0],
            url:this.state.comments[index][11],
            });
            
                if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                        // shared ios
                        this.setState({visible5:false}, function() {console.log(this.state.visible5)})
                        return null
                    } 
                    else {
                        // shared android
                        this.setState({visible5:false}, function() {console.log(this.state.visible5)})
                        return null
                    }
                } 
                else if (result.action === Share.dismissedAction) {
                    // dismissed
                    this.setState({visible5:false}, function() {console.log(this.state.visible5)})
                    return null
                }
            }

            else {
                const result = await Share.share({
                message:this.state.art[0],
                title:'pollen',
                });
                if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                        // shared ios
                        this.setState({visible5:false}, function() {console.log(this.state.visible5)})
                        return null
                    } 
                    else {
                        // shared android
                        this.setState({visible5:false}, function() {console.log(this.state.visible5)})
                        return null
                    }
                } 
                else if (result.action === Share.dismissedAction) {
                    // dismissed
                    this.setState({visible5:false}, function() {console.log(this.state.visible5)})
                    return null
                }                
            }
        await this.setState( {visible5:false}, function() {console.log(this.state.visible5)} )                                            
        } 
        catch (error) {
            console.log(error)
        }
    }        
    // extra
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
    nav_out(){
        // make art proper size again without name bar
        // empty out comments
        art = []
        comments = [] 
        received_comments = [0,1] 
        height_ = 0
    }   
    which_footer(){
        if(this.state.act_load_color !== 'white') {
            return <ActivityIndicator size='small' animating color ={this.state.act_load_color} style={{height:25,marginTop:10,justifyContent: 'center',alignItems: 'center',}}/>
        }
        else if( this.state.act_load_color == 'white') {
            return <View style={{height:270*factor_hor, paddingTop:20, alignContent:'center', justifyContent:'center', alignItems:'center', }}><Text style={{textAlign:'center', fontSize:22*factor_hor, fontFamily:'Avenir Next', color:'#9B9B9B',}}>No comments! :(</Text><Block width={100*factor_hor} height={100*factor_hor} style={{justifyContent:'center',alignContent:'center',flex: 1, }}/>{ this.state.show_timer && (<Text style={{color:'red', marginTop:10*factor_hor, fontSize:30*factor_hor}}>{this.state.timer}</Text>)}</View> 
        } 
    }    
    async onpress_modal(index) {
        // directs modal to post or comment modal
        if(index == 0) {
            await this.setState( {visible:true}, function() {console.log(this.state.visible)} )
        }
        else {
            await this.setState( {visible5:true}, function() {console.log(this.state.visible5)} )
        }
    }  
    async returndata(hello) {
        height_ = 0
        comments = [ comments[0] ]
        received_comments = [1,2]
        await this.setState( 
        {
            sort:'new',
            comments:comments,
            animating:true,
            show:8,
        },
        function() {console.log(
            this.state.sort,
            this.state.comments,
            this.state.animating,
            this.state.show,
        )})
        
        await this.fetch_comments();
        await this.setState({isFetching:false}, function() {console.log(this.state.isFetching)})
    }   
    show_date(index) {
        date1 = index
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

    render() {
    const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
    };  
    return (
    <View style={styles.container}
          onStartShouldSetResponderCapture={() => {
            this.setState({ enableScrollViewScroll: true });
          }}>
            
        <LinearGradient colors={['white', 'white']} style={{height:80*factor_ver, opacity:0.9, alignSelf:'stretch'}}>
            <View style={{flex:1}}></View>
            <View style={{flex:2,flexDirection:'row'}}>
                <View style={{flex:1, marginTop:7.5*factor_hor,  justifyContent:'center', alignContent:'center',}}>
                    <TouchableOpacity onPress={()=>{  this.props.navigation.goBack() }}>
                        <Icon
                            name='chevron-left'
                            color="black"
                            type='entypo'
                            size={25*factor_hor}
                            style={{marginTop:5}}
                        />      
                    </TouchableOpacity>
                </View>
                <View style={{flex:4,justifyContent:'center', alignContent:'center',}}>
                    <Text onPress={()=>{console.log(this.state.comments)}} style={{textAlign:'center', fontWeight:'300', color:"black", fontSize:26*factor_hor, marginTop:7.5*factor_hor, fontFamily:'Avenir next'}}>
                    comments
                    </Text>
                </View>
                <View style={{flex:1, marginTop:7.5*factor_hor, justifyContent:'center', alignContent:'center', }}>
                    <TouchableOpacity onPress={()=>{this.setState({visible2:true}, function(){console.log(this.state.visible2)})}}>
                        <Icon 
                            size={20*factor_hor}
                            name="select-arrows" 
                            color="black"
                            type='entypo' 
                            style={{marginTop:5}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>

        {/* sFlatlist */}
        <View style={{ flex:1, alignSelf:'stretch', backgroundColor:'white',}}>
                {this.state.animating && ( 
                    <ActivityIndicator size='large' animating={this.state.animating}
                        color = "#FC6026"
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
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isFetching}
                            onRefresh={() => { this.setState({isFetching:true}, function() {console.log(this.state.isFetching)}), this.refresh_feed()} }
                            title="Pull to refresh" tintColor="transparent" titleColor="#ececec"
                        />}

                    onEndReachedThreshold={0.5}
                    onEndReached={ () => {this.reached_end();}}
                    ListFooterComponent={() => this.state.loading_post? null :this.which_footer()}
                    initialNumToRender={8} // render 8 at first
                    maxToRenderPerBatch={8} // render 8 per
                    style={{backgroundColor:'white', height:(Dimensions.get('window').height) -140}}
                    scrollEnabled={!this.state.isSwiping2}
                    keyExtractor={(item,index) => (index).toString()}
                    renderItem={({item, index}) => ( 
                    
                    <View key={index} onLayout={(f) => {this.check_key(f, index)}} style={{ minHeight:10, alignSelf:'stretch', backgroundColor:'white', }}>   

                    {/* post save/flag/block */}
                    <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.visible}
                            onRequestClose={() => {}}
                    >                                        
                        <View style={{height:Dimensions.get('window').height, width:Dimensions.get('window').width, justifyContent:'flex-end', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.8)', opacity:1,}}>
                            <View style={{ alignSelf:'stretch', }}>
                                <View style={{height:80*factor_hor*5.75, marginBottom:20*factor_hor, flexDirection:'row' }}>
                                    <View style={{flex:1, alignSelf:'stretch'}}></View>
                                        <View style={{width:80*factor_hor, alignContent:'center', justifyContent:'center', alignItems:'center', alignSelf:'stretch'}}>
                                            <View style={{flex:1, }}></View>
                                            <View style={{height:80*factor_hor, width:80*factor_hor, borderRadius:40*factor_hor, marginBottom:20*factor_hor, }}>
                                                <TouchableHighlight underlayColor={'transparent'} onPress={ () => {this.share_post()}}>
                                                    <View style={{height:80*factor_hor, width:80*factor_hor, borderRadius:40*factor_hor, backgroundColor:'white'}}>
                                                        <Share_
                                                            width={60*factor_hor}
                                                            height={60*factor_hor}
                                                            style={{
                                                                marginStart:6*factor_hor,
                                                                justifyContent:'center',
                                                                alignContent:'center',
                                                                marginTop:10*factor_ver,
                                                            }}
                                                            />
                                                    </View>
                                                </TouchableHighlight>                                                              
                                            </View>
                                            <View style={{height:80*factor_hor, width:80*factor_hor, borderRadius:40*factor_hor, marginBottom:20*factor_hor, }}>
                                                <TouchableHighlight underlayColor={'transparent'} onPress={ () => {  }}>
                                                    <View style={{height:80*factor_hor, width:80*factor_hor, borderRadius:40*factor_hor,backgroundColor:'white' }}>
                                                        <SendMessage
                                                            width={55*factor_hor}
                                                            height={55*factor_hor}
                                                            style={{
                                                                marginStart:12.5*factor_hor,
                                                                justifyContent:'center',
                                                                alignContent:'center',
                                                                marginTop:12*factor_ver,
                                                            }}
                                                        />
                                                    </View>
                                                </TouchableHighlight>                                                            
                                            </View>                                                
                                            <View style={{height:80*factor_hor, width:80*factor_hor, borderRadius:40*factor_hor, marginBottom:20*factor_hor, }}>
                                                <TouchableHighlight underlayColor={'transparent'} onPress={ () => { this.block_post(); }}>
                                                    <View style={{height:80*factor_hor, width:80*factor_hor, borderRadius:40*factor_hor,backgroundColor:'white' }}>
                                                        <Block 
                                                            width={60*factor_hor}
                                                            height={60*factor_hor}
                                                            style={{
                                                                marginStart:10*factor_hor,
                                                                justifyContent:'center',
                                                                alignContent:'center',
                                                                marginTop:10*factor_ver,
                                                            }}
                                                        />
                                                    
                                                    </View>
                                                </TouchableHighlight>                                                            
                                            </View>
                                            <View style={{height:80*factor_hor, width:80*factor_hor, borderRadius:40*factor_hor, marginBottom:20*factor_hor, }}>
                                                <TouchableHighlight underlayColor={'transparent'} onPress={ () => {this.flag_post(); }}>
                                                    <View style={{height:80*factor_hor, width:80*factor_hor, borderRadius:40*factor_hor, backgroundColor:'white'}}>
                                                        <FlagIcon
                                                            width={60*factor_hor}
                                                            height={60*factor_hor}
                                                            style={{
                                                                marginStart:15*factor_hor,
                                                                justifyContent:'center',
                                                                alignContent:'center',
                                                                marginTop:10*factor_ver,
                                                            }}
                                                        />
                                                    </View>
                                                </TouchableHighlight>                                                               
                                            </View>
                                            <View style={{height:80*factor_hor, width:80*factor_hor, borderRadius:40*factor_hor, marginBottom:20*factor_hor, }}>
                                                <TouchableHighlight underlayColor={'transparent'} onPress={ () => { this.saved_post(); }}>
                                                    <View style={{height:80*factor_hor, width:80*factor_hor, borderRadius:40*factor_hor, backgroundColor:'white'}}>
                                                        <Save
                                                            width={55*factor_hor}
                                                            height={55*factor_hor}
                                                            style={{
                                                                marginStart:12.5*factor_hor,
                                                                justifyContent:'center',
                                                                alignContent:'center',
                                                                marginTop:12*factor_ver,
                                                            }}
                                                        />
                                                    </View>
                                                </TouchableHighlight>
                                                                                                        
                                            </View>
                                            <View style={{flex:1, }}></View>
                                        </View>
                                    <View style={{flex:0.1, alignSelf:'stretch'}}></View>
                                    <View style={{flex:0.9, marginTop:-15*factor_hor, alignSelf:'stretch'}}>
                                        <View style={{width:'100%', alignContent:'center', justifyContent:'center', alignItems:'center', alignSelf:'stretch'}}>
                                            <View style={{flex:1, }}></View>
                                            <View style={{height:80*factor_hor, width:'100%', marginBottom:20*factor_hor, justifyContent:'center', alignContent:'center',}}>
                                                <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>Share</Text>
                                            </View>
                                            <View style={{height:80*factor_hor, width:'100%', marginBottom:20*factor_hor, justifyContent:'center', alignContent:'center',}}>
                                                <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>Message</Text>
                                            </View>                                                
                                            <View style={{height:80*factor_hor, width:'100%', marginBottom:20*factor_hor, justifyContent:'center', alignContent:'center'}}>
                                                <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>{this.block_post_post(this.state.key_status)}</Text>
                                            </View>
                                            <View style={{height:80*factor_hor, width:'100%', marginBottom:20*factor_hor, justifyContent:'center', alignContent:'center'}}>
                                                <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>{this.flag_post_post(this.state.key_status)}</Text>
                                            </View>
                                            <View style={{height:80*factor_hor, width:'100%', marginBottom:20*factor_hor, justifyContent:'center', alignContent:'center'}}>
                                                <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>{this.saved_post_post(this.state.key_status)}</Text>
                                            </View>
                                            <View style={{flex:1, }}></View>
                                        </View>                                                                                    
                                        
                                    </View>
                                </View>
                            </View>
                            <View style={{height:50*factor_hor, marginTop:(10+10*factor_hor), marginBottom:50*factor_ver,}}>
                                <TouchableHighlight underlayColor={'transparent'} onPress={ () => {this.setState({visible:false}, function () {console.log(this.state.visible)})}}>
                                <View style={{height:50*factor_hor, marginBottom:10, width:300*factor_hor, borderRadius:15*factor_hor, backgroundColor:'white'}}>
                                    <Text style={{textAlign:'center', justifyContent:'center', alignContent:'center',
                                    fontFamily:'Avenir Next', fontSize:factor_hor*24*factor_hor, marginTop:6, color:'black' , opacity:1, fontWeight:'600',                      
                                    }}>Done</Text>
                                </View>
                                </TouchableHighlight>                                                    
                            </View>
                        </View>
                    </Modal>                                
                    {/* comment save/flag/block */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.visible5}
                    >                                        
                        <View style={{height:Dimensions.get('window').height, width:Dimensions.get('window').width, justifyContent:'flex-end', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.8)', opacity:1,}}>
                            <View style={{ alignSelf:'stretch', }}>
                                <View style={{height:80*factor_hor*5.75, marginBottom:20*factor_hor, flexDirection:'row' }}>
                                    <View style={{flex:1, alignSelf:'stretch'}}></View>
                                        <View style={{width:80*factor_hor, alignContent:'center', justifyContent:'center', alignItems:'center', alignSelf:'stretch'}}>
                                            <View style={{flex:1, }}></View>
                                            <View style={{height:80*factor_hor, width:80*factor_hor, borderRadius:40*factor_hor, marginBottom:20*factor_hor, }}>
                                                <TouchableHighlight underlayColor={'transparent'} onPress={ () => {this.share_comment(this.state.key_status)}}>
                                                    <View style={{height:80*factor_hor, width:80*factor_hor, borderRadius:40*factor_hor, backgroundColor:'white'}}>
                                                        <Share
                                                        width={60*factor_hor}
                                                        height={60*factor_hor}
                                                        style={{
                                                                marginStart:6*factor_hor,
                                                                justifyContent:'center',
                                                                alignContent:'center',
                                                                marginTop:10*factor_ver,
                                                        }}
                                                        />
                                                    </View>
                                                </TouchableHighlight>                                                              
                                            </View>
                                            <View style={{height:80*factor_hor, width:80*factor_hor, borderRadius:40*factor_hor, marginBottom:20*factor_hor, }}>
                                                <TouchableHighlight underlayColor={'transparent'} onPress={ () => {  }}>
                                                    <View style={{height:80*factor_hor, width:80*factor_hor, borderRadius:40*factor_hor,backgroundColor:'white' }}>
                                                        <SendMessage
                                                            width={55*factor_hor}
                                                            height={55*factor_hor}
                                                            style={{
                                                                marginStart:12.5*factor_hor,
                                                                justifyContent:'center',
                                                                alignContent:'center',
                                                                marginTop:12*factor_ver,
                                                                    }}
                                                            />                            
                                                    </View>
                                                </TouchableHighlight>                                                            
                                            </View>                                                
                                            <View style={{height:80*factor_hor, width:80*factor_hor, borderRadius:40*factor_hor, marginBottom:20*factor_hor, }}>
                                                <TouchableHighlight underlayColor={'transparent'} onPress={ () => { this.block_comment(this.state.key_status); }}>
                                                    <View style={{height:80*factor_hor, width:80*factor_hor, borderRadius:40*factor_hor,backgroundColor:'white' }}>
                                                        <Block
                                                            width={60*factor_hor}
                                                            height={60*factor_hor}
                                                            style={{
                                                                marginStart:10*factor_hor,
                                                                justifyContent:'center',
                                                                alignContent:'center',
                                                                marginTop:10*factor_ver,
                                                                    }}
                                                        />                            
                                                    
                                                    </View>
                                                </TouchableHighlight>                                                            
                                            </View>
                                            <View style={{height:80*factor_hor, width:80*factor_hor, borderRadius:40*factor_hor, marginBottom:20*factor_hor, }}>
                                                <TouchableHighlight underlayColor={'transparent'} onPress={ () => {this.flag_comment(this.state.key_status); }}>
                                                    <View style={{height:80*factor_hor, width:80*factor_hor, borderRadius:40*factor_hor, backgroundColor:'white'}}>
                                                        <FlagIcon
                                                        width={60*factor_hor}
                                                        height={60*factor_hor}
                                                            style={{
                                                                marginStart:15*factor_hor,
                                                                justifyContent:'center',
                                                                alignContent:'center',
                                                                marginTop:10*factor_ver,
                                                                    }}
                                                        />
                                                    </View>
                                                </TouchableHighlight>                                                               
                                            </View>
                                            <View style={{height:80*factor_hor, width:80*factor_hor, borderRadius:40*factor_hor, marginBottom:20*factor_hor, }}>
                                                <TouchableHighlight underlayColor={'transparent'} onPress={ () => { this.saved_comment(this.state.key_status); }}>
                                                    <View style={{height:80*factor_hor, width:80*factor_hor, borderRadius:40*factor_hor, backgroundColor:'white'}}>
                                                        <Save
                                                        width={55*factor_hor}
                                                        height={55*factor_hor}
                                                            style={{
                                                                marginStart:12.5*factor_hor,
                                                                justifyContent:'center',
                                                                alignContent:'center',
                                                                marginTop:12*factor_ver,
                                                                    }}
                                                            />                              
                                                    </View>
                                                </TouchableHighlight>
                                                                                                        
                                            </View>
                                            <View style={{flex:1, }}></View>
                                        </View>
                                    <View style={{flex:0.1, alignSelf:'stretch'}}></View>
                                    <View style={{flex:0.9, marginTop:-15*factor_hor, alignSelf:'stretch'}}>
                                        <View style={{width:'100%', alignContent:'center', justifyContent:'center', alignItems:'center', alignSelf:'stretch'}}>
                                            <View style={{flex:1, }}></View>
                                            <View style={{height:80*factor_hor, width:'100%', marginBottom:20*factor_hor, justifyContent:'center', alignContent:'center',}}>
                                                <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>Share</Text>
                                            </View>
                                            <View style={{height:80*factor_hor, width:'100%', marginBottom:20*factor_hor, justifyContent:'center', alignContent:'center',}}>
                                                <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>Message</Text>
                                            </View>                                                
                                            <View style={{height:80*factor_hor, width:'100%', marginBottom:20*factor_hor, justifyContent:'center', alignContent:'center'}}>
                                                <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>{this.block_comment_comment(this.state.key_status)}</Text>
                                            </View>
                                            <View style={{height:80*factor_hor, width:'100%', marginBottom:20*factor_hor, justifyContent:'center', alignContent:'center'}}>
                                                <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>{this.flag_comment_comment(this.state.key_status)}</Text>
                                            </View>
                                            <View style={{height:80*factor_hor, width:'100%', marginBottom:20*factor_hor, justifyContent:'center', alignContent:'center'}}>
                                                <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>{this.saved_comment_comment(this.state.key_status)}</Text>
                                            </View>
                                            <View style={{flex:1, }}></View>
                                        </View>                                                                                    
                                        
                                    </View>
                                </View>
                            </View>
                            <View style={{height:50*factor_hor, marginTop:(10+10*factor_hor), marginBottom:50*factor_ver,}}>
                                <TouchableHighlight underlayColor={'transparent'} onPress={ () => {this.setState({visible5:false}, function () {console.log(this.state.visible5)})}}>
                                <View style={{height:50*factor_hor, marginBottom:10, width:300*factor_hor, borderRadius:15*factor_hor, backgroundColor:'white'}}>
                                    <Text style={{textAlign:'center', justifyContent:'center', alignContent:'center',
                                    fontFamily:'Avenir Next', fontSize:factor_hor*24*factor_hor, marginTop:6, color:'black' , opacity:1, fontWeight:'600',                      
                                    }}>Done</Text>
                                </View>
                                </TouchableHighlight>                                                    
                            </View>
                        </View>
                    </Modal>                                
                    {/* comment picture click */}
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
                                onSwipe={(direction, state) => this.onSwipeComments(direction, state)}

                                onSwipeUp={ (state) => this.onSwipeUpComments(state) }
                                onSwipeDown={ (state) => this.onSwipeDownComments(state) }
                                onSwipeLeft={ (state) => this.onSwipeLeftComments(state) }
                                onSwipeRight={ (state) => this.onSwipeRightComments(state) }
                                
                                config={config}
                                style={{flex:1, backgroundColor: 'black'}}
                            >
                                <View style={{height:850, width:375, backgroundColor:'black', justifyContent:'center', alignContent:'center'}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', alignItems:'flex-end', backgroundColor:'black'}}>
                                        <TouchableHighlight underlayColor={'transparent'} onPress={() => {this.setState( {visible3:false} )}} style={{marginEnd:25, paddingBottom:0, marginTop:10, paddingTop:30}} >
                                            <Icon 
                                                size={40}
                                                name="cross"
                                                color="#9B9B9B"
                                                type='entypo'
                                            />
                                        </TouchableHighlight>
                                    </View>
                                    <View style={{flex:9}}>
                                        <FastImage 
                                        resizeMode={FastImage.resizeMode.contain}
                                            source={ {uri: `http://${serverLocation}/${comments[this.state.clicked_image_comments][11]}` }}
                                            style={{ flex:1, paddingRight:1, paddingLeft:1, marginLeft:-1, width:Dimensions.get('window').width, height:Dimensions.get('window').width-2, resizeMode:'contain'}}
                                        />
                                    </View>
                                    <View style={{flex:1}}></View>
                                </View>
                            </GestureRecognizer>
                        </DialogContent>
                    </Dialog>   
                    {/* click sort comments */}
                    <Modal
                        animationType="none"
                        transparent={true}
                        visible={this.state.visible2}
                    >   
                        <View style={{height:Dimensions.get('window').height, width:Dimensions.get('window').width, justifyContent:'flex-end', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.8)',}}>
                            <View style={{height:80*factor_hor*2.5, flexDirection:'row', alignSelf:'stretch'}}>     
                                    <View style={{flex:1, }}></View>
                                    <View style={{width:80*factor_hor, }}>
                                        {/* buffer */}
                                        <View style={{flex:0.3, }}></View>
                                        {/* buffer */}
                                        <View style={{flex:1, }}></View>
                                        {/* Hot image */}
                                        <View style={{height:90*factor_hor,}}>
                                            <TouchableHighlight onPress={()=>{this.hot_click()}} underlayColor={'transparent'}>
                                                <View style={{height:80*factor_hor, width:80*factor_hor, marginBottom:25*factor_hor, borderRadius:40*factor_hor, backgroundColor:'white'}}>
                                                    <Hot
                                                        width={60*factor_hor}
                                                        height={60*factor_hor}
                                                        style={{
                                                            marginStart:9*factor_hor,
                                                            justifyContent:'center',
                                                            alignContent:'center',
                                                            marginTop:7.5*factor_ver,
                                                                }}
                                                    />                             
                                                </View>
                                            </TouchableHighlight>                                                     
                                        </View>
                                        {/* buffer */}
                                        <View style={{flex:0.3, }}></View>
                                        {/* New image */}
                                        <View style={{height:90*factor_hor, }}>
                                            <TouchableHighlight onPress={()=>{this.new_click()}} underlayColor={'transparent'}>
                                                <View style={{height:80*factor_hor, width:80*factor_hor,marginBottom:25*factor_hor, borderRadius:40*factor_hor, backgroundColor:'white'}}>
                                                    <New
                                                        width={60*factor_hor}
                                                        height={60*factor_hor}
                                                        style={{
                                                                marginStart:10*factor_hor,
                                                                justifyContent:'center',
                                                                alignContent:'center',
                                                                marginTop:10*factor_ver,
                                                            }}
                                                    />
                                                </View>
                                            </TouchableHighlight>                                                     
                                        </View>
                                        <View style={{flex:1, }}></View>
                                    </View>
                                    <View style={{flex:0.1,}}></View>
                                    <View style={{flex:0.9,}}>
                                    {/* buffer */}
                                        <View style={{flex:0.3, }}></View>
                                        <View style={{flex:1, marginBottom:-12.5,}}></View>
                                        {/* Hot word */}
                                        <View style={{height:90*factor_hor, width:'100%', justifyContent:'center', alignContent:'center',}}>
                                            <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>Hot</Text>
                                        </View>
                                        {/* buffer */}
                                        <View style={{flex:0.3, }}></View>
                                        {/* New word */}
                                        <View style={{height:90*factor_hor, width:'100%', justifyContent:'center', alignContent:'center',}}>
                                            <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>New</Text>
                                        </View>
                                        {/* buffer */}
                                        <View style={{flex:1, }}></View>                                                  
                                    </View>

                            </View>
                            
                            <View style={{height:50*factor_hor, marginTop:20*factor_hor, justifyContent:'center', alignItems:'center', alignContent:'center', marginBottom:70*factor_ver,}}>      
                                <TouchableHighlight underlayColor={'transparent'} onPress={ () => {this.setState({visible2:false}, function () {console.log(this.state.visible2)})}}>
                                    <View style={{height:50*factor_hor, marginBottom:10, width:300*factor_hor, borderRadius:15*factor_hor, backgroundColor:'white'}}>
                                        <Text style={{textAlign:'center', justifyContent:'center', alignContent:'center',
                                            fontFamily:'Avenir Next', fontSize:factor_hor*24*factor_hor, marginTop:6, color:'black' , opacity:1, fontWeight:'600',                      
                                            }}>Done</Text>
                                    </View>
                                </TouchableHighlight>                                                    
                            </View>
                        </View>
                    </Modal> 
                                        
                        <Swipeable  
                            onSwipeStart={() => this.setState({isSwiping2: true})}
                            onSwipeRelease={() => this.setState({isSwiping2: false})}
                            leftActionActivationDistance={Dimensions.get('window').width/5}   leftContent={<View style={{height:this.state.comments[index][18], borderRadius:15, justifyContent:'center', alignContent:'center', backgroundColor:'rgba(255, 0, 0, 1)'}}><Text style={{textAlign:'right', fontWeight:'600', color:'white', fontSize:34,  paddingRight:50,}}>- 1</Text></View>}
                            rightActionActivationDistance={Dimensions.get('window').width/5} rightContent={<View style={{height:this.state.comments[index][18], borderRadius:15, justifyContent:'center', alignContent:'center', backgroundColor:'rgba(113, 233, 42, 1)'}}><Text style={{textAlign:'left', fontWeight:'600', color:'white',fontSize:34, paddingLeft:50,}}>+ 1</Text></View>}

                            onLeftActionRelease={() => {this.votedown_comments(index)}} 
                            onRightActionRelease={() => {this.voteup_comments(index)}} 
                            >
                        
                        <View style={{
                            borderTopLeftRadius:20,
                            borderTopRightRadius:20,
                            borderTopLeftWidth:1,
                            borderTopRightWidth:1,
                            borderLeftColor:'#ececec',
                            borderLeftWidth:1, 
                            borderRightColor:'#ececec',
                            borderRightWidth:1,
                            borderTopWidth:0.25,
                            borderTopColor:'#ececec',
                            backgroundColor:'white'
                            }}>

                        <View style={{height:15}}></View>
                        <View style={{height:25*factor_hor, flexDirection:'row', }}>
                            <View style={{width:12*factor_hor2, }}></View>
                            <View style={{flex:1, justifyContent:'center', alignContent:'center',backgroundColor:'white'}}>
                                <TouchableHighlight underlayColor={'transparent'} onPress={()=> {this.gotoprofile_comments(index)} }>
                                    <Text   
                                        style={{textAlign:'left', marginStart:5, color:'#9B9B9B', 
                                        fontSize:18*factor_hor,fontFamily:'Avenir next',
                                    }}>{this.state.comments[index][5]}</Text>
                                </TouchableHighlight>                                    
                            </View>
                            <View style={{flex:0.4,}}></View>
                            <View hitSlop={{top: 10, bottom: 10, left: 20, right: 20}} style={{flex:0.4,}}>
                            </View>                          
                            <View style={{width:15*factor_hor, }}></View> 
                        </View>
                        <View style={{height:4*factor_hor}}></View>


                                <TouchableOpacity 
                                                underlayColor={'transparent'} style={{marginTop:5, marginBottom:0, backgroundColor:'white', alignContent:'center', justifyContent:'center'}}>
                                <Text 
                                    numberOfLines={6}
                                    style={{textAlign:'left', marginLeft:20, marginEnd:20, marginTop:-10, lineHeight:30, fontFamily:'avenir next', fontSize:factor_hor*18, fontWeight:'normal'}}>{this.state.comments[index][0]}
                                </Text>
                            </TouchableOpacity>        
                            <TouchableOpacity 
                                    underlayColor={'transparent'} onPress={ () => { this.clicked_image_comments(index) }}>
                                    { this.render_image_comments(index) && ( 
                                        <FastImage
                                        resizeMode={FastImage.resizeMode.contain}
                                                source={ {uri: `http://${serverLocation}/${this.state.comments[index][11]}` }}
                                                style={{ flex:1, marginLeft:-1, width:Dimensions.get('window').width, height:Dimensions.get('window').width, resizeMode:'contain'}}
                                    /> )}
                            </TouchableOpacity>                    
                        </View>
                        <TouchableOpacity>
                        
                        
                        
                        <View style={{height:40*factor_hor, justifyContent:'center', alignContent:'center', flexDirection:'row', }}>
                            <View style={{flex:0.3, borderLeftColor:'#ececec',backgroundColor:'white',borderBottomColor:'#ececec', borderBottomLeftRadius:50, borderBottomWidth:1, borderLeftWidth:1,}}>
                            </View>
                            <View style={{width:20, borderBottomColor:'#ececec',borderBottomWidth:0.25,}}>
                                <View style={{height:20, marginTop:10*factor_ver, width:20, justifyContent:'center', alignContent:'center',
                                        alignItems:'center', backgroundColor:(this.state.comments[index][15]), borderRadius:10}}>
                                    <Text style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                </View>
                            </View>
                            <View style={{flex:3, paddingLeft:5, flexDirection:'row', justifyContent:'space-around', alignContent:'space-around',borderBottomColor:'#ececec',borderBottomWidth:0.25, }}>
                                <View style={{flex:1.15, justifyContent:'center', alignContent:'center',}}>
                                    <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(this.state.comments[index][13] )}</Text>                    
                                </View>
                                <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                    <Text style={{textAlign:'center', marginEnd:15, fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes_comments(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
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
                                        <Text style={{color:'#979797', marginEnd:10, textAlign:'left'}}>{this.state.comments[index][3]}</Text>                   
                                    </View>
                                </View>                      
                                <View style={{flex:0.5, justifyContent:'center', alignContent:'center',}}>
                                    <TouchableOpacity onPress={() => {
                                                                        this.props.navigation.navigate('CREATE_COMMENT', {art:this.state.art})
                                                                        this.props.navigation.navigate('CREATE_COMMENT', {returndata: this.returndata.bind(this)} )
                                                                    }}>
                                        <Icon
                                                name='reply'
                                                color='#979797'
                                                type='entypo'
                                                size={18*factor_hor}
                                        />   
                                    </TouchableOpacity>                                
                                </View>
                            </View>              
                            <View style={{flex:0.3, backgroundColor:'white',borderBottomColor:'#ececec', borderRightColor:'#ececec', borderBottomRightRadius:50, borderBottomWidth:1, borderRightWidth:1, }}>
                        </View>
                        </View>                        
                        
                        </TouchableOpacity>   
                        </Swipeable>
                    </View>
                    )}/>
                )}
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
  },
});
