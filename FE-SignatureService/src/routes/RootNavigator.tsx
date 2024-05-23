import {
  NavigationProp,
  NavigatorScreenParams,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {PERMISSIONS} from 'react-native-permissions';
import {theme} from '../assets/styles/theme';
import AppBackButton from '../components/common/appHeader/AppBackButton';
import AppHeader from '../components/common/appHeader/AppHeader';
import AppHeaderRight from '../components/common/appHeader/AppHeaderRight';
import {Card} from '../components/main/Cards';
import checkPermissions from '../functions/checkPermissions';
import getAccessToken from '../functions/getAccessToken';
import getRefreshToken from '../functions/getRefreshToken';
import setTokens from '../functions/setToken';
import AddToWallet from '../pages/AddToWallet';
import CardDetail from '../pages/CardDetail';
import MainPage from '../pages/MainPage';
import NotifyPage from '../pages/NotifyPage';
import Permissions from '../pages/Permissions';
import FriendManage from '../pages/contact/FriendManage';
import Group from '../pages/contact/Group';
import GiveCardPage from '../pages/giveCards/GiveCardPage';
import GiveDate from '../pages/giveCards/GiveDate';
import GiveDone from '../pages/giveCards/GiveDone';
import GiveLimit from '../pages/giveCards/GiveLimit';
import RequestDone from '../pages/requestPayment/RequestDone';
import RequestInfo from '../pages/requestPayment/RequestInfo';
import RequestPage from '../pages/requestPayment/RequestPage';
import {useAppDispatch, useAppSelector} from '../stores/hooks';
import {setLogin, setPermiss} from '../stores/slices/user';
import {RootState} from '../stores/store';
import AccountNavigator, {AccountStackParams} from './AccountNavigatior';
import AppliedNavigator, {AppliedStackParams} from './AppliedNavigator';
import ApproveNavigator, {ApproveStackParams} from './ApproveNavigator';
import GivenListNavigator, {GivenListStackParams} from './GivenListNavigator';
import HistoryTabNavigator, {TabParams} from './HistoryTabNavigator';

interface RootStackParams extends ParamListBase {
  AddToWallet: undefined;
  MainPage: undefined;
  CardDetail: {card: Card};
  FriendManage: undefined;
  NotifyPage: undefined;
  Group: undefined;
  RequestPage: undefined;
  RequestInfo: {
    selectedContact: {
      id: number;
      name: string;
      phone_number: string;
    };
  };
  RequestDone: undefined;
  GiveCardPage: undefined;
  GiveLimit: {
    selectedContacts: {
      id: number | number[];
      name: string;
      phone_number: string;
    }[];
    selectedContactIds: number[];
  };
  GiveDate: {
    selectedContacts: {
      id: number | number[];
      name: string;
      phone_number: string;
    }[];
    amount: number;
    selectedContactIds: number[];
  };
  GiveDone: {originData?: string; data?: string};
  HistoryTabNavigator?: NavigatorScreenParams<TabParams>;
  GivenListPage: NavigatorScreenParams<GivenListStackParams>;
  Approve: NavigatorScreenParams<ApproveStackParams>;
  Applied: NavigatorScreenParams<AppliedStackParams>;
  // 로그인, 권한 관련 페이지들
  Account: NavigatorScreenParams<AccountStackParams>;
  Permissions: undefined;
}

const RootStack = createNativeStackNavigator<RootStackParams>();

const RootNavigator = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  // 권한 허용 확인
  const isPermiss = useAppSelector((state: RootState) => state.user.isPermiss);
  useEffect(() => {
    const permissionCheck = async () => {
      if (
        await checkPermissions([
          PERMISSIONS.ANDROID.READ_CONTACTS,
          PERMISSIONS.ANDROID.WRITE_CONTACTS,
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        ])
      ) {
        dispatch(setPermiss(true));
      }
    };

    permissionCheck();
  }, []);

  // 로그인 상태 확인
  const isLogin = useAppSelector((state: RootState) => state.user.isLogin);
  useEffect(() => {
    const loginCheck = async () => {
      const {accessToken, isExpired, created_at, expires_in} =
        await getAccessToken();
      const {refreshToken} = await getRefreshToken();
      if (accessToken && !isExpired) {
        const fakeResponse = {
          headers: {'set-cookie': [`refresh_token=${refreshToken};`]},
          data: {body: {access_token: accessToken, created_at, expires_in}},
        };
        await setTokens(fakeResponse);
        dispatch(setLogin(true));
      }
    };

    loginCheck();
  }, [isPermiss]);

  // 헤더 오른쪽 컴포넌트 속성들
  const noti = () => navigation.navigate('Notify');
  const search = () => navigation.navigate('');
  const more = [
    {title: '받은 카드 관리', onPress: () => navigation.navigate('')},
    {title: '그룹 관리', onPress: () => navigation.navigate('FriendManage')},
  ];

  return (
    <RootStack.Navigator>
      {isPermiss ? (
        isLogin ? (
          <>
            {/* Add to wallet */}
            <RootStack.Group screenOptions={{headerShown: false}}>
              <RootStack.Screen name="AddToWallet" component={AddToWallet} />
            </RootStack.Group>

            {/* 메인 화면 */}
            <RootStack.Group
              screenOptions={{
                title: 'SAMSUNG Signature',
                header: AppHeader,
                headerRight: () => AppHeaderRight({noti, more}),
              }}>
              <RootStack.Screen name="MainPage" component={MainPage} />
            </RootStack.Group>

            {/* 카드 선택 */}
            <RootStack.Group
              screenOptions={{header: AppHeader, title: '카드 선택'}}>
              <RootStack.Screen name="CardDetail" component={CardDetail} />
            </RootStack.Group>

            {/* 그룹 관리 */}
            <RootStack.Group
              screenOptions={{
                title: '그룹 관리',
                headerTitleStyle: {fontSize: 20},
                headerStyle: {backgroundColor: theme.colors.white},
                header: AppHeader,
              }}>
              <RootStack.Screen name="FriendManage" component={FriendManage} />
              <RootStack.Screen name="Group" component={Group} />
            </RootStack.Group>

            {/* 알림 목록 */}
            <RootStack.Group
              screenOptions={{
                title: '알림 목록',
                headerTitleStyle: {fontSize: 20},
                headerStyle: {backgroundColor: theme.colors.white},
                header: AppHeader,
              }}>
              <RootStack.Screen name="Notify" component={NotifyPage} />
            </RootStack.Group>

            {/* 결제 요청 */}
            <RootStack.Group
              screenOptions={{
                headerStyle: {
                  height: 8,
                  backgroundColor: theme.colors.white,
                },
                title: '결제 요청',
                headerTitleStyle: {fontSize: 20},
                header: AppHeader,
                headerLeft: props =>
                  AppBackButton(props, () => navigation.navigate('MainPage')),
              }}>
              <RootStack.Screen name="RequestPage" component={RequestPage} />
              <RootStack.Screen name="RequestInfo" component={RequestInfo} />
              <RootStack.Screen name="RequestDone" component={RequestDone} />
            </RootStack.Group>

            {/* 요청 허용 */}
            <RootStack.Group screenOptions={{headerShown: false}}>
              <RootStack.Screen name="Approve" component={ApproveNavigator} />
            </RootStack.Group>

            {/* 카드 주기 */}
            <RootStack.Group
              screenOptions={{
                title: '내 카드 주기',
                headerTitleStyle: {fontSize: 20},
                headerStyle: {
                  backgroundColor: theme.colors.white,
                  height: 8,
                },
                header: AppHeader,
                headerLeft: props =>
                  AppBackButton(props, () => navigation.navigate('MainPage')),
              }}>
              <RootStack.Screen name="GiveCardPage" component={GiveCardPage} />
              <RootStack.Screen name="GiveLimit" component={GiveLimit} />
              <RootStack.Screen name="GiveDate" component={GiveDate} />
              <RootStack.Screen name="GiveDone" component={GiveDone} />
            </RootStack.Group>

            {/* 내역, 빌려준 카드 */}
            <RootStack.Group
              screenOptions={{
                headerTitleStyle: {fontSize: 20},
                headerStyle: {
                  backgroundColor: theme.colors.white,
                  height: 8,
                },
                header: AppHeader,
                headerRight: () => AppHeaderRight({search}),
                headerLeft: props =>
                  AppBackButton(props, () => navigation.navigate('MainPage')),
              }}>
              <RootStack.Screen
                name="HistoryTabNavigator"
                component={HistoryTabNavigator}
                options={{
                  title: '내역',
                }}
              />
              <RootStack.Screen
                name="GivenListPage"
                component={GivenListNavigator}
                options={{
                  title: '내가 빌려준 카드',
                }}
              />
            </RootStack.Group>

            {/* 요청 내역서 */}
            <RootStack.Screen
              name="Applied"
              component={AppliedNavigator}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <RootStack.Screen
            name="Account"
            component={AccountNavigator}
            options={{headerShown: false}}
          />
        )
      ) : (
        <RootStack.Screen
          name="Permissions"
          component={Permissions}
          options={{headerShown: false}}
        />
      )}
    </RootStack.Navigator>
  );
};

export type {RootStackParams};
export default RootNavigator;
