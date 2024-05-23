import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {theme} from '../assets/styles/theme';
import AppHeader from '../components/common/appHeader/AppHeader';
import ApproveComplete from '../pages/approve/ApproveComplete';
import ApproveDetail from '../pages/approve/ApproveDetail';
import {RootStackParams} from './RootNavigator';

interface ApproveStackParams extends ParamListBase {
  ApproveDetail: {signature_detail_id: number};
  ApproveComplete: {originData?: string; data?: string};
}

const ApproveStack = createNativeStackNavigator<ApproveStackParams>();

const ApproveNavigator = () => {
  // 뒤로가기
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ApproveStack.Navigator
      screenOptions={{
        header: AppHeader,
        headerStyle: {backgroundColor: theme.colors.background},
      }}>
      <ApproveStack.Screen
        name="ApproveDetail"
        component={ApproveDetail}
        options={{title: '요청 승인하기'}}
      />
      <ApproveStack.Screen
        name="ApproveComplete"
        component={ApproveComplete}
        options={{headerShown: false}}
      />
    </ApproveStack.Navigator>
  );
};

export type {ApproveStackParams};
export default ApproveNavigator;
