import React, {Component} from 'react';
import {StyleSheet, FlatList, TouchableOpacity, Text,
        ActivityIndicator, RefreshControl, Dimensions,
        View, TouchableHighlight, AsyncStorage
      } from 'react-native';
import { Icon} from 'react-native-elements'
import Swipeable from 'react-native-swipeable';

var received_posts = [0,1]

export default class following extends React.Component {
    static navigationOptions = {header: null};
    constructor(props) {
        super(props);
        this.state = {
          username:'',
          show:15,
          followers:[],
          end_reached:false,
          isFetching:false,
        }
    }

    async componentDidMount() {
        received_posts = [0,1]
        this.setState({username:(await AsyncStorage.getItem('user'))},function(){console.log(this.state.username)}) 
        await this.fetch_followers()
    }
    async fetch_followers() {
      url = `http://${serverLocation}:80/follow_list?route=2&received_posts=${'['+(received_posts).toString()+']'}&userID=${this.state.username}`
      console.log(url)
      await fetch(url)
      .then((response) => response.json())
      .then((responseJson2) => {
          this.setState( {
            followers: [ ...this.state.followers, ...responseJson2, ] ,
          },
          function() {console.log(
            this.state.followers
          )}
          )
          for(key in responseJson2) {
            received_posts.push( this.state.followers[key][2] )
          }
      })
      .catch((error) => {
          console.log(error)
      });
      console.log(received_posts)  
    }
    async reached_end() {
      // have more to show
      if(this.state.show < this.state.followers.length){
        await this.setState( {show:(this.state.show+15)}, function() {console.log(this.state.show)})              
      }
      // equal to >> call more
      else if(this.state.show == this.state.followers.length){
        await this.setState( {show:(this.state.show+15)}, function() {console.log(this.state.show)})
        await this.fetch_followers()  
      }
      // called more and none left
      else if(this.state.show > this.state.followers.length){
        await this.setState( {end_reached:true}, function() {console.log(this.state.end_reached)})
      }      
    }
    async refresh_feed(){
      received_posts = [0,1]
      await this.setState( {followers:[],show:15,end_reached:false},console.log(this.state.followers, this.state.show, this.state.end_reached))
      await this.fetch_followers() 
      await this.setState({isFetching:false}, function() {console.log(this.state.isFetching)})
    }
    // send message -- adjust
    send(){
      return null
    }
    // block user
    async block(index){ 
        if( (this.state.followers[index][1] == 'Block') && (this.state.followers[index][0] !== this.state.username) ) {
            this.state.followers[index][1] = 'Blocked'
            await this.setState( {followers:this.state.followers},function(){console.log(this.state.followers)})
            url = `http://${serverLocation}:80/block_poster?route=1&userID=${this.state.username}&blockedID=${this.state.followers[index][0]}&postID=108&post_or_comment=post`
            console.log(url)
            await fetch(url)
        }
        else if( (this.state.followers[index][1] == 'Blocked') && (this.state.followers[index][0] !== this.state.username) ) {
            this.state.followers[index][1] = 'Block'
            await this.setState( {followers:this.state.followers},function(){console.log(this.state.followers)})
            url = `http://${serverLocation}:80/block_poster?route=2&userID=${this.state.username}&blockedID=${this.state.followers[index][0]}&postID=108&post_or_comment=post`
            console.log(url)
            await fetch(url)              
        }
    }
    // unfollow user
    async unfollow(index) {
      if(this.state.followers[index][3] == "Unfollow") {
        this.state.followers[index][3] = "Follow"
        url = `http://${serverLocation}:80/follow?route=2&userID=${this.state.username}&following=${this.state.followers[index][0]}`
        console.log(url)
        await fetch(url)
        await this.setState( {followers:this.state.followers},function(){console.log(this.state.followers)})
      }
      else if(this.state.followers[index][3] == "Follow") {
        this.state.followers[index][3] = "Unfollow"
        url = `http://${serverLocation}:80/follow?route=1&userID=${this.state.username}&following=${this.state.followers[index][0]}`
        console.log(url)
        await fetch(url)
        await this.setState( {followers:this.state.followers},function(){console.log(this.state.followers)})
      }
    }
    // go to profile -- adjust
    gotoprofile(index) {
      this.props.navigation.push('EXTERNAL_VIEW_PROFILE', {profileID:this.state.followers[index][0]})
  }
    which_footer(){
      if(this.state.end_reached == true) {
        return null
      }
      else {
      return <ActivityIndicator size='small' color={'transparent'} style={{height:25,marginTop:10,justifyContent: 'center',alignItems: 'center',}}/>
      }
    }   
    
    render() {
    
    return (
    <View style={styles.container}>
          <View style={{height:45*factor_ver, justifyContent:'center', alignItems:'center', alignContent:'center'}}></View>
          <View style={{height:35, flexDirection:'row', justifyContent:'center', alignItems:'center', alignContent:'center'}}>
          <View style={{flex:1, alignSelf:'stretch'}}>
                  <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}} style={{marginStart:0}} >
                      <Icon 
                          name="chevron-left"
                          color="white"
                          type='entypo'
                          size={25}
                      />
                  </TouchableOpacity>              
              </View>
              <View style={{flex:5, justifyContent:'center', marginBottom:5, alignContent:'center', alignItems:'center'}}>
                <Text style={{fontFamily:'Avenir Next', fontWeight:'500', fontSize:25*factor_hor, color:'white'}}>following</Text>
              </View>    
              <View style={{flex:1}}></View>
          </View>
                    
          <FlatList 
            data={this.state.followers.slice(0,this.state.show)}
            extraData={this.state}
            onEndReachedThreshold={0.5}
            onEndReached={ () => {this.reached_end();}}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => this.state.loading_post? null :this.which_footer()}
                
            // refresh
            
            /* refreshControl={
              <RefreshControl
                  refreshing={this.state.isFetching}
                  onRefresh={() => { this.setState({isFetching:true}, function() {console.log(this.state.isFetching)}), this.refresh_feed()} }
                  title="" tintColor="transparent" titleColor="white" 
              />} */
            initialNumToRender={15} // render 8 at first
            maxToRenderPerBatch={15} // render 8 pe
            style={{flex:1}}
            scrollEnabled={!this.state.isSwiping}
            keyExtractor={(item,index) => (index).toString()}
            renderItem={({item, index}) => ( 
            
            <View key={index}  style={{ minHeight:10, marginTop:4, backgroundColor:'white', alignSelf:'stretch',  }}>   
            
                <Swipeable  
                    onSwipeStart={() => this.setState({isSwiping: true})}
                    onSwipeRelease={() => this.setState({isSwiping: false})}
                    rightActionActivationDistance={Dimensions.get('window').width/4} rightContent={<View style={{height:50*factor_hor, justifyContent:'center', alignContent:'center', backgroundColor:'rgba(255, 0, 0, 1)'}}><Text style={{textAlign:'right', fontWeight:'600', color:'white',fontSize:20*factor_hor, paddingRight:15*factor_hor,}}>{this.state.followers[index][3]}</Text></View>}

                    onRightActionRelease={() => {this.unfollow(index)}} 
                    style={{width:Dimensions.get('window').width,}} 
                  >
                  <TouchableOpacity onPress={()=>{this.gotoprofile(index);}}>
                      <View style={{width:Dimensions.get('window').width, flexDirection:'row', height:50*factor_hor,}}>
                          <View style={{flex:1,}} ></View>
                          <View style={{flex:5, justifyContent:'center',alignContent:'center'}}>
                            <TouchableHighlight onPress={()=>{this.gotoprofile(index);}} underlayColor={'transparent'} style={{justifyContent:'center', alignContent:'center'}}>
                                <Text style={{fontSize:20*factor_hor, fontFamily:'avenir next', }}> [ {this.state.followers[index][0]} ]</Text>
                            </TouchableHighlight>
                          </View>
                          <View style={{flex:1,}}></View>
                          <View style={{flex:1, }}>

                          </View>
                          <View style={{flex:1,}}></View>
                      </View>
                  </TouchableOpacity>
                </Swipeable>           
            </View>
            )
            }/>  
            <View style={{height:25*factor_hor}}></View>                       

    </View>
    );
  }
}

const styles = StyleSheet.create({
  
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF7E48',
    opacity:0.7,
  },
});
