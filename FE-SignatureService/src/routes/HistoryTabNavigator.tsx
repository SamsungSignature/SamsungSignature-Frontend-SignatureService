import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {theme} from '../assets/styles/theme';
import History from '../pages/history/History';
import {RootStackParams} from './RootNavigator';

interface TabParams extends ParamListBase {
  AppliedContents: {historyQuery: 'applied' | 'approved'};
  ApprovedContents: {historyQuery: 'approved' | 'applied'};
}

const Tab = createMaterialTopTabNavigator<TabParams>();

const HistoryTabNavigator = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('MainPage');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="AppliedContents"
      screenOptions={{
        tabBarActiveTintColor: `${theme.colors.samsungBlue}`,
        tabBarLabelStyle: {fontSize: 16, color: `${theme.colors.black}`},
        tabBarStyle: {backgroundColor: `${theme.colors.white}`},
      }}>
      <Tab.Screen
        name="AppliedContents"
        component={History}
        options={{tabBarLabel: '요청 내역'}}
        initialParams={{historyQuery: 'applied'}}
      />
      <Tab.Screen
        name="ApprovedContents"
        component={History}
        options={{tabBarLabel: '승인 내역'}}
        initialParams={{historyQuery: 'approved'}}
      />
    </Tab.Navigator>
  );
};

export type {TabParams};
export default HistoryTabNavigator;
