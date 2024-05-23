import {ParamListBase} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AccountMain from '../pages/account/AccountMain';
import AccountServices from '../pages/account/AccountService';
import IdVerifyFunnel from '../pages/account/IdVerifyFunnel';
import SelectAge from '../pages/account/SelectAge';
import Signin from '../pages/account/Signin';
import SignupFunnel from '../pages/account/SignupFunnel';

interface SignupFunnelParams {
  lastName: string;
  firstName: string;
  registNums: string;
  phoneNums: string;
}

interface AccountStackParams extends ParamListBase {
  AccountMain: undefined;
  AccountServices: undefined;
  Signin: undefined;
  SelectAge: undefined;
  IdVerifyFunnel: undefined;
  SignupFunnel: SignupFunnelParams;
}

const AccountStack = createNativeStackNavigator<AccountStackParams>();

const AccountNavigator = () => {
  return (
    <AccountStack.Navigator>
      <AccountStack.Group
        screenOptions={{
          headerShown: false,
          headerShadowVisible: false,
          headerTransparent: true,
          headerBackVisible: false,
        }}>
        <AccountStack.Screen name="AccountMain" component={AccountMain} />
        <AccountStack.Screen
          name="AccountServices"
          component={AccountServices}
        />
        <AccountStack.Screen name="Signin" component={Signin} />
        <AccountStack.Screen name="SelectAge" component={SelectAge} />
        <AccountStack.Screen name="IdVerifyFunnel" component={IdVerifyFunnel} />
        <AccountStack.Screen name="SignupFunnel" component={SignupFunnel} />
      </AccountStack.Group>
    </AccountStack.Navigator>
  );
};

export type {AccountStackParams, SignupFunnelParams};
export default AccountNavigator;
