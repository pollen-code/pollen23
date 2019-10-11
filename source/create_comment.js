import React, {Component} from 'react';
import {StyleSheet, ActivityIndicator, Dimensions,
        TextInput, Alert, Keyboard, Text, View, 
        TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements'
import { AsyncStorage } from 'react-native'
import FastImage from 'react-native-fast-image'
import ImagePicker from 'react-native-image-picker';

var body = new FormData();

export default class create_comment extends React.Component {
    static navigationOptions = {header: null}

    constructor(props) {
        super(props);
        this.user_location = global.user_position
        this.state = {
            col_arr:['white',"#FC6026", ],
            box:["#FC6026", 'black'],
            usern:'Anonymous',  
            usernuss:'Anonymous', 
            comments:[], 
            art:[], 
            img_data:'none',
            post:'', // post itself
            post_length:400, // post length
            tags:'',
            username:'', // username
            latitude:'', // user lat
            longitude:'', // user long
            anon:true, // whether anon
            show_indicator:false,
            visible:false, // show image if exists
            filePath: {}, // path to upload image file
            animating:false, // for loading indicator 
            chose:false
        }
    }

    async componentDidMount() {
        art = this.props.navigation.getParam("art")
        comments = this.props.navigation.getParam("arr")
        username_ = await AsyncStorage.getItem('user')
        await this.setState({
            lat:this.user_location.coords.latitude, 
            long:this.user_location.coords.longitude,
            username:username_,
            art:art,
            comments:comments,
        })      
    }
    async going_back(){ 
        await this.delete_image()
        body = new FormData();
        
        box = ["#FC6026", "#FC6026"]
        col_arr = ['white', "#FC6026", ]
        usern = 'Anonymous'
        usernuss = 'Anonymous'
        comments = [] // comment array
        art = [] // post array
        col_arr = ['white', "#FC6026", ] 
        
        await this.setState({
            col_arr:col_arr,
            box:box,
            usern:usern,
            usernuss:usernuss,
            comments:comments,
            art:art,
            img_data:'none',        
        })
        this.props.navigation.state.params.returndata('hello');
        this.props.navigation.goBack()

    }
    async make_post() {
        await this.setState({ show_indicator:true })
        // if post is proper length or the image array exists
        if(this.state.post_length < 400 && this.state.post_length > 0 || this.state.chose == true) {
            username_ = await AsyncStorage.getItem('user')
            console.log(this.state.post, this.state.art[8], this.state.anon, username_, this.state.img_data)
            url = `http://${serverLocation}:80/make_comment?`
            await fetch(url, {
            method:'POST',
            headers:{    
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
            body: 
                JSON.stringify({
                    comment:this.state.post,
                    postID:this.state.art[8],
                    anon:this.state.anon,
                    userID:username_,
                    media:this.state.img_data
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                // upload image
                body.append('postID', responseJson);

                // clear all data
                comments = []
                art = []
                arr = []
                usern = 'Anonymous'
                usernuss = 'Anonymous'
                box = ["#FC6026", 'black']
                col_arr = ['white', "#FC6026"] 
                this.textInput.clear()
                this.setState({
                    post:'', 
                    col_arr:col_arr,
                    comments:comments,
                    art:art, 
                    arr:arr, 
                    usern:usern,
                    usernuss:usernuss,
                    box:box, 
                    img_data:'none',
                    show_indicator:false,
                })
                
                this.props.navigation.state.params.returndata('hello');
                this.props.navigation.goBack();    

            })
            .catch((error) => {
                console.log(error, 'error')
                Alert.alert('Check your connection and try again');
            })
        }
        else {
            Alert.alert('Please add text or an image');       
        }
    }
    async make_anon() {
        if( this.state.anon == false ){ // if not anon make anon
            await this.setState({
                anon:true,
                usernuss:'Anonymous',
                col_arr:['white', "#FC6026"],
                box:["#FC6026", 'black'],
            })
        }
        else if( this.state.anon == true ) { // if anon make normal 
            username_ = await AsyncStorage.getItem('user')
            await this.setState({
                anon:false,
                usernuss:username_,
                col_arr:["#FC6026", 'white'],
                box:["#FC6026", 'black'],
            })
        }    
    }
    check_length(){
        if(this.state.post_length == 0) {
            Alert.alert('Post length too long', '')
        }
    }
    async upload_image_comment() {      
        if(this.state.chose == true) {
            var url_image = `http://${serverLocation}:80/upload_file_comment?`
            await fetch(url_image,
                { method: 'POST',
                headers:{"Content-Type": "multipart/form-data"}, 
                body:body
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ show_indicator:false })
                this.delete_image()
                this.props.navigation.state.params.returndata('hello');
                this.props.navigation.goBack();
            })
            .catch((e) => console.log(e))
            .done()
        }
    }
    async delete_image() {
        var body = new FormData();
        await this.setState({ 
            filePath:{}, 
            visible:false, 
            chose:false, 
            img_data:'none',
            box:["#FC6026", 'black']
        })

    }
    chooseFile = async () => {
        await this.delete_image()
        var options = {
            title: 'Select Image',
            storageOptions: {skipBackup: true,path: 'images',},
            maxWidth:1000, 
            maxHeight:1000
        };
        await ImagePicker.showImagePicker(options, response => {
            if(response.didCancel) {
                console.log('User cancelled image picker');
            } 
            else if(response.error) {
                console.log('ImagePicker Error: ', response.error);
            } 
            else {
                body.append('file', {  
                    uri: response.uri, 
                    name: response.fileName, 
                    type: response.type
                });
                body.append('Content-Type', 'image/png');
                this.setState({
                    filePath:response,
                    box:["#FC6026","#FC6026" ],
                    visible:true,
                    chose:true,
                    animating:false, 
                    img_data:JSON.stringify(response.data), 
                });
            }
        });  
    }

    render() {
      return (
        <View style={styles.container}>
            {/* status bar*/} 
            <View style={{flex:0.05, backgroundColor:'white', alignSelf:'stretch'}}></View>
            {/* buffer after status bar*/} 
            <View style={{flex:0.01, alignSelf:'stretch', backgroundColor:'#FEF7EC'}}></View>
            {/* text box*/} 
            <View style={{flex:0.94, alignSelf:'stretch', backgroundColor:'white', borderRadius:1, borderWidth:2, borderColor:this.state.box[0]}}>
                {/* buffer at top of text box*/} 
                <View style={{flex:0.02, backgroundColor:'white'}}></View>
                {/* back arrow, username, post button horizontal box*/} 
                <View style={{flex:0.07, flexDirection:'row', }}>
                    {/* back arrow box*/}
                    <View style={{flex:0.1, backgroundColor:'white',justifyContent:'center'}}>
                        <TouchableOpacity onPress={()=>{this.going_back();}} style={{marginLeft:5, marginRight:5,}}>
                            <Icon 
                                size={30*factor_hor}
                                name="chevron-left"
                                color="#9B9B9B"
                                type='entypo'
                            />
                        </TouchableOpacity>
                    </View>
                    {/* @username box*/}
                    <View style={{flex:0.5, marginLeft:5, backgroundColor:'white', justifyContent:'center'}}>
                        <Text style={{fontFamily:'avenir next', fontSize:factor_hor*22, color:'#9B9B9B'}}>{this.state.usernuss}</Text>
                    </View>
                    {/* buffer between username and post button*/}
                    <View style={{flex:0.2, backgroundColor:'white'}}></View>
                    {/* post button box*/}
                    <View style={{flex:0.2, paddingEnd:8, backgroundColor:'white', justifyContent:'center'}}>
                       <TouchableOpacity onPress={ () => {this.make_anon();}} style={{backgroundColor:this.state.col_arr[1], borderRadius:5}}>
                            <Text style={{fontFamily:'avenir next', fontSize:factor_hor*19, color:this.state.col_arr[0], borderRadius:10, borderWidth:1, borderColor:"#FC6026", textAlign:'center'}}>Anon</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:0.2, backgroundColor:'white', justifyContent:'center'}}>
                       <TouchableOpacity onPress={ () => {this.make_post(); }} style={{backgroundColor:"#FC6026", borderRadius:5}}>
                            <Text style={{fontFamily:'avenir next', fontSize:factor_hor*19, color:'white', borderRadius:10, borderWidth:1, borderColor:"#FC6026", textAlign:'center'}}>Post</Text>
                        </TouchableOpacity>
                    </View>
                    {/* buffer after post button*/}
                    <View style={{flex:0.05, backgroundColor:'white'}}></View>
                </View>

                {/* type, add photo, add gif, add poll horizontal box*/} 
                <View style={{flex:0.24, flexDirection:'row', backgroundColor:'white'}}>
                    {/* buffer before type box*/}
                    <View style={{flex:0.1, backgroundColor:'white'}}></View>
                    {/* type box*/}
                    <View style={{flex:0.7, backgroundColor:'white'}}>
                        <TextInput style={{textAlign:'left',fontSize:factor_hor*18, marginTop:7, backgroundColor:'white', fontFamily:'avenir next' }}
                                    color='black'
                                    ref={input => { this.textInput = input }}
                                    multiline={true}
                                    allowFontScaling={true}
                                    autoCompleteType={"off"}
                                    blurOnSubmit={true}
                                    returnKeyType={'done'}
                                    placeholder='type here...'                                                              
                                    placeholderTextColor='black'
                                    maxLength={400}
                                    onChangeText={(typedText) => {
                                                        this.setState( {post: typedText}, function () {console.log(this.state.post)} )
                                                        this.setState( {post_length: 400 - typedText.length}, function () {console.log(this.state.typedText)})
                                                    }}
                                    onSubmitEditing={ () => {this.check_length(), Keyboard.dismiss()}}
                        />  
                    </View>
                    {/* add picture, add gif, add poll */}
                    <View style={{flex:0.15, backgroundColor:'white', justifyContent:'center'}}>
                        {/* add picture box */}
                        <View style={{flex:0.333, paddingTop:10, paddingStart:5, backgroundColor:'white', justifyContent:'center'}}>
                            <Text style={{textAlign:'center', color:'black', fontSize:factor_hor*14}}>{this.state.post_length}</Text>
                            <TouchableOpacity
                                onPress={this.chooseFile.bind(this)}
                                style={{marginBottom:0, paddingStart:3, paddingTop:7}}>
                                <Icon 
                                    size={30*factor_hor}
                                    name={'image-inverted'}
                                    color={"black"}
                                    type={'entypo'}
                                />
                            </TouchableOpacity>
                        </View>   
                        {/* add gif box */}
                        <View style={{flex:0.333, backgroundColor:'white', justifyContent:'center'}}>
                            <TouchableOpacity onPress={() => {this.delete_image()}} style={{marginStart:9, paddingTop:7}} >
                                <Icon 
                                    size={40*factor_hor}
                                    name="cross"
                                    color="black"
                                    type='entypo'
                                />
                            </TouchableOpacity>
                        </View>
                        {/* add picture box */}
                        <View style={{flex:0.333, backgroundColor:'white', justifyContent:'center'}}>
                            <TouchableOpacity style={{marginStart:0}} >
                                <Icon 
                                    name="poll"
                                    color="white"
                                    type='materialicons'
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                    {/* buffer after add picture, add gif and add poll buttons*/}
                    <View style={{flex:0.05, backgroundColor:'white'}}></View>
                </View>
                
                {/* buffer between text and hashtags*/} 
                <View style={{flex:0.03, backgroundColor:'white'}}></View>
                {/* add hashtags box*/} 
                <View style={{flex:0.152, flexDirection:'row', }}>
                    {/* buffer before # box*/} 
                    <View style={{flex:0.1, backgroundColor:'white'}}></View>
                    {/* # box*/} 
                    <View style={{flex:0.7, backgroundColor:'white'}}> 
                    </View>
                    {/* buffer after # box*/} 
                    <View style={{flex:0.2, backgroundColor:'white'}}></View>      
                </View>
                {/* posting to box*/} 
                <View style={{flex:0.05, flexDirection:'row', backgroundColor:'white'}}>
                    {/* buffer before text box*/} 
                    <View style={{flex:0.2, backgroundColor:'white'}}></View> 
                    {/* text box*/} 
                    <View style={{flex:0.6, backgroundColor:'white', justifyContent:'center'}}>
                        <Text style={{fontFamily:'avenir next', fontSize:factor_hor*18, color:'#9B9B9B', textAlign:'center'}}></Text>
                    </View>   
                    {/* buffer after text box*/} 
                    <View style={{flex:0.2, backgroundColor:'white'}}></View>     
                </View>
                { this.state.show_indicator && (
                    <ActivityIndicator size='large' color={'#9b9b9b'} style={{ position:'absolute', left:Dimensions.get('window').width*0.435, top:Dimensions.get('window').height*0.4, height:50, width:50*factor_hor, justifyContent:'center', alignItems:'center',}}/>
                )}
                {this.state.visible && ( 
                <View style={{position:'absolute', width:Dimensions.get('window').height*0.3, height:Dimensions.get('window').height*0.3, 
                    top:Dimensions.get('window').height*0.5, zIndex:2, left:Dimensions.get('window').width*0.175, alignContent:'center', justifyContent:'center', alignItems:'center',}}>
                    <FastImage
                    resizeMode={FastImage.resizeMode.contain}
                        source={{ uri: this.state.filePath.uri }}
                        style={{ width:'100%', height:'100%', }}
                    />
                </View>
                )}
                <View style={{height:100*factor_ver, }}></View>
                
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
        backgroundColor: 'white',
      },

    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
});
