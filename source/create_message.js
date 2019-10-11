import React, {Component} from 'react';
import {StyleSheet, FlatList, TouchableOpacity, Dimensions,
        Text, Alert, View, AsyncStorage } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

export default class create_message extends React.Component {
    static navigationOptions = {header: null}
    constructor(props) {
        super(props);
        this.user_location = global.user_position
        this.state = {
            username:'',
            // search term
            search_term:'',
            // for group
            selected_users:[],
            
            
            // loaded lists
            searched:[],
            suggested:[],
            following:[],
            nearme:[],

            // if clicked see more
            suggested_height:0.25,
            following_height:0.25,
            nearme_height:0.25,
            search_visible:false,

            searched_num:8, 
            following_num:8,
            nearme_num:8,
            suggested_num:8,
            }
        }

    async componentDidMount() {
        username = await AsyncStorage.getItem('user')
        
        // get followings
        url = `http://${serverLocation}:80/get_following_users?userID=${username}`
        console.log(url)
        await fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({following:responseJson},function(){console.log(this.state.following)})
        })
        .done() 

        this.state.selected_users.push(username)
        this.setState({selected_users: [ ...this.state.selected_users, ], username:username })
    
        // get suggested
        url = `http://${serverLocation}:80/get_users_suggested?userID=${username}`
        console.log(url)
        await fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({suggested:responseJson},function(){console.log(this.state.following)})
        })
        .done()  

        // get nearby
        url = `http://${serverLocation}:80/get_nearby_users?userID=${username}&lat=${this.user_location.coords.latitude}&long=${this.user_location.coords.longitude}`
        console.log(url)
        await fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({nearme:responseJson},function(){console.log(this.state.nearme)})
        })
        .done()         
    }

    async search(typed) {
        this.setState({searched:[]},function(){console.log(this.state.searched)})
        
        if(typed.length > 0){
            // make searched users visible
            if(this.state.search_visible !== true) {
                this.setState({search_visible:true},function(){console.log(this.state.search_visible)})
            }
            url = `http://${serverLocation}:80/get_users_searched?userID=${this.state.username}&search={typed}`
            console.log(url)
            await fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({searched:responseJson},function(){console.log(this.state.searched)})
            })
            .done()      
        }
        else {
            if(this.state.search_visible !== false) {
                this.setState({search_visible:false},function(){console.log(this.state.search_visible)})
            }            
        }
    }

    go_next() {
        if(this.state.selected_users.length > 1) {
            this.props.navigation.push('NEW_MESSAGE', {to_list:this.state.selected_users} )
        }
    }

    see_more_suggested() {
        if(this.state.suggested_height == 0.25){
            this.setState({suggested_height:0.75})
        }
        else if(this.state.suggested_height == 0.75){
            this.setState({suggested_height:0.25})
        }
    }
    show_see_more_suggested(){
            if(this.state.suggested_height == 0.25){
                return 'see more...'
            }
            else if(this.state.suggested_height == 0.75){
                return 'see less...'
            }
    }

    see_more_following() {
        if(this.state.following_height == 0.25){
            this.setState({following_height:0.75})
        }
        else if(this.state.following_height == 0.75){
            this.setState({following_height:0.25})
        }        
    }
    show_see_more_following(){
        if(this.state.following_height == 0.25){
            return 'see more...'
        }
        else if(this.state.following_height == 0.75){
            return 'see less...'
        }
}

    see_more_nearme() {
        if(this.state.nearme_height == 0.25){
            this.setState({nearme_height:0.75})
        }
        else if (this.state.nearme_height == 0.75){ 
            this.setState({nearme_height:0.25})
        }
    }
    show_see_more_nearme(){
        if(this.state.nearme_height == 0.25){
            return 'see more...'
        }
        else if(this.state.nearme_height == 0.75){
            return 'see less...'
        }
    }

    remove_user(index, name) {
        if(this.state.selected_users[index] !== this.state.username) {
            this.state.selected_users.splice(index, 1)
            this.setState({selected_users:this.state.selected_users}) 
        }
        for(key in this.state.suggested){
            if(this.state.suggested[key][0] == name ) {
                if( this.state.suggested[key][1] == "#f9a32c" ) {
                    this.state.suggested[key][1] = 'white'
                }
            }
        }
        for(key in this.state.following){
            if(this.state.following[key][0] == name) {
                if( this.state.following[key][1] == "#f9a32c" ) {
                    this.state.following[key][1] = 'white'
                }
            }
        }
        for(key in this.state.nearme){
            if(this.state.nearme[key][0] == name) {
                if( this.state.nearme[key][1] == "#f9a32c" ) {
                    this.state.nearme[key][1] = 'white'
                }
            }
        }
        for(key in this.state.searched){
            if(this.state.searched[key][0] == name) {
                if( this.state.searched[key][1] == "#f9a32c" ) {
                    this.state.searched[key][1] = 'white'
                }
            }
        }        
        this.setState({suggested:this.state.suggested,
                following:this.state.following, nearme:this.state.nearme, 
            searched:this.state.searched})
    }

    add_user(name, index) {
        if(this.state.selected_users.length < 250) { 
            // if not in list 
            if(this.state.selected_users.indexOf(name) < 0) {
                // put name in selected users
                this.state.selected_users.push(name)
                
                for(key in this.state.suggested) {
                    if( this.state.suggested[key][0] == name ) {
                    this.state.suggested[key][1] = '#f9a32c'
                    }
                }
                for(key in this.state.following) {
                    if( this.state.following[key][0] == name) {
                    this.state.following[key][1] = '#f9a32c'
                }}

                for( key in this.state.nearme ) { 
                    if(this.state.nearme[key][0] == name ) {
                        this.state.nearme[key][1] = '#f9a32c'
                    } 
                }
                for( key in this.state.searched ) { 
                    if(this.state.searched[key][0] == name ) {
                        this.state.searched[key][1] = '#f9a32c'
                    } 
                }                
                this.setState({selected_users:this.state.selected_users,
                                suggested:this.state.suggested, following:this.state.following,
                                nearme:this.state.nearme,
                                searched:this.state.searched,
                            }) 
            }
            else if(this.state.selected_users.indexOf(name) > -1) {

                ind = this.state.selected_users.indexOf(name)
                this.state.selected_users.splice(ind, 1)
                
                for(key in this.state.suggested) {
                    if( this.state.suggested[key][0] == name ) {
                        this.state.suggested[key][1] = 'white'
                    }
                }
                for(key in this.state.following) {
                    if( this.state.following[key][0] == name) {
                        this.state.following[key][1] = 'white'
                }}    
                for( key in this.state.nearme ) { 
                    if(this.state.nearme[key][0] == name ) {
                        this.state.nearme[key][1] = 'white'
                    }
                }
                for( key in this.state.searched ) { 
                    if(this.state.searched[key][0] == name ) {
                        this.state.searched[key][1] = 'white'
                    } 
                }   
                this.setState({selected_users:this.state.selected_users,
                                suggested:this.state.suggested, following:this.state.following,
                                nearme:this.state.nearme,
                                searched:this.state.searched,
                }) 
            }            
        }
        else {
            return Alert.alert('Max 250 at first', 'you can add more in the group')
        }
    }

    render() {
      return (
            <View style={styles.container}>
                {/* buffer */}
                <View style={{height:Dimensions.get('window').height*0.035,justifyContent:'center', alignContent:'center', alignItems:'center', alignSelf:'stretch'}}></View>         
                {/* group name */}
                <View style={{height:Dimensions.get('window').height*0.055, paddingLeft:10, paddingRight:10, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center', alignSelf:'stretch'}}>
                    <View style={{flex:1.5}}>
                        <TouchableOpacity style={{justifyContent:'center', alignContent:'center', alignItems:'center',}} onPress={()=>{this.props.navigation.goBack()}}>
                            <Text style={{color:'#f9a32c', fontSize:16*factor_hor}}>Cancel</Text>
                        </TouchableOpacity>                
                    </View>
                    <View style={{flex:1.5}}></View>
                    <Text style={{fontSize:24*factor_hor, textAlign:'center', fontFamily:'avenir next', }}>New Message</Text>
                    <View style={{flex:1.5}}></View>
                    <View style={{flex:1.5}}>
                        <TouchableOpacity style={{flex:1,justifyContent:'center', alignContent:'center', alignItems:'center', }} 
                                        onPress={()=>{
                                            this.go_next()
                                        }}>
                            <Text style={{color:'#f9a32c', fontSize:16*factor_hor}}>Next</Text>                            
                        </TouchableOpacity>                
                    </View>
                </View>  
                {/* search bar */}
                <View style={{height:Dimensions.get('window').height*0.045,justifyContent:'center', flexDirection:'row', alignContent:'center', alignItems:'center', alignSelf:'stretch'}}>        
                    <View style={{flex:1, }}></View>
                    <View style={{flex:12, backgroundColor:'white', shadowRadius:2, shadowColor:'#ececec', borderRadius:10*factor_hor, alignSelf:'stretch' }}>
                        <TextInput  style={{textAlign:'left',  height:30, borderRadius:5, 
                                            fontSize:15, backgroundColor:'#ececec', fontFamily:'avenir next', justifyContent:'center', 
                                            alignContent:'center', paddingLeft:10, paddingBottom:1, }}
                                    color='black'
                                    ref={input => { this.textInput = input }}
                                    placeholder='Search'
                                    placeholderTextColor='#626364'
                                    textAlignVertical={'top'}

                                    onChangeText = { (typedText) => { this.search(typedText) }}
                                    onSubmitEditing = {() => { this.textInput.clear() } }                                    
                        />                          
                    </View>
                    <View style={{flex:1, }}></View>
                </View>         
                <ScrollView style={{ flexGrow:1, alignSelf:'stretch'}}>   
                    {/* to */}
                    <View style={{height:Dimensions.get('window').height*0.065,  flexDirection:'row', alignSelf:'stretch'}}>
                        <View style={{flex:0.5, }}></View>
                        <View style={{flex:1, justifyContent:'center', alignContent:'center' }}>
                            <Text style={{ fontSize:20*factor_hor, marginLeft:3, marginBottom:2, fontFamily:'avenir next'}}>To:</Text>
                        </View>
                        <View style={{flex:6, justifyContent:'center', alignContent:'center'}}>
                            <ScrollView ref={ref => this.scrollView = ref}
                                        horizontal={true} 
                                        showsHorizontalScrollIndicator={false}
                                        onContentSizeChange={ (contentWidth, contentHeight) => {        
                                            this.scrollView.scrollToEnd({animated: true});
                                        }}>
                            
                                {this.state.selected_users.map((item, index) => {
                                    return (
                                        <View style={{marginEnd:10*factor_hor, justifyContent:'center', alignContent:'center'}}>
                                            <TouchableOpacity onPress={() => { this.remove_user(index, this.state.selected_users[index] ) }}>
                                                <Text style={{fontSize:18*factor_hor, fontFamily:'avenir next' }}>[{this.state.selected_users[index]}]</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    
                    </View>                                           
                    
                    {/* searched */}
                    { this.state.search_visible && ( 
                    <View style={{ flexDirection:'row', borderBottomColor:'#ececec', borderBottomWidth:0.5, alignSelf:'stretch'}}>
                        <View style={{flex:0.5}}></View>
                        <Text style={{textAlign:'left', color:'#f9a32c', fontFamily:'avenir next', fontSize:20*factor_ver}}>Search</Text>
                        <View style={{flex:4}}></View>
                    </View>                                                               
                    )}
                    {/* flatlist */}
                    { this.state.search_visible && ( 
                    <View style={{height:Dimensions.get('window').height*0.25, alignSelf:'stretch'}}>
                    <FlatList
                            data={this.state.searched}
                            extraData={this.state}
                            keyExtractor={(item,index) => (index).toString()}
                            renderItem={({item, index}) => (
                                <View key={index} style={{flexDirection:'row', borderBottomWidth:0.5, borderBottomColor:'#ececec', alignSelf:'stretch', height:Dimensions.get('window').height*0.05}}>

                                        <View style={{flex:0.75, alignSelf:'stretch'}}></View>
                                        <View style={{flex:7.5, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
                                            <Text style={{textAlign:'left', fontSize:20*factor_ver, fontFamily:'avenir next' }}>[{this.state.searched[index][0]}]</Text>
                                        </View>
                                        <TouchableOpacity 
                                        hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}
                                        onPress={()=>{this.add_user(this.state.searched[index][0], index)}} style={{flex:1, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                                                <View style={{height:20, width:20, borderColor:'#f9a32c', backgroundColor:this.state.searched[index][1], borderWidth:1, justifyContent:'center', alignContent:'center', borderRadius:20, alignSelf:'stretch'}}></View>
                                        </TouchableOpacity>
                                        <View style={{flex:0.25, alignSelf:'stretch'}}></View>

                                </View>
                             )}
                        />                    
                    </View>                                                               
                    )}



                    {/* following */}
                    <View style={{ flexDirection:'row', borderBottomColor:'#ececec', borderBottomWidth:0.5, alignSelf:'stretch'}}>
                        <View style={{flex:0.5}}></View>
                        <Text style={{textAlign:'left', color:'#f9a32c', fontFamily:'avenir next', fontSize:20*factor_ver}}>Following</Text>
                        <View style={{flex:4}}></View>
                    </View>                                                               
                    {/* flatlist */}
                    <View style={{height:Dimensions.get('window').height*this.state.following_height, alignSelf:'stretch'}}>
                    <FlatList
                            data={this.state.following}
                            extraData={this.state}
                            keyExtractor={(item,index) => (index).toString()}
                            renderItem={({item, index}) => (
                                <View key={index} style={{flexDirection:'row', borderBottomWidth:0.5, borderBottomColor:'#ececec', alignSelf:'stretch', height:Dimensions.get('window').height*0.05}}>

                                        <View style={{flex:0.75, alignSelf:'stretch'}}></View>
                                        <View style={{flex:7.5, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
                                            <Text style={{textAlign:'left', fontSize:20*factor_ver, fontFamily:'avenir next' }}>[{this.state.following[index][0]}]</Text>
                                        </View>
                                        <TouchableOpacity 
                                        hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}
                                        onPress={()=>{this.add_user(this.state.following[index][0], index)}} style={{flex:1, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                                                <View style={{height:20, width:20, borderColor:'#f9a32c', backgroundColor:this.state.following[index][1], borderWidth:1, justifyContent:'center', alignContent:'center', borderRadius:20, alignSelf:'stretch'}}></View>
                                        </TouchableOpacity>
                                        <View style={{flex:0.25, alignSelf:'stretch'}}></View>

                                </View>
                             )}
                        />                    
                    </View>                                                               
                    {/* see more following */}
                    <View style={{ flexDirection:'row', alignSelf:'stretch'}}>
                        <View style={{flex:4}}></View>
                        <Text onPress={() =>{this.see_more_following()}} style={{textAlign:'right', color:'black', fontFamily:'avenir next', fontSize:14*factor_ver}}>{this.show_see_more_following()}</Text>
                        <View style={{flex:0.5}}></View>
                    </View>   
                    

                    {/* suggested */}
                    <View style={{ flexDirection:'row', borderBottomColor:'#ececec', borderBottomWidth:0.5, alignSelf:'stretch'}}>
                        <View style={{flex:0.5}}></View>
                        <Text style={{textAlign:'left', color:'#f9a32c', fontFamily:'avenir next', fontSize:20*factor_ver}}>Suggested</Text>
                        <View style={{flex:4}}></View>
                    </View>                                                               
                    {/* flatlist */}
                    <View style={{height:Dimensions.get('window').height*this.state.suggested_height, alignSelf:'stretch'}}>
                    
                        <FlatList
                            data={this.state.suggested}
                            extraData={this.state}
                            keyExtractor={(item,index) => (index).toString()}
                            renderItem={({item, index}) => (
                                <View key={index} style={{flexDirection:'row', borderBottomWidth:0.5, borderBottomColor:'#ececec', alignSelf:'stretch', height:Dimensions.get('window').height*0.05}}>

                                        <View style={{flex:0.75, alignSelf:'stretch'}}></View>
                                        <View style={{flex:7.5, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
                                            <Text style={{textAlign:'left', fontSize:20*factor_ver, fontFamily:'avenir next' }}>[{this.state.suggested[index][0]}]</Text>
                                        </View>
                                        <TouchableOpacity
                                        hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}
                                         onPress={()=>{this.add_user(this.state.suggested[index][0], index)}} style={{flex:1, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                                                <View style={{height:20, width:20, borderColor:'#f9a32c', backgroundColor:this.state.suggested[index][1], borderWidth:1, justifyContent:'center', alignContent:'center', borderRadius:20, alignSelf:'stretch'}}></View>
                                        </TouchableOpacity>
                                        <View style={{flex:0.25, alignSelf:'stretch'}}></View>

                                </View>
                             )}
                        />
                    
                    </View>                                                               
                    {/* see more suggested */}
                    <View style={{ flexDirection:'row', alignSelf:'stretch'}}>
                        <View style={{flex:4}}></View>
                        <Text onPress={() =>{this.see_more_suggested()}} style={{textAlign:'right', color:'black', fontFamily:'avenir next', fontSize:14*factor_ver}}>{this.show_see_more_suggested()}</Text>
                        <View style={{flex:0.5}}></View>
                    </View>   

                    {/* near me */}
                    <View style={{ flexDirection:'row', borderBottomColor:'#ececec', borderBottomWidth:0.5, alignSelf:'stretch'}}>
                        <View style={{flex:0.5}}></View>
                        <Text style={{textAlign:'left', color:'#f9a32c', fontFamily:'avenir next', fontSize:20*factor_ver}}>Near me</Text>
                        <View style={{flex:4}}></View>
                    </View>                                                               
                    {/* flatlist */}
                    <View style={{height:Dimensions.get('window').height*this.state.nearme_height, alignSelf:'stretch'}}>
                        <FlatList
                            data={this.state.nearme}
                            extraData={this.state}
                            keyExtractor={(item,index) => (index).toString()}
                            renderItem={({item, index}) => (
                                <View key={index} style={{flexDirection:'row', borderBottomWidth:0.5, borderBottomColor:'#ececec', alignSelf:'stretch', height:Dimensions.get('window').height*0.05}}>

                                        <View style={{flex:0.75, alignSelf:'stretch'}}></View>
                                        <View style={{flex:7.5, justifyContent:'center', alignContent:'center', alignSelf:'stretch'}}>
                                            <Text style={{textAlign:'left', fontSize:20*factor_ver, fontFamily:'avenir next' }}>[{this.state.nearme[index][0]}]</Text>
                                        </View>
                                        <TouchableOpacity 
                                        hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}
                                        onPress={()=>{this.add_user(this.state.nearme[index][0], index)}} style={{flex:1, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                                                <View style={{height:20, width:20, borderColor:'#f9a32c', backgroundColor:this.state.nearme[index][1], borderWidth:1, justifyContent:'center', alignContent:'center', borderRadius:20, alignSelf:'stretch'}}></View>
                                        </TouchableOpacity>
                                        <View style={{flex:0.25, alignSelf:'stretch'}}></View>

                                </View>
                             )}
                        />                    
                    </View>                                                                                                       
                    {/* see more near me */}
                    <View style={{ flexDirection:'row', alignSelf:'stretch'}}>
                        <View style={{flex:4}}></View>
                        <Text onPress={() =>{this.see_more_nearme()}} style={{textAlign:'right', color:'black', fontFamily:'avenir next', fontSize:14*factor_ver}}>{this.show_see_more_nearme()}</Text>
                        <View style={{flex:0.5}}></View>
                    </View>   
                    <View style={{height:40*factor_ver}}></View>
                </ScrollView>                                                                                                     
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
      },

    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
});
