import React, {Component} from 'react';
import {StyleSheet, View, } from 'react-native';
import Video from 'react-native-video';

export default class trial extends Component {
    static navigationOptions = {header: null};
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
    return  <View style={styles.container}>
                <Video 
                    source={{uri: `http://${serverLocation}/Users/kentonpalmer/Pollen7env/Pollen7env/post_videos/353_post.mp4`}}
                    onError={(error) => console.log(error)}
                    style={{ width:100, height:100, backgroundColor:'red'}}
                />
            </View>
        }
    }

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignSelf:'stretch', 
        justifyContent:'center', 
        alignContent:'center', 
        backgroundColor:'white',
    }
});


