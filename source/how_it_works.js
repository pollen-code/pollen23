import React, {Component} from 'react';
import {StyleSheet, AsyncStorage, Dimensions, ScrollView, 
        Text, View, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements'
import Svg, { Path } from 'react-native-svg';
import PlayButton from './svgs/play_button';

export default class how_it_works extends React.Component {
    static navigationOptions = {header: null};
    constructor(props) {
        super(props);
        this.state = {
            feed:false,
            world:false,
            new:false, 
            posting:false,
            commenting:false,

            rooms:false, 
            joining:false,
            making:false, 
            landing:false,
            options:false, 

            profile:false, 
            profile_land:false, 
            modify:false, 
            external:false, 

            messaging:false, 
            options_msg:false, 

            map:false, 
            options_map:false,

            username:''
        }
    }

    async componentDidMount() {
        this.setState({ username:(await AsyncStorage.getItem('user')) })
        console.log(this.state.username)
    }

    play_video(){
        return null
    }
  
    render() {

      return (

        <View style={styles.container}>
                 
                <View style={{height:'5%'}}></View>
                <View style={{height:'5%',  flexDirection:'row', borderBottomColor:'#9B9B9B', borderBottomWidth:0, alignSelf:'stretch', justifyContent:'center', justifyContent:'center', alignItems:'center'}}>
                    <View style={{flex:1, marginTop:4*factor_hor, alignSelf:'stretch' }}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={{marginStart:0}} >
                            <Icon 
                                name="chevron-left"
                                color="#9b9b9b"
                                type='entypo'
                                size={25*factor_hor}
                            />
                        </TouchableOpacity>               
                    </View>    
                    <View style={{flex:7, }}>    
                        <Text style={{textAlign:'center', justifyContent:'center', alignItems:'center', alignContent:'center', fontSize:24*factor_hor, fontFamily:'Avenir next', fontWeight:'500', color:'black'}}>How It Works</Text>
                    </View>
                    <View style={{flex:1}}></View>
                </View>    
                <View style={{height:'3%',marginLeft:30*factor_hor, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
                </View>



                <ScrollView style={{view:1, alignSelf:'stretch', paddingBottom:20, marginEnd:10*factor_hor, marginStart:10*factor_hor,}}>        
                    <View style={{flex:1, paddingBottom:20, flexDirection:'row'}}>

                        <View style={{alignSelf:'stretch', marginLeft:30*factor_hor, flex:1,}}>
                            <TouchableOpacity onPress={() => {this.setState( {feed:!this.state.feed}) }}>
                                <View style={{ justifyContent:'center', flexDirection:'row', alignContent:'center', height:50*factor_hor, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:10*factor_hor}}>
                                    <View style={{flex:1}}>
                                        <Text style={{fontFamily:'avenir next', fontWeight:'500', fontSize:25*factor_hor}}>Feed</Text>
                                    </View>
                                    <View style={{flex:0.25}}>
                                        { !this.state.feed && (
                                        <Icon 
                                            name="chevron-right"
                                            color="#9b9b9b"
                                            type='entypo'
                                            size={25*factor_hor}
                                        />
                                        )}
                                        { this.state.feed && (
                                        <Icon 
                                            name="chevron-down"
                                            color="#9b9b9b"
                                            type='entypo'
                                            size={25*factor_hor}
                                        />  
                                        )}                                      
                                    </View>
                                </View>           
                            </TouchableOpacity>
                            {this.state.feed && (
                            <View style={{marginLeft:30*factor_hor}}>
                                
                                <TouchableOpacity onPress={() => {this.setState( {world:!this.state.world}) }}>
                                    <View style={{height:50*factor_hor, borderBottomColor:'#9b9b9b', borderBottomWidth:0, marginTop:5, justifyContent:'center', alignContent:'center' }}>
                                        <Text style={{fontFamily:'avenir next', fontWeight:'300', fontSize:20*factor_hor}}>World, city, local</Text>
                                    </View>
                                </TouchableOpacity>  
                                {this.state.world && (
                                    <Text style={{marginTop:5, fontSize:18*factor_hor}}>
                                        When you land on the feed, you'll see posts on the city level, which shows you posts in a one mile radius. If you click local, you will see posts 
                                        in a 600 meter radius. The highest rated posts from local and city will be shown in the world feed. 
                                        {"\n"}{"\n"}
                                        You can click on images to see them in full screen, and 
                                        you can press and hold below an image or above it to see a menu where you can save, block, flag, or share the post; there is also an 
                                        option for messaging the poster. However, if the poster has turned off receiving messages, then your message will 
                                        not be delivered. 
                                        {"\n"}{"\n"}
                                        You can tap the space below or above a post to see the comments and or make a comment. 
                                        {"\n"}{"\n"}
                                        Lastly, you can swipe the post left or right to upvote or downvote it.  
                                    </Text>
                                )}
                                
                                <TouchableOpacity onPress={() => {this.setState( {new:!this.state.new}) }}>
                                    <View style={{height:50*factor_hor, borderBottomColor:'#9b9b9b', borderBottomWidth:0, marginTop:5, justifyContent:'center', alignContent:'center' }}>
                                        <Text style={{fontFamily:'avenir next', fontWeight:'300', fontSize:20*factor_hor}}>Hot, new, following</Text>
                                    </View>
                                </TouchableOpacity>
                                {this.state.new && (
                                    <Text style={{marginTop:5, fontSize:18*factor_hor}}>
                                        Automatically, the feed is set to show popular (hot) posts, but if you click new you will see posts in chronological order.
                                        
                                        {"\n"}{"\n"} 
                                        If you click followers, you will see posts from those who you're following. By default, posts are made under the 'Anonymous' name. 
                                        When a user makess a post anonymously, the post will not be visible to viewers of your profile, and it will not show up in followers feed.
                                        If a user sets an anonymous post to visible under modify profile, then it will come up in followers feed.
                                        Lastly, you must follow at least 25 people to use the following feed.
                                    </Text>
                                )}
                                
                                <TouchableOpacity onPress={() => {this.setState( {posting:!this.state.posting}) }}>
                                    <View style={{height:50*factor_hor, borderBottomColor:'#9b9b9b', borderBottomWidth:0, marginTop:5, justifyContent:'center', alignContent:'center' }}>
                                        <Text style={{fontFamily:'avenir next', fontWeight:'300', fontSize:20*factor_hor}}>Making a post</Text>
                                    </View>
                                </TouchableOpacity>  
                                {this.state.posting && (
                                    <Text style={{marginTop:5, fontSize:18*factor_hor}}>
                                        You can create a post by clicking the top right icon on the feed. When you create a post, your username defaults to anonymous.
                                        Otherwise, you can click the button named "Anon" if you want to use your username. 
                                        If you make a post anonymously, the post is automatically set so that no one can see it when visiting your profile, and none of 
                                        your followers will see it in their following feeds. The same rules persist for creating comments. 
                                    </Text>
                                )}    
                                
                                <TouchableOpacity onPress={() => {this.setState( {commenting:!this.state.commenting}) }}>
                                    <View style={{height:50*factor_hor, borderBottomColor:'#9b9b9b', borderBottomWidth:0, marginTop:5, justifyContent:'center', alignContent:'center' }}>
                                        <Text style={{fontFamily:'avenir next', fontWeight:'300', fontSize:20*factor_hor}}>Commenting</Text>
                                    </View>
                                </TouchableOpacity>  
                                {this.state.commenting && (                                        
                                    <Text style={{marginTop:5, fontSize:18*factor_hor}}>
                                        The rules from making a post persist for creating comments. However, there are two differences when viewing comments:
                                        {"\n"}{"\n"} 
                                        1) You will see colored dots with numbers in them on each comment. These dots are used as a way to identify who is commenting. 
                                        Otherwise, you could make a post under your username and then post anonymously to stir stuff up.
                                        {"\n"}{"\n"} 
                                        2) You will see the usernames of posters and commenters. If the users chose to create posts/comments anonymously, then the names 
                                        will just show up as "Anonymous"
                                    </Text>
                                )}
                            </View>              
                            )}

                            <TouchableOpacity onPress={() => { this.setState({rooms:!this.state.rooms}) }}>
                                <View style={{ justifyContent:'center', flexDirection:'row', alignContent:'center', height:50*factor_hor, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:10*factor_hor}}>
                                    <View style={{flex:1}}>
                                        <Text style={{fontFamily:'avenir next', fontWeight:'500', fontSize:25*factor_hor}}>Rooms</Text>
                                    </View>
                                    <View style={{flex:0.25}}>
                                        { !this.state.rooms && (
                                        <Icon 
                                            name="chevron-right"
                                            color="#9b9b9b"
                                            type='entypo'
                                            size={25*factor_hor}
                                        />)}
                                        { this.state.rooms && (
                                            <Icon 
                                                name="chevron-down"
                                                color="#9b9b9b"
                                                type='entypo'
                                                size={25*factor_hor}
                                            />)}
                                                                                    
                                    </View>
                                </View>            
                            </TouchableOpacity>
                            {this.state.rooms && (
                                <View style={{marginLeft:30*factor_hor}}>
                                    <TouchableOpacity onPress={() => {this.setState( {landing:!this.state.landing}) }}>
                                        <View style={{height:50*factor_hor, borderBottomColor:'#9b9b9b', borderBottomWidth:0.25, marginTop:5, justifyContent:'center', alignContent:'center' }}>
                                            <Text style={{fontFamily:'avenir next', fontWeight:'300', fontSize:20*factor_hor}}>Landing on rooms page</Text>
                                        </View>
                                    </TouchableOpacity>  
                                    {this.state.landing && (
                                        <Text style={{marginTop:5, fontSize:18*factor_hor}}>
                                            When you land on the rooms page, you can scroll down to see my rooms, rooms, and people. 
                                            {"\n"}{"\n"}                                
                                            "My rooms" shows you the rooms that you're currently in. 
                                            {"\n"}{"\n"} 
                                            "Rooms" shows you the rooms around you.
                                            {"\n"}{"\n"} 
                                            "People" shows you the people around you who do not have private mode on. 
                                            {"\n"}{"\n"} 
                                            You can sort rooms and my rooms by hot, distance, or by searching for a room. If you select order by 
                                            what is hot, then the most active rooms in your location will come up. If you select to order by 
                                            what is close, then the closest rooms to you will come up. You can also search specific room names 
                                            in the search bar. Lastly, you can filter the rooms you see.    
                                        </Text>
                                    )}

                                    <TouchableOpacity onPress={() => {this.setState( {joining:!this.state.joining}) }}>
                                        <View style={{height:50*factor_hor, borderBottomColor:'#9b9b9b', borderBottomWidth:0.25, marginTop:5, justifyContent:'center', alignContent:'center' }}>
                                            <Text style={{fontFamily:'avenir next', fontWeight:'300', fontSize:20*factor_hor}}>Joining a room</Text>
                                        </View>
                                    </TouchableOpacity>  
                                    {this.state.joining && (
                                        <Text style={{marginTop:5, fontSize:18*factor_hor}}>
                                            The rooms that have an unlocked icon allow anyone in their specified range to join them.
                                            If the room has a lock symbol, then you must know the password to join it. You may get a 
                                            room preview by clicking on unlocked rooms. Lastly, if the room is locked, you can send the 
                                            room leader a request to join the room. 
                                        </Text>
                                    )}
                                    
                                    <TouchableOpacity onPress={() => {this.setState( {making:!this.state.making}) }}>
                                        <View style={{height:50*factor_hor, borderBottomColor:'#9b9b9b', borderBottomWidth:0.25, marginTop:5, justifyContent:'center', alignContent:'center' }}>
                                            <Text style={{fontFamily:'avenir next', fontWeight:'300', fontSize:20*factor_hor}}>Making a room</Text>
                                        </View>
                                    </TouchableOpacity>
                                    {this.state.making && (
                                        <Text style={{marginTop:5, fontSize:18*factor_hor}}>
                                            When you make a room, you must answer a few questions: 
                                            {"\n"}{"\n"}
                                            Do you want the room to be a "Walk away with" room or a "Must be here" room.
                                            A "walk away with" room means you can be in range at first and leave the 
                                            range of the room and still talk in the room. This may be useful if you go 
                                            to a party and want to talk to people later, for example. On the other hand, 
                                            "must be here" rooms require you to stay in range of the convo to talk. This may be useful for 
                                            an event or convention for example. 
                                            {"\n"}{"\n"}
                                            Do you want it to be open to everyone, or only invited people & those with the password? 
                                            {"\n"}{"\n"}
                                            Do you want to allow people with anonymous names? 
                                            {"\n"}{"\n"}
                                            Do you want the initial range of the room to be world, city, or local? 
                                            {"\n"}{"\n"}
                                            What group name do you want?
                                            {"\n"}{"\n"}
                                            How many people are allowed in the group?
                                            {"\n"}{"\n"}
                                            Is this an admin only group? Admin only groups are one way conversations - useful for telling your 
                                            friends information without conversation. 
                                        </Text>
                                    )}

                                    <TouchableOpacity onPress={() => {this.setState( {options:!this.state.options}) }}>
                                        <View style={{height:50*factor_hor, borderBottomColor:'#9b9b9b', borderBottomWidth:0.25, marginTop:5, justifyContent:'center', alignContent:'center' }}>
                                            <Text style={{fontFamily:'avenir next', fontWeight:'300', fontSize:20*factor_hor}}>Invites and privacy</Text>
                                        </View>
                                    </TouchableOpacity>
                                    {this.state.options && (
                                        <Text style={{marginTop:5, fontSize:18*factor_hor}}>
                                            If you click the icon on the top left of the rooms page, you will see that you can control whether or not people can send you invites, 
                                            and whether or not you will be seen under the people section. You can turn invites off if you're not open to joining groups, and you can 
                                            turn private mode on if you don't want to show up in the people section. 
                                            {"\n"}{"\n"} 
                            
                                        </Text>
                                    )}                        
                                </View>              
                            )}                            
                            <TouchableOpacity onPress={() => { this.setState({profile:!this.state.profile}) }}>
                                <View style={{ justifyContent:'center', flexDirection:'row', alignContent:'center', height:50*factor_hor, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:10*factor_hor}}>
                                    <View style={{flex:1}}>
                                        <Text style={{fontFamily:'avenir next', fontWeight:'500', fontSize:25*factor_hor}}>Profile</Text>
                                    </View>
                                    <View style={{flex:0.25}}>
                                        <Icon 
                                            name="chevron-right"
                                            color="#9b9b9b"
                                            type='entypo'
                                            size={25*factor_hor}
                                        />
                                    </View>
                                </View>           
                            </TouchableOpacity>
                            {this.state.profile && (
                                <View style={{marginLeft:30*factor_hor}}>
                                    <TouchableOpacity onPress={() => {this.setState( {profile_land:!this.state.profile_land}) }}>
                                        <View style={{height:50*factor_hor, borderBottomColor:'#9b9b9b', borderBottomWidth:0.25, marginTop:5, justifyContent:'center', alignContent:'center' }}>
                                            <Text style={{fontFamily:'avenir next', fontWeight:'300', fontSize:20*factor_hor}}>Landing on profile page</Text>
                                        </View>
                                    </TouchableOpacity>  
                                    {this.state.profile_land && (
                                        <Text style={{marginTop:5, fontSize:18*factor_hor}}>
                                            When you land on the profile page you will see your name, bio, followers, following, about, questions, and posts. 
                                            {"\n"}{"\n"}                                
                                            If you click on followers or following you will see a list, and you can swipe to unfollow people.
                                            {"\n"}{"\n"}                                
                                            On the top left is a plus icon and the top right is a settings icon. 
                                            If you click the plus you will see: 
                                            {"\n"}{"\n"}                                
                                            saved posts - a place for saved posts and comments
                                            {"\n"}{"\n"}                                
                                            blocked users - a list of blocked users, you can unblock users here
                                            {"\n"}{"\n"}                                
                                            external view - you can see your profile as if you were someone else
                                            {"\n"}{"\n"}                                
                                            modify profile - you can change answers to questions and change who sees what
                                            {"\n"}{"\n"}                                
                                            
                                        </Text>
                                    )}

                                    <TouchableOpacity onPress={() => {this.setState( {modify:!this.state.modify}) }}>
                                        <View style={{height:50*factor_hor, borderBottomColor:'#9b9b9b', borderBottomWidth:0.25, marginTop:5, justifyContent:'center', alignContent:'center' }}>
                                            <Text style={{fontFamily:'avenir next', fontWeight:'300', fontSize:20*factor_hor}}>Modify profile and safety</Text>
                                        </View>
                                    </TouchableOpacity>  
                                    {this.state.modify && (
                                        <Text style={{marginTop:5, fontSize:18*factor_hor}}>
                                            Under modify profile you can change who sees what and your answers to profile questions. 
                                            Click the center of the text of a question to change your answer, and click the background
                                            to change the privacy setting of each element. A grey background means no one can see it, and 
                                            a white background means that the item is public. If you click your name to private (grey) then 
                                            everything on your profile is private.
                                        </Text>
                                    )}
                                    
                                    <TouchableOpacity onPress={() => {this.setState( {external:!this.state.external}) }}>
                                        <View style={{height:50*factor_hor, borderBottomColor:'#9b9b9b', borderBottomWidth:0.25, marginTop:5, justifyContent:'center', alignContent:'center' }}>
                                            <Text style={{fontFamily:'avenir next', fontWeight:'300', fontSize:20*factor_hor}}>External view</Text>
                                        </View>
                                    </TouchableOpacity>
                                    {this.state.external && (
                                        <Text style={{marginTop:5, fontSize:18*factor_hor}}>
                                            External view allows you to see your profile as a random person would. 
                                        </Text>
                                    )}
                                
                                </View>              
                            )}                                
                            <TouchableOpacity onPress={() => { this.setState({messaging:!this.state.messaging}) }}>
                                <View style={{ justifyContent:'center', flexDirection:'row', alignContent:'center', height:50*factor_hor, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:10*factor_hor}}>
                                    <View style={{flex:1}}>
                                        <Text style={{fontFamily:'avenir next', fontWeight:'500', fontSize:25*factor_hor}}>Messaging</Text>
                                    </View>
                                    <View style={{flex:0.25}}>
                                        <Icon 
                                            name="chevron-right"
                                            color="#9b9b9b"
                                            type='entypo'
                                            size={25*factor_hor}
                                        />
                                    </View>
                                </View>            
                            </TouchableOpacity>
                            {this.state.messaging && (
                                <View style={{marginLeft:30*factor_hor}}>
                                    <TouchableOpacity onPress={() => {this.setState( {options_msg:!this.state.options_msg}) }}>
                                        <View style={{height:50*factor_hor, borderBottomColor:'#9b9b9b', borderBottomWidth:0.25, marginTop:5, justifyContent:'center', alignContent:'center' }}>
                                            <Text style={{fontFamily:'avenir next', fontWeight:'300', fontSize:20*factor_hor}}>General</Text>
                                        </View>
                                    </TouchableOpacity>  
                                    {this.state.options_msg && (
                                        <Text style={{marginTop:5, fontSize:18*factor_hor}}>
                                            On the messages page, you can click the top left icon to change who you receive 
                                            messages from. You can also pick a default text color for your conversations. 
                                            In group chats, there is the option to have an admin. This starts as the group founder, 
                                            and the founder can make others admins. The admin has the ability to send text through a 
                                            middle column, which can be accessed in absence of all other messages by clicking on an admin message.   
                                        </Text>
                                    )}
                                </View>              
                            )}
                            <TouchableOpacity onPress={() => { this.setState({map:!this.state.map}) }}>
                                <View style={{ justifyContent:'center', flexDirection:'row', alignContent:'center', height:50*factor_hor, borderBottomColor:'#9B9B9B', borderBottomWidth:0, backgroundColor:'white', marginTop:10*factor_hor}}>
                                    <View style={{flex:1}}>
                                        <Text style={{fontFamily:'avenir next', fontWeight:'500', fontSize:25*factor_hor}}>Map</Text>
                                    </View>
                                    <View style={{flex:0.25}}>
                                        <Icon 
                                            name="chevron-right"
                                            color="#9b9b9b"
                                            type='entypo'
                                            size={25*factor_hor}
                                        />
                                    </View>
                                </View>           
                            </TouchableOpacity>
                            {this.state.map && (
                                <View style={{marginLeft:30*factor_hor}}>
                                    <TouchableOpacity onPress={() => {this.setState( {options_map:!this.state.options_map}) }}>
                                        <View style={{height:50*factor_hor, borderBottomColor:'#9b9b9b', borderBottomWidth:0.25, marginTop:5, justifyContent:'center', alignContent:'center' }}>
                                            <Text style={{fontFamily:'avenir next', fontWeight:'300', fontSize:20*factor_hor}}>General</Text>
                                        </View>
                                    </TouchableOpacity>  
                                    {this.state.options_map && (
                                        <Text style={{fontFamily:'avenir next', fontWeight:'300', fontSize:20*factor_hor}}>The map shows circles of activity near you - the busiest locations in terms of the feed.</Text>
                                    )}
                                </View>              
                            )} 
                        </View>

                    </View>   
                </ScrollView>
                
                <View style={{height:25*factor_hor, alignItems:'center', alignSelf:'stretch'}}></View>
                { false && (
                <View style={{height:Dimensions.get('window').height*0.25, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>{this.play_video()}}>
                        <View style={{height:175*factor_hor, width:250*factor_hor, justifyContent:'center', alignContent:'center', alignItems:'center', marginLeft:40*factor_hor, marginRight:40*factor_hor, borderRadius:10, justifyContent:'center', alignContent:'center', backgroundColor:'white', alignSelf:'stretch',
                                shadowColor:'black',
                                shadowOpacity:0.6,
                                shadowRadius:6,
                                shadowOffset:{width:5,height:5}
                                }}>
                            
                                <PlayButton
                                    width={100*factor_hor}
                                    height={100*factor_hor}
                                    style={{
                                        justifyContent:'center',
                                        alignContent:'center',
                                        flex: 1,
                                    }}
                                />
                                <Text style={{marginBottom:20, color:'#FC6026', fontSize:20*factor_hor, fontFamily:'avenir next'}}>Play the Tutorial</Text>                     
                        
                        </View>
                        </TouchableOpacity>
                        </View>                     
                )}
                <View style={{height:'8%', alignItems:'center', alignSelf:'stretch'}}></View>
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
