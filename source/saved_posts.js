import React, {Component} from 'react';
import {StyleSheet, Text, ActivityIndicator, View, Dimensions,
        TouchableOpacity, RefreshControl, FlatList, AsyncStorage, 
        Share, Platform, TouchableHighlight} from 'react-native';
import { Icon, } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image'
import Svg, { Path } from 'react-native-svg';
import Eye from './svgs/eye'

var comments = []

export default class saved_posts extends React.Component {
    static navigationOptions = {header: null};
    constructor(props) {
        super(props);
        this.state = {
            
            // arguments for fetch profile and fetch posts
            username:'', // async 
            received_posts:[1,0],
            received_comments:[1,0],
            
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
            
            // modals
            visible:false, // modal left
            visible2:false, // modal right
        }
    }

    async componentDidMount() {
        try {
            username = await AsyncStorage.getItem('user')
            this.setState({username:username})
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
        if(this.state.show < this.state.comments.length ) {
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
        url = `http://${serverLocation}:80/posts_saved`
        await fetch(url, {
            method:'POST',
            headers:{    
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
            body: 
            JSON.stringify({
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
                console.log(error)
            });
            await this.setState({
                isFetching:false,
                loading_posts:false,
                animating:false
            })
            
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

    // posts
    which_footer(){
        if(this.state.act_load_color !== 'white') {
            return <ActivityIndicator size='small' animating color ={this.state.act_load_color} style={{height:25,marginTop:10,justifyContent: 'center',alignItems: 'center',}}/>
        }
        else if( this.state.act_load_color == 'white') {
            return <View style={{height:0}}></View>
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
    // invite on right modal 
    share_post = async () => {
        try {
            if (true == true) {
            const result = await Share.share({
            title:'Pollen',
            message:'Download Pollen here: ',
            url:'/Users/kentonpalmer/Pollen7/source/icon.png',
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

            else {
                const result = await Share.share({
                message:art[key][7],
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
    show_date(date) {
        date1 = date
        date2 = Math.floor(Date.now()/1000)
        date = date2 - date1
        console.log(date)
        // minutes
        if(date < 3600) {
            mins = Math.floor(date/60)
            console.log(1)
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
            console.log(3)
            return days+'d'
        }
        // weeks
        else if(date > 604800 && date <= 2678400 ) {
            weeks = Math.floor(date/604800)
            console.log(weeks, 'hello')
            return weeks+'w'
        }
        // months
        else if(date > 2678400 && date <= 32140800 ) {
            months = Math.floor(date/2678400)
            console.log(5)
            return months+'m'
        }
        else {
            years = Math.floor(date/32140800)
            console.log(6)
            return years+'y'
        }
        this.setState({comments:this.state.comments})
    }

    render() {
    const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };
    return (
    <View style={styles.container}>
        
        {/* Saved Posts */}
        <LinearGradient colors={['white', 'white']} style={{height:80*factor_ver, opacity:0.9, alignSelf:'stretch'}}>
            <View style={{flex:1}}></View>
            <View style={{flex:1.75,flexDirection:'row'}}>
                <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                        <Icon
                            name='chevron-left'
                            color='black'
                            type='entypo'
                            size={25*factor_hor}
                            style={{marginTop:10*factor_hor}}
                        />      
                    </TouchableOpacity>
                </View>
                <View style={{flex:4,justifyContent:'center', alignContent:'center',}}>
                    <Text style={{textAlign:'center', color:'black', fontSize:26*factor_hor,fontWeight:'300',  fontFamily:'Avenir next'}}>
                        saved
                    </Text>
                </View>
                <View style={{flex:1,justifyContent:'center', alignContent:'center', }}>
                </View>
            </View>
        </LinearGradient>
    
            <View style={{flex:1, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
                {/* Posts */}
                <View style={{flex:1, alignSelf:'stretch', }}> 
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
                        
                        // refresh
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isFetching}
                                onRefresh={() => { this.setState({isFetching:true}, function() {console.log(this.state.isFetching)}), this.refresh_feed()} }
                                title="" tintColor="transparent" titleColor="#FC6026"
                            />}

                        onEndReachedThreshold={0.5}
                        onEndReached={() => {this.reached_end();}}
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
                                        this.props.navigation.navigate('VIEW_COMMENT_PROFILE', { 
                                            x: {
                                                postID:this.state.comments[index][3], 
                                                comment_or_post:this.state.comments[index][10], 
                                                object_height:this.state.comments[index][11],
                                            }
                                        })
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
                                <View style={{width:15*factor_hor,backgroundColor:'white'  }}></View> 
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
                                                    style={{ flex:1.1, backgroundColor:'white', marginLeft:-1,width:Dimensions.get('window').width, height:Dimensions.get('window').width, }}
                                        /> )}
                            </View>                    
                            </View>
                            
                            <View style={{height:40*factor_hor, justifyContent:'center', alignContent:'center', flexDirection:'row', }}>
                                <View style={{flex:0.3, borderLeftColor:'#ececec',backgroundColor:'white',borderBottomColor:'#ececec', borderBottomLeftRadius:50, borderBottomWidth:1, borderLeftWidth:1,}}></View>
                                <View style={{width:10,backgroundColor:'white' , borderBottomColor:'#ececec',borderBottomWidth:0.25,}}>
                                    <View style={{height:20, marginTop:10*factor_ver, width:20, justifyContent:'center', alignContent:'center',alignItems:'center',borderRadius:10}}></View>
                                </View>
                                <View style={{flex:3,backgroundColor:'white' , paddingLeft:5, flexDirection:'row', justifyContent:'space-around', alignContent:'space-around',borderBottomColor:'#ececec',borderBottomWidth:0.25, }}>
                                    <View style={{flex:1.15, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{ this.show_date(this.state.comments[index][5]) }</Text>
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
                            </TouchableOpacity>
                        </View>
                        
                        )}/>
                    )}                                 
                </View>                        
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
