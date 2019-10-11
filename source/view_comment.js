import React from 'react';
import {StyleSheet, TouchableOpacity, Text, Animated,
        Modal, Share, ActivityIndicator,Alert,
        RefreshControl, View, TouchableHighlight, 
        Dimensions, AsyncStorage,} from 'react-native';
import { Icon, } from 'react-native-elements'
import Dialog, { DialogContent,} from 'react-native-popup-dialog';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import FastImage from 'react-native-fast-image';
import DoubleClick from 'react-native-double-tap';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import Share_ from './svgs/share';
import SendMessage from './svgs/send_message';
import Block from './svgs/block';
import Flag from './svgs/flag';
import Save from './svgs/save';
import Eye from './svgs/eye';
import Hot from './svgs/hot';
import New from './svgs/new';

const config = {velocityThreshold: 0.3,directionalOffsetThreshold: 80};  
const width_ = Dimensions.get('window').width
const height_ = Dimensions.get('window').height
var received_comments = [0,1] 

export default class view_comment extends React.Component {
    static navigationOptions = {header: null};
    constructor(props) {
        super(props);
        this._layoutProvider = new LayoutProvider((i) => {
            type_ = this.state.dataProvider._data[i][1];
            return this.state.dataProvider._data[i][18];
            }, (type, dim, type_) => {
            switch (type) {
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
        this.state = {
            // user related
            username:'',
            sort:'new',
            
            // comments
            comments:[],
            key_status:'0', // for comment
            gestureNameComments:'none', 

            // posts
            post:'', 
            gestureName: 'none', 
            key_status_post:'0',
            clicked_image:0, // whether a comment image or other clicked
            
            visible_image:false,
            visible_options:false, 
            visible_sorting:false,
            first_loaded:false, 
            outPosts:false, 
        }
    }
    
    _renderRow(type, data, index) {
        switch (type) {
        case "p0":
            return <View style={{height:1,}}>
                    <Animated.View style={{
                        height: width_*1.11*factor_hor + 75*factor_ver, 
                        borderRadius: 30*factor_hor,
                        width: width_, 
                        backgroundColor: 'white',
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
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
                                singleTap={() => {this.setState({visible_image:true, clicked_image:this.state.comments[index][11]})}}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.comments[index][11]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
                                }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                            <View style={{height:5*factor_ver}}></View>
                            <View style={{flexDirection:'row',height:55*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', marginRight:7.5*factor_hor}}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            </DoubleClick>
                    </Animated.View>
                </View>
         case "p25":
            return <View style={{height:1,}}>
                    <Animated.View style={{
                        height: width_*1.11*factor_hor + 125*factor_ver, 
                        borderRadius: 30*factor_hor,
                        width: width_, 
                        backgroundColor: 'white',
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}>
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            marginRight:20*factor_hor,}}>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
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
                                        minimumFontScale={0.335}
                                        adjustsFontSizeToFit={true}
                                        style={{
                                            flex:1,
                                            fontFamily:'avenir next',
                                            marginTop:17*factor_ver, 
                                            textAlign:'left', 
                                            fontSize:40*factor_hor,
                                        }}>{this.state.comments[index][0]}
                                    </Text>
                                </View>
                            </DoubleClick>
                        </View> 
                         
                        {/* buffer */}
                        <View style={{height:15*factor_ver}}></View>
                        {/* image */}
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => {this.setState({visible_image:true, clicked_image:this.state.comments[index][11]})}}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.comments[index][11]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
                                }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                            <View style={{height:5*factor_ver}}></View>
                            <View style={{flexDirection:'row',height:55*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', marginRight:7.5*factor_hor}}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            </DoubleClick>
                    </Animated.View>
                </View>
        case "p50":
            return <View style={{height:1,}}>
                    <Animated.View style={{
                        height: width_*1.11*factor_hor + 150*factor_ver, 
                        borderRadius: 30*factor_hor,
                        width: width_, 
                        backgroundColor: 'white',
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}> 
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            marginRight:20*factor_hor,}}>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
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
                                        minimumFontScale={0.335}
                                        adjustsFontSizeToFit={true}
                                        style={{
                                            flex:1,
                                            fontFamily:'avenir next',
                                            marginTop:17*factor_ver, 
                                            textAlign:'left', 
                                            fontSize:40*factor_hor,
                                        }}>{this.state.comments[index][0]}
                                    </Text>
                                </View>
                            </DoubleClick>
                        </View> 
                        
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => {this.setState({visible_image:true, clicked_image:this.state.comments[index][11]})}}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.comments[index][11]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
                                }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                            <View style={{height:5*factor_ver}}></View>
                            <View style={{flexDirection:'row',height:55*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', marginRight:7.5*factor_hor}}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            </DoubleClick>
                    </Animated.View>
                </View>
        case "p75":
            return <View style={{height:1,}}>
                    <Animated.View style={{
                        height: width_*1.11*factor_hor + 150*factor_ver, 
                        borderRadius: 30*factor_hor,
                        width: width_, 
                        backgroundColor: 'white',
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}> 
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            marginRight:20*factor_hor,}}>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
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
                                        minimumFontScale={0.335}
                                        adjustsFontSizeToFit={true}
                                        style={{
                                            flex:1,
                                            fontFamily:'avenir next',
                                            marginTop:17*factor_ver, 
                                            textAlign:'left', 
                                            fontSize:40*factor_hor,
                                        }}>{this.state.comments[index][0]}
                                    </Text>
                                </View>
                            </DoubleClick>
                        </View> 
                        
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => {this.setState({visible_image:true, clicked_image:this.state.comments[index][11]})}}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.comments[index][11]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
                                }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                            <View style={{height:5*factor_ver}}></View>
                            <View style={{flexDirection:'row',height:55*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', marginRight:7.5*factor_hor}}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            </DoubleClick>
                    </Animated.View>
                </View>
        case "p100":
            return <View style={{height:1,}}>
                    <Animated.View style={{
                        height: width_*1.11*factor_hor + 175*factor_ver, 
                        borderRadius: 30*factor_hor,
                        width: width_, 
                        backgroundColor: 'white',
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}> 
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            marginRight:20*factor_hor,}}>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
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
                                        minimumFontScale={0.335}
                                        adjustsFontSizeToFit={true}
                                        style={{
                                            flex:1,
                                            fontFamily:'avenir next',
                                            marginTop:17*factor_ver, 
                                            textAlign:'left', 
                                            fontSize:40*factor_hor,
                                        }}>{this.state.comments[index][0]}
                                    </Text>
                                </View>
                            </DoubleClick>
                        </View> 
                        
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => {this.setState({visible_image:true, clicked_image:this.state.comments[index][11]})}}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.comments[index][11]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
                                }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                            <View style={{height:5*factor_ver}}></View>
                            <View style={{flexDirection:'row',height:55*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', marginRight:7.5*factor_hor}}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            </DoubleClick>
                    </Animated.View>
                </View>
        case "p125":
            return <View style={{height:1,}}>
                    <Animated.View style={{
                        height: width_*1.11*factor_hor + 200*factor_ver, 
                        borderRadius: 30*factor_hor,
                        width: width_, 
                        backgroundColor: 'white',
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}> 
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            marginRight:20*factor_hor,}}>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
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
                                        minimumFontScale={0.335}
                                        adjustsFontSizeToFit={true}
                                        style={{
                                            flex:1,
                                            fontFamily:'avenir next',
                                            marginTop:17*factor_ver, 
                                            textAlign:'left', 
                                            fontSize:40*factor_hor,
                                        }}>{this.state.comments[index][0]}
                                    </Text>
                                </View>
                            </DoubleClick>
                        </View> 
                        
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => {this.setState({visible_image:true, clicked_image:this.state.comments[index][11]})}}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.comments[index][11]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
                                }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                            <View style={{height:5*factor_ver}}></View>
                            <View style={{flexDirection:'row',height:55*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', marginRight:7.5*factor_hor}}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            </DoubleClick>
                    </Animated.View>
                </View>
        case "p150":
            return <View style={{height:1,}}>
                    <Animated.View style={{
                        height: width_*1.11*factor_hor + 200*factor_ver, 
                        borderRadius: 30*factor_hor,
                        width: width_, 
                        backgroundColor: 'white',
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}> 
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            marginRight:20*factor_hor,}}>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
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
                                        minimumFontScale={0.335}
                                        adjustsFontSizeToFit={true}
                                        style={{
                                            flex:1,
                                            fontFamily:'avenir next',
                                            marginTop:17*factor_ver, 
                                            textAlign:'left', 
                                            fontSize:40*factor_hor,
                                        }}>{this.state.comments[index][0]}
                                    </Text>
                                </View>
                            </DoubleClick>
                        </View> 
                        
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => {this.setState({visible_image:true, clicked_image:this.state.comments[index][11]})}}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.comments[index][11]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
                                }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                            <View style={{height:5*factor_ver}}></View>
                            <View style={{flexDirection:'row',height:55*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', marginRight:7.5*factor_hor}}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            </DoubleClick>
                    </Animated.View>
                </View>
        case "p175":
            return <View style={{height:1,}}>
                    <Animated.View style={{
                        height: width_*1.11*factor_hor + 225*factor_ver, 
                        borderRadius: 30*factor_hor,
                        width: width_, 
                        backgroundColor: 'white',
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}> 
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            marginRight:20*factor_hor,}}>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
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
                                        minimumFontScale={0.335}
                                        adjustsFontSizeToFit={true}
                                        style={{
                                            flex:1,
                                            fontFamily:'avenir next',
                                            marginTop:17*factor_ver, 
                                            textAlign:'left', 
                                            fontSize:40*factor_hor,
                                        }}>{this.state.comments[index][0]}
                                    </Text>
                                </View>
                            </DoubleClick>
                        </View> 
                        
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => {this.setState({visible_image:true, clicked_image:this.state.comments[index][11]})}}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.comments[index][11]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
                                }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                            <View style={{height:5*factor_ver}}></View>
                            <View style={{flexDirection:'row',height:55*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', marginRight:7.5*factor_hor}}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            </DoubleClick>
                    </Animated.View>
                </View>
        case "p200":
            return <View style={{height:1,}}>
                    <Animated.View style={{
                        height: width_*1.11*factor_hor + 250*factor_ver, 
                        borderRadius: 30*factor_hor,
                        width: width_, 
                        backgroundColor: 'white',
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}> 
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            marginRight:20*factor_hor,}}>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
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
                                        minimumFontScale={0.335}
                                        adjustsFontSizeToFit={true}
                                        style={{
                                            flex:1,
                                            fontFamily:'avenir next',
                                            marginTop:17*factor_ver, 
                                            textAlign:'left', 
                                            fontSize:40*factor_hor,
                                        }}>{this.state.comments[index][0]}
                                    </Text>
                                </View>
                            </DoubleClick>
                        </View> 
                        
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => {this.setState({visible_image:true, clicked_image:this.state.comments[index][11]})}}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.comments[index][11]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
                                }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                            <View style={{height:5*factor_ver}}></View>
                            <View style={{flexDirection:'row',height:55*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', marginRight:7.5*factor_hor}}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            </DoubleClick>
                    </Animated.View>
                </View>
        case "p225":
            return <View style={{height:1,}}>
                    <Animated.View style={{
                        height: width_*1.11*factor_hor + 250*factor_ver, 
                        borderRadius: 30*factor_hor,
                        width: width_, 
                        backgroundColor: 'white',
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}> 
                    <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            marginRight:20*factor_hor,}}>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
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
                                        minimumFontScale={0.335}
                                        adjustsFontSizeToFit={true}
                                        style={{
                                            flex:1,
                                            fontFamily:'avenir next',
                                            marginTop:17*factor_ver, 
                                            textAlign:'left', 
                                            fontSize:40*factor_hor,
                                        }}>{this.state.comments[index][0]}
                                    </Text>
                                </View>
                            </DoubleClick>
                        </View> 
                        
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => {this.setState({visible_image:true, clicked_image:this.state.comments[index][11]})}}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.comments[index][11]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
                                }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                            <View style={{height:5*factor_ver}}></View>
                            <View style={{flexDirection:'row',height:55*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', marginRight:7.5*factor_hor}}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            </DoubleClick>
                    </Animated.View>
                </View>
        case "p250":
            return <View style={{height:1,}}>
                    <Animated.View style={{
                        height: width_*1.11*factor_hor + 275*factor_ver, 
                        borderRadius: 30*factor_hor,
                        width: width_, 
                        backgroundColor: 'white',
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}> 
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            marginRight:20*factor_hor,}}>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
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
                                        minimumFontScale={0.335}
                                        adjustsFontSizeToFit={true}
                                        style={{
                                            flex:1,
                                            fontFamily:'avenir next',
                                            marginTop:17*factor_ver, 
                                            textAlign:'left', 
                                            fontSize:40*factor_hor,
                                        }}>{this.state.comments[index][0]}
                                    </Text>
                                </View>
                            </DoubleClick>
                        </View> 
                        
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => {this.setState({visible_image:true, clicked_image:this.state.comments[index][11]})}}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.comments[index][11]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
                                }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                            <View style={{height:5*factor_ver}}></View>
                            <View style={{flexDirection:'row',height:55*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', marginRight:7.5*factor_hor}}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            </DoubleClick>
                    </Animated.View>
                </View>
        case "p275":
            return <View style={{height:1,}}>
                    <Animated.View style={{
                        height: width_*1.11*factor_hor + 275*factor_ver, 
                        borderRadius: 30*factor_hor,
                        width: width_, 
                        backgroundColor: 'white',
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}> 
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            marginRight:20*factor_hor,}}>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
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
                                        minimumFontScale={0.335}
                                        adjustsFontSizeToFit={true}
                                        style={{
                                            flex:1,
                                            fontFamily:'avenir next',
                                            marginTop:17*factor_ver, 
                                            textAlign:'left', 
                                            fontSize:40*factor_hor,
                                        }}>{this.state.comments[index][0]}
                                    </Text>
                                </View>
                            </DoubleClick>
                        </View> 
                        
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => {this.setState({visible_image:true, clicked_image:this.state.comments[index][11]})}}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.comments[index][11]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
                                }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                            <View style={{height:5*factor_ver}}></View>
                            <View style={{flexDirection:'row',height:55*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', marginRight:7.5*factor_hor}}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            </DoubleClick>
                    </Animated.View>
                </View>
        case "p300":
            return <View style={{height:1,}}>
                    <Animated.View style={{
                        height: width_*1.11*factor_hor + 300*factor_ver, 
                        borderRadius: 30*factor_hor,
                        width: width_, 
                        backgroundColor: 'white',
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}> 
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            marginRight:20*factor_hor,}}>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
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
                                        minimumFontScale={0.335}
                                        adjustsFontSizeToFit={true}
                                        style={{
                                            flex:1,
                                            fontFamily:'avenir next',
                                            marginTop:17*factor_ver, 
                                            textAlign:'left', 
                                            fontSize:40*factor_hor,
                                        }}>{this.state.comments[index][0]}
                                    </Text>
                                </View>
                            </DoubleClick>
                        </View> 
                        
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => {this.setState({visible_image:true, clicked_image:this.state.comments[index][11]})}}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.comments[index][11]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
                                }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                            <View style={{height:5*factor_ver}}></View>
                            <View style={{flexDirection:'row',height:55*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', marginRight:7.5*factor_hor}}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            </DoubleClick>
                    </Animated.View>
                </View>
        case "p325":
            return <View style={{height:1,}}>
                    <Animated.View style={{
                        height: width_*1.11*factor_hor + 325*factor_ver, 
                        borderRadius: 30*factor_hor,
                        width: width_, 
                        backgroundColor: 'white',
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}> 
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            marginRight:20*factor_hor,}}>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
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
                                        minimumFontScale={0.335}
                                        adjustsFontSizeToFit={true}
                                        style={{
                                            flex:1,
                                            fontFamily:'avenir next',
                                            marginTop:17*factor_ver, 
                                            textAlign:'left', 
                                            fontSize:40*factor_hor,
                                        }}>{this.state.comments[index][0]}
                                    </Text>
                                </View>
                            </DoubleClick>
                        </View> 
                        
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => {this.setState({visible_image:true, clicked_image:this.state.comments[index][11]})}}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.comments[index][11]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
                                }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                            <View style={{height:5*factor_ver}}></View>
                            <View style={{flexDirection:'row',height:55*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', marginRight:7.5*factor_hor}}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            </DoubleClick>
                    </Animated.View>
                </View>
        case "p350":
            return <View style={{height:1,}}>
                    <Animated.View style={{
                        height: width_*1.11*factor_hor + 325*factor_ver, 
                        borderRadius: 30*factor_hor,
                        width: width_, 
                        backgroundColor: 'white',
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}> 
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            marginRight:20*factor_hor,}}>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
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
                                        minimumFontScale={0.335}
                                        adjustsFontSizeToFit={true}
                                        style={{
                                            flex:1,
                                            fontFamily:'avenir next',
                                            marginTop:17*factor_ver, 
                                            textAlign:'left', 
                                            fontSize:40*factor_hor,
                                        }}>{this.state.comments[index][0]}
                                    </Text>
                                </View>
                            </DoubleClick>
                        </View> 
                        
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => {this.setState({visible_image:true, clicked_image:this.state.comments[index][11]})}}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.comments[index][11]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
                                }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                            <View style={{height:5*factor_ver}}></View>
                            <View style={{flexDirection:'row',height:55*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', marginRight:7.5*factor_hor}}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            </DoubleClick>
                    </Animated.View>
                </View>
        case "p375":
            return <View style={{height:1,}}>
                    <Animated.View style={{
                        height: width_*1.11*factor_hor + 350*factor_ver, 
                        borderRadius: 30*factor_hor,
                        width: width_, 
                        backgroundColor: 'white',
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}> 
                        <View style={{
                            flex:1, 
                            flexDirection:'row',
                            paddingLeft:20*factor_hor,
                            marginRight:20*factor_hor,}}>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
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
                                        minimumFontScale={0.335}
                                        adjustsFontSizeToFit={true}
                                        style={{
                                            flex:1,
                                            fontFamily:'avenir next',
                                            marginTop:17*factor_ver, 
                                            textAlign:'left', 
                                            fontSize:40*factor_hor,
                                        }}>{this.state.comments[index][0]}
                                    </Text>
                                </View>
                            </DoubleClick>
                        </View> 
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => {this.setState({visible_image:true, clicked_image:this.state.comments[index][11]})}}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.comments[index][11]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
                                }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                            <View style={{height:5*factor_ver}}></View>
                            <View style={{flexDirection:'row',height:55*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', marginRight:7.5*factor_hor}}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            </DoubleClick>
                    </Animated.View>
                </View>
        case "p400":
            return <View style={{height:1,}}>
                    <Animated.View style={{
                        height: 350*factor_ver + width_*1.11*factor_hor,
                        borderRadius: 30*factor_hor,
                        width: width_, 
                        backgroundColor: 'white',
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}> 
                    <View style={{
                        flex:1, 
                        flexDirection:'row',
                        paddingLeft:20*factor_hor,
                        marginRight:20*factor_hor,}}>
                        <DoubleClick
                            singleTap={() => {
                                this.setState({key_status:index},
                                function() {console.log(this.state.key_status)}),
                                this.setState({visible_options:true,}), 
                                this.check_send()
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
                                    minimumFontScale={0.335}
                                    adjustsFontSizeToFit={true}
                                    style={{
                                        flex:1,
                                        fontFamily:'avenir next',
                                        marginTop:17*factor_ver, 
                                        textAlign:'left', 
                                        fontSize:40*factor_hor,
                                    }}>{this.state.comments[index][0]}
                                </Text>
                            </View>
                        </DoubleClick>
                    </View> 
                        <View style={{height:15*factor_ver}}></View>
                        <View style={{
                            height:width_*1.11*factor_hor,
                            borderRadius:20*factor_hor,
                            alignItems:'center',
                            alignContent:'center',
                        }}>
                            <DoubleClick
                                singleTap={() => {this.setState({visible_image:true, clicked_image:this.state.comments[index][11]})}}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.cover}
                                    source={{ uri: `http://${serverLocation}/${this.state.comments[index][11]}` }}
                                    style={{ height: width_*1.11*factor_hor, width: width_*0.925, alignItems:'center', borderRadius:20*factor_hor, alignSelf:'stretch' }}
                                /> 
                            </DoubleClick>                
                        </View>
                            <DoubleClick
                                singleTap={() => {
                                    this.setState({key_status:index},
                                    function() {console.log(this.state.key_status)}),
                                    this.setState({visible_options:true,}), 
                                    this.check_send()
                                }}
                                doubleTap={() => {this.likePost(index);}}
                                delay={350}
                            >
                            <View style={{height:5*factor_ver}}></View>
                            <View style={{flexDirection:'row',height:55*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center', marginRight:7.5*factor_hor}}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
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
                        width: width_,
                        backgroundColor: 'white',
                        paddingBottom: this.state.comments[index][21],
                        paddingTop: this.state.comments[index][21],
                        paddingRight: this.state.comments[index][21],
                        paddingLeft: this.state.comments[index][21],
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}
                >
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        paddingLeft:20*factor_hor,
                        paddingRight:20*factor_hor,
                    }}>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
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
                                }}>{this.state.comments[index][0]}
                            </Text>
                        </View>
                    </DoubleClick>
                    </View>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >
                        <View style={{flexDirection:'row',height:60*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, marginRight:7.5*factor_hor, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            
                    </DoubleClick>
                </Animated.View>
            </View>
        case "50":
            return <View style={{height:1,}}>
                <Animated.View 
                    style={{
                        height: 125*factor_ver,
                        borderRadius: 30*factor_hor, 
                        width: width_,
                        backgroundColor: 'white',
                        paddingBottom: this.state.comments[index][21],
                        paddingTop: this.state.comments[index][21],
                        paddingRight: this.state.comments[index][21],
                        paddingLeft: this.state.comments[index][21],
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}
                >
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        paddingLeft:20*factor_hor,
                        paddingRight:20*factor_hor,
                    }}>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
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
                                }}>{this.state.comments[index][0]}
                            </Text>
                        </View>
                    </DoubleClick>
                    </View>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >
                        <View style={{flexDirection:'row',height:60*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, marginRight:7.5*factor_hor, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            
                    </DoubleClick>
                </Animated.View>
            </View>
        case "75":
            return <View style={{height:1,}}>
                <Animated.View 
                    style={{
                        height: 125*factor_ver,
                        borderRadius: 30*factor_hor, 
                        width: width_,
                        backgroundColor: 'white',
                        paddingBottom: this.state.comments[index][21],
                        paddingTop: this.state.comments[index][21],
                        paddingRight: this.state.comments[index][21],
                        paddingLeft: this.state.comments[index][21],
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}
                >
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        paddingLeft:20*factor_hor,
                        paddingRight:20*factor_hor,
                    }}>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
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
                                }}>{this.state.comments[index][0]}
                            </Text>
                        </View>
                    </DoubleClick>
                    </View>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >
                        <View style={{flexDirection:'row',height:60*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, marginRight:7.5*factor_hor, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            
                    </DoubleClick>
                </Animated.View>
            </View>
        case "100":
            return <View style={{height:1,}}>
                <Animated.View 
                    style={{
                        height: 125*factor_ver,
                        borderRadius: 30*factor_hor, 
                        width: width_,
                        backgroundColor: 'white',
                        paddingBottom: this.state.comments[index][21],
                        paddingTop: this.state.comments[index][21],
                        paddingRight: this.state.comments[index][21],
                        paddingLeft: this.state.comments[index][21],
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}
                >
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        paddingLeft:20*factor_hor,
                        paddingRight:20*factor_hor,
                    }}>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
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
                                }}>{this.state.comments[index][0]}
                            </Text>
                        </View>
                    </DoubleClick>
                    </View>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >
                        <View style={{flexDirection:'row',height:60*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, marginRight:7.5*factor_hor, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            
                    </DoubleClick>
                </Animated.View>
            </View>
        case "125":
            return <View style={{height:1,}}>
                <Animated.View 
                    style={{
                        height: 125*factor_ver,
                        borderRadius: 30*factor_hor, 
                        width: width_,
                        backgroundColor: 'white',
                        paddingBottom: this.state.comments[index][21],
                        paddingTop: this.state.comments[index][21],
                        paddingRight: this.state.comments[index][21],
                        paddingLeft: this.state.comments[index][21],
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}
                >
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        paddingLeft:20*factor_hor,
                        paddingRight:20*factor_hor,
                    }}>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
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
                                }}>{this.state.comments[index][0]}
                            </Text>
                        </View>
                    </DoubleClick>
                    </View>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >
                        <View style={{flexDirection:'row',height:60*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, marginRight:7.5*factor_hor, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            
                    </DoubleClick>
                </Animated.View>
            </View>
        case "150":
            return <View style={{height:1,}}>
                <Animated.View 
                    style={{
                        height: 125*factor_ver,
                        borderRadius: 30*factor_hor, 
                        width: width_,
                        backgroundColor: 'white',
                        paddingBottom: this.state.comments[index][21],
                        paddingTop: this.state.comments[index][21],
                        paddingRight: this.state.comments[index][21],
                        paddingLeft: this.state.comments[index][21],
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}
                >
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        paddingLeft:20*factor_hor,
                        paddingRight:20*factor_hor,
                    }}>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
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
                                }}>{this.state.comments[index][0]}
                            </Text>
                        </View>
                    </DoubleClick>
                    </View>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >
                        <View style={{flexDirection:'row',height:60*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, marginRight:7.5*factor_hor, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            
                    </DoubleClick>
                </Animated.View>
            </View>
        case "175":
            return <View style={{height:1,}}>
                <Animated.View 
                    style={{
                        height: 125*factor_ver,
                        borderRadius: 30*factor_hor, 
                        width: width_,
                        backgroundColor: 'white',
                        paddingBottom: this.state.comments[index][21],
                        paddingTop: this.state.comments[index][21],
                        paddingRight: this.state.comments[index][21],
                        paddingLeft: this.state.comments[index][21],
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}
                >
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        paddingLeft:20*factor_hor,
                        paddingRight:20*factor_hor,
                    }}>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
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
                                }}>{this.state.comments[index][0]}
                            </Text>
                        </View>
                    </DoubleClick>
                    </View>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >
                        <View style={{flexDirection:'row',height:60*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, marginRight:7.5*factor_hor, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            
                    </DoubleClick>
                </Animated.View>
            </View>
        case "200":
            return <View style={{height:1,}}>
                <Animated.View 
                    style={{
                        height: 125*factor_ver,
                        borderRadius: 30*factor_hor, 
                        width: width_,
                        backgroundColor: 'white',
                        paddingBottom: this.state.comments[index][21],
                        paddingTop: this.state.comments[index][21],
                        paddingRight: this.state.comments[index][21],
                        paddingLeft: this.state.comments[index][21],
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}
                >
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        paddingLeft:20*factor_hor,
                        paddingRight:20*factor_hor,
                    }}>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
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
                                }}>{this.state.comments[index][0]}
                            </Text>
                        </View>
                    </DoubleClick>
                    </View>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >
                        <View style={{flexDirection:'row',height:60*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, marginRight:7.5*factor_hor, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            
                    </DoubleClick>
                </Animated.View>
            </View>
        case "225":
            return <View style={{height:1,}}>
                <Animated.View 
                    style={{
                        height: 125*factor_ver,
                        borderRadius: 30*factor_hor, 
                        width: width_,
                        backgroundColor: 'white',
                        paddingBottom: this.state.comments[index][21],
                        paddingTop: this.state.comments[index][21],
                        paddingRight: this.state.comments[index][21],
                        paddingLeft: this.state.comments[index][21],
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}
                >
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        paddingLeft:20*factor_hor,
                        paddingRight:20*factor_hor,
                    }}>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
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
                                }}>{this.state.comments[index][0]}
                            </Text>
                        </View>
                    </DoubleClick>
                    </View>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >
                        <View style={{flexDirection:'row',height:60*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, marginRight:7.5*factor_hor, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            
                    </DoubleClick>
                </Animated.View>
            </View>
        case "250":
            return <View style={{height:1,}}>
                <Animated.View 
                    style={{
                        height: 125*factor_ver,
                        borderRadius: 30*factor_hor, 
                        width: width_,
                        backgroundColor: 'white',
                        paddingBottom: this.state.comments[index][21],
                        paddingTop: this.state.comments[index][21],
                        paddingRight: this.state.comments[index][21],
                        paddingLeft: this.state.comments[index][21],
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}
                >
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        paddingLeft:20*factor_hor,
                        paddingRight:20*factor_hor,
                    }}>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
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
                                }}>{this.state.comments[index][0]}
                            </Text>
                        </View>
                    </DoubleClick>
                    </View>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >
                        <View style={{flexDirection:'row',height:60*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, marginRight:7.5*factor_hor, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            
                    </DoubleClick>
                </Animated.View>
            </View>
        case "275":
            return <View style={{height:1,}}>
                <Animated.View 
                    style={{
                        height: 125*factor_ver,
                        borderRadius: 30*factor_hor, 
                        width: width_,
                        backgroundColor: 'white',
                        paddingBottom: this.state.comments[index][21],
                        paddingTop: this.state.comments[index][21],
                        paddingRight: this.state.comments[index][21],
                        paddingLeft: this.state.comments[index][21],
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}
                >
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        paddingLeft:20*factor_hor,
                        paddingRight:20*factor_hor,
                    }}>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
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
                                }}>{this.state.comments[index][0]}
                            </Text>
                        </View>
                    </DoubleClick>
                    </View>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >
                        <View style={{flexDirection:'row',height:60*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, marginRight:7.5*factor_hor, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            
                    </DoubleClick>
                </Animated.View>
            </View>
        case "300":
            return <View style={{height:1,}}>
                <Animated.View 
                    style={{
                        height: 125*factor_ver,
                        borderRadius: 30*factor_hor, 
                        width: width_,
                        backgroundColor: 'white',
                        paddingBottom: this.state.comments[index][21],
                        paddingTop: this.state.comments[index][21],
                        paddingRight: this.state.comments[index][21],
                        paddingLeft: this.state.comments[index][21],
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}
                >
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        paddingLeft:20*factor_hor,
                        paddingRight:20*factor_hor,
                    }}>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
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
                                }}>{this.state.comments[index][0]}
                            </Text>
                        </View>
                    </DoubleClick>
                    </View>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >
                        <View style={{flexDirection:'row',height:60*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, marginRight:7.5*factor_hor, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            
                    </DoubleClick>
                </Animated.View>
            </View>
        case "325":
            return <View style={{height:1,}}>
                <Animated.View 
                    style={{
                        height: 125*factor_ver,
                        borderRadius: 30*factor_hor, 
                        width: width_,
                        backgroundColor: 'white',
                        paddingBottom: this.state.comments[index][21],
                        paddingTop: this.state.comments[index][21],
                        paddingRight: this.state.comments[index][21],
                        paddingLeft: this.state.comments[index][21],
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}
                >
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        paddingLeft:20*factor_hor,
                        paddingRight:20*factor_hor,
                    }}>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
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
                                }}>{this.state.comments[index][0]}
                            </Text>
                        </View>
                    </DoubleClick>
                    </View>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >
                        <View style={{flexDirection:'row',height:60*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, marginRight:7.5*factor_hor, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            
                    </DoubleClick>
                </Animated.View>
            </View>
        case "350":
            return <View style={{height:1,}}>
                <Animated.View 
                    style={{
                        height: 125*factor_ver,
                        borderRadius: 30*factor_hor, 
                        width: width_,
                        backgroundColor: 'white',
                        paddingBottom: this.state.comments[index][21],
                        paddingTop: this.state.comments[index][21],
                        paddingRight: this.state.comments[index][21],
                        paddingLeft: this.state.comments[index][21],
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}
                >
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        paddingLeft:20*factor_hor,
                        paddingRight:20*factor_hor,
                    }}>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
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
                                }}>{this.state.comments[index][0]}
                            </Text>
                        </View>
                    </DoubleClick>
                    </View>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >
                        <View style={{flexDirection:'row',height:60*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, marginRight:7.5*factor_hor, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            
                    </DoubleClick>
                </Animated.View>
            </View>
        case "375":
            return <View style={{height:1,}}>
                <Animated.View 
                    style={{
                        height: 125*factor_ver,
                        borderRadius: 30*factor_hor, 
                        width: width_,
                        backgroundColor: 'white',
                        paddingBottom: this.state.comments[index][21],
                        paddingTop: this.state.comments[index][21],
                        paddingRight: this.state.comments[index][21],
                        paddingLeft: this.state.comments[index][21],
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}
                >
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        paddingLeft:20*factor_hor,
                        paddingRight:20*factor_hor,
                    }}>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
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
                                }}>{this.state.comments[index][0]}
                            </Text>
                        </View>
                    </DoubleClick>
                    </View>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >
                        <View style={{flexDirection:'row',height:60*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, marginRight:7.5*factor_hor, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            
                    </DoubleClick>
                </Animated.View>
            </View>
        case "400":
            return <View style={{height:1,}}>
                <Animated.View 
                    style={{
                        height: 125*factor_ver,
                        borderRadius: 30*factor_hor, 
                        width: width_,
                        backgroundColor: 'white',
                        paddingBottom: this.state.comments[index][21],
                        paddingTop: this.state.comments[index][21],
                        paddingRight: this.state.comments[index][21],
                        paddingLeft: this.state.comments[index][21],
                        borderColor: this.state.comments[index][19].interpolate({
                            inputRange: [0, 1, 2, 3],
                            outputRange: ['#c2c2c2', 'rgba(113, 233, 42, 1)', '#c2c2c2', 'rgba(255, 0, 0, 1)', ]
                        }),
                        borderWidth: this.state.comments[index][20],
                        overflow: 'hidden',
                    }}
                >
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        paddingLeft:20*factor_hor,
                        paddingRight:20*factor_hor,
                    }}>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
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
                                }}>{this.state.comments[index][0]}
                            </Text>
                        </View>
                    </DoubleClick>
                    </View>
                    <DoubleClick
                        singleTap={() => {
                            this.setState({key_status:index},
                            function() {console.log(this.state.key_status)}),
                            this.setState({visible_options:true,}), 
                            this.check_send()
                        }}
                        doubleTap={() => {this.likePost(index);}}
                        delay={350}
                    >
                        <View style={{flexDirection:'row',height:60*factor_ver,flexDirection:'row',justifyContent:'center', alignContent:'center',}}>
                                <View style={{flex:1.666, 
                                    justifyContent:'center',
                                    alignContent:'center', 
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        width:20, 
                                        marginLeft:5*factor_hor, 
                                    }}>
                                        <View style={{
                                            height:22, 
                                            width:22, 
                                            justifyContent:'center', 
                                            alignContent:'center',
                                            alignItems:'center', 
                                            backgroundColor:(this.state.comments[index][15]), 
                                            borderRadius:30
                                        }}>
                                            <Text 
                                            minimumFontScale={0.3}
                                            adjustsFontSizeToFit={true}
                                            style={{color:'white', textAlign:'center', fontSize:15,}}>{this.state.comments[index][17]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                                        <Text style={{textAlign:'center', fontSize:factor_hor*18, fontFamily:'Avenir Next', fontWeight:'bold', color:this.check_color_votes(index)}}>{this.state.comments[index][7] - this.state.comments[index][8]}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1.666,}}>
                                    <View style={{flex:1, marginRight:7.5*factor_hor, justifyContent:'center', alignContent:'center', }}>
                                        <Text style={{textAlign:'center',fontSize:factor_hor*16, color:'#9B9B9B'}}>{this.show_date(index)}</Text>
                                    </View>
                                </View>
                            </View>
                            
                    </DoubleClick>
                </Animated.View>
            </View>
        }
    }
    async componentDidMount() {
        received_comments = [0,1]
        parent_post = await this.props.navigation.getParam("art")
        outPosts = false
        await this.setState({
            post:parent_post,
            username:await AsyncStorage.getItem('user'),
            comments: [ ...this.state.comments, ... [[
                        parent_post[7],        
                        parent_post[8],
                        parent_post[20],                
                        parent_post[8],
                        parent_post[1],
                      //  parent_post[20],
                        parent_post[0],
                        parent_post[11],
                        parent_post[12],
                        parent_post[13],
                        parent_post[14],
                        parent_post[15],
                        parent_post[18],
                        parent_post[5],
                        parent_post[16],
                        "#EF532A",
                        "#EF532A",
                        parent_post[19],
                        1,
                        parent_post[21],
                        new Animated.Value(0), 
                        new Animated.Value(0.5),
                        new Animated.Value(1.5),
                    ]] ] 
        })

        console.log(parent_post, 'PARENT POST')
        
        await fetch(`http://${serverLocation}:80/show_comment?`, {
            method:'POST',
            headers:{    
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
            body: 
            JSON.stringify({
                postID: parent_post[8],
                sort: this.state.sort,
                username: this.state.username,
                received_comments: '['+(received_comments).toString()+']',
            })})
            .then((response) => response.json())
            .then((responseJson) => {
                for(key in responseJson) {
                    if(responseJson[key][11] !== 'picture') {
                        if(responseJson[key][0].length == 0) {
                            responseJson[key].push('0')
                        }
                        else if(responseJson[key][0].length < 25) {
                            responseJson[key].push('25')
                        }
                        else if(responseJson[key][0].length < 50) {
                            responseJson[key].push('50')
                        }
                        else if(responseJson[key][0].length < 75) {
                            responseJson[key].push('75')
                        }
                        else if(responseJson[key][0].length < 100) {
                            responseJson[key].push('100')
                        }
                        else if(responseJson[key][0].length < 125) {
                            responseJson[key].push('125')
                        }
                        else if(responseJson[key][0].length < 150) {
                            responseJson[key].push('150')
                        }
                        else if(responseJson[key][0].length < 175) {
                            responseJson[key].push('175')
                        }
                        else if(responseJson[key][0].length < 200) {
                            responseJson[key].push('200')
                        }
                        else if(responseJson[key][0].length < 225) {
                            responseJson[key].push('225')
                        }
                        else if(responseJson[key][0].length < 250) {
                            responseJson[key].push('250')
                        }
                        else if(responseJson[key][0].length < 275) {
                            responseJson[key].push('275')
                        }
                        else if(responseJson[key][0].length < 300) {
                            responseJson[key].push('300')
                        }
                        else if(responseJson[key][0].length < 325) {
                            responseJson[key].push('325')
                        }
                        else if(responseJson[key][0].length < 350) {
                            responseJson[key].push('350')
                        }
                        else if(responseJson[key][0].length < 375) {
                            responseJson[key].push('375')
                        }
                        else {
                            responseJson[key].push('400')
                        }
                    }
                    else {
                        if(responseJson[key][0].length == 0) {
                            responseJson[key].push('p0')
                        }
                        else if(responseJson[key][0].length < 25) {
                            responseJson[key].push('p25')
                        }
                        else if(responseJson[key][0].length < 50) {
                            responseJson[key].push('p50')
                        }
                        else if(responseJson[key][0].length < 75) {
                            responseJson[key].push('p75')
                        }
                        else if(responseJson[key][0].length < 100) {
                            responseJson[key].push('p100')
                        }
                        else if(responseJson[key][0].length < 125) {
                            responseJson[key].push('p125')
                        }
                        else if(responseJson[key][0].length < 150) {
                            responseJson[key].push('p150')
                        }
                        else if(responseJson[key][0].length < 175) {
                            responseJson[key].push('p175')
                        }
                        else if(responseJson[key][0].length < 200) {
                            responseJson[key].push('p200')
                        }
                        else if(responseJson[key][0].length < 225) {
                            responseJson[key].push('p225')
                        }
                        else if(responseJson[key][0].length < 250) {
                            responseJson[key].push('p250')
                        }
                        else if(responseJson[key][0].length < 275) {
                            responseJson[key].push('p275')
                        }
                        else if(responseJson[key][0].length < 300) {
                            responseJson[key].push('p300')
                        }
                        else if(responseJson[key][0].length < 325) {
                            responseJson[key].push('p325')
                        }
                        else if(responseJson[key][0].length < 350) {
                            responseJson[key].push('p350')
                        }
                        else if(responseJson[key][0].length < 375) {
                            responseJson[key].push('p375')
                        }
                        else {
                            responseJson[key].push('p400')
                        }
                    }
                    if(responseJson[key][5] == 'upvote') {
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
                this.setState({
                    comments: [ ...this.state.comments, ...responseJson, ] 
                })
                for(key in responseJson){
                    received_comments.push(responseJson[key][1])
                }
                if(responseJson.length == 0) {
                    outPosts = true
                }
            }) 
            .catch((error) => {
                Alert.alert("Please check your connection and try again")
                console.log(error)
            });

        await this.setState({
            dataProvider: new DataProvider((r1, r2) => {return r1 !== r2}).cloneWithRows(this.state.comments),
        })
        setTimeout(() => {this.setState({outPosts:outPosts})}, 0)
        if(this.state.first_loaded == false && this.state.comments.length > 0) {
            this.setState({first_loaded:true})
        }
        console.log(this.state.comments, 'hello')
    }
    async fetchComments() {
        await fetch(`http://${serverLocation}:80/show_comment?`, {
            method:'POST',
            headers:{    
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
            body: 
            JSON.stringify({
                postID: this.state.post[8],
                sort: this.state.sort,
                username: this.state.username,
                received_comments: '['+(received_comments).toString()+']',
            })})
            .then((response) => response.json())
            .then((responseJson) => {
                for(key in responseJson) {
                    if(responseJson[key][11] !== 'picture') {
                        if(responseJson[key][0].length == 0) {
                            responseJson[key].push('0')
                        }
                        else if(responseJson[key][0].length < 25) {
                            responseJson[key].push('25')
                        }
                        else if(responseJson[key][0].length < 50) {
                            responseJson[key].push('50')
                        }
                        else if(responseJson[key][0].length < 75) {
                            responseJson[key].push('75')
                        }
                        else if(responseJson[key][0].length < 100) {
                            responseJson[key].push('100')
                        }
                        else if(responseJson[key][0].length < 125) {
                            responseJson[key].push('125')
                        }
                        else if(responseJson[key][0].length < 150) {
                            responseJson[key].push('150')
                        }
                        else if(responseJson[key][0].length < 175) {
                            responseJson[key].push('175')
                        }
                        else if(responseJson[key][0].length < 200) {
                            responseJson[key].push('200')
                        }
                        else if(responseJson[key][0].length < 225) {
                            responseJson[key].push('225')
                        }
                        else if(responseJson[key][0].length < 250) {
                            responseJson[key].push('250')
                        }
                        else if(responseJson[key][0].length < 275) {
                            responseJson[key].push('275')
                        }
                        else if(responseJson[key][0].length < 300) {
                            responseJson[key].push('300')
                        }
                        else if(responseJson[key][0].length < 325) {
                            responseJson[key].push('325')
                        }
                        else if(responseJson[key][0].length < 350) {
                            responseJson[key].push('350')
                        }
                        else if(responseJson[key][0].length < 375) {
                            responseJson[key].push('375')
                        }
                        else {
                            responseJson[key].push('400')
                        }
                    }
                    else {
                        if(responseJson[key][0].length == 0) {
                            responseJson[key].push('p0')
                        }
                        else if(responseJson[key][0].length < 25) {
                            responseJson[key].push('p25')
                        }
                        else if(responseJson[key][0].length < 50) {
                            responseJson[key].push('p50')
                        }
                        else if(responseJson[key][0].length < 75) {
                            responseJson[key].push('p75')
                        }
                        else if(responseJson[key][0].length < 100) {
                            responseJson[key].push('p100')
                        }
                        else if(responseJson[key][0].length < 125) {
                            responseJson[key].push('p125')
                        }
                        else if(responseJson[key][0].length < 150) {
                            responseJson[key].push('p150')
                        }
                        else if(responseJson[key][0].length < 175) {
                            responseJson[key].push('p175')
                        }
                        else if(responseJson[key][0].length < 200) {
                            responseJson[key].push('p200')
                        }
                        else if(responseJson[key][0].length < 225) {
                            responseJson[key].push('p225')
                        }
                        else if(responseJson[key][0].length < 250) {
                            responseJson[key].push('p250')
                        }
                        else if(responseJson[key][0].length < 275) {
                            responseJson[key].push('p275')
                        }
                        else if(responseJson[key][0].length < 300) {
                            responseJson[key].push('p300')
                        }
                        else if(responseJson[key][0].length < 325) {
                            responseJson[key].push('p325')
                        }
                        else if(responseJson[key][0].length < 350) {
                            responseJson[key].push('p350')
                        }
                        else if(responseJson[key][0].length < 375) {
                            responseJson[key].push('p375')
                        }
                        else {
                            responseJson[key].push('p400')
                        }
                    }
                    if(responseJson[key][5] == 'upvote') {
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
                this.setState({
                    comments:[ ...this.state.comments, ...responseJson ],
                    dataProvider:this.state.dataProvider.cloneWithRows(this.state.comments),
                })
                for(key in responseJson) {
                    received_comments.push(responseJson[key][1])
                }
                if(responseJson.length == 0) {
                    this.setState({outPosts:true})
                }
            }) 
            .catch((error) => {
                Alert.alert("Please check your connection and try again")
                console.log(error)
            });
        if(this.state.first_loaded == false && this.state.comments.length > 0) {
            this.setState({first_loaded:true},function(){console.log(this.state.comments)})
        }
    }    
    
    async refresh_feed() {
        await this.setState({first_loaded:false});
        received_comments = [1,2]
        await this.setState({
            comments:[ this.state.comments[0] ],
            outPosts:false, 
            visible_sorting:false
        })
        await this.fetchComments();
    }        
    async new_click() {
        await this.setState({first_loaded:false});
        received_comments = [0,1] 
        await this.setState({
            comments:[ this.state.comments[0] ],
            sort:'new',
            outPosts:false, 
            visible_sorting:false
        })
        await this.fetchComments();
    }
    async hot_click() {
        await this.setState({first_loaded:false});
        received_comments = [0,1] 
        await this.setState({
            comments:[ this.state.comments[0] ],
            sort:'hot',
            outPosts:false, 
            visible_sorting:false
        })
        await this.fetchComments();
    } 
    check_color_votes(index) {
        if(this.state.first_loaded == true) {
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
    }      
    gotoprofile_comments(key) {
        if(this.state.comments[key][5] !== 'Anonymous') {
            this.props.navigation.navigate('EXTERNAL_VIEW_PROFILE', {profileID:this.state.comments[key][5]}
            )
        }
    } 
    async send_message(key) {
        key = this.state.key_status
        if(this.state.can_send == 'success') {
            this.props.navigation.navigate('NEW_MESSAGE', { data: {name1:this.state.comments[key][5], name2:this.state.comments[key][12], postID:this.state.comments[key][1], from_type:'comment' }})
            this.setState({visible_options:false})
        }
        else {            
            this.setState({visible_options:false})
            return Alert.alert( this.state.comments[key][5]+ this.state.can_send,'',{cancelable: false} );
        }
    }
    async check_send() {
            from_type = 'comment'
            is_anon = false
            poster = this.state.comments[this.state.key_status][5]
            
            if(this.state.key_status == 0) { 
                from_type = 'post'
            }
            if(this.state.comments[this.state.key_status][5] == 'Anonymous') {
                is_anon = true
                poster = this.state.comments[this.state.key_status][12]
            }
            url = `http://${serverLocation}:80/if_open?username=${this.state.username}&poster=${poster}&anon=${is_anon}&postID=${this.state.comments[this.state.key_status][1]}&from_type=${from_type}`
            console.log(url)
            await fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({can_send:responseJson})
            })
            .done() 
    }   
    onSwipeUpComments(gestureState) {
        this.setState({visible_image:false},function(){console.log(this.state.visible_image)});
    }                                                                                                         
    onSwipeDownComments(gestureState) {
        this.setState({visible_image:false},function(){console.log(this.state.visible_image)});
    } 
    onSwipeLeftComments(gestureState) {
        this.setState({visible_image:false},function(){console.log(this.state.visible_image)});
    } 
    onSwipeRightComments(gestureState) {
        this.setState({visible_image:false},function(){console.log(this.state.visible_image)});
    }  
    onSwipeComments(gestureName, gestureState) {
        
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        this.setState({gestureName: gestureName});
        switch (gestureName) {

        case SWIPE_UP:
            this.setState({visible_image:false},function(){console.log(this.state.visible_image)});
            break;
          
        case SWIPE_DOWN:    
        this.setState({visible_image:false},function(){console.log(this.state.visible_image)});
            break;
        
        case SWIPE_LEFT:
            this.setState({visible_image:false},function(){console.log(this.state.visible_image)});
            break;
          
        case SWIPE_RIGHT:
            this.setState({visible_image:false},function(){console.log(this.state.visible_image)});
            break;
        }
    }       
    likePost(key) {
        if(key == 0) {
            // if null make liked
            if( this.state.comments[key][6] == null ) {
                Animated.timing(this.state.comments[key][19], {toValue:1, duration:400}).start()
                Animated.timing(this.state.comments[key][20], {toValue:1.5, duration:400}).start()
                Animated.timing(this.state.comments[key][21], {toValue:0.5, duration:400}).start()
                setTimeout(() => {Animated.timing(this.state.comments[key][20], {toValue:0.5, duration:250}).start()}, 400)
                setTimeout(() => {Animated.timing(this.state.comments[key][21], {toValue:1.5, duration:250}).start()}, 400)
                setTimeout(() => {Animated.timing(this.state.comments[key][19], {toValue:2, duration:250}).start()}, 400)
                this.state.post[11] = 'upvote'
                this.state.post[12] = this.state.post[12] + 1 
                this.state.comments[key][6] = 'upvote'
                this.state.comments[key][7] = this.state.comments[key][7] + 1 // upvotes
                url = `http://${serverLocation}:80/vote_post?route=3&username=${this.state.username}&postID=${this.state.comments[key][1]}`
                fetch(url);
            }
            // if liked make dislike
            else if( this.state.comments[key][6] == 'upvote' ) { 
                Animated.timing(this.state.comments[key][19], {toValue:3, duration:400}).start()
                Animated.timing(this.state.comments[key][20], {toValue:1.5, duration:400}).start()
                Animated.timing(this.state.comments[key][21], {toValue:0.5, duration:400}).start()
                setTimeout(() => {Animated.timing(this.state.comments[key][20], {toValue:0.5, duration:250}).start()}, 400)
                setTimeout(() => {Animated.timing(this.state.comments[key][21], {toValue:1.5, duration:250}).start()}, 400)
                setTimeout(() => {Animated.timing(this.state.comments[key][19], {toValue:2, duration:250}).start()}, 400)
                this.state.comments[key][6] = 'downvote' 
                this.state.comments[key][7] = this.state.comments[key][7] - 1 // upvotes
                this.state.comments[key][8] = this.state.comments[key][8] + 1 // downvotes
                this.state.post[11] = 'downvote'
                this.state.post[12] = this.state.post[12] - 1 
                this.state.post[13] = this.state.post[13] + 1 
                url = `http://${serverLocation}:80/vote_post?route=4&username=${this.state.username}&postID=${this.state.comments[key][1]}`
                fetch(url);
            }
            // if disliked make null
            else if( this.state.comments[key][6] == 'downvote' ) {
                Animated.timing(this.state.comments[key][19], {toValue:0, duration:0}).start()
                this.state.comments[key][6] = null
                this.state.comments[key][8] = this.state.comments[key][8] - 1 // downvotes
                this.state.post[11] = null
                this.state.post[13] = this.state.post[13] - 1 
                url = `http://${serverLocation}:80/vote_post?route=5&username=${this.state.username}&postID=${this.state.comments[key][1]}`
                fetch(url);
            }
            this.setState({
                dataProvider:this.state.dataProvider.cloneWithRows(this.state.comments),
            })
        }
        else {
            // if null make liked
            if( this.state.comments[key][6] == null ) {
                Animated.timing(this.state.comments[key][19], {toValue:1, duration:400}).start()
                Animated.timing(this.state.comments[key][20], {toValue:1.5, duration:400}).start()
                Animated.timing(this.state.comments[key][21], {toValue:0.5, duration:400}).start()
                setTimeout(() => {Animated.timing(this.state.comments[key][20], {toValue:0.5, duration:250}).start()}, 400)
                setTimeout(() => {Animated.timing(this.state.comments[key][21], {toValue:1.5, duration:250}).start()}, 400)
                setTimeout(() => {Animated.timing(this.state.comments[key][19], {toValue:2, duration:250}).start()}, 400)
                this.state.comments[key][6] = 'upvote'
                this.state.comments[key][7] = this.state.comments[key][7] + 1
                url = `http://${serverLocation}:80/vote_comment?route=3&username=${this.state.username}&commentID=${this.state.comments[key][1]}`
                fetch(url);
            }
            // if liked make dislike
            else if( this.state.comments[key][6] == 'upvote' ) { 
                Animated.timing(this.state.comments[key][19], {toValue:3, duration:400}).start()
                Animated.timing(this.state.comments[key][20], {toValue:1.5, duration:400}).start()
                Animated.timing(this.state.comments[key][21], {toValue:0.5, duration:400}).start()
                setTimeout(() => {Animated.timing(this.state.comments[key][20], {toValue:0.5, duration:250}).start()}, 400)
                setTimeout(() => {Animated.timing(this.state.comments[key][21], {toValue:1.5, duration:250}).start()}, 400)
                setTimeout(() => {Animated.timing(this.state.comments[key][19], {toValue:2, duration:250}).start()}, 400)
                this.state.comments[key][6] = 'downvote' 
                this.state.comments[key][7] = this.state.comments[key][7] - 1 // upvotes
                this.state.comments[key][8] = this.state.comments[key][8] + 1 // downvotes
                url = `http://${serverLocation}:80/vote_comment?route=4&username${this.state.username}&commentID=${this.state.comments[key][1]}`
                fetch(url);
            }
            // if disliked make null
            else if( this.state.comments[key][6] == 'downvote' ) {
                Animated.timing(this.state.comments[key][19], {toValue:0, duration:0}).start()
                this.state.comments[key][6] = null
                this.state.comments[key][8] = this.state.comments[key][8] - 1 // downvotes
                url = `http://${serverLocation}:80/vote_comment?route=5&username=${this.state.username}&commentID=${this.state.comments[key][1]}`
                fetch(url);
            }
            this.setState({
                dataProvider:this.state.dataProvider.cloneWithRows(this.state.comments),
            })
        }
    }  
    async share_post() {
        key = this.state.key_status
        if (this.state.comments[key][2] == 'picture') {
            const result = await Share.share({
            title:'Pollen',
            message:this.state.comments[key][0],
            url: `http://${serverLocation}/${this.state.comments[key][11]}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared ios
                    this.setState({visible_options:false})
                } 
                else {
                    // shared android
                    this.setState({visible_options:false})
                }
            } 
            else if (result.action === Share.dismissedAction) {
                this.setState({visible_options:false})
            }
        }
        else {
            const result = await Share.share({
            message:this.state.comments[key][0],
            title:'pollen',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared ios
                    this.setState({visible_options:false})
                } 
                else {
                    // shared android
                    this.setState({visible_options:false})
                }
            } 
            else if (result.action === Share.dismissedAction) {
                // dismissed
                this.setState({visible_options:false})
            }                
        }            
    }      
    saved_comment_comment(key) {
        key = this.state.key_status
        if(this.state.first_loaded == true) {
            if(this.state.comments[key][9] == 1) {
                return 'Saved'
            }
            else if(this.state.comments[key][9] == 0){
                return 'Save'
            }
        }
    }
    async saved_comment(key) {
        key = this.state.key_status
        if(key !== 0) {
            if(this.state.first_loaded == true) {
                if(this.state.comments[key][9] == 0) {
                    fetch(`http://${serverLocation}:80/save_comment?route=1&userID=${this.state.username}&commentID=${this.state.comments[key][1]}`)
                    this.state.comments[key][9] = 1
                }
                else if(this.state.comments[key][9] == 1) {    
                    fetch(`http://${serverLocation}:80/save_comment?route=2&userID=${this.state.username}&commentID=${this.state.comments[key][1]}`)
                    this.state.comments[key][9] = 0
                }
                await this.setState({visible_options:false})
            }
        }
        else {
            if(this.state.comments[0][9] == 0) {
                fetch(`http://${serverLocation}:80/save_post?route=1&userID=${this.state.username}&postID=${this.state.post[8]}`)
                this.state.comments[0][9] = 1
                this.state.post[14] = 1
            }
            else if(this.state.comments[0][9] == 1) {
                fetch(`http://${serverLocation}:80/save_post?route=2&userID=${this.state.username}&postID=${this.state.post[8]}`)
                this.state.post[14] = 0
                this.state.comments[0][9] = 0
            }
            this.setState({visible_options:false})
        }
    }
    block_comment_comment(key) {
        key = this.state.key_status
        if(this.state.first_loaded == true) {
            if( this.state.comments[key][5] == this.state.username ||
                this.state.comments[key][12] == this.state.username ){
                return "Can't block"
            }
            else if(this.state.comments[key][16] == 'Block') {
                return 'Block'
            }
            else if(this.state.comments[key][16] == 'Unblock'){
                return 'Unblock'
            }
        }
    }
    async block_comment(key) {
        key = this.state.key_status
        if(key !== 0) {
            if(this.state.first_loaded == true) {
                if( (this.state.comments[key][16] == 'Block') && ( this.state.comments[key][5] !== this.state.username ) ) {
                    url = `http://${serverLocation}:80/block_poster?route=1&userID=${this.state.username}&blockedID=${this.state.comments[key][5]}&postID=${this.state.comments[key][1]}&post_or_comment=comment`
                    console.log(url)
                    fetch(url)
                    this.state.comments[key][16] = 'Unblock'
                }
                else if( (this.state.comments[key][16] == 'Unblock') && ( this.state.comments[key][5] !== this.state.username ) ) {
                    url = `http://${serverLocation}:80/block_poster?route=2&userID=${this.state.username}&blockedID=${this.state.comments[key][5]}&postID=${this.state.comments[key][1]}&post_or_comment=comment`
                    console.log(url)
                    fetch(url)
                    this.state.comments[key][16] = 'Block'
                }
                await this.setState({visible_options:false})
            }
        }
        else {
            if( this.state.comments[0][16] == 'Block' && this.state.post[0] !== this.state.username && this.state.post[5] !== this.state.username) {
                url = `http://${serverLocation}:80/block_poster?route=1&userID=${this.state.username}&blockedID=${this.state.post[1]}&postID=${this.state.post[8]}&post_or_comment=post`
                fetch(url)
                this.state.post[19] = 'Unblock'
                this.state.comments[0][16] = 'Unblock'
            }
            else if(this.state.comments[0][16] == 'Unblock' && this.state.post[0] !== this.state.username && this.state.post[5] !== this.state.username) {
                    url = `http://${serverLocation}:80/block_poster?route=2&userID=${this.state.username}&blockedID=${this.state.post[0]}&postID=${this.state.post[8]}&post_or_comment=post`
                    fetch(url)
                    this.state.post[19] = 'Block'
                    this.state.comments[0][16] = 'Block'
            }   
            else if( this.state.post[0] == this.state.username || this.state.post[5] == this.state.username ) {
                this.state.post[19] = 'Cant Block'
                this.state.comments[0][16] = 'Cant Block'
            }
            this.setState({visible_options:false})
        }
    }
    flag_comment_comment(key) {
        key = this.state.key_status
        if(this.state.first_loaded == true) {
            if(this.state.comments[key][10] == 1) {
                return 'Flagged'
            }
            else if(this.state.comments[key][10] == 0){
                return 'Flag'
            }
        }
    }
    async flag_comment(key) {
        key = this.state.key_status
        if(key !== 0) {
            if(this.state.first_loaded == true) {
                if(this.state.comments[key][10] == 0) {
                    url = `http://${serverLocation}:80/flag_comment?route=1&userID=${this.state.username}&commentID=${this.state.comments[key][1]}&commenterID=${this.state.comments[key][5]}`
                    console.log(url)
                    fetch(url)
                    this.state.comments[key][10] = 1
                }
                else if(this.state.comments[key][10] == 1) {
                    url = `http://${serverLocation}:80/flag_comment?route=2&userID=${this.state.username}&commentID=${this.state.comments[key][1]}&commenterID=${this.state.comments[key][5]}`
                    console.log(url)
                    fetch(url)
                    this.state.comments[key][10] = 0
                }
                await this.setState({visible_options:false})
            }    
        }
        else {
            if(this.state.comments[0][10] == 0) {
                fetch(`http://${serverLocation}:80/flag_post?route=1&userID=${this.state.username}&postID=${this.state.post[8]}&posterID=${this.state.post[0]}`)
                this.state.post[15] = 1
                this.state.comments[0][10] = 1
            }
            else if(this.state.comments[0][10] == 1) {
                fetch(`http://${serverLocation}:80/flag_post?route=2&userID=${this.state.username}&postID=${this.state.post[8]}&posterID=${this.state.post[0]}`)
                this.state.post[15] = 0
                this.state.comments[0][10] = 0
            }   
            this.setState({visible_options:false})
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
        this.refresh_feed()
    }   
    show_date(index) {
        date1 = this.state.comments[index][13] 
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
    show_views(index) {
        views = this.state.comments[index][3]
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
    renderFooter = () => {
        if(this.state.outPosts == false) {
            return <ActivityIndicator 
                        style={{
                            marginTop:12.5*factor_ver,
                            marginBottom:12.5*factor_ver,
                        }} 
                        size={"small"}
                        color={'#9b9b9b'}
                    />
        }
        else {
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
                        <Block
                            width={60*factor_hor}
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
    isMine() {
        if(this.state.first_loaded == true) {
            key = this.state.key_status
            if(this.state.comments[key][12] == this.state.username || this.state.comments[key][5] == this.state.username) {
                return true
            }
            else {
                return false
            }
        }    
    }
    deleteCommment() {
        if(this.state.first_loaded == true) {
            key = this.state.key_status
            if(key > 0) {
                if(this.state.comments[key][5] == this.state.username || this.state.comments[key][12] == this.state.username) {
                    url = `http://${serverLocation}:80/delete_comment?commentID=${this.state.comments[key][1]}`
                    console.log(url)
                    fetch(url)
                    this.setState({visible_image:false,visible_options:false, visible_sorting:false,});
                    this.refresh_feed()
                }
                else {
                    this.setState({visible_image:false,visible_options:false, visible_sorting:false,})
                }
            }
            else {
                if(this.state.comments[key][5] == this.state.username || this.state.comments[key][12] == this.state.username) {
                    url = `http://${serverLocation}:80/delete_post?postID=${this.state.comments[key][1]}`
                    console.log(url)
                    fetch(url)
                    parent_post = []
                    this.setState({visible_image:false,visible_options:false, visible_sorting:false,});
                    this.props.navigation.state.params.returned(this.state.post, 'Yes'); 
                    this.props.navigation.goBack();
                }
                else {
                    this.setState({visible_image:false,visible_options:false, visible_sorting:false,})
                }
            }
            
        }    
    }

    render() {
    return (
    <View style={styles.container} onStartShouldSetResponderCapture={() => {this.setState({ enableScrollViewScroll: true });}}>
        <Modal
            animationType="none"
            transparent={true}
            visible={this.state.visible_options}
        >                                        
            <View style={{height:Dimensions.get('window').height, width:Dimensions.get('window').width, justifyContent:'flex-end', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.8)', opacity:1,}}>
                <View style={{ alignSelf:'stretch', }}>
                    <View style={{height:65*factor_hor*5.75, marginBottom:20*factor_hor, flexDirection:'row' }}>
                        <View style={{flex:1, alignSelf:'stretch'}}></View>
                            <View style={{width:65*factor_hor, alignContent:'center', justifyContent:'center', alignItems:'center', alignSelf:'stretch'}}>
                                <View style={{flex:1, }}></View>
                                <View style={{height:65*factor_hor, width:65*factor_hor, borderRadius:40*factor_hor, marginBottom:20*factor_hor, }}>
                                    <TouchableHighlight underlayColor={'transparent'} onPress={ () => {this.share_post()}}>
                                        <View style={{height:65*factor_hor, width:65*factor_hor, borderRadius:40*factor_hor, backgroundColor:'white'}}>
                                            <Share_
                                                width={47.5*factor_hor}
                                                height={47.5*factor_hor}
                                                style={{
                                                    marginStart:6*factor_hor,
                                                    justifyContent:'center',
                                                    alignContent:'center',
                                                    marginTop:10*factor_hor,
                                                }}
                                                />                             
                                        </View>
                                    </TouchableHighlight>                                                              
                                </View>
                                <View style={{height:65*factor_hor, width:65*factor_hor, borderRadius:40*factor_hor, marginBottom:20*factor_hor, }}>
                                    <TouchableHighlight underlayColor={'transparent'} onPress={ () => { this.send_message()  }}>
                                        <View style={{height:65*factor_hor, width:65*factor_hor, borderRadius:40*factor_hor,backgroundColor:'white' }}>
                                            <SendMessage
                                                width={45*factor_hor}
                                                height={45*factor_hor}
                                                style={{
                                                    marginStart:10*factor_hor,
                                                    justifyContent:'center',
                                                    alignContent:'center',
                                                    marginTop:11*factor_hor,
                                                }}
                                                />
                                        </View>
                                    </TouchableHighlight>                                                            
                                </View>                                                
                                <View style={{height:65*factor_hor, width:65*factor_hor, borderRadius:40*factor_hor, marginBottom:20*factor_hor, }}>
                                    <TouchableHighlight underlayColor={'transparent'} onPress={ () => { this.block_comment(); }}>
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
                                <View style={{height:65*factor_hor, width:65*factor_hor, borderRadius:40*factor_hor, marginBottom:20*factor_hor, }}>
                                    <TouchableHighlight underlayColor={'transparent'} onPress={ () => {this.flag_comment(); }}>
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
                                <View style={{height:65*factor_hor, width:65*factor_hor, borderRadius:40*factor_hor, marginBottom:20*factor_hor, }}>
                                    <TouchableHighlight underlayColor={'transparent'} onPress={ () => { this.saved_comment(); }}>
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
                                <View style={{height:65*factor_hor, width:'100%', marginBottom:20*factor_hor, justifyContent:'center', alignContent:'center',}}>
                                    <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>Share</Text>
                                </View>
                                <View style={{height:65*factor_hor, width:'100%', marginBottom:20*factor_hor, justifyContent:'center', alignContent:'center',}}>
                                    <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>Message</Text>
                                </View>                                                
                                <View style={{height:65*factor_hor, width:'100%', marginBottom:20*factor_hor, justifyContent:'center', alignContent:'center'}}>
                                    <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>{this.block_comment_comment(this.state.key_status)}</Text>
                                </View>
                                <View style={{height:65*factor_hor, width:'100%', marginBottom:20*factor_hor, justifyContent:'center', alignContent:'center'}}>
                                    <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>{this.flag_comment_comment(this.state.key_status)}</Text>
                                </View>
                                <View style={{height:65*factor_hor, width:'100%', marginBottom:20*factor_hor, justifyContent:'center', alignContent:'center'}}>
                                    <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>{this.saved_comment_comment(this.state.key_status)}</Text>
                                </View>
                                <View style={{flex:1, }}></View>
                            </View>                                                                                    
                            
                        </View>
                    </View>
                </View>
                { this.isMine() && (
                    <View style={{height:30*factor_ver, marginBottom:5*factor_ver,}}>
                        <TouchableHighlight underlayColor={'transparent'} onPress={ () => {
                                Alert.alert(
                                'Are you sure you want to delete your comment?',
                                '',
                                [
                                    {text: 'Cancel',onPress: () => console.log('Cancel Pressed'),style:'cancel'},
                                    {text: 'Yes', onPress: () => { this.deleteCommment() }},
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
                <View style={{height:50*factor_ver, marginTop:10*factor_ver, marginBottom:40*factor_ver,}}>
                    <TouchableHighlight underlayColor={'transparent'} onPress={ () => {this.setState({visible_options:false}, function () {console.log(this.state.visible_options)})}}>
                        <View style={{
                            height:40*factor_ver, 
                            width:300*factor_hor, 
                            borderRadius:10*factor_hor, 
                            backgroundColor:'white',
                            justifyContent:'center',
                            alignContent:'center',
                        }}>
                            <Text 
                            style={{
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
                    onSwipe={(direction, state) => this.onSwipeComments(direction, state)}

                    onSwipeUp={ (state) => this.onSwipeUpComments(state) }
                    onSwipeDown={ (state) => this.onSwipeDownComments(state) }
                    onSwipeLeft={ (state) => this.onSwipeLeftComments(state) }
                    onSwipeRight={ (state) => this.onSwipeRightComments(state) }
                    
                    config={config}
                    style={{flex:1, backgroundColor: 'black'}}
                >
                    <View style={{height:Dimensions.get('window').height, width:Dimensions.get('window').width,  justifyContent:'center', alignContent:'center'}}>
                        <View style={{flex:1,  }}>
                            <View style={{absolute:'position', zIndex:2, top:0*factor_ver, right:factor_hor*0.075, zIndex:3, justifyContent:'center', alignContent:'center', alignItems:'flex-end', }}>
                                <TouchableHighlight underlayColor={'transparent'} onPress={() => {this.setState({visible_image:false})}} style={{marginEnd:25, zIndex:3, paddingBottom:0, marginTop:10*factor_ver, paddingTop:30*factor_ver}}>
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
                            resizeMode={FastImage.resizeMode.contain}
                                source={ {uri: `http://${serverLocation}/${this.state.clicked_image}` }}
                                style={{ flex:1, width:Dimensions.get('window').width, height:Dimensions.get('window').width, }}
                            />
                        </View>
                        <View style={{flex:1, backgroundColor:'black'}}></View>
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
                <View style={{height:80*factor_hor*2.5, flexDirection:'row', alignSelf:'stretch'}}>
                    <View style={{flex:1, }}></View>
                    <View style={{width:65*factor_hor, }}>
                        <View style={{flex:1, }}></View>
                        <View style={{height:65*factor_hor, marginBottom:15*factor_ver}}>
                            <TouchableHighlight onPress={()=>{this.new_click()}} underlayColor={'transparent'}>
                                <View style={{height:65*factor_hor, width:65*factor_hor,marginBottom:25*factor_hor, borderRadius:40*factor_hor, backgroundColor:'white'}}>
                                    <New
                                    width={47.5*factor_hor}
                                    height={47.5*factor_hor}
                                        resizeMode={FastImage.resizeMode.contain}
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
                        <View style={{height:65*factor_hor, marginBottom:15*factor_ver}}>
                            <TouchableHighlight onPress={()=>{this.hot_click()}} underlayColor={'transparent'}>
                                <View style={{height:65*factor_hor, width:65*factor_hor, marginBottom:25*factor_hor, borderRadius:40*factor_hor, backgroundColor:'white'}}>
                                    <Hot
                                        width={47.5*factor_hor}
                                        height={47.5*factor_hor}
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
                        <View style={{flex:1, }}></View>
                    </View>
                    <View style={{flex:0.1,}}></View>
                    <View style={{flex:0.9,}}>
                        <View style={{flex:1, marginBottom:-12.5,}}></View>
                        <View style={{height:65*factor_hor,marginBottom:15*factor_ver, width:'100%', justifyContent:'center', alignContent:'center',}}>
                            <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>New</Text>
                        </View>
                        <View style={{height:65*factor_hor, width:'100%', justifyContent:'center', alignContent:'center',}}>
                            <Text style={{fontSize:factor_hor*20*factor_hor,fontWeight:'600', fontFamily:'Avenir Next', textAlign:'left', color:'white'}}>Hot</Text>
                        </View>
                        <View style={{flex:1, }}></View>                                                  
                    </View>
                </View>
                <View style={{height:10*factor_ver, marginTop:10*factor_hor, justifyContent:'center', alignItems:'center', alignContent:'center', marginBottom:70*factor_ver,}}>      
                    <TouchableHighlight underlayColor={'transparent'} onPress={ () => {this.setState({visible_sorting:false}, function () {console.log(this.state.visible_sorting)})}}>
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
        
        <View style={{
            height:70*factor_ver, 
            backgroundColor:'white', 
            opacity:0.9, 
            alignSelf:'stretch', 
        }}>
            <View style={{flex:1}}></View>
            <View style={{flex:2,flexDirection:'row'}}>
                <View style={{flex:1, justifyContent:'center', alignContent:'center',}}>
                    <TouchableOpacity onPress={()=>{    
                        this.props.navigation.state.params.returned(this.state.post, 'No'); 
                        this.props.navigation.goBack();
                    }}>
                        <Icon
                            name='chevron-left'
                            color='black'
                            type='entypo'
                            size={25*factor_hor}
                            style={{marginTop:5}}
                        />      
                    </TouchableOpacity>
                </View>
                <View style={{flex:4,justifyContent:'center', alignContent:'center',}}>
                    <Text 
                        style={{
                            textAlign:'center', 
                            fontSize:26*factor_hor, 
                            fontWeight:'300', 
                            color:'black', 
                            fontFamily:'Avenir next'
                        }}
                    >comments</Text>
                </View>
                <View style={{flex:1,justifyContent:'center', alignContent:'center', }}>
                    <TouchableOpacity onPress={()=>{this.setState({visible_sorting:true}, function(){console.log(this.state.visible_sorting)})}}>
                        <Icon 
                            size={22.5*factor_hor}
                            name="select-arrows" 
                            color='black'
                            type='entypo' 
                            style={{marginTop:5}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>

        <View style={{ flex:1, alignSelf:'stretch', backgroundColor:'white',}}> 
            {this.state.first_loaded && (
                <RecyclerListView 
                    style={{flex:1,backgroundColor:'#f7f7f7', paddingTop:8*factor_hor,}}
                    rowRenderer={this._renderRow} 
                    dataProvider={this.state.dataProvider}
                    layoutProvider={this._layoutProvider}
                    onEndReached={() => {this.fetchComments()}}
                    onEndReachedThreshold={0.9}
                    showsVerticalScrollIndicator={false}
                    renderFooter={this.renderFooter}
                    extendedState={this.state}
                    refreshControl={
                        <RefreshControl
                            tintColor={'white'}
                            refreshing={false}
                            onRefresh={() => { this.setState({isLoad:true}), this.refresh_feed() }} 
                        />
                    }
                />
            )}              
            {!this.state.first_loaded && (
                <View style={{flex:1, backgroundColor:'#f7f7f7', justifyContent:'center', alignContent:'center', alignItems:'center'}}></View>
            )}

            <View style={{
                height:60*factor_ver, 
                width:'100%',
                backgroundColor:'#f7f7f7', 
                borderWidth:1,
                borderColor:'#ececec',
                flexDirection:'row',
                justifyContent:'center', 
                alignContent:'center',
            }}>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('CREATE_COMMENT', {art:this.state.post})
                    this.props.navigation.navigate('CREATE_COMMENT', {returndata: this.returndata.bind(this)} )
                }}>   
                <View style={{flex:1}}>
                    <View style={{flex:1}}></View>
                    <View style={{
                        flex:4, 
                        justifyContent:'center', 
                        alignContent:'center',
                        flexDirection:'row'
                    }}>
                        <View style={{
                            justifyContent:'center', 
                            alignContent:'center',
                            transform: [{ rotate: '180deg'}],
                            marginBottom:12.5*factor_ver,
                            marginRight:15*factor_hor,
                        }}>
                            <Icon
                                name='reply'
                                color='#979797'
                                type='entypo'
                                size={18*factor_hor}
                            />   
                        </View>
                        <Text
                            style={{
                                color:'#9b9b9b',
                                textAlign:'left',
                                fontSize:20*factor_hor,
                            }}
                        >Leave a comment...</Text>
                    </View>
                    <View style={{flex:1}}></View>
                </View>
                </TouchableOpacity>  
            </View>
        </View>        
    </View>
    )}
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});