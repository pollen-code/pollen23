import React from 'react';
import {StyleSheet, TextInput, Dimensions, Alert, Text, 
        View, TouchableOpacity, KeyboardAvoidingView, 
        ActivityIndicator, Keyboard, AsyncStorage} from 'react-native';
import { Icon } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';

var body = new FormData();
var videoData = new FormData();

export default class create_post extends React.Component {
    static navigationOptions = {header: null}
    constructor(props) {
        super(props);
        this.user_location = global.user_position
        this.state = {
            is_img:'none',
            post:'', // post itself
            post_length:400, // post length
            tags:'',
            username:'',
            latitude:0, // user lat
            longitude:0, // user long
            anon:true,
            col_arr:['white',"#FC6026", ],
            box:["#FC6026", 'black'],
            usern:'Anonymous',
            usernuss:'Anonymous',
            show_indicator:false, 
            visible:false, // show image if exists
            filePath: {},
            video:'none',
            img_data:'none',
        }
    }

    async componentDidMount() {
        user = await AsyncStorage.getItem('user')
        data = await this.props.navigation.getParam("data")
        clip = false
        videoURL = false
        videoLength = false
        videoState = false
        if(typeof(data) !== 'undefined') {
            clip = true
            videoURL = data.videoURL
            videoLength = data.videoLength
            videoState = data.videoState
        }
        await this.setState({
            clip: clip,
            videoURL: videoURL,
            videoLength: videoLength,
            videoState: videoState, 
            latitude:this.user_location.coords.latitude, 
            longitude:this.user_location.coords.longitude,
            username:user,
        }, function() {console.log(
            this.state.clip,
            this.state.videoURL,
            this.state.videoLength,
            this.state.videoState, 
        )})
    }   
    closeActivityIndicator() { 
        setTimeout(() => this.setState({animating: false }), 10000); 
    }
    async delete_image() {
        body = new FormData();
        videoData = new FormData();
        await this.setState({
            visible:false, 
            video:'none', 
            filePath:{},
            img_data:'none',
            box:["#FC6026", 'black'], 
            clip: null,
            videoURL: null,
            videoLength: null,
            videoState: null, 
        })
    }
    chooseFile = async () => {
        await this.delete_image()
        var options = {
            title:'Select Image',
            storageOptions: {mediaType:'videos',skipBackup:true,path:'images',},
            maxWidth:1000, 
            maxHeight:1000
        };

        ImagePicker.showImagePicker(options, response => {
            if(response.didCancel) {
                console.log('User cancelled image picker');
            } 
            else if(response.error) {
                console.log('ImagePicker Error: ', response.error);
            } 
            else {
                this.setState({
                    filePath:response, 
                    animating:false, 
                    visible:true,
                    img_data:JSON.stringify(response.data), 
                    box:['black',"#FC6026" ]
                });
                body.append('file', {  uri: response.uri, 
                                        name: response.fileName, 
                                        type: response.type});
                body.append('Content-Type', 'image/png');
            }
        });  
    };
    async chooseVideo() {
        await this.delete_image()
        const options = {
            title:'Select Video',
            mediaType: 'video',
            videoQuality: 'medium',
            durationLimit: 60,
            thumbnail: true,
            allowsEditing: true,
            storageOptions:{skipBackup:true,path:'videos'}
        };
        await ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.warn('User cancelled video picker');
                return true;
            } else if (response.error) {
                console.warn('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.warn('User tapped custom button: ', response.customButton);
            } else {
                videoData.append("video", {
                    name: 'video',
                    uri: response.uri,
                    type: 'video/mp4'
                });
                this.setState({video: response.uri,});
            }
        });
    }
    async make_anon() {
        if( this.state.anon == false ){ // if not anon make anon
            await this.setState( {
                col_arr:['white', "#FC6026"],
                anon:true, 
                usernuss:'Anonymous',
                box:["#FC6026", 'black'],
            })
        }
        else if( this.state.anon == true ) { // if anon make normal 
            this.setState({ 
                anon:false,
                usernuss:this.state.username,
                col_arr:["#FC6026", 'white'], 
                box:["#FC6026", 'black']
            })
        }    
    }
    check_length(){
        if(this.state.post_length == 0) {
            return Alert.alert('Post length too long', '')
            
        }
    }
    async going_back() {
        body = new FormData();
        this.setState( {
            usern:'Anonymous',
            usernuss:'Anonymous',
            box:["#FC6026", 'black'],
            col_arr:['white', "#FC6026", ] 
        } )
        this.props.navigation.goBack();
    }
    ifImage() {
        if(this.state.img_data !== 'none') {
            return true
        }
        else {
            return false
        }
    }
    ifVideo() {
        if(this.state.video !== 'none') {
            return true
        }
        else {
            return false
        }
    }
    whatType() {
        if(this.state.img_data !== 'none') {
            return 'picture'
        }
        else if(this.state.video !== 'none') {
            return 'video'
        }
        else {
            return 'none'
        }
    }
    async post() {
        if(this.state.post_length < 400 && this.state.post_length > 0 || 
            typeof(this.state.filePath.data) == 'string') {
            await this.setState({show_indicator:true})
            is_img = false
            mediatype = await this.whatType()
            await fetch(`http://${serverLocation}:80/make_post?`, {
                method:'POST',
                headers:{    
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                body: 
                JSON.stringify({
                    posterID:this.state.username,
                    longitude:this.state.longitude,
                    latitude:this.state.latitude,
                    anon:this.state.anon,
                    post:this.state.post,
                    media:this.state.img_data,
                    mediatype:mediatype,
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                body = new FormData();
                videoData = new FormData();
                this.textInput2.clear()
                this.setState({
                    post:'', 
                    usern:'Anonymous',
                    usernuss:'Anonymous',
                    box:["#FC6026", 'black'],
                    col_arr:['white',"#FC6026"], 
                    media:'none',
                    video:'none',
                    show_indicator:false,
                })
                this.props.navigation.goBack();
            })
            .catch((error) => {
                console.log(error)
                Alert.alert('Check your connection and location settings and try again')
            }); 
        }
        else {
            return Alert.alert('Include text or an image')
        }
    }
    async postVideo() {
        if(this.state.video !== 'none'){
            await this.setState({show_indicator:true})
            is_img = false
            videoData.append("posterID", this.state.username)
            videoData.append("longitude", this.state.longitude)
            videoData.append("latitude", this.state.latitude)
            videoData.append("anon", this.state.anon)
            videoData.append("post", this.state.post)
            console.log(videoData)
            await fetch(`http://${serverLocation}:80/make_post_video?`,{
                method: "POST",
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
                body: videoData
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    body = new FormData();
                    videoData = new FormData();
                    this.textInput2.clear()
                    this.setState({
                        post:'', 
                        usern:'Anonymous',
                        usernuss:'Anonymous',
                        box:["#FC6026", 'black'],
                        col_arr:[ 'white',"#FC6026"], 
                        media:'none',
                        video:'none',
                        show_indicator:false,
                    })
                    this.props.navigation.goBack();
                })
                .catch((error) => {
                    console.log(error)
                    Alert.alert('Check your connection and location settings and try again')
                });
        }
        else {
            return Alert.alert('Include text or an image')
        }
    }
    whatPost() {
        if(this.state.clip == true) {
            this.makeClip()
        }
        else if(this.state.video !== 'none') {
            this.postVideo()
        }
        else {
            this.post()
        }
    }
    async makeClip() {
        num1 = Number(this.state.videoState[0]/100*this.state.videoLength).toFixed(1)
        num2 = Number(this.state.videoState[1]/100*this.state.videoLength).toFixed(1)
        await this.setState({show_indicator:true})
        console.log(
            this.state.videoURL,
            num1, 
            num2, 
            this.state.anon,
            this.state.username,
            this.state.post,
            this.state.longitude,
            this.state.latitude,
        )
        await fetch(`http://${serverLocation}:80/make_post_clip?`, {
            method:'POST',
            headers:{    
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
            body: 
            JSON.stringify({
                videoURL: this.state.videoURL,
                videoStart: num1,
                videoEnd: num2,
                anon: this.state.anon, 
                posterID: this.state.username,
                post: this.state.post,
                longitude: this.state.longitude,
                latitude: this.state.latitude,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                body = new FormData();
                videoData = new FormData();
                this.textInput2.clear()
                this.setState({
                    post:'', 
                    usern:'Anonymous',
                    usernuss:'Anonymous',
                    box:["#FC6026", 'black'],
                    col_arr:[ 'white',"#FC6026"], 
                    media:'none',
                    video:'none',
                    show_indicator:false,
                })
                this.props.navigation.goBack();
            })
            .catch((error) => {
                console.log(error)
                Alert.alert('Check your connection and location settings and try again')
            });
    }   
    whatNum() {
        num1 = Number(this.state.videoState[0]/100*this.state.videoLength).toFixed(1)
        num2 = Number(this.state.videoState[1]/100*this.state.videoLength).toFixed(1)
        console.log(num2, num1)
        if(num2 - num1 < 1.1) {
            return `${num1}s`
        }
        else {
            return ` ${num1}s - ${num2}s`
        }
    }     

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled keyboardVerticalOffset={-275*factor_ver}>
                    {/* status bar*/} 
                    <View style={{height:Dimensions.get('window').height*0.05, width:Dimensions.get('window').width, backgroundColor:'white', alignSelf:'stretch'}}></View>
                    {/* buffer after status bar*/} 
                    <View style={{height:Dimensions.get('window').height*0.01, width:Dimensions.get('window').width, alignSelf:'stretch',}}></View>
                    {/* text box*/} 
                    <View style={{height:Dimensions.get('window').height*0.94, width:Dimensions.get('window').width, alignSelf:'stretch', backgroundColor:'white', borderRadius:1, borderWidth:2, borderColor: this.state.box[0]}}>
                    {/* buffer at top of text box*/} 
                    <View style={{flex:0.02, backgroundColor:'white'}}></View>
                    {/* back arrow, username, post button horizontal box*/} 
                    <View style={{flex:0.07,flexDirection:'row',}}>
                        {/* back arrow box*/}
                        <View style={{flex:0.1, marginLeft:5*factor_hor, backgroundColor:'white',justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>{this.going_back()}}>
                                <Icon 
                                    size={15+15*factor_hor}
                                    name="chevron-left"
                                    color="#9b9b9b"
                                    type='entypo'
                                />
                            </TouchableOpacity>
                        </View>
                        {/* @username box*/}
                        <View style={{flex:0.5, marginLeft:5*factor_hor, backgroundColor:'white', justifyContent:'center'}}>
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
                        <TouchableOpacity onPress={ () => {this.whatPost(); }} style={{backgroundColor:"#FC6026", borderRadius:5}}>
                                <Text style={{fontFamily:'avenir next', fontSize:factor_hor*19, color:'white', borderRadius:10, borderWidth:1, borderColor:"#FC6026", textAlign:'center'}}>Post</Text>
                            </TouchableOpacity>
                        </View>
                        {/* buffer after post button*/}
                        <View style={{flex:0.05, backgroundColor:'white'}}></View>
                    </View>

                    {/* type, add photo, add gif, add poll horizontal box*/} 
                    <View style={{flex:0.35, flexDirection:'row', backgroundColor:'white'}}>
                        {/* buffer before type box*/}
                        <View style={{flex:0.1, }}></View>
                        {/* type box*/}
                        <View style={{flex:0.7, }}>
                            <TextInput style={{textAlign:'left',fontSize:factor_hor*18, backgroundColor:'white', fontFamily:'avenir next' }}
                                        color='black'
                                        ref={input => { this.textInput2 = input }}
                                        multiline={true}
                                        allowFontScaling={true}
                                        autoCompleteType={"off"}
                                        blurOnSubmit={true}
                                        returnKeyType={'done'}
                                        placeholder='type here...'                                                              
                                        placeholderTextColor='black'
                                        maxLength={399}
                                        onChangeText={(typedText) => {
                                            this.setState( {post: typedText}, function () {console.log(this.state.post)} )
                                            this.setState( {post_length: 400 - typedText.length}, function () {console.log(this.state.typedText)})
                                        }}
                                        onSubmitEditing={ () => {this.check_length(), Keyboard.dismiss()}}
                            />  
                        </View>
                        {/* add picture, add gif, add poll */}
                        <View style={{flex:0.15, justifyContent:'center'}}>
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
                            {/* add video */}
                            <View style={{flex:0.333, paddingStart:10*factor_hor, backgroundColor:'white', justifyContent:'center'}}>
                                <TouchableOpacity
                                    onPress={() => this.chooseVideo()}
                                    style={{marginBottom:0, paddingStart:3, paddingTop:7}}>
                                    <Icon 
                                        size={26*factor_hor}
                                        name={'video'}
                                        color={"black"}
                                        type={'feather'}
                                    />
                                </TouchableOpacity>
                            </View>   
                            {/* delete image */}
                            <View style={{flex:0.333, backgroundColor:'white', justifyContent:'center'}}>
                                <TouchableOpacity 
                                    onPress={() => { this.delete_image() }} 
                                    style={{marginStart:15*factor_hor,}}>
                                        <Icon 
                                            size={30*factor_hor}
                                            name="cross"
                                            color="black"
                                            type='entypo'
                                        />
                                </TouchableOpacity>
                            </View>
                            {/* add picture box */}
                            <View style={{flex:0.333, backgroundColor:'white', justifyContent:'center'}}>
                                <TouchableOpacity style={{marginStart:0}}>
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
                        {/* 
                            <TextInput style={{textAlign:'left',fontSize:factor_hor*18, backgroundColor:'white', fontFamily:'avenir next' }}
                                        color='black'
                                        numberOfLines={2}
                                        allowFontScaling={true}
                                        autoCompleteType={"off"}
                                        blurOnSubmit={true}
                                        placeholder= 'tags for search: #one, #two, ...'
                                        placeholderTextColor='black'
                                        ref={input => { this.textInput= input }}
                                        maxLength={100}
                                        returnKeyType={'done'}
                                        onSubmitEditing={() => { Keyboard.dismiss() }}
                                        onChangeText={(typedText2) => {this.setState( {tags: typedText2}, function () {console.log(this.state.tags)} )}}
                            />   */}
                        </View>
                        {/* buffer after # box*/} 
                        <View style={{flex:0.2,  }}></View>      
                    </View>
                    {/* posting to box*/} 
                    <View style={{flex:0.05, alignSelf:'stretch', flexDirection:'row',}}>
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
                    <View style={{position:'absolute', width:Dimensions.get('window').height*0.3, height:Dimensions.get('window').height*0.3, 
                            top:Dimensions.get('window').height*0.5, zIndex:2, left:Dimensions.get('window').width*0.175, alignContent:'center', justifyContent:'center', alignItems:'center',}}>
                        
                        { this.ifImage() && (
                            <FastImage
                                resizeMode={FastImage.resizeMode.contain}
                                source={{ uri: this.state.filePath.uri }}
                                style={{ width:'100%', height:'100%', }}
                            />
                        )}
                        { this.ifVideo() && (
                            <Video 
                                source={{uri: this.state.video}}
                                ref={(ref) => {this.player = ref}}
                                onBuffer={this.onBuffer}
                                onError={this.videoError}
                                style={{ width:'100%', height:'100%', }}
                            />
                        )}
                        { this.state.clip && (
                            <View style={{
                                justifyContent:'center', 
                                alignItems:'center', 
                                alignContent:'center',
                            }}>
                            <View style={{
                                height:100*factor_hor, 
                                width:100*factor_hor, 
                                borderRadius:100,
                                zIndex:3,
                                justifyContent:'center', 
                                alignItems:'center', 
                                alignContent:'center',
                                backgroundColor:'#ececec', 
                                shadowColor:'grey', 
                                shadowRadius:10,
                                shadowOpacity:0.8,
                            }}>
                                <TouchableOpacity
                                    style={{
                                        justifyContent:'center', 
                                        alignItems:'center',
                                        alignContent:'center',
                                        flex:1,
                                        paddingLeft:10*factor_hor, 
                                        paddingTop:5*factor_hor, 
                                    }}>
                                    <Icon 
                                        size={60*factor_hor}
                                        name={"controller-play"}
                                        color={"#9B9B9B"}
                                        type={'entypo'}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text 
                                style={{
                                    marginTop:20*factor_ver,
                                    textAlign:'center', 
                                    color:'#9b9b9b',
                                    fontSize:25*factor_hor,
                                }}>Clip</Text>
                            <Text 
                                style={{
                                    marginTop:10*factor_ver, 
                                    textAlign:'center', 
                                    color:'#9b9b9b',
                                    fontSize:25*factor_hor,
                                }}>[ {this.whatNum()} ]</Text>
                            </View>
                        )}
                    </View>    
                </View>
            
            </KeyboardAvoidingView>             
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
