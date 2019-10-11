import {AppRegistry,} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { YellowBox } from 'react-native';

console.disableYellowBox = true

AppRegistry.registerComponent(appName, () => App);

