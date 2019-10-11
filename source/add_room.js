import React, {Component} from 'react';
import {StyleSheet, Dimensions, AsyncStorage, Alert,
        Platform, Text, View, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';

var win_height = Dimensions.get('window').height
var region = {}
export default class add_room extends React.Component {
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
            tags:'',
            max_users:'',
            set_password:'',
            latitude:70,
            longitude:70,

            nearme_list:[],
            following_list:[], 
            selected_list:[],
            add_list:[]
            }
        }

    async componentDidMount() {
        username = await AsyncStorage.getItem('user')
        roomID = await this.props.navigation.getParam('chatID')
        
        await this.setState({
            roomID:roomID,
            username:username,
            latitude:this.user_location.coords.latitude,
            longitude:this.user_location.coords.longitude,
        })

        // get followings
        url = `http://${serverLocation}:80/get_following_users_rooms?userID=${username}&lat=${this.user_location.coords.latitude}&long=${this.user_location.coords.longitude}`
        console.log(url)
        await fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson, 'response')
            this.setState({following_list:responseJson, selected_list:responseJson})
        })
        .done() 
            
        // get nearby
        url = `http://${serverLocation}:80/get_nearby_users_rooms?userID=${username}&lat=${this.user_location.coords.latitude}&long=${this.user_location.coords.longitude}`
        console.log(url)
        await fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson, 'response')
            this.setState({nearme_list:responseJson})
        })
        .done()            
    }
    _getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
           (position) => {
             this.setState({
               latitude: position.coords.latitude,
               longitude: position.coords.longitude,
               error: null,
             });
           },
           (error) => this.setState({ error: error.message }),
           { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
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
    async gotoprofile_comments(index) {
        if(this.state.selected_list[index][0] !== 'Anonymous') {
            this.props.navigation.navigate('EXTERNAL_VIEW_PROFILE', {profileID:this.state.selected_list[index][0]}
            )
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
    async add_members() {
        
        add_list = []
        console.log(this.state.nearme_list, 'near me')
        console.log(this.state.following_list, 'following me')
        
        for(key in this.state.nearme_list) {
            if(this.state.nearme_list[key][6] !== 'white' ) {
                if (add_list.indexOf( this.state.nearme_list[key][0] ) < 0) {
                    add_list.push( this.state.nearme_list[key][0] )
                }
            }
        }
        for(key in this.state.following_list) {
            if(this.state.following_list[key][2] !== 'white' ) {
                if (add_list.indexOf( this.state.following_list[key][0] ) < 0) {
                    add_list.push( this.state.following_list[key][0] )
                }
            }
        }

        console.log(add_list, 'ADDLIST')

        await this.socket_rooms.emit('rooms_invite', {
            'username':this.state.username,
            'roomID':this.state.roomID,
            'selected_users':add_list
        })
        await this.props.navigation.goBack()
    }

    render() {
      const animating = this.state.animating
      return (

        <View style={styles.container}>
            
            <View style={{height:this.winHeight(), alignSelf:'stretch', }}></View>
                        
            {/* Add Members */}
            <View style={{height:Dimensions.get('window').height*0.075, justifyContent:'center', alignContent:'center', flexDirection:'row', alignSelf:'stretch'}}>
                <TouchableOpacity style={{flex:0.4,}} onPress={ () => {this.props.navigation.goBack()} }>
                    <Icon 
                        name="chevron-left"
                        color="black"
                        type='entypo'
                        size={25*factor_hor}
                    />
                </TouchableOpacity>
                <View style={{flex:0.6,  marginLeft:5*factor_hor,  marginBottom:30*factor_ver, borderBottomColor:'#9b9b9b', borderBottomWidth:0,}}></View>
                <Text style={{fontSize:20*factor_hor,textAlign:'right' }}>Add Members</Text>
                <View style={{flex:1, marginLeft:5*factor_hor,  marginBottom:30*factor_ver,  borderBottomColor:'#9b9b9b', borderBottomWidth:0,}}></View>
            </View>

            {/* Following / People */}
            <View style={{height:40*factor_ver, flexDirection:'row', borderColor:'#FF7E65', borderWidth:1,borderRadius:10*factor_hor,   }}>
                    
                    <View style={{flex:1, justifyContent:'center', alignContent:'center', borderRadius:10*factor_hor, borderWidth:this.state.following_bw, backgroundColor:this.state.bg_following, borderColor:'#FF7E65'}}>
                        <TouchableOpacity onPress={()=>{this.press_following()}}>
                            <Text style={{color:this.state.following_color, fontSize:20*factor_hor, textAlign:'center'}}>Following</Text>
                        </TouchableOpacity>                       
                    </View>
                    <View style={{flex:1, justifyContent:'center', alignContent:'center', borderRadius:10*factor_hor, borderWidth:this.state.people_bw, backgroundColor:this.state.bg_people, borderColor:'#FF7E65'}}>
                        <TouchableOpacity onPress={()=>{this.press_people()}}>
                            <Text style={{color:this.state.people_color, fontSize:20*factor_hor, textAlign:'center'}}>People</Text>
                        </TouchableOpacity>
                    </View>                        
                </View>   
            
            <View style={{height:Dimensions.get('window').height*0.025, flexDirection:'row', justifyContent:'center', alignContent:'center'}}>
                <Text style={{textAlign:'left', height:25, fontSize:14*factor_hor, marginLeft:2, marginTop:5, color:'#9b9b9b'}}>Within your city</Text>
                <View style={{flex:1}}></View>
            </View>

            <View style={{flex:1, alignSelf:'stretch', }}>
                <FlatList 
                    data={this.state.selected_list}
                    extraData={this.state}
                    ref = "flatList"
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={100} 
                    maxToRenderPerBatch={100} 
                    style={{flex:1, paddingTop:20,}}
                    keyExtractor={(item,index) => (index).toString()}
                    renderItem={({item, index}) => ( 
                        <View key={index} style={{ minHeight:10, marginBottom:10*factor_ver, alignSelf:'stretch', flexDirection:'row', backgroundColor:'white', }}>
                                <TouchableOpacity onPress={() => {this.gotoprofile_comments(index)} }>
                                    <View style={{width:150*factor_hor, paddingLeft:20, height:20, flexDirection:'row', borderBottomColor:'#ececec', borderBottomWidth:0.5, justifyContent:'center', alignContent:'center', alignItems:'center', }}>
                                        <Text style={{ textAlign:'center', fontSize:18*factor_hor, }}>[{this.state.selected_list[index][0]}]</Text>
                                        <View style={{flex:1}}></View>
                                    </View>
                                </TouchableOpacity>

                                <View style={{flex:2.5,}}></View>
                                
                                <TouchableOpacity style={{flexDirection:'row', flex:1, }} onPress={() => {this.onPress_color(index)}}>
                                    <View style={{ flex:0.25, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                                        <View style={{height:20, width:20, borderColor:'#FF7E65', backgroundColor:this.what_color(index), borderWidth:1, justifyContent:'center', alignContent:'center', borderRadius:20, alignSelf:'stretch'}}></View>
                                    </View>                                        
                                </TouchableOpacity>
                        </View>
                )}/>  
            </View>

            <View style={{height:50*factor_ver, marginLeft:30*factor_hor, marginRight:30*factor_hor, flexDirection:'row', backgroundColor:'white', borderColor:'#FF7E65', borderWidth:1,borderRadius:10*factor_hor,   }}>              
                <TouchableOpacity 
                        style={{flex:1, justifyContent:'center', alignContent:'center'}}
                        onPress={()=>{this.add_members()}}>
                        <Text style={{color:'#FF7E65', fontSize:20*factor_hor, textAlign:'center'}}>Add</Text>
                </TouchableOpacity>             
            </View>   
            <View style={{height:Dimensions.get('window').height*0.03}}></View>
                                
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
        paddingLeft:20*factor_hor, 
        paddingRight:20*factor_hor,
      },

    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
});
