import React from 'react';
import {StyleSheet, Modal, Animated, TouchableOpacity, Text,
        RefreshControl, ActivityIndicator,Alert, AsyncStorage, View, 
        Dimensions, Share, TouchableHighlight, TouchableWithoutFeedback} from 'react-native';
import { Icon } from 'react-native-elements'
import { TextInput } from 'react-native-gesture-handler';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import LinearGradient from 'react-native-linear-gradient';
import DoubleClick from 'react-native-double-tap';
import Geolocation from 'react-native-geolocation-service';
import FastImage from 'react-native-fast-image'
import Permissions from 'react-native-permissions';
import Video from 'react-native-video';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import funcs from './functions';
import Share_ from './svgs/share';
import SendMessage from './svgs/send_message';
import Block from  './svgs/block';
import Flag from './svgs/flag';
import Save from './svgs/save';
import Eye from './svgs/eye';
import Hot from './svgs/hot';
import New from './svgs/new';

const geolib = require('geolib');
const height_ = Dimensions.get('window').height 
const width_ = Dimensions.get('window').width  
const config = {velocityThreshold: 0.2,directionalOffsetThreshold: 99};  
var received_posts = [1,2]
var lastDirection = 0

export default class feed extends React.PureComponent {
    static navigationOptions = {header: null};
    constructor(props) {
        super(props)
        this.offset = true
        this.isLoad = false
        this._layoutProvider = new LayoutProvider((i) => {
            type_ = this.state.dataProvider._data[i][8];
            return this.state.dataProvider._data[i][21];
            }, (type, dim, type_) => {
            switch (type) {
                case "v0":
                    dim.width = width_; 
                    dim.height = 8*factor_hor + 75*factor_ver + width_*1.11*factor_hor;
                    break

                case "v25":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 125*factor_ver + width_*1.11*factor_hor;
                    break;
                case "v50":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 150*factor_ver + width_*1.11*factor_hor;
                    break;
                case "v75":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 150*factor_ver + width_*1.11*factor_hor;
                    break;
                case "v100":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 175*factor_ver + width_*1.11*factor_hor;
                    break;
                case "v125":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 200*factor_ver + width_*1.11*factor_hor;
                    break;
                case "v150":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 200*factor_ver + width_*1.11*factor_hor;
                    break;
                case "v175":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 225*factor_ver + width_*1.11*factor_hor;
                    break;
                case "v200":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 250*factor_ver + width_*1.11*factor_hor;
                    break;
                case "v225":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 250*factor_ver + width_*1.11*factor_hor;
                    break;
                case "v250":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 275*factor_ver + width_*1.11*factor_hor;
                    break;
                case "v275":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 275*factor_ver + width_*1.11*factor_hor;
                    break;
                case "v300":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 300*factor_ver + width_*1.11*factor_hor;
                    break;
                case "v325":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 325*factor_ver + width_*1.11*factor_hor;
                    break;
                case "v350":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 325*factor_ver + width_*1.11*factor_hor;
                    break;
                case "v375":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 350*factor_ver + width_*1.11*factor_hor;
                    break;
                case "v400":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 350*factor_ver + width_*1.11*factor_hor;
                    break;  

                case "p0":
                    dim.width = width_; 
                    dim.height = 8*factor_hor + 75*factor_ver + width_*1.11*factor_hor;
                    break

                case "p25":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 125*factor_ver + width_*1.11*factor_hor;
                    break;
                case "p50":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 150*factor_ver + width_*1.11*factor_hor;
                    break;
                case "p75":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 150*factor_ver + width_*1.11*factor_hor;
                    break;
                case "p100":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 175*factor_ver + width_*1.11*factor_hor;
                    break;
                case "p125":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 200*factor_ver + width_*1.11*factor_hor;
                    break;
                case "p150":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 200*factor_ver + width_*1.11*factor_hor;
                    break;
                case "p175":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 225*factor_ver + width_*1.11*factor_hor;
                    break;
                case "p200":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 250*factor_ver + width_*1.11*factor_hor;
                    break;
                case "p225":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 250*factor_ver + width_*1.11*factor_hor;
                    break;
                case "p250":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 275*factor_ver + width_*1.11*factor_hor;
                    break;
                case "p275":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 275*factor_ver + width_*1.11*factor_hor;
                    break;
                case "p300":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 300*factor_ver + width_*1.11*factor_hor;
                    break;
                case "p325":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 325*factor_ver + width_*1.11*factor_hor;
                    break;
                case "p350":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 325*factor_ver + width_*1.11*factor_hor;
                    break;
                case "p375":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 350*factor_ver + width_*1.11*factor_hor;
                    break;
                case "p400":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 350*factor_ver + width_*1.11*factor_hor;
                    break;  

                case "25":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 125*factor_ver;
                    break;
                case "50":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 150*factor_ver;
                    break;
                case "75":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 150*factor_ver;
                    break;
                case "100":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 175*factor_ver;
                    break;
                case "125":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 200*factor_ver;
                    break;
                case "150":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 200*factor_ver;
                    break;
                case "175":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 225*factor_ver;
                    break;
                case "200":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 250*factor_ver;
                    break;
                case "225":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 250*factor_ver;
                    break;
                case "250":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 275*factor_ver;
                    break;
                case "275":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 275*factor_ver;
                    break;
                case "300":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 300*factor_ver;
                    break;
                case "325":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 325*factor_ver;
                    break;
                case "350":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 325*factor_ver;
                    break;
                case "375":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 350*factor_ver;
                    break;
                case "400":
                    dim.width = width_;
                    dim.height = 8*factor_hor + 350*factor_ver;
                    break;                                                                                                   
            }
        });
        this._renderRow = this._renderRow.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.state = {
            /**
             * Props for fetch posts
             */
            username: null,
            level: null,
            lat: null, 
            long: null,
            sort: null, 
            search_term: null,
            safe_mode: null, 
            /** 
             * Tabs ( World | City | Local ) Color
            */
            city_weight: '600', 
            world_weight: 'normal',
            local_weight: 'normal',
            world_border: 'transparent',
            city_border: 'white',
            local_border: 'transparent',   
            /**
             * Modal / dialog visiblity
             */
            visible_image: false,
            visible_options: false, 
            visible_sorting: false,
            visible_video: false, 
            first_loaded: false, 
            key_status: 0, 
            gestureName: 'none',
            outPosts: false, 
            posts: [],
            seenFeed: false, 
            showNav: true, 
            offset: true, 
            paused: true, 
            videoLength: 0,
            videoState: [0, 100],
            showSlider: false,
        }
    }

    _renderRow(type, data, index) {
        switch (type) {
            case "v0":
                return <View style={{height:1,}}>
                        <Animated.View style={{height: width_*1.11*factor_hor + 75*factor_ver, 
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}>
                            <View style={{height:15*factor_ver}}></View>
                            <View style={{
                                height:width_*1.11*factor_hor,
                                borderRadius:20*factor_hor,
                                alignItems:'center',
                                alignContent:'center',
                            }}>
                                <View style={{
                                    width:width_*0.9,
                                    height:'100%',
                                }}>
                                    <Text 
                                        numberOfLines={15}
                                        minimumFontScale={0.5}
                                        adjustsFontSizeToFit={true}
                                        style={{
                                            flex:1,
                                            fontFamily:'avenir next',
                                            marginTop:17*factor_ver, 
                                            textAlign:'left', 
                                            fontSize:30*factor_hor,
                                        }}>{this.state.posts[index][7]}
                                    </Text>
                                </View>
                                <DoubleClick
                                    singleTap={() => { this.setState({visible_video:true, clicked_image:this.state.posts[index][18] }) }}
                                    doubleTap={() => {this.likePost(index);}}
                                    delay={350}
                                >
                                    <FastImage
                                        resizeMode={FastImage.resizeMode.cover}
                                        source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                        style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                    /> 
                                </DoubleClick>                
                            </View>
                            <View style={{height:5*factor_ver}}></View>
                            <DoubleClick
                                singleTap={() => {
                                    this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                    this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                                }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <View style={{
                                    height:55*factor_ver,
                                    flexDirection:'row',
                                    justifyContent:'center', 
                                    alignContent:'center',    
                                }}>
                                    <View style={{flex:1.666,}}>
                                        <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                            <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                                <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{flex:1.666,}}>
                                        <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                            <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                        </View>
                                    </View>
                                    <View style={{flex:1.666, justifyContent:'center'}}>
                                        <TouchableHighlight 
                                            underlayColor={'transparent'} 
                                            onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                            style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                        >
                                            <Icon 
                                                size={22*factor_hor}
                                                name="dots-three-horizontal"
                                                color="#9B9B9B"
                                                type='entypo'
                                            />
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </DoubleClick>
                        </Animated.View>
                    </View>
            case "v25":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 125*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.5}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <View style={{
                                position:'absolute', 
                                height:100*factor_hor, 
                                width:100*factor_hor, 
                                borderRadius:100,
                                top:150*factor_ver,
                                left:140*factor_hor,
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
                                    onPress={() => { this.setState({visible_video:true, clicked_image:this.state.posts[index][18] }) }}
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
                            <DoubleClick
                                singleTap={() => { this.setState({visible_video:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <Video
                                    onLayout={() => console.log('laid')}
                                    source={{uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    ref={(ref) => this.state.posts[index].push(ref)}
                                    bufferConfig={{
                                        minBufferMs: 15000,
                                        maxBufferMs: 60000,
                                        bufferForPlaybackMs: 5000,
                                        bufferForPlaybackAfterRebufferMs: 5000
                                    }}
                                    controls={false}
                                    preload={"none"}
                                    fullscreen={false}
                                    minLoadRetryCount={100}
                                    resizeMode={"cover"}
                                    playWhenInactive={false}
                                    progressUpdateInterval={250}
                                    onBuffer={console.log('hi')}
                                    onError={e => console.log(e)}
                                    paused={true}
                                    onLoad={(e) => this.state.posts[index].push(e.duration)}
                                    onEnd={() => this.setState({paused:true},
                                        function(){console.log(this.state.paused)})}     
                                    style={{ 
                                        height: width_*1.11*factor_hor, 
                                        width: width_*0.925, 
                                        alignItems:'center', 
                                        borderRadius:20*factor_hor, 
                                        alignSelf:'stretch',
                                    }}
                                />
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "v50":
                return <View style={{height:1,}}>
                <Animated.View 
                    style={{
                        height: 150*factor_ver + width_*1.11*factor_hor,
                        borderRadius: 30*factor_hor,
                        width: '100%', 
                        backgroundColor: 'white',
                        paddingBottom: this.state.posts[index][24],
                        paddingTop: this.state.posts[index][24],
                        paddingRight: this.state.posts[index][24],
                        paddingLeft: this.state.posts[index][24],
                        borderColor: this.state.posts[index][22].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.posts[index][23],
                        overflow: 'hidden',
                    }}
                >
                    <View style={{
                        flex:1, 
                        flexDirection:'row',
                        paddingLeft:20*factor_hor,
                        paddingRight:20*factor_hor,}}>
                    <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                        <Text 
                            numberOfLines={15}
                            minimumFontScale={0.5}
                            adjustsFontSizeToFit={true}
                            style={{
                                flex:1,
                                fontFamily:'avenir next',
                                marginTop:17*factor_ver, 
                                textAlign:'left', 
                                fontSize:30*factor_hor,
                            }}>{this.state.posts[index][7]}
                        </Text>
                    </View>
                        
                    <DoubleClick
                        singleTap={() => {
                            this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                            this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >    
                    <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                        <Text 
                            numberOfLines={15}
                            minimumFontScale={0.5}
                            adjustsFontSizeToFit={true}
                            style={{
                                flex:1,
                                fontFamily:'avenir next',
                                marginTop:17*factor_ver, 
                                textAlign:'left', 
                                fontSize:30*factor_hor,
                            }}>{this.state.posts[index][7]}
                        </Text>
                        </View>
                    </DoubleClick>
                    </View>
                    <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_video:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                    <DoubleClick
                        singleTap={() => {
                            this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                            this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >
                        <View style={{
                            height:55*factor_ver,
                            flexDirection:'row',
                            justifyContent:'center', 
                            alignContent:'center',    
                        }}>
                            <View style={{flex:1.666,}}>
                                <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                    <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                        <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                    </View>
                                </View>
                            </View>
                            <View style={{flex:1.666,}}>
                                <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                    <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                </View>
                            </View>
                            <View style={{flex:1.666, justifyContent:'center'}}>
                                <TouchableHighlight 
                                    underlayColor={'transparent'} 
                                    onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                    style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                >
                                    <Icon 
                                        size={22*factor_hor}
                                        name="dots-three-horizontal"
                                        color="#9B9B9B"
                                        type='entypo'
                                    />
                                </TouchableHighlight>
                            </View>
                        </View>
                    </DoubleClick>
                </Animated.View>
            </View>
            case "v75":
                return <View style={{height:1,}}>
                <Animated.View 
                    style={{
                        height: 150*factor_ver + width_*1.11*factor_hor,
                        borderRadius: 30*factor_hor,
                        width: '100%', 
                        backgroundColor: 'white',
                        paddingBottom: this.state.posts[index][24],
                        paddingTop: this.state.posts[index][24],
                        paddingRight: this.state.posts[index][24],
                        paddingLeft: this.state.posts[index][24],
                        borderColor: this.state.posts[index][22].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.posts[index][23],
                        overflow: 'hidden',
                    }}
                >
                    <View style={{
                        flex:1, 
                        flexDirection:'row',
                        paddingLeft:20*factor_hor,
                        paddingRight:20*factor_hor,}}>
                    <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.5}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        
                    <DoubleClick
                        singleTap={() => {
                            this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                            this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >    
                    <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                        <Text 
                            numberOfLines={15}
                            minimumFontScale={0.4}
                            adjustsFontSizeToFit={true}
                            style={{
                                flex:1,
                                fontFamily:'avenir next',
                                marginTop:17*factor_ver, 
                                textAlign:'left', 
                                fontSize:30*factor_hor,
                            }}>{this.state.posts[index][7]}
                        </Text>
                        </View>
                    </DoubleClick>
                    </View>
                    <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_video:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: 'http://'+serverLocation+'/'+this.state.posts[index][18] }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                    <DoubleClick
                        singleTap={() => {
                            this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                            this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >
                        <View style={{
                            height:55*factor_ver,
                            flexDirection:'row',
                            justifyContent:'center', 
                            alignContent:'center',    
                        }}>
                            <View style={{flex:1.666,}}>
                                <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                    <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                        <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                    </View>
                                </View>
                            </View>
                            <View style={{flex:1.666,}}>
                                <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                    <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                </View>
                            </View>
                            <View style={{flex:1.666, justifyContent:'center'}}>
                                <TouchableHighlight 
                                    underlayColor={'transparent'} 
                                    onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                    style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                >
                                    <Icon 
                                        size={22*factor_hor}
                                        name="dots-three-horizontal"
                                        color="#9B9B9B"
                                        type='entypo'
                                    />
                                </TouchableHighlight>
                            </View>
                        </View>
                    </DoubleClick>
                </Animated.View>
            </View>
            case "v100":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 175*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.5}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.375}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:40*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_video:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "v125":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 200*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.5}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.5}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_video:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "v150":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 200*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.5}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.45}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_video:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "v175":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 225*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.5}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.345}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:40*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_video:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "v200":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 250*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.5}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.45}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_video:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "v225":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 250*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.5}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.45}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_video:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "v250":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 275*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.5}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.34}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    backgroundColor:'white',
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:40*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_video:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "v275":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 275*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.5}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.32}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:40*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_video:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "v300":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 300*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.5}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.34}
                                maxFontSizeMultiplier={20}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:40*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_video:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "v325":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 325*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.5}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.3}
                                maxFontSizeMultiplier={20}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:45*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_video:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "v350":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 325*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.5}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.34}
                                maxFontSizeMultiplier={20}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:40*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_video:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "v375":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 350*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.5}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.34}
                                maxFontSizeMultiplier={20}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:40*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_video:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "v400":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 350*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.5}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                                                        
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.34}
                                maxFontSizeMultiplier={20}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:40*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_video:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>

            case "p0":
                return <View style={{height:1,}}>
                        <Animated.View style={{height: width_*1.11*factor_hor + 75*factor_ver, 
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}>
                            <View style={{height:15*factor_ver}}></View>
                            <View style={{
                                height:width_*1.11*factor_hor,
                                borderRadius:20*factor_hor,
                                alignItems:'center',
                                alignContent:'center',
                            }}>
                                <DoubleClick
                                    singleTap={() => { this.setState({visible_image:true, clicked_image:this.state.posts[index][18] }) }}
                                    doubleTap={() => {this.likePost(index);}}
                                    delay={350}
                                >
                                    <FastImage
                                        resizeMode={FastImage.resizeMode.cover}
                                        source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                        style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                    /> 
                                </DoubleClick>                
                            </View>
                            <View style={{height:5*factor_ver}}></View>
                            <DoubleClick
                                singleTap={() => {
                                    this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                    this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                                }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <View style={{
                                    height:55*factor_ver,
                                    flexDirection:'row',
                                    justifyContent:'center', 
                                    alignContent:'center',    
                                }}>
                                    <View style={{flex:1.666,}}>
                                        <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                            <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                                <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{flex:1.666,}}>
                                        <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                            <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                        </View>
                                    </View>
                                    <View style={{flex:1.666, justifyContent:'center'}}>
                                        <TouchableHighlight 
                                            underlayColor={'transparent'} 
                                            onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                            style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                        >
                                            <Icon 
                                                size={22*factor_hor}
                                                name="dots-three-horizontal"
                                                color="#9B9B9B"
                                                type='entypo'
                                            />
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </DoubleClick>
                        </Animated.View>
                    </View>
            case "p25":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 125*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.5}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                            </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_image:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "p50":
                return <View style={{height:1,}}>
                <Animated.View 
                    style={{
                        height: 150*factor_ver + width_*1.11*factor_hor,
                        borderRadius: 30*factor_hor,
                        width: '100%', 
                        backgroundColor: 'white',
                        paddingBottom: this.state.posts[index][24],
                        paddingTop: this.state.posts[index][24],
                        paddingRight: this.state.posts[index][24],
                        paddingLeft: this.state.posts[index][24],
                        borderColor: this.state.posts[index][22].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.posts[index][23],
                        overflow: 'hidden',
                    }}
                >
                    <View style={{
                        flex:1, 
                        flexDirection:'row',
                        paddingLeft:20*factor_hor,
                        paddingRight:20*factor_hor,}}>
                    <DoubleClick
                        singleTap={() => {
                            this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                            this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >    
                    <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                        <Text 
                            numberOfLines={15}
                            minimumFontScale={0.5}
                            adjustsFontSizeToFit={true}
                            style={{
                                flex:1,
                                fontFamily:'avenir next',
                                marginTop:17*factor_ver, 
                                textAlign:'left', 
                                fontSize:30*factor_hor,
                            }}>{this.state.posts[index][7]}
                        </Text>
                        </View>
                    </DoubleClick>
                    </View>
                    <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_image:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                    <DoubleClick
                        singleTap={() => {
                            this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                            this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >
                        <View style={{
                            height:55*factor_ver,
                            flexDirection:'row',
                            justifyContent:'center', 
                            alignContent:'center',    
                        }}>
                            <View style={{flex:1.666,}}>
                                <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                    <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                        <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                    </View>
                                </View>
                            </View>
                            <View style={{flex:1.666,}}>
                                <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                    <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                </View>
                            </View>
                            <View style={{flex:1.666, justifyContent:'center'}}>
                                <TouchableHighlight 
                                    underlayColor={'transparent'} 
                                    onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                    style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                >
                                    <Icon 
                                        size={22*factor_hor}
                                        name="dots-three-horizontal"
                                        color="#9B9B9B"
                                        type='entypo'
                                    />
                                </TouchableHighlight>
                            </View>
                        </View>
                    </DoubleClick>
                </Animated.View>
            </View>
            case "p75":
                return <View style={{height:1,}}>
                <Animated.View 
                    style={{
                        height: 150*factor_ver + width_*1.11*factor_hor,
                        borderRadius: 30*factor_hor,
                        width: '100%', 
                        backgroundColor: 'white',
                        paddingBottom: this.state.posts[index][24],
                        paddingTop: this.state.posts[index][24],
                        paddingRight: this.state.posts[index][24],
                        paddingLeft: this.state.posts[index][24],
                        borderColor: this.state.posts[index][22].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.posts[index][23],
                        overflow: 'hidden',
                    }}
                >
                    <View style={{
                        flex:1, 
                        flexDirection:'row',
                        paddingLeft:20*factor_hor,
                        paddingRight:20*factor_hor,}}>
                    <DoubleClick
                        singleTap={() => {
                            this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                            this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >    
                    <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                        <Text 
                            numberOfLines={15}
                            minimumFontScale={0.4}
                            adjustsFontSizeToFit={true}
                            style={{
                                flex:1,
                                fontFamily:'avenir next',
                                marginTop:17*factor_ver, 
                                textAlign:'left', 
                                fontSize:30*factor_hor,
                            }}>{this.state.posts[index][7]}
                        </Text>
                        </View>
                    </DoubleClick>
                    </View>
                    <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_image:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                    <DoubleClick
                        singleTap={() => {
                            this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                            this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >
                        <View style={{
                            height:55*factor_ver,
                            flexDirection:'row',
                            justifyContent:'center', 
                            alignContent:'center',    
                        }}>
                            <View style={{flex:1.666,}}>
                                <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                    <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                        <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                    </View>
                                </View>
                            </View>
                            <View style={{flex:1.666,}}>
                                <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                    <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                </View>
                            </View>
                            <View style={{flex:1.666, justifyContent:'center'}}>
                                <TouchableHighlight 
                                    underlayColor={'transparent'} 
                                    onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                    style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                >
                                    <Icon 
                                        size={22*factor_hor}
                                        name="dots-three-horizontal"
                                        color="#9B9B9B"
                                        type='entypo'
                                    />
                                </TouchableHighlight>
                            </View>
                        </View>
                    </DoubleClick>
                </Animated.View>
            </View>
            case "p100":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 175*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.375}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:40*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_image:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "p125":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 200*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.5}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_image:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "p150":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 200*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.45}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_image:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "p175":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 225*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.345}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:40*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_image:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "p200":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 250*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.45}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_image:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "p225":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 250*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.45}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_image:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "p250":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 275*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.34}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    backgroundColor:'white',
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:40*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_image:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "p275":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 275*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.32}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:40*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_image:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "p300":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 300*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.34}
                                maxFontSizeMultiplier={20}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:40*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_image:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "p325":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 325*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.3}
                                maxFontSizeMultiplier={20}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:45*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_image:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "p350":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 325*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.34}
                                maxFontSizeMultiplier={20}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:40*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_image:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "p375":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 350*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.34}
                                maxFontSizeMultiplier={20}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:40*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_image:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "p400":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 350*factor_ver + width_*1.11*factor_hor,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.34}
                                maxFontSizeMultiplier={20}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:40*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <View style={{height:5*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => { this.setState({visible_image:true, clicked_image:this.state.posts[index][18] }) }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.posts[index][18]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:55*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>

            case "25":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 125*factor_ver,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.5}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                       </View>
                        </DoubleClick>
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:50*factor_ver,
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "50":
                return <View style={{height:1,}}>
                <Animated.View 
                    style={{
                        height: 150*factor_ver,
                        borderRadius: 30*factor_hor,
                        width: '100%', 
                        backgroundColor: 'white',
                        paddingBottom: this.state.posts[index][24],
                        paddingTop: this.state.posts[index][24],
                        paddingRight: this.state.posts[index][24],
                        paddingLeft: this.state.posts[index][24],
                        borderColor: this.state.posts[index][22].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.posts[index][23],
                        overflow: 'hidden',
                    }}
                >
                    <View style={{
                        flex:1, 
                        flexDirection:'row',
                        paddingLeft:20*factor_hor,
                        paddingRight:20*factor_hor,}}>
                    <DoubleClick
                        singleTap={() => {
                            this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                            this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >    
                    <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                        <Text 
                            numberOfLines={15}
                            minimumFontScale={0.5}
                            adjustsFontSizeToFit={true}
                            style={{
                                flex:1,
                                fontFamily:'avenir next',
                                marginTop:17*factor_ver, 
                                textAlign:'left', 
                                fontSize:30*factor_hor,
                            }}>{this.state.posts[index][7]}
                        </Text>
                    </View>
                    </DoubleClick>
                    </View>
                    <DoubleClick
                        singleTap={() => {
                            this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                            this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >
                        <View style={{
                            height:50*factor_ver,
                            flexDirection:'row',
                            justifyContent:'center', 
                            alignContent:'center',    
                        }}>
                            <View style={{flex:1.666,}}>
                                <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                    <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                        <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                    </View>
                                </View>
                            </View>
                            <View style={{flex:1.666,}}>
                                <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                    <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                </View>
                            </View>
                            <View style={{flex:1.666, justifyContent:'center'}}>
                                <TouchableHighlight 
                                    underlayColor={'transparent'} 
                                    onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                    style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                >
                                    <Icon 
                                        size={22*factor_hor}
                                        name="dots-three-horizontal"
                                        color="#9B9B9B"
                                        type='entypo'
                                    />
                                </TouchableHighlight>
                            </View>
                        </View>
                    </DoubleClick>
                </Animated.View>
            </View>
            case "75":
                return <View style={{height:1,}}>
                <Animated.View 
                    style={{
                        height: 150*factor_ver,
                        borderRadius: 30*factor_hor,
                        width: '100%', 
                        backgroundColor: 'white',
                        paddingBottom: this.state.posts[index][24],
                        paddingTop: this.state.posts[index][24],
                        paddingRight: this.state.posts[index][24],
                        paddingLeft: this.state.posts[index][24],
                        borderColor: this.state.posts[index][22].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.posts[index][23],
                        overflow: 'hidden',
                    }}
                >
                    <View style={{
                        flex:1, 
                        flexDirection:'row',
                        paddingLeft:20*factor_hor,
                        paddingRight:20*factor_hor,}}>
                    <DoubleClick
                        singleTap={() => {
                            this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                            this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >    
                    <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                        <Text 
                            numberOfLines={15}
                            minimumFontScale={0.4}
                            adjustsFontSizeToFit={true}
                            style={{
                                flex:1,
                                fontFamily:'avenir next',
                                marginTop:17*factor_ver, 
                                textAlign:'left', 
                                fontSize:30*factor_hor,
                            }}>{this.state.posts[index][7]}
                        </Text>
                        </View>
                    </DoubleClick>
                    </View>
                    <DoubleClick
                        singleTap={() => {
                            this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                            this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >
                        <View style={{
                            height:50*factor_ver,
                            flexDirection:'row',
                            justifyContent:'center', 
                            alignContent:'center',    
                        }}>
                            <View style={{flex:1.666,}}>
                                <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                    <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                        <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                    </View>
                                </View>
                            </View>
                            <View style={{flex:1.666,}}>
                                <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                    <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                </View>
                            </View>
                            <View style={{flex:1.666, justifyContent:'center'}}>
                                <TouchableHighlight 
                                    underlayColor={'transparent'} 
                                    onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                    style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                >
                                    <Icon 
                                        size={22*factor_hor}
                                        name="dots-three-horizontal"
                                        color="#9B9B9B"
                                        type='entypo'
                                    />
                                </TouchableHighlight>
                            </View>
                        </View>
                    </DoubleClick>
                </Animated.View>
            </View>
            case "100":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 175*factor_ver,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.5}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:50*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "125":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 200*factor_ver,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >   
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.5}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:50*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "150":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 200*factor_ver,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.45}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:50*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "175":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 225*factor_ver,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.45}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:50*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "200":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 250*factor_ver,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.45}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:50*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "225":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 250*factor_ver,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.45}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:30*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:50*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "250":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 275*factor_ver,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.34}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    backgroundColor:'white',
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:40*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:50*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "275":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 275*factor_ver,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >  
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.32}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:40*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:50*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "300":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 300*factor_ver,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >   
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.34}
                                maxFontSizeMultiplier={20}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:40*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:50*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "325":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 325*factor_ver,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.3}
                                maxFontSizeMultiplier={20}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:45*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:50*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "350":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 325*factor_ver,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.34}
                                maxFontSizeMultiplier={20}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:40*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:50*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "375":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 350*factor_ver,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.34}
                                maxFontSizeMultiplier={20}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:40*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:50*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
            case "400":
                return <View style={{height:1,}}>
                    <Animated.View 
                        style={{
                            height: 350*factor_ver,
                            borderRadius: 30*factor_hor,
                            width: '100%', 
                            backgroundColor: 'white',
                            paddingBottom: this.state.posts[index][24],
                            paddingTop: this.state.posts[index][24],
                            paddingRight: this.state.posts[index][24],
                            paddingLeft: this.state.posts[index][24],
                            borderColor: this.state.posts[index][22].interpolate({
                                inputRange: [0, 1, 2, 3],
                                outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                            }),
                            borderWidth: this.state.posts[index][23],
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            paddingRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >    
                        <View style={{
                            width:width_*0.9,
                            height:'100%',
                        }}>
                            <Text 
                                numberOfLines={15}
                                minimumFontScale={0.34}
                                maxFontSizeMultiplier={20}
                                adjustsFontSizeToFit={true}
                                style={{
                                    flex:1,
                                    fontFamily:'avenir next',
                                    marginTop:17*factor_ver, 
                                    textAlign:'left', 
                                    fontSize:40*factor_hor,
                                }}>{this.state.posts[index][7]}
                            </Text>
                        </View>
                        </DoubleClick>
                        </View>
                        <DoubleClick
                            singleTap={() => {
                                this.props.navigation.navigate("VIEW_COMMENT", {art: this.state.posts[index]});
                                this.props.navigation.navigate("VIEW_COMMENT", {returned: this.returned.bind(this)});
                            }}
                            doubleTap={() => {this.likePost(index);}}
                            delay={350}
                        >
                            <View style={{
                                height:50*factor_ver,
                                backgroundColor:'white',
                                flexDirection:'row',
                                justifyContent:'center', 
                                alignContent:'center',    
                            }}>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center',}}>
                                        <View style={{flex:0.45, marginStart:40*factor_hor, alignContent:'flex-end', alignItems:'flex-end', marginEnd:5*factor_hor,}}>
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
                                            <Text style={{color:'#979797', textAlign:'left'}}>{this.show_views(index)}</Text>                   
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.posts[index][12] - this.state.posts[index][13]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666, justifyContent:'center'}}>
                                    <TouchableHighlight 
                                        underlayColor={'transparent'} 
                                        onPress={() => {this.setState({key_status:index},function() {console.log(this.state.key_status)}),this.setState({visible_options:true,}), this.check_send()}}
                                        style={{marginRight:35*factor_hor, marginLeft:35*factor_hor,}}
                                    >
                                        <Icon 
                                            size={22*factor_hor}
                                            name="dots-three-horizontal"
                                            color="#9B9B9B"
                                            type='entypo'
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </DoubleClick>
                    </Animated.View>
                </View>
        }
    }
    likePost(key) {
        // if null make liked
        if( this.state.posts[key][11] == null ) {
            Animated.timing(this.state.posts[key][22], {toValue:1, duration:400}).start()
            Animated.timing(this.state.posts[key][23], {toValue:1.5, duration:400}).start()
            Animated.timing(this.state.posts[key][24], {toValue:0.5, duration:400}).start()
            setTimeout(() => { Animated.timing(this.state.posts[key][23], {toValue:0.5, duration:250}).start()}, 400)
            setTimeout(() => { Animated.timing(this.state.posts[key][24], {toValue:1.5, duration:250}).start()}, 400)
            setTimeout(() => { Animated.timing(this.state.posts[key][22], {toValue:2, duration:250}).start()}, 400)
            this.state.posts[key][11] = 'upvote'
            this.state.posts[key][12] = this.state.posts[key][12] + 1 // upvotes
            url = `http://${serverLocation}:80/vote_post?route=3&username=${this.state.username}&postID=${this.state.posts[key][8]}`
            fetch(url);
        }
        // if liked make dislike
        else if( this.state.posts[key][11] == 'upvote' ) { 
            Animated.timing(this.state.posts[key][22], {toValue:3, duration:400}).start()
            Animated.timing(this.state.posts[key][23], {toValue:1.5, duration:400}).start()
            Animated.timing(this.state.posts[key][24], {toValue:0.5, duration:400}).start()
            setTimeout(() => { Animated.timing(this.state.posts[key][23], {toValue:0.5, duration:250}).start()}, 400)
            setTimeout(() => { Animated.timing(this.state.posts[key][24], {toValue:1.5, duration:250}).start()}, 400)
            setTimeout(() => { Animated.timing(this.state.posts[key][22], {toValue:2, duration:250}).start()}, 400)
            this.state.posts[key][11] = 'downvote' 
            this.state.posts[key][12] = this.state.posts[key][12] - 1 // upvotes
            this.state.posts[key][13] = this.state.posts[key][13] + 1 // downvotes
            url = `http://${serverLocation}:80/vote_post?route=4&username=${this.state.username}&postID=${this.state.posts[key][8]}`
            fetch(url);
        }
        // if disliked make null
        else if( this.state.posts[key][11] == 'downvote' ) {
            Animated.timing(this.state.posts[key][22], {toValue:0, duration:0}).start()
            this.state.posts[key][11] = null
            this.state.posts[key][13] = this.state.posts[key][13] - 1 // downvotes
            url = `http://${serverLocation}:80/vote_post?route=5&username=${this.state.username}&postID=${this.state.posts[key][8]}`
            fetch(url);
        }
        this.setState({
            dataProvider:this.state.dataProvider.cloneWithRows(this.state.posts),
        })
    }
    async componentWillMount() {
        await Permissions.check('location')
        .then(response => {
            if(response == 'authorized') {
                if(global.user_position.coords.latitude == null) {
                    Geolocation.getCurrentPosition(
                        (position) => {
                            global.user_position = position
                            global.location_time_delta = Math.floor(position.timestamp/1000)
                        },
                        (error) => {
                            console.log(error);
                        },
                        { enableHighAccuracy: true, timeout: 30000, }
                    );
                }
            }
            else if(response !== 'authorized') {
                Alert.alert("Please allow access to your location to use Pollen", "Access can be changed in your phone's settings")
                return 
            }
        })
    }
    async componentDidMount() {
        received_posts = [0,1]
        received_comments = [0,1]
        seenFeed = await AsyncStorage.getItem('seenFeed')
        if(seenFeed == 'false' || seenFeed == false) {
            this.setState({ seenFeed:true})    
        }
        safeMode = await AsyncStorage.getItem('safeMode')
        if(safeMode == 'true' || safeMode == true) {
            safeModeColor = 'rgba(113, 233, 42, 1)'
        }
        else {
            safeModeColor = '#ff503c'
        }
        this.setState({
            lat:global.user_position.coords.latitude, 
            long:global.user_position.coords.longitude,
            username:global.user,
            level:'l2',
            sort:'hot', 
            search_term:'',
            safe_mode:safeMode,
            safeModeColor:safeModeColor,
        })        
        console.log(
            this.state.username,
            '['+(received_posts).toString()+']',
            this.state.sort,
            this.state.level,
            global.user_position.coords.latitude, 
            global.user_position.coords.longitude,
            this.state.search_term,
            this.state.safe_mode 
        )

        await fetch(`http://${serverLocation}:80/show_post?`, {
            method:'POST',
            headers:{    
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
            body: 
            JSON.stringify({
                username: this.state.username,
                received_posts: '['+(received_posts).toString()+']',
                sort: this.state.sort,
                level: this.state.level,
                lat:global.user_position.coords.latitude, 
                long:global.user_position.coords.longitude,
                search_term: this.state.search_term,
                safe_mode: this.state.safe_mode,
            })})
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                for(key in responseJson) {
                    if(responseJson[key][20] == 'picture') {
                        if(responseJson[key][7].length == 0) {
                            responseJson[key].push('p0')
                        }
                        else if(responseJson[key][7].length < 25) {
                            responseJson[key].push('p25')
                        }
                        else if(responseJson[key][7].length < 50) {
                            responseJson[key].push('p50')
                        }
                        else if(responseJson[key][7].length < 75) {
                            responseJson[key].push('p75')
                        }
                        else if(responseJson[key][7].length < 100) {
                            responseJson[key].push('p100')
                        }
                        else if(responseJson[key][7].length < 125) {
                            responseJson[key].push('p125')
                        }
                        else if(responseJson[key][7].length < 150) {
                            responseJson[key].push('p150')
                        }
                        else if(responseJson[key][7].length < 175) {
                            responseJson[key].push('p175')
                        }
                        else if(responseJson[key][7].length < 200) {
                            responseJson[key].push('p200')
                        }
                        else if(responseJson[key][7].length < 225) {
                            responseJson[key].push('p225')
                        }
                        else if(responseJson[key][7].length < 250) {
                            responseJson[key].push('p250')
                        }
                        else if(responseJson[key][7].length < 275) {
                            responseJson[key].push('p275')
                        }
                        else if(responseJson[key][7].length < 300) {
                            responseJson[key].push('p300')
                        }
                        else if(responseJson[key][7].length < 325) {
                            responseJson[key].push('p325')
                        }
                        else if(responseJson[key][7].length < 350) {
                            responseJson[key].push('p350')
                        }
                        else if(responseJson[key][7].length < 375) {
                            responseJson[key].push('p375')
                        }
                        else {
                            responseJson[key].push('p400')
                        }
                    }
                    else if(responseJson[key][20] == 'video') {
                        if(responseJson[key][7].length == 0) {
                            responseJson[key].push('v0')
                        }
                        else if(responseJson[key][7].length < 25) {
                            responseJson[key].push('v25')
                        }
                        else if(responseJson[key][7].length < 50) {
                            responseJson[key].push('v50')
                        }
                        else if(responseJson[key][7].length < 75) {
                            responseJson[key].push('v75')
                        }
                        else if(responseJson[key][7].length < 100) {
                            responseJson[key].push('v100')
                        }
                        else if(responseJson[key][7].length < 125) {
                            responseJson[key].push('v125')
                        }
                        else if(responseJson[key][7].length < 150) {
                            responseJson[key].push('v150')
                        }
                        else if(responseJson[key][7].length < 175) {
                            responseJson[key].push('v175')
                        }
                        else if(responseJson[key][7].length < 200) {
                            responseJson[key].push('v200')
                        }
                        else if(responseJson[key][7].length < 225) {
                            responseJson[key].push('v225')
                        }
                        else if(responseJson[key][7].length < 250) {
                            responseJson[key].push('v250')
                        }
                        else if(responseJson[key][7].length < 275) {
                            responseJson[key].push('v275')
                        }
                        else if(responseJson[key][7].length < 300) {
                            responseJson[key].push('v300')
                        }
                        else if(responseJson[key][7].length < 325) {
                            responseJson[key].push('v325')
                        }
                        else if(responseJson[key][7].length < 350) {
                            responseJson[key].push('v350')
                        }
                        else if(responseJson[key][7].length < 375) {
                            responseJson[key].push('v375')
                        }
                        else {
                            responseJson[key].push('v400')
                        }
                        responseJson[key].push(true)
                    }
                    else {
                        if(responseJson[key][7].length == 0) {
                            responseJson[key].push('0')
                        }
                        else if(responseJson[key][7].length < 25) {
                            responseJson[key].push('25')
                        }
                        else if(responseJson[key][7].length < 50) {
                            responseJson[key].push('50')
                        }
                        else if(responseJson[key][7].length < 75) {
                            responseJson[key].push('75')
                        }
                        else if(responseJson[key][7].length < 100) {
                            responseJson[key].push('100')
                        }
                        else if(responseJson[key][7].length < 125) {
                            responseJson[key].push('125')
                        }
                        else if(responseJson[key][7].length < 150) {
                            responseJson[key].push('150')
                        }
                        else if(responseJson[key][7].length < 175) {
                            responseJson[key].push('175')
                        }
                        else if(responseJson[key][7].length < 200) {
                            responseJson[key].push('200')
                        }
                        else if(responseJson[key][7].length < 225) {
                            responseJson[key].push('225')
                        }
                        else if(responseJson[key][7].length < 250) {
                            responseJson[key].push('250')
                        }
                        else if(responseJson[key][7].length < 275) {
                            responseJson[key].push('275')
                        }
                        else if(responseJson[key][7].length < 300) {
                            responseJson[key].push('300')
                        }
                        else if(responseJson[key][7].length < 325) {
                            responseJson[key].push('325')
                        }
                        else if(responseJson[key][7].length < 350) {
                            responseJson[key].push('350')
                        }
                        else if(responseJson[key][7].length < 375) {
                            responseJson[key].push('375')
                        }
                        else {
                            responseJson[key].push('400')
                        }
                    }
                    if(responseJson[key][11] == 'upvote') {
                        responseJson[key] = [ 
                            ...responseJson[key], 
                            ...[new Animated.Value(2), 
                                new Animated.Value(0.5),
                                new Animated.Value(1.5)
                            ] 
                        ]
                    }
                    else {
                        responseJson[key] = [ 
                            ...responseJson[key], 
                            ...[new Animated.Value(0), 
                                new Animated.Value(0.5),
                                new Animated.Value(1.5)
                            ] 
                        ]
                    }
                }
                console.log(responseJson)
                if(responseJson.length == 0 && this.state.posts.length == 0) {
                    Alert.alert("No posts found! :(")
                    this.setState({timer:3,act_load_color:'white', show_timer:true})
                    setTimeout(() => {this.setState( {timer:1,}, function() {console.log(this.state.timer)} ) }, 1075);
                    if(this.state.level == 'l1') {
                        setTimeout(() => {this.city_click(), this.setState({timer:0,show_timer:false,act_load_color:"#FC6026"}) }, 2100);
                    }   
                    else {
                        setTimeout(() => {this.world_click(), this.setState({timer:0,show_timer:false,act_load_color:"#FC6026"}) }, 2100);
                    } 
                    
                }
                else {
                    this.setState({ 
                        posts:[ ...this.state.posts, ...responseJson ],
                    })
                    for(key in responseJson){
                        received_posts.push(responseJson[key][8])
                    }
                    if(responseJson.length == 0) {
                        this.setState({outPosts:true})
                    }
                }
            })
            .catch((error) => {
                console.log(error)
                Alert.alert('Check your connection and location settings and try again')
            }); 
        this.setState({
            dataProvider: new DataProvider((r1, r2) => {return r1 !== r2}).cloneWithRows(this.state.posts),
        })
        if(this.state.first_loaded == false && this.state.posts.length > 0) {
            this.setState({first_loaded:true},function() {console.log(this.state.first_loaded)})
        }
        this.update_views();
    }
    async fetchPosts() {
        if(this.state.outPosts == false) {
            await Geolocation.getCurrentPosition(
                (position) => {
                    // set current position
                    global.user_position = position
                    // set current datetime
                    global.location_time_delta = Math.floor(position.timestamp/1000)
                },
                (error) => {
                    console.log(error);
                },
                { enableHighAccuracy: true, timeout: 30000, }
                );
                await fetch(`http://${serverLocation}:80/show_post?`, {
                    method:'POST',
                    headers:{    
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                    body: 
                    JSON.stringify({
                        username: this.state.username,
                        received_posts: '['+(received_posts).toString()+']',
                        sort: this.state.sort,
                        level: this.state.level,
                        lat:global.user_position.coords.latitude, 
                        long:global.user_position.coords.longitude,
                        search_term: this.state.search_term,
                        safe_mode: this.state.safe_mode,
                })})
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    for(key in responseJson) {
                        if(responseJson[key][20] == 'picture') {
                            if(responseJson[key][7].length == 0) {
                                responseJson[key].push('p0')
                            }
                            else if(responseJson[key][7].length < 25) {
                                responseJson[key].push('p25')
                            }
                            else if(responseJson[key][7].length < 50) {
                                responseJson[key].push('p50')
                            }
                            else if(responseJson[key][7].length < 75) {
                                responseJson[key].push('p75')
                            }
                            else if(responseJson[key][7].length < 100) {
                                responseJson[key].push('p100')
                            }
                            else if(responseJson[key][7].length < 125) {
                                responseJson[key].push('p125')
                            }
                            else if(responseJson[key][7].length < 150) {
                                responseJson[key].push('p150')
                            }
                            else if(responseJson[key][7].length < 175) {
                                responseJson[key].push('p175')
                            }
                            else if(responseJson[key][7].length < 200) {
                                responseJson[key].push('p200')
                            }
                            else if(responseJson[key][7].length < 225) {
                                responseJson[key].push('p225')
                            }
                            else if(responseJson[key][7].length < 250) {
                                responseJson[key].push('p250')
                            }
                            else if(responseJson[key][7].length < 275) {
                                responseJson[key].push('p275')
                            }
                            else if(responseJson[key][7].length < 300) {
                                responseJson[key].push('p300')
                            }
                            else if(responseJson[key][7].length < 325) {
                                responseJson[key].push('p325')
                            }
                            else if(responseJson[key][7].length < 350) {
                                responseJson[key].push('p350')
                            }
                            else if(responseJson[key][7].length < 375) {
                                responseJson[key].push('p375')
                            }
                            else {
                                responseJson[key].push('p400')
                            }
                        }
                        else if(responseJson[key][20] == 'video') {
                            if(responseJson[key][7].length == 0) {
                                responseJson[key].push('v0')
                            }
                            else if(responseJson[key][7].length < 25) {
                                responseJson[key].push('v25')
                            }
                            else if(responseJson[key][7].length < 50) {
                                responseJson[key].push('v50')
                            }
                            else if(responseJson[key][7].length < 75) {
                                responseJson[key].push('v75')
                            }
                            else if(responseJson[key][7].length < 100) {
                                responseJson[key].push('v100')
                            }
                            else if(responseJson[key][7].length < 125) {
                                responseJson[key].push('v125')
                            }
                            else if(responseJson[key][7].length < 150) {
                                responseJson[key].push('v150')
                            }
                            else if(responseJson[key][7].length < 175) {
                                responseJson[key].push('v175')
                            }
                            else if(responseJson[key][7].length < 200) {
                                responseJson[key].push('v200')
                            }
                            else if(responseJson[key][7].length < 225) {
                                responseJson[key].push('v225')
                            }
                            else if(responseJson[key][7].length < 250) {
                                responseJson[key].push('v250')
                            }
                            else if(responseJson[key][7].length < 275) {
                                responseJson[key].push('v275')
                            }
                            else if(responseJson[key][7].length < 300) {
                                responseJson[key].push('v300')
                            }
                            else if(responseJson[key][7].length < 325) {
                                responseJson[key].push('v325')
                            }
                            else if(responseJson[key][7].length < 350) {
                                responseJson[key].push('v350')
                            }
                            else if(responseJson[key][7].length < 375) {
                                responseJson[key].push('v375')
                            }
                            else {
                                responseJson[key].push('v400')
                            }
                        }
                        else {
                            if(responseJson[key][7].length == 0) {
                                responseJson[key].push('0')
                            }
                            else if(responseJson[key][7].length < 25) {
                                responseJson[key].push('25')
                            }
                            else if(responseJson[key][7].length < 50) {
                                responseJson[key].push('50')
                            }
                            else if(responseJson[key][7].length < 75) {
                                responseJson[key].push('75')
                            }
                            else if(responseJson[key][7].length < 100) {
                                responseJson[key].push('100')
                            }
                            else if(responseJson[key][7].length < 125) {
                                responseJson[key].push('125')
                            }
                            else if(responseJson[key][7].length < 150) {
                                responseJson[key].push('150')
                            }
                            else if(responseJson[key][7].length < 175) {
                                responseJson[key].push('175')
                            }
                            else if(responseJson[key][7].length < 200) {
                                responseJson[key].push('200')
                            }
                            else if(responseJson[key][7].length < 225) {
                                responseJson[key].push('225')
                            }
                            else if(responseJson[key][7].length < 250) {
                                responseJson[key].push('250')
                            }
                            else if(responseJson[key][7].length < 275) {
                                responseJson[key].push('275')
                            }
                            else if(responseJson[key][7].length < 300) {
                                responseJson[key].push('300')
                            }
                            else if(responseJson[key][7].length < 325) {
                                responseJson[key].push('325')
                            }
                            else if(responseJson[key][7].length < 350) {
                                responseJson[key].push('350')
                            }
                            else if(responseJson[key][7].length < 375) {
                                responseJson[key].push('375')
                            }
                            else {
                                responseJson[key].push('400')
                            }
                        }
                        if(responseJson[key][11] == 'upvote') {
                            responseJson[key] = [ 
                                ...responseJson[key], 
                                ...[new Animated.Value(2), 
                                    new Animated.Value(0.5),
                                    new Animated.Value(1.5)
                                ] 
                            ]
                        }
                        else {
                            responseJson[key] = [ 
                                ...responseJson[key], 
                                ...[new Animated.Value(0), 
                                    new Animated.Value(0.5),
                                    new Animated.Value(1.5)
                                ] 
                            ]
                        }
                    }
                    // if following
                    if(this.state.sort == 'following') {
                        if(responseJson == 'fail') {
                            Alert.alert("follow at least 25 people to sort by following")
                            this.setState( {timer:3, show_timer:true} )
                            setTimeout(() => {this.setState({timer:2,}) }, 1050);
                            setTimeout(() => {this.setState({timer:1,}) }, 2075);
                            setTimeout( () => {this.setState({timer:0,show_timer:false,}),
                            this.clear_click()}, 3000);
                        }
                        else if(responseJson.length == 0 && this.state.posts.length == 0) { 
                            // if not world go world
                            Alert.alert("No posts found! :(")
                            this.setState({
                                timer:3, 
                                show_timer:true, 
                                act_load_color:'white',
                                outPosts:true,
                            })
                            setTimeout( () => {this.setState({timer:1}) }, 1075);
                            setTimeout( () => {this.setState({timer:0,show_timer:false,}),this.clear_click()}, 2000);
                        }
                        else {
                            this.setState({ 
                                posts:[ ...this.state.posts, ...responseJson ],
                                dataProvider:this.state.dataProvider.cloneWithRows(this.state.posts),
                            })
                            for(key in responseJson){
                                received_posts.push(responseJson[key][8])
                            }
                            // if empty
                            if(responseJson.length == 0) {
                                this.setState({outPosts:true})
                            }
                        }
                    }
                    // if no posts in region
                    else if(responseJson.length == 0 && this.state.posts.length == 0) {
                        Alert.alert("No posts found! :(")
                        this.setState({timer:3,act_load_color:'white', show_timer:true})
                        setTimeout(() => {this.setState( {timer:1,}, function() {console.log(this.state.timer)} ) }, 1075);
                        if(this.state.level == 'l1') {
                            setTimeout(() => {this.city_click(), this.setState({timer:0,show_timer:false,act_load_color:"#FC6026"}) }, 2100);
                        }   
                        else {
                            setTimeout(() => {this.world_click(), this.setState({timer:0,show_timer:false,act_load_color:"#FC6026"}) }, 2100);
                        } 
                        this.setState({outPosts:true})
                    }
                    // if posts 
                    else {
                        this.setState({
                            posts:[ ...this.state.posts, ...responseJson ],
                            dataProvider:this.state.dataProvider.cloneWithRows(this.state.posts),
                        })
                        for(key in responseJson) {
                            received_posts.push(responseJson[key][8])
                        }
                        // if end of posts
                        if(responseJson.length == 0) {
                            this.setState({outPosts:true})
                        }
                    }
                })
                .catch((error) => {
                    console.log(error)
                    Alert.alert('Check your connection and location settings and try again')
                });  

            if(this.state.first_loaded == false && this.state.posts.length > 0) {
                this.setState({first_loaded:true},function() {console.log(this.state.first_loaded)})
            }
            this.update_views();
        }
    }
    async update_views() {
        if(this.state.outPosts == false) {
            remainder = this.state.posts.length % 64
            quotient = Math.floor(this.state.posts.length/64)
            slice_domain = quotient*64 
            if(this.state.posts.length > 64 ) {
                fetch(`http://${serverLocation}:80/update_views?received_posts=${'['+(received_posts.slice(slice_domain)).toString()+']'}&null_column=`)
                .then((response) => response.json())
                .then((responseJson2) => {console.log(responseJson2)})
                .catch((error) => {
                    console.log(error)
                });   
            }
            else {
                fetch(`http://${serverLocation}:80/update_views?received_posts=${'['+(received_posts).toString()+']'}&null_column=`)
                .then((response) => response.json())
                .then((responseJson2) => {console.log(responseJson2)})
                .catch((error) => {
                    console.log(error)
                });   
            } 
        }
    }  
    async world_click() {
        await this.setState({first_loaded:false});
        received_posts = [1,2]
        await this.textInput.clear();
        await this.setState({
            posts:[],
            first_loaded:false,
            city_weight:'normal',
            world_weight:'600',
            local_weight:'normal',
            world_border:'white',
            city_border:'transparent',
            local_border:'transparent', 
            level:'l3',
            search_term:'',
            lat:global.user_position.coords.latitude, 
            long:global.user_position.coords.longitude,
            outPosts:false,
        })
        await this.fetchPosts();
    }
    async city_click() {
        await this.setState({first_loaded:false});
        received_posts = [1,2]
        await this.textInput.clear();
        await this.setState({
            posts:[],
            city_weight:'600',
            world_weight:'normal',
            local_weight:'normal',
            world_border:'transparent',
            city_border:'white',
            local_border:'transparent',
            level:'l2', 
            search_term:'',
            lat:global.user_position.coords.latitude, 
            long:global.user_position.coords.longitude,
            outPosts:false,
        });
        await this.fetchPosts();
    }
    async local_click() {
        await this.setState({first_loaded:false});
        received_posts = [1,2]
        await this.textInput.clear();
        await this.setState({
            posts:[],
            city_weight:'normal',
            world_weight:'normal',
            local_weight:'600',
            world_border:'transparent',
            city_border:'transparent',
            local_border:'white', 
            level:'l1',
            search_term:'',
            lat:global.user_position.coords.latitude, 
            long:global.user_position.coords.longitude,
            outPosts:false,
        });
        await this.fetchPosts();
    }  
    async refresh_feed() {
        await this.setState({first_loaded:false});
        received_posts = [1,2]
        await this.setState({
            posts:[],
            lat:global.user_position.coords.latitude, 
            long:global.user_position.coords.longitude,
            outPosts:false,
        })
        await this.fetchPosts();
    }
    async search_click() {
        await this.setState({first_loaded:false});
        received_posts = [1,2]
        await this.setState( 
        {
            posts:[],
            lat:global.user_position.coords.latitude, 
            long:global.user_position.coords.longitude,
            outPosts:false,
        })
        await this.fetchPosts();
        await this.textInput.clear();
    }
    async returned(post, ifDelete){
        for(key in this.state.posts){
            if( this.state.posts[key][8] == post[8] ) {
                if(ifDelete == 'Yes') {
                    this.refresh_feed()
                }
                else {
                    this.state.posts[key][11] = post[11] // upvote vs downvote
                    this.state.posts[key][11] = post[11] // upvote vs downvote
                    this.state.posts[key][12] = post[12] // ups
                    this.state.posts[key][12] = post[12] // ups   
                    this.state.posts[key][13] = post[13] //downs
                    this.state.posts[key][13] = post[13] //downs
                    this.state.posts[key][14] = post[14] // flagged
                    this.state.posts[key][14] = post[14] // flagged
                    this.state.posts[key][15] = post[15] // saved
                    this.state.posts[key][15] = post[15] // saved
                    this.state.posts[key][17] = post[17] // number comments
                    this.state.posts[key][17] = post[17] // number comments
                    break 
                }
            }
        }       
        this.setState({posts:this.state.posts})
        await this.forceUpdate()
    }
    async hot_click() {
        await this.setState({first_loaded:false});
        received_posts = [1,2]
        this.textInput.clear()
        await this.setState({
            posts:[],
            lat:global.user_position.coords.latitude, 
            long:global.user_position.coords.longitude,
            sort:'hot',
            visible_sorting:false,
            outPosts:false,
        })
        await this.fetchPosts();
    }
    async new_click() {
        await this.setState({first_loaded:false});
        received_posts = [1,2]
        this.textInput.clear()
        await this.setState({
            posts:[],
            lat:global.user_position.coords.latitude, 
            long:global.user_position.coords.longitude,
            sort:'new',
            visible_sorting:false,
            outPosts:false,
        })
        await this.fetchPosts()

    }
    async clear_click() {
        await this.setState({first_loaded:false});
        received_posts = [1,2]
        this.textInput.clear()
        await this.setState({
            posts:[],
            lat:global.user_position.coords.latitude, 
            long:global.user_position.coords.longitude,
            visible_sorting:false,
            outPosts:false,
            city_weight:'600',
            world_weight:'normal',
            local_weight:'normal',
            world_border:'transparent',
            city_border:'white',
            local_border:'transparent',
            level:'l2', 
            search_term:'',
        })
        this.forceUpdate()
        await this.fetchPosts();  
        
    }    
    async safe_click() {
        if(this.state.safe_mode == false || this.state.safe_mode == 'false') {
            await this.setState({ 
                safe_mode: true,
                safeModeColor:'rgba(113, 233, 42, 1)',
            })
            console.log(this.state.safe_mode)
            AsyncStorage.setItem('safeMode', 'true')
            await this.clear_click()
        }
        else if(this.state.safe_mode == true || this.state.safe_mode == 'true') {
            await this.setState({ 
                safe_mode:false,
                safeModeColor:'#ff503c',
            })
            console.log(this.state.safe_mode)
            AsyncStorage.setItem('safeMode', 'false')
            await this.clear_click()
        }
    }  
    share_post = async () => {
        key = this.state.key_status
        try {
            if (this.state.posts[key][20] == 'picture' || this.state.posts[key][20] == 'video') {
            const result = await Share.share({
            title:'pollen',
            message:this.state.posts[key][7],
            uri:`http://${serverLocation}/${this.state.posts[key][18]}`,
            });
            
                if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                        // shared ios
                        this.setState({visible_options:false})
                        return null
                    } 
                    else {
                        // shared android
                        this.setState({visible_options:false})
                        return null
                    }
                } 
                else if (result.action === Share.dismissedAction) {
                    // dismissed
                    this.setState({visible_options:false})
                    return null
                }
            }

            else {
                const result = await Share.share({
                message:this.state.posts[key][7],
                title:'pollen',
                });
                if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                        // shared ios
                        this.setState({visible_options:false})
                        return null
                    } 
                    else {
                        // shared android
                        this.setState({visible_options:false})
                        return null
                    }
                } 
                else if (result.action === Share.dismissedAction) {
                    // dismissed
                    this.setState({visible_options:false})
                    return null
                }                
            }
        } 
        catch (error) {
            console.log(error)
        }            
    }
    saved_post() {
        try {
            if(this.state.first_loaded == true) {
                key = this.state.key_status
                if(this.state.posts[key][14] == 1) {
                    return 'Saved'
                }
                else if(this.state.posts[key][14] == 0){
                    return 'Save'
                }
            }   
        } 
        catch (error) {
            console.log(error)
        }
    }
    saved() {
        try {
            if(this.state.first_loaded == true) {
                key = this.state.key_status
                if(this.state.posts[key][14] == 0) {
                    try {
                        fetch(`http://${serverLocation}:80/save_post?route=1&userID=${this.state.username}&postID=${this.state.posts[key][8]}`)
                        this.state.posts[key][14] = 1
                    }
                    catch {
                        return null
                    }
                }
                else if(this.state.posts[key][14] == 1) {
                    try {
                        fetch(`http://${serverLocation}:80/save_post?route=2&userID=${this.state.username}&postID=${this.state.posts[key][8]}`)
                        this.state.posts[key][14] = 0
                    }   
                    catch {
                        return null
                    }
                }
                this.setState({visible_options:false})
            }   
        } 
        catch (error) {
            
        }
    }
    flag_post() {
        try {
            if(this.state.first_loaded == true) {
                key = this.state.key_status
                if(this.state.posts[key][15] == 1) {
                    return 'Flagged'
                }
                else if(this.state.posts[key][15] == 0){
                    return 'Flag'
                }
            }   
        } 
        catch (error) {
            console.log(error)
        }
    }
    reported () {
        try {
            if(this.state.first_loaded == true) {
                key = this.state.key_status
                if(this.state.posts[key][15] == 0) {
                    fetch(`http://${serverLocation}:80/flag_post?route=1&userID=${this.state.username}&postID=${this.state.posts[key][8]}&posterID=${this.state.posts[key][0]}`)
                    this.state.posts[key][15] = 1
                }
                else if(this.state.posts[key][15] == 1) {
                    fetch(`http://${serverLocation}:80/flag_post?route=2&userID=${this.state.username}&postID=${this.state.posts[key][8]}&posterID=${this.state.posts[key][0]}`)
                    this.state.posts[key][15] = 0
                }
                this.setState({visible_options:false})
            }    
        } 
        catch (error) {
            console.log(error)
        }
    }
    block_post() {
        try {
            if(this.state.first_loaded == true) {
                key = this.state.key_status
                if(this.state.posts[key][19] == 'Block' ) {
                    return 'Block'
                }
                else if(this.state.posts[key][19] == 'Unblock' ){
                    return 'Unblock'
                }
                else if (this.state.posts[key][0] == this.state.username) {
                    return 'Cant block'
                }
            }   
        } 
        catch (error) {
            console.log(error)
        }
    }    
    block_unblock() {
        if(this.state.first_loaded == true) {
            key = this.state.key_status
            if( ( this.state.posts[key][19] == 'Block') && (this.state.posts[key][0] !== this.state.username ) ){
                url = `http://${serverLocation}:80/block_poster?route=1&userID=${this.state.username}&blockedID=${this.state.posts[key][0]}&postID=${this.state.posts[key][8]}&post_or_comment=post` 
                console.log(url)
                fetch(url)
                this.state.posts[key][19] = 'Unblock'
            }
            else if( (this.state.posts[key][19] == 'Unblock') && (this.state.posts[key][0] !== this.state.username)  ) {
                url = `http://${serverLocation}:80/block_poster?route=2&userID=${this.state.username}&blockedID=${this.state.posts[key][0]}&postID=${this.state.posts[key][8]}&post_or_comment=post` 
                fetch(url)
                this.state.posts[key][19] = 'Block'
            }
            else if( this.state.posts[key][0] == this.state.username ) {
                this.state.posts[key][19] = 'Cant Block'
            }
            this.setState({visible_options:false})
        }   
    }
    async send_message() {
        key = this.state.key_status
        if(this.state.can_send == 'success') {
            this.props.navigation.navigate('NEW_MESSAGE', { data: {
                name1:this.state.posts[key][0], 
                name2:this.state.posts[key][5], 
                postID:this.state.posts[key][8], 
                from_type:'post' 
            }})
            this.setState({visible_options:false})
        }
        else {            
            return Alert.alert(this.state.posts[this.state.key_status][0]+ this.state.can_send,'',{cancelable: false} );
        }
    }
    async check_send() {
        key = this.state.key_status
        is_anon = false
        poster = this.state.posts[key][0]
        
        if(this.state.posts[key][0] == 'Anonymous') {
            is_anon = true
            poster = this.state.posts[key][5]
        }

        url = `http://${serverLocation}:80/if_open?username=${this.state.username}&poster=${poster}&anon=${is_anon}&postID=${this.state.posts[key][8]}&from_type=post`
        await fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({can_send:responseJson})
        })
    }
    show_date(index) {
        date1 = this.state.posts[index][16] 
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
    check_color_votes(key) {
        if(this.state.posts[key][11] == 'upvote') {
            return 'rgba(113, 233, 42, 1)'
        }
        else if(this.state.posts[key][11] == 'downvote') {
            return 'rgba(255, 0, 0, 1)'
        }
        else {
            return "black"
        }
    } 
    show_views(index) {
        views = this.state.posts[index][1]

        if(views < 1000) {
            return views
        }
        else if(views >= 1000 && views < 10000) {
            views = Math.floor(views/1000)
            // round number
            views = JSON.stringify(views)
            return views + 'k'
        }
        else if(views >= 10000 && views < 100000) {
            views = Math.floor(views/1000)
            
            views = JSON.stringify(views)
            return views + 'k'
        }
        else if(views >= 100000 && views < 1000000 ) {
            views = Math.floor(views/1000)
            
            views = JSON.stringify(views)
            return views+'k'
        }
        else if(views >= 1000000 ) {
            views = Math.floor(views/1000000)
            
            views = JSON.stringify(views)
            return views+'m'
        }
    }
    onSwipeUp(gestureState) {
        this.setState({
            visible_image:false,
            visible_options:false, 
            visible_sorting:false,
            visible_video:false,
        })
    }                                                                                                         
    onSwipeDown(gestureState) {
        this.setState({
            visible_image:false,
            visible_options:false, 
            visible_sorting:false,
            visible_video:false,
        })
    }
    onSwipeLeft(gestureState) {
        this.setState({
            visible_image:false,
            visible_options:false, 
            visible_sorting:false,
            visible_video:false,
        })
    }
    onSwipeRight(gestureState) {
        this.setState({
            visible_image:false,
            visible_options:false, 
            visible_sorting:false,
            visible_video:false,
        })
    }
    onSwipe(gestureName, gestureState) {
        
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        this.setState({gestureName: gestureName});
        
        switch (gestureName) {

        case SWIPE_UP:
            this.setState({
                visible_image:false,
                visible_options:false, 
                visible_sorting:false,
                visible_video:false,
            })
            break;
          
        case SWIPE_DOWN:    
            this.setState({
                visible_image:false,
                visible_options:false, 
                visible_sorting:false,
                visible_video:false,
            })
            break;
        
        case SWIPE_LEFT:
            this.setState({
                visible_image:false,
                visible_options:false, 
                visible_sorting:false,
                visible_video:false,
            })
            break;
          
        case SWIPE_RIGHT:
            this.setState({
                visible_image:false,
                visible_options:false, 
                visible_sorting:false,
                visible_video:false,
            })
            break;
        }
    }
    setSort = () => this.setState({visible_sorting:true},function() {console.log(this.state.visible_sorting, 'SORT')})
    isMine() {
        try {
            if(this.state.first_loaded == true) {
                key = this.state.key_status
                if(this.state.posts[key][0] == this.state.username || this.state.posts[key][5] == this.state.username) {
                    return true
                }
                else {
                    return false
                }
            }    
        } 
        catch (error) {
            console.log(error)
        }
    }
    deletePost() {
        try {
            if(this.state.first_loaded == true) {
                key = this.state.key_status
                if(this.state.posts[key][0] == this.state.username || this.state.posts[key][5] == this.state.username) {
                    url = `http://${serverLocation}:80/delete_post?postID=${this.state.posts[key][8]}`
                    console.log(url)
                    fetch(url)
                    this.setState({visible_image:false,visible_options:false, visible_sorting:false,});
                    this.refresh_feed()
                }
                else {
                    this.setState({visible_image:false,visible_options:false, visible_sorting:false,})
                }
            }    
        } 
        catch (error) {
            console.log(error)
        }
    }
    handleScroll(event) {
        if(this.state.outPosts == false) {
            offset = event.nativeEvent.contentOffset.y
            if(offset > 400) {
                if(offset - lastDirection > 50 && this.state.showNav == true) {
                    // scroll down
                    this.setState({showNav:false})
                }
                else if(offset - lastDirection < -50 && this.state.showNav == false) {
                    // scroll up
                    this.setState({showNav:true})
                }
                
                if(lastDirection - offset > 20 || lastDirection - offset < -20) {
                    lastDirection = offset
                }
            }
            else if(this.state.showNav < 400) {
                if(this.state.showNav == false) {
                    this.setState({showNav: true})
                }
            }
        }
    }
    async ChangeVideo(e) {
        if( e[0] !== this.state.videoState[0] && e[1] == this.state.videoState[1]) {
            seconds = e[0]/100*this.state.videoLength
            this.player.seek(seconds)
        }
        else if( e[0] == this.state.videoState[0] && e[1] !== this.state.videoState[1]) {
            seconds = e[1]/100*this.state.videoLength
            this.player.seek(seconds)
        }
        this.setState({videoState: e},
            function(){console.log(this.state.videoState)})
    }
    makeClip() {
        marker2 = this.state.videoState[1]/100*this.state.videoLength
        marker1 = this.state.videoState[0]/100*this.state.videoLength
        vidLength = this.state.videoLength
        percentVideo = (marker2 - marker1)/vidLength
        clipLength = percentVideo*vidLength
        if(clipLength <= 1) {
            console.log('clips under 1 second are pictures', clipLength)
            Alert.alert(
                'Clips under 1 second will be pictures',
                '',
                [
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'),style:'cancel'},
                  {text: 'Continue', onPress: () => {
                        this.props.navigation.navigate('CREATE_POST', {data: {
                            videoState: this.state.videoState, 
                            videoLength: this.state.videoLength,
                            videoURL: `http://${serverLocation}/${this.state.clicked_image}`,
                        }})
                        this.setState({
                            visible_video: false, 
                            clicked_image: 'none', 
                            showSlider: false, 
                            paused: true, 
                            videoLength: 0,
                            videoState: [0, 100],
                        })
                    }},
                ],
                {cancelable: false},
            );
        }
        else if( percentVideo < 0.51) {
            this.props.navigation.navigate('CREATE_POST', {data: {
                videoState: this.state.videoState, 
                videoLength: this.state.videoLength,
                videoURL: `http://${serverLocation}/${this.state.clicked_image}`,
            }})
            this.setState({
                visible_video: false, 
                clicked_image: 'none', 
                showSlider: false, 
                paused: true, 
                videoLength: 0,
                videoState: [0, 100],
            })
        }
        else {
            Alert.alert("Clips pushed to the feed have to be less than half the original", '')
        }
    }
    renderFooter() {
        if(this.state.outPosts == false) {
            return <View style={{
                alignContent:'center', 
                justifyContent:'center', 
                alignItems:'center', 
            }}>
                <ActivityIndicator 
                    style={{
                        marginTop:15*factor_ver,
                        marginBottom:15*factor_ver,
                    }} 
                    size={"small"}
                    color={'#9b9b9b'}
                />
            </View>
        }
        else if(this.state.outPosts == true) {
            return <View style={{
                height:140*factor_hor, 
                marginTop:20, 
                alignContent:'center', 
                justifyContent:'center', 
                alignItems:'center', 
            }}>
                <Text style={{textAlign:'center', fontSize:22*factor_hor, fontFamily:'Avenir Next', color:'#9b9b9b',}}>
                    No posts! :(
                </Text>
                <View style={{flex:1,}}></View>
                <Block width={60*factor_hor}
                    height={60*factor_hor}
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

    render() { 
    return  <View style={styles.container}>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={this.state.visible_options}
                >                                        
                    <View style={{height:Dimensions.get('window').height, width:Dimensions.get('window').width, justifyContent:'flex-end', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.8)', opacity:1,}}>
                        <View style={{ alignSelf:'stretch', }}>
                            <View style={{height:65*factor_hor*5.75, marginBottom:15*factor_hor, flexDirection:'row' }}>
                                <View style={{flex:1, alignSelf:'stretch'}}></View>
                                <View style={{width:65*factor_hor, alignContent:'center', justifyContent:'center', alignItems:'center', alignSelf:'stretch'}}>
                                        <View style={{flex:1, }}></View>
                                        <View style={{height:65*factor_hor, width:65*factor_hor, borderRadius:40*factor_hor, marginBottom:15*factor_hor, }}>
                                            <TouchableHighlight underlayColor={'transparent'} onPress={ () => {this.share_post()}}>
                                                <View style={{height:65*factor_hor, width:65*factor_hor, borderRadius:40*factor_hor, backgroundColor:'white'}}>
                                                    <Share_
                                                        width={47.5*factor_hor}
                                                        height={47.5*factor_hor}
                                                        style={{
                                                            marginStart:6*factor_hor,
                                                            justifyContent:'center',
                                                            alignContent:'center',
                                                            marginTop:8*factor_hor,
                                                            }}
                                                    />
                                                </View>
                                            </TouchableHighlight>                                                              
                                        </View>
                                        <View style={{height:65*factor_hor, width:65*factor_hor, borderRadius:40*factor_hor, marginBottom:15*factor_hor, }}>
                                            <TouchableHighlight underlayColor={'transparent'} onPress={ () => { this.send_message()  }}>
                                                <View style={{height:65*factor_hor, width:65*factor_hor, borderRadius:40*factor_hor,backgroundColor:'white' }}>
                                                    <SendMessage
                                                        width={47.5*factor_hor}
                                                        height={47.5*factor_hor}
                                                        style={{
                                                            marginStart:9*factor_hor,
                                                            justifyContent:'center',
                                                            alignContent:'center',
                                                            marginTop:9*factor_hor,
                                                        }}
                                                    />                            
                                                </View>
                                            </TouchableHighlight>                                                            
                                        </View>                                                
                                        <View style={{height:65*factor_hor, width:65*factor_hor, borderRadius:40*factor_hor, marginBottom:15*factor_hor, }}>
                                            <TouchableHighlight underlayColor={'transparent'} onPress={ () => { this.block_unblock(); }}>
                                                <View style={{height:65*factor_hor, width:65*factor_hor, borderRadius:40*factor_hor,backgroundColor:'white' }}>
                                                    <Block
                                                        width={47.5*factor_hor}
                                                        height={47.5*factor_hor}
                                                        style={{
                                                            marginStart:9*factor_hor,
                                                            justifyContent:'center',
                                                            alignContent:'center',
                                                            marginTop:9*factor_hor,
                                                        }}
                                                    />
                                                </View>
                                            </TouchableHighlight>                                                            
                                        </View>
                                        <View style={{height:65*factor_hor, width:65*factor_hor, borderRadius:40*factor_hor, marginBottom:15*factor_hor, }}>
                                            <TouchableHighlight underlayColor={'transparent'} onPress={ () => {this.reported(); }}>
                                                <View style={{height:65*factor_hor, width:65*factor_hor, borderRadius:40*factor_hor, backgroundColor:'white'}}>
                                                    <Flag
                                                        width={47.5*factor_hor}
                                                        height={47.5*factor_hor}
                                                        style={{
                                                            marginStart:15*factor_hor,
                                                            justifyContent:'center',
                                                            alignContent:'center',
                                                            marginTop:10*factor_hor,
                                                        }}
                                                    />
                                                </View>
                                            </TouchableHighlight>                                                               
                                        </View>
                                        <View style={{height:65*factor_hor, width:65*factor_hor, borderRadius:40*factor_hor, marginBottom:15*factor_hor, }}>
                                            <TouchableHighlight underlayColor={'transparent'} onPress={ () => { this.saved(); }}>
                                                <View style={{height:65*factor_hor, width:65*factor_hor, borderRadius:40*factor_hor, backgroundColor:'white'}}>
                                                    <Save
                                                        width={47.5*factor_hor}
                                                        height={47.5*factor_hor}
                                                        style={{
                                                            marginStart:9*factor_hor,
                                                            justifyContent:'center',
                                                            alignContent:'center',
                                                            marginTop:9*factor_hor,
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
                                        <View style={{height:65*factor_hor, width:'100%', marginBottom:15*factor_hor, justifyContent:'center', alignContent:'center',}}>
                                            <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>Share</Text>
                                        </View>
                                        <View style={{height:65*factor_hor, width:'100%', marginBottom:15*factor_hor, justifyContent:'center', alignContent:'center',}}>
                                            <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>Message</Text>
                                        </View>                                                
                                        <View style={{height:65*factor_hor, width:'100%', marginBottom:15*factor_hor, justifyContent:'center', alignContent:'center'}}>
                                            <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>{this.block_post()}</Text>
                                        </View>
                                        <View style={{height:65*factor_hor, width:'100%', marginBottom:15*factor_hor, justifyContent:'center', alignContent:'center'}}>
                                            <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>{this.flag_post()}</Text>
                                        </View>
                                        <View style={{height:65*factor_hor, width:'100%', marginBottom:15*factor_hor, justifyContent:'center', alignContent:'center'}}>
                                            <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>{this.saved_post()}</Text>
                                        </View>
                                        <View style={{flex:1, }}></View>
                                    </View>                                                                                    
                                </View>
                            </View>
                        </View>
                        { this.isMine() && (
                        <View style={{height:30*factor_ver, marginBottom:12.5*factor_hor,}}>
                            <TouchableHighlight underlayColor={'transparent'} onPress={ () => {
                                        Alert.alert(
                                            'Are you sure you want to delete your post?',
                                            '',
                                            [
                                              {text: 'Cancel',onPress: () => console.log('Cancel Pressed'),style:'cancel'},
                                              {text: 'Yes', onPress: () => { this.deletePost() }},
                                            ],
                                            {cancelable: false},
                                        );
                                }}>
                                <View style={{
                                    height:30*factor_ver, 
                                    width:130*factor_hor, 
                                    borderRadius:15*factor_hor, 
                                    justifyContent:'center', 
                                    alignContent:'center',
                                    backgroundColor:'white'}}
                                >
                                    <Text style={{
                                        textAlign:'center',     
                                        fontFamily:'Avenir Next', 
                                        fontSize:20*factor_hor, 
                                        color:'red' , 
                                        fontWeight:'500',                      
                                    }}>Delete</Text>
                                </View>
                            </TouchableHighlight>                                                    
                        </View>
                        )}
                        <View style={{height:40*factor_ver, marginBottom:40*factor_ver,}}>
                            <TouchableHighlight underlayColor={'transparent'} onPress={ () => {this.setState({visible_image:false,visible_options:false, visible_sorting:false,})}}>
                            <View style={{
                                height:40*factor_ver, 
                                width:300*factor_hor, 
                                borderRadius:15*factor_hor, 
                                backgroundColor:'white',
                                justifyContent:'center',
                                alignContent:'center',
                            }}>
                                <Text style={{
                                    textAlign:'center', 
                                    justifyContent:'center', 
                                    alignContent:'center',
                                    fontFamily:'Avenir Next', 
                                    fontSize:24*factor_hor, 
                                    color:'black' , 
                                    opacity:1, 
                                    fontWeight:'500',
                                }}>Done</Text>
                            </View>
                            </TouchableHighlight>                                                    
                        </View>
                    </View>
                </Modal> 
                <Dialog
                    overlayOpacity={0.15}
                    hasOverlay={true}
                    rounded={true}
                    containerStyle={{opacity:1}}
                    visible={this.state.visible_image}
                    >
                    <DialogContent>
                        <GestureRecognizer
                            onSwipe={(direction, state) => this.onSwipe(direction, state)}

                            onSwipeUp={ (state) => this.onSwipeUp(state) }
                            onSwipeDown={ (state) => this.onSwipeDown(state) }
                            onSwipeLeft={ (state) => this.onSwipeLeft(state) }
                            onSwipeRight={ (state) => this.onSwipeRight(state) }
                            
                            config={config}
                            style={{flex:1, backgroundColor: 'black'}}
                        >
                            <View style={{height:Dimensions.get('window').height, width:Dimensions.get('window').width, backgroundColor:'black', justifyContent:'center', alignContent:'center'}}>
                            <View style={{flex:1,  }}>
                            <View style={{absolute:'position', zIndex:2, top:0*factor_ver, right:factor_hor*0.075, zIndex:3, justifyContent:'center', alignContent:'center', alignItems:'flex-end', }}>
                                <TouchableHighlight underlayColor={'transparent'} onPress={() => {this.setState({visible_image:false, clicked_image:null} )}} style={{marginEnd:25, zIndex:3, paddingBottom:0, marginTop:10*factor_ver, paddingTop:30*factor_ver}}>
                                    <Icon 
                                        style={{zIndex:3,}}
                                        size={30*factor_hor}
                                        name="cross"
                                        color="#9B9B9B"
                                        type='entypo'
                                    />
                                </TouchableHighlight>
                            </View>
                        </View>
                            <View style={{flex:8}}>
                                    <FastImage
                                        source={{uri: `http://${serverLocation}/${this.state.clicked_image}`}}
                                        resizeMode={FastImage.resizeMode.contain}
                                        style={{ flex:1, width:Dimensions.get('window').width, height:Dimensions.get('window').width, }}
                                    /> 
                                </View>
                                <View style={{flex:1}}></View>
                            </View>
                        </GestureRecognizer>
                    </DialogContent>
                </Dialog>   
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={this.state.visible_sorting}
                >   
                    <View style={{height:Dimensions.get('window').height, width:Dimensions.get('window').width, justifyContent:'flex-end', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.8)',}}>
                        <View style={{ alignSelf:'stretch', }}>
                            <View style={{height:65*factor_hor*3, marginBottom:10*factor_hor, flexDirection:'row', }}>   
                                <View style={{flex:1,}}></View>
                                <View style={{width:65*factor_hor,}}>
                                    <View style={{flex:1, }}></View>
                                    <View style={{height:65*factor_hor, marginBottom:15*factor_ver}}>
                                        <TouchableHighlight onPress={()=>{this.new_click()}} underlayColor={'transparent'}> 
                                            <View style={{height:65*factor_hor, width:65*factor_hor,borderRadius:40*factor_hor, backgroundColor:'white'}}>                                                  
                                                <New
                                                    width={47.5*factor_hor}
                                                    height={47.5*factor_hor}
                                                    style={{
                                                        marginStart:10*factor_hor,
                                                        justifyContent:'center',
                                                        alignContent:'center',
                                                        marginTop:10*factor_hor,
                                                    }}
                                                />
                                            </View>
                                        </TouchableHighlight> 
                                    </View>
                                    <View style={{height:65*factor_hor, marginBottom:15*factor_ver}}>
                                        <TouchableHighlight onPress={()=>{this.hot_click()}} underlayColor={'transparent'}> 
                                            <View style={{height:65*factor_hor, width:65*factor_hor,marginBottom:15*factor_hor, borderRadius:40*factor_hor, justifyContent:'center', alignContent:'center', backgroundColor:'white'}}>
                                                <Hot
                                                    width={47.5*factor_hor}
                                                    height={47.5*factor_hor}
                                                    style={{
                                                        marginStart:7.5*factor_hor,
                                                        justifyContent:'center',
                                                        alignContent:'center',
                                                    }}
                                                />
                                            </View>
                                        </TouchableHighlight>
                                    </View>                                    
                                </View>
                                <View style={{flex:0.1,}}></View>
                                <View style={{flex:0.9,}}>
                                    <View style={{flex:1, }}></View>{/* Hot word */}
                                    <View style={{height:65*factor_hor, marginBottom:15*factor_ver, width:'100%', justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>New</Text>
                                    </View>
                                    <View style={{height:65*factor_hor, marginBottom:15*factor_ver, width:'100%', justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>Hot</Text>
                                    </View>                                                 
                                </View>
                            </View>
                        </View>
                        <View style={{
                            height:50*factor_hor, 
                            marginTop:20*factor_hor, 
                            justifyContent:'center', 
                            alignItems:'center', 
                            alignContent:'center', 
                            marginBottom:50*factor_ver,
                        }}>
                            <TouchableHighlight underlayColor={'transparent'} onPress={() => { this.safe_click()}}>
                                <View style={{
                                    height:30*factor_ver, 
                                    width:140*factor_hor, 
                                    marginBottom:15*factor_hor, 
                                    borderRadius:20*factor_hor, 
                                    backgroundColor:'white'
                                }}>
                                    <Text style={{textAlign:'center', fontWeight:'600', justifyContent:'center', alignContent:'center',
                                    fontFamily:'Avenir Next', fontSize:factor_hor*20, marginTop:2, color:this.state.safeModeColor , fontWeight:'600',                      
                                    }}>Safe Mode</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor={'transparent'} onPress={() => {this.setState({visible_sorting:false}, function () {console.log(this.state.visible_sorting)})}}>
                                <View style={{
                                    height:40*factor_ver, 
                                    marginBottom:10*factor_ver, 
                                    width:300*factor_hor, 
                                    borderRadius:15*factor_hor, 
                                    backgroundColor:'white',
                                    justifyContent:'center', 
                                    alignContent:'center',
                                }}>
                                    <Text style={{
                                        textAlign:'center', 
                                        justifyContent:'center', 
                                        alignContent:'center',
                                        fontFamily:'Avenir Next', 
                                        fontSize:24*factor_hor, 
                                        color:'black' , 
                                        opacity:1, 
                                        fontWeight:'500',                      
                                    }}>Done</Text>
                                </View>
                            </TouchableHighlight>                                                    
                        </View>
                    </View>
                </Modal> 
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={this.state.seenFeed}
                >   
                    <View style={{height:Dimensions.get('window').height, width:Dimensions.get('window').width, justifyContent:'flex-end', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.8)',}}>
                        <TouchableHighlight
                            onPress={() => {
                                this.setState({ seenFeed:false}), 
                                AsyncStorage.setItem('seenFeed', 'true')
                            }}
                            style={{flex:1,alignSelf:'stretch'}}
                        >
                            <View style={{ 
                                position:'absolute', 
                                top:250*factor_ver, 
                                zIndex:3, 
                                left:37.5*factor_hor, 
                                height:300*factor_hor, 
                                width:300*factor_hor, 
                                backgroundColor:'white',
                                borderRadius:20*factor_hor, 
                                borderColor:'#ececec',
                                borderWidth:1,
                                paddingLeft:10*factor_hor,
                                paddingTop:10*factor_hor,
                                paddingBottom:10*factor_hor, 
                                paddingRight:10*factor_hor,
                                justifyContent:'space-around',
                                alignContent:'space-around',
                            }}>
                                <Text
                                    minimumFontScale={0.3}
                                    adjustsFontSizeToFit={true}
                                    style={{fontSize:20,textAlign:'center'}}
                                >1. Press the bottom of a post see comments</Text>
                                <Text
                                    minimumFontScale={0.3}
                                    adjustsFontSizeToFit={true}
                                    style={{fontSize:20,textAlign:'center'}}
                                >2. Double tap to like or dislike a post</Text>
                                <Text
                                    minimumFontScale={0.3}
                                    adjustsFontSizeToFit={true}
                                    style={{fontSize:20,textAlign:'center'}}
                                >3. Press the three horizontal dots for options and to flag posts</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </Modal> 
                <Dialog
                    overlayOpacity={0.15}
                    hasOverlay={true}
                    rounded={true}
                    containerStyle={{opacity:1}}
                    visible={this.state.visible_video}
                    >
                    <DialogContent>
                        <GestureRecognizer
                            onSwipe={(direction, state) => this.onSwipe(direction, state)}
                            onSwipeUp={ (state) => this.onSwipeUp(state) }
                            onSwipeDown={ (state) => this.onSwipeDown(state) }
                            onSwipeLeft={ (state) => this.onSwipeLeft(state) }
                            onSwipeRight={ (state) => this.onSwipeRight(state) }
                            config={config}
                            style={{flex:1, backgroundColor: 'black'}}
                        >
                            <View style={{
                                height:Dimensions.get('window').height, 
                                width:Dimensions.get('window').width, 
                                backgroundColor:'black', 
                                justifyContent:'center', 
                                alignContent:'center'
                            }}>
                                <View style={{
                                    width:'100%',
                                    height:'100%',
                                }}>
                                    <Video
                                        source={{uri: `http://${serverLocation}/${this.state.clicked_image}`}}
                                        ref={(ref) => {this.player = ref}}
                                        bufferConfig={{
                                            minBufferMs: 15000,
                                            maxBufferMs: 60000,
                                            bufferForPlaybackMs: 5000,
                                            bufferForPlaybackAfterRebufferMs: 5000
                                        }}
                                        controls={!this.state.showSlider}
                                        repeat={true}
                                        preload={"none"}
                                        fullscreen={false}
                                        minLoadRetryCount={100}
                                        resizeMode={"contain"}
                                        playWhenInactive={false}
                                        progressUpdateInterval={250}
                                        //onBuffer={console.log('hi')}
                                        onError={e => console.log(e)}
                                        paused={this.state.paused}
                                        onLoad={(e) => this.setState({videoLength: e.duration})}
                                        onEnd={() => this.setState({paused:true},
                                            function(){console.log(this.state.paused)})} 
                                        style={{
                                            width:Dimensions.get('window').width,
                                            height:Dimensions.get('window').height,
                                            alignItems:'center',
                                            alignSelf:'stretch',
                                            backgroundColor:'white'
                                        }}
                                    />
                                    <View style={{
                                        postition: 'absolute',
                                        bottom: 87.5*factor_ver,
                                        left: 50*factor_hor,
                                        width: 50*factor_hor, 
                                        height: 50*factor_hor, 
                                        zIndex: 10,
                                    }}>
                                        {this.state.showSlider && (
                                        <MultiSlider
                                            min={0}
                                            max={100}
                                            step={0.1}
                                            values={this.state.videoState}
                                            touchDimensions={{ 
                                                height: 10,
                                                width: 50,
                                                borderRadius: 15,
                                                slipDisplacement: 200, 
                                            }}
                                            sliderLength={280}
                                            trackStyle={{
                                                height:10,
                                                backgroundColor: '#e0e0e0',
                                                height:10,
                                                marginBottom:10,
                                            }}
                                            selectedStyle={{
                                                height:10,
                                                backgroundColor: '#FFBA6F',
                                                height:10,
                                                marginBottom:10,
                                            }}
                                            markerStyle={{
                                                height:20,
                                                width: 13,
                                                marginBottom:10,
                                                borderRadius: 15,
                                                backgroundColor:'white',
                                            }}
                                            onValuesChangeFinish={(e) => this.ChangeVideo(e)}
                                        />
                                        )}
                                        {this.state.showSlider && ( 
                                         <TouchableOpacity 
                                            onPress={() => {this.makeClip()}}  
                                            style={{
                                                position:'absolute', 
                                                left: 200*factor_hor, 
                                                bottom: -10*factor_ver, 
                                                justifyContent:'center', 
                                                alignContent:'center', 
                                                alignItems:'center'
                                            }}>
                                            <Icon 
                                                size={30*factor_hor}
                                                name={"new-message"}
                                                color={'#FFBA6F'}
                                                type={'entypo'}
                                            />
                                        </TouchableOpacity>
                                        )}
                                        <TouchableOpacity 
                                            style={{
                                                position:'absolute', 
                                                left: 250*factor_hor, 
                                                bottom: -15*factor_ver, 
                                                justifyContent:'center', 
                                                alignItems:'center'
                                            }}
                                            onPress={() => this.setState({ showSlider: !this.state.showSlider})}>
                                            <Icon 
                                                style={{flex:1,}}
                                                size={37.5*factor_hor}
                                                name={'scissors'}
                                                color={'#FFBA6F'}
                                                type={'entypo'}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </GestureRecognizer>
                    </DialogContent>
                </Dialog>   
                
                <LinearGradient colors={['#FFBA6F','#FC3004']} style={{ opacity:0.85, alignSelf:'stretch'}}>
                    <View style={{height:funcs.winHeight(), }}></View>
                    <View style={{height:(20+height_*0.015 ),  justifyContent:'center', alignContent:'center', flexDirection:'row', }}>
                            <View style={{flex:0.25, justifyContent:"center", alignContent:'center', alignItems:'center'}}>
                                <TouchableOpacity 
                                    onPress={this.setSort}
                                    hitSlop={{right:30*factor_hor, left:30*factor_hor, top:30, bottom:30}} 
                                    style={{marginStart:4, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                                    <Icon 
                                        size={10+15*factor_hor}
                                        name="select-arrows" 
                                        color="black" 
                                        type='entypo' 
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:1.25, backgroundColor:'#FFBA9D', borderRadius:10*factor_hor,flexDirection:'row'}}>
                                <View style={{flex:1, marginTop:-1,justifyContent:'center', }}>
                                    <TouchableHighlight underlayColor={'transparent'} style={{marginStart:9, marginEnd:5}}>
                                                <Icon 
                                                    size={20*factor_hor}
                                                    name="magnifying-glass" 
                                                    color='#626364' /// black
                                                    type='entypo' 
                                                />
                                    </TouchableHighlight>
                                </View>
                                <View style={{flex:7.5, justifyContent:'center', alignContent:'center', alignItems:'flex-start'}}>
                                    <TextInput      style={{textAlign:'left',fontSize:factor_hor*20, marginRight:-10, fontFamily:'Avenir Next' }}
                                                    hitSlop={{ "left":15, "right":60, "top":10, "down":10}}
                                                    color='black'
                                                    ref={input => { this.textInput = input }}
                                                    placeholder=' Search'
                                                    placeholderTextColor='#626364'///black
                                                    onChangeText = { (typedText) => {this.setState({search_term:( '"' + typedText + '"'  )}), function () {console.log(this.state.search_term)}}}
                                                    onSubmitEditing = {() => { this.search_click(); } }
                                    >
                                    </TextInput>
                                </View>
                            </View> 
                            {/* Post */}
                            <View style={{flex:0.25, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                                <TouchableOpacity hitSlop={{right:30*factor_hor, left:30*factor_hor, top:30, bottom:30}} underlayColor={'transparent'} onPress={() => {this.props.navigation.navigate('CREATE_POST');}  }  style={{justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                                    <Icon 
                                        size={10+15*factor_hor}
                                        name="new-message" 
                                        color="black" 
                                        type='entypo' 
                                    />
                                </TouchableOpacity>
                            </View>            
                    </View>
                    <View style={{height:5*factor_hor}}></View>
                    <View style={{height:33, flexDirection:'row', justifyContent:'center', alignContent:'center'}}>
                        {/* world */}
                        <View style={{ borderBottomColor:this.state.world_border, borderBottomWidth:3, flex:1, textAlign:'right', alignContent:'center', justifyContent:'center', }}>
                            <TouchableHighlight underlayColor={'transparent'} onPress={() => {this.world_click()}}>
                            <Text 
                            style={{fontFamily:'Avenir Next', fontWeight:this.state.world_weight, marginBottom:3, marginEnd:7, alignContent:'center', textAlign:'right', color:'white', fontSize:15+5*factor_hor}}>World</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={{flex:0.1,borderBottomColor:this.state.world_border, borderBottomWidth:3,}}></View>
                        <View style={{flex:0.05,borderBottomColor:'transparent', borderBottomWidth:3, }}></View>
                        {/* city */}
                        <View style={{borderBottomColor:this.state.city_border, borderBottomWidth:3, flex:0.7, justifyContent:'center', alignContent:'center', }}>
                            <TouchableHighlight underlayColor={'transparent'} onPress={() => {this.city_click()}}>
                            <Text 
                            style={{fontFamily:'Avenir Next', fontWeight:this.state.city_weight, marginBottom:3, justifyContent:'center', alignContent:'center', textAlign:'center', color:'white', fontSize:15+5*factor_hor}}>City</Text>
                            </TouchableHighlight>
                        </View>
                        {/* local */}
                        <View style={{flex:0.05,borderBottomColor:'transparent', borderBottomWidth:3, }}></View>
                        <View style={{flex:0.1,borderBottomColor:this.state.local_border, borderBottomWidth:3,}}></View>
                        <View style={{borderBottomColor:this.state.local_border, borderBottomWidth:3,flex:0.9, textAlign:'left', alignContent:'center', justifyContent:'center', }}>
                            <TouchableHighlight underlayColor={'transparent'} onPress={() => {this.local_click()}}>
                            <Text
                            style={{fontFamily:'Avenir Next',marginBottom:3,fontWeight:this.state.local_weight, marginStart:3, alignContent:'center', textAlign:'justify', color:'white', fontSize:15+5*factor_hor}}>Local</Text>

                            </TouchableHighlight>
                        </View>
                    </View>
                </LinearGradient>  
                    {this.state.first_loaded && (
                        <RecyclerListView 
                            style={{backgroundColor:'#f7f7f7', paddingTop:8*factor_hor,}}
                            extendedState={this.state}
                            rowRenderer={this._renderRow} 
                            dataProvider={this.state.dataProvider}
                            layoutProvider={this._layoutProvider}
                            showsVerticalScrollIndicator={false}
                            onEndReached={() => this.fetchPosts()}
                            onEndReachedThreshold={1}
                            renderFooter={() => this.renderFooter()}
                            onScroll={(e) => this.handleScroll(e)}
                            scrollThrottle={500}
                            refreshControl={
                            <RefreshControl
                                tintColor={'white'}
                                refreshing={false}
                                onRefresh={() => { 
                                    this.setState({isLoad:true}), this.refresh_feed()}} 
                            />}
                        />
                    )}              
                    {!this.state.first_loaded && (
                        <View style={{flex:1, backgroundColor:'#f7f7f7', justifyContent:'center', alignContent:'center', alignItems:'center'}}></View>
                    )}
                    { this.state.showNav && (
                        <View style={{
                            position:'absolute',
                            bottom:20*factor_hor,
                            right:20*factor_hor, 
                            zIndex:2,
                            borderRadius:50,
                            width:50, 
                            height:50, 
                            justifyContent:'center', 
                            alignContent:'center', 
                            alignItems:'center',

                            backgroundColor:'white',
                            borderWidth:0.5,
                            borderColor:'#ececec',

                            shadowOffset: { width: 0, height: 5 },
                            shadowColor: 'grey',
                            shadowOpacity: 0.8,
                            shadowRadius:20,
                            elevation: 3,
                        }}>
                            <TouchableHighlight 
                                underlayColor={'transparent'} 
                                style={{ 
                                    flex:1,
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center',
                                }} 
                                onPress={() =>  {this.props.navigation.push('ROOMS')}}
                            >                   
                                <Icon
                                    name='door'
                                    color='#ff835e'
                                    type='material-community'
                                    size={27*factor_hor}
                                />
                            </TouchableHighlight>
                        </View>
                    )}  
            </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignSelf:'stretch', 
        justifyContent:'center', 
        alignContent:'center', 
        backgroundColor:'#f7f7f7',
    }
});
