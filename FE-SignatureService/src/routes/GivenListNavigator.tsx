import {ParamListBase} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GivenCardList from '../pages/givenCardList/GivenCardList';

interface GivenListStackParams extends ParamListBase {
  GivenCardPage: undefined;
}

const GivenListStack = createNativeStackNavigator<GivenListStackParams>();

const GivenListNavigator = () => {
  return (
    <GivenListStack.Navigator>
      <GivenListStack.Group screenOptions={{headerShown: false}}>
        <GivenListStack.Screen name="GivenCardList" component={GivenCardList} />
      </GivenListStack.Group>
    </GivenListStack.Navigator>
  );
};

export type {GivenListStackParams};
export default GivenListNavigator;
