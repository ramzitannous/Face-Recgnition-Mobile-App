/** @format */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import MainView from "./src/views/mainview/MainView";

AppRegistry.registerComponent(appName, () => MainView);
