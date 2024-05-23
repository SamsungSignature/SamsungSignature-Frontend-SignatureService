import {ParamListBase} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {theme} from '../assets/styles/theme';
import AppHeader from '../components/common/appHeader/AppHeader';
import Applied from '../pages/applied/Applied';

interface AppliedStackParams extends ParamListBase {
  AppliedDetail: {signature_detail_id: number};
}

const AppliedStack = createNativeStackNavigator<AppliedStackParams>();

const AppliedNavigator = () => {
  return (
    <AppliedStack.Navigator
      screenOptions={{
        header: AppHeader,
        headerStyle: {backgroundColor: theme.colors.background},
      }}>
      <AppliedStack.Screen
        name="AppliedDetail"
        component={Applied}
        options={{title: '요청 내역서'}}
      />
    </AppliedStack.Navigator>
  );
};

export type {AppliedStackParams};
export default AppliedNavigator;
