// index.js

/**
 * @format
 */

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import './msw.polyfills';
import './pushNoti.config';
import App from './src/App';

dayjs.extend(relativeTime);
dayjs.locale('ko');

AppRegistry.registerComponent(appName, () => App);
