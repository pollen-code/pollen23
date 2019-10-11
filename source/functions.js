import {Platform, Dimensions,} from 'react-native';

const _height = Dimensions.get('window').height 
const _width = Dimensions.get('window').width 

const functions = {
    winHeight(){
        if(Platform.OS === 'ios') {
            if ( Dimensions.get('window').height > 811) {
                return _height*0.045
            }
            else {
                return (_height*0.015+12)
            }
        }        
        else {
            return (_height*0.015+12)
        }
    },
    is_ios() {
        ios = false
        if(Platform.OS === 'ios') {
            if ( Dimensions.get('window').height > 811) {
                return true  
            }
            else {
                return false
            }
        }
        else {
            return false
        }
        
    },
}

export default functions;