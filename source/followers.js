import React, {Component} from 'react';
import {StyleSheet, FlatList, TouchableOpacity, Text, Dimensions,
        AsyncStorage, ActivityIndicator, RefreshControl,
         View, TouchableHighlight} from 'react-native';
import { Icon, } from 'react-native-elements'

var received_posts = [0,1]

export default class followers extends React.Component {
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
      url = `http://${serverLocation}:80/follow_list?route=1&received_posts=${'['+(received_posts).toString()+']'}&userID=${this.state.username}`
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
    // go to profile -- adjust
    gotoprofile(index){
      console.log('gotoprofile', index)
    } 
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
                <Text style={{fontFamily:'Avenir Next', fontWeight:'500', fontSize:25*factor_hor, color:'white'}}>followers</Text>
              </View>    
              <View style={{flex:1}}></View>
          </View>
                    
          <FlatList 
            data={this.state.followers.slice(0,this.state.show)}
            extraData={this.state}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.5}
            onEndReached={ () => {this.reached_end();}}
            ListFooterComponent={() => this.state.loading_post ? null :this.which_footer()}
                
            // refresh
            /*
            refreshControl={
              <RefreshControl
                  refreshing={this.state.isFetching}
                  onRefresh={() => { this.setState({isFetching:true}, function() {console.log(this.state.isFetching)}), this.refresh_feed()} }
                  title="" titleColor="white" tintColor={'transparent'}
              />} */
            initialNumToRender={15} // render 8 at first
            maxToRenderPerBatch={15} // render 8 pe
            style={{flex:1}}
            scrollEnabled={!this.state.isSwiping}
            keyExtractor={(item,index) => (index).toString()}
            renderItem={({item, index}) => ( 
            
            <View key={index}  style={{ minHeight:10, marginTop:4, backgroundColor:'white', alignSelf:'stretch',  }}>   
                <TouchableOpacity onPress={()=>{this.gotoprofile(index);}}>
                    <View style={{width:Dimensions.get('window').width, flexDirection:'row', height:50*factor_hor,}}>
                        <View style={{flex:1,}} ></View>
                        <View style={{flex:5, justifyContent:'center',alignContent:'center'}}>
                          <TouchableHighlight onPress={()=>{this.gotoprofile(index);}} underlayColor={'transparent'} style={{justifyContent:'center', alignContent:'center'}} >
                              <Text style={{fontSize:20*factor_hor, fontFamily:'avenir next', }}> [ {this.state.followers[index][0]} ]</Text>
                          </TouchableHighlight>
                        </View>
                        <View style={{flex:1,}}></View>
                        <View style={{flex:1, }}>
                        </View>
                        <View style={{flex:1,}}></View>
                    </View>         
                </TouchableOpacity>
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
    backgroundColor:'#FFBA6D',
    opacity:0.8,
  },
});
