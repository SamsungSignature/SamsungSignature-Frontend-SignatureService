/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useEffect} from 'react';
import {Linking} from 'react-native';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import styled from 'styled-components/native';
import decodeData from './functions/decodeData';
import encodeData from './functions/encodeData';
import {Friends} from './pages/giveCards/GiveCardPage';
import RootNavigator from './routes/RootNavigator';
import {store} from './stores/store';

// 제스처 핸들러
const GestureHandlerContainer = styled(GestureHandlerRootView)`
  flex: 1;
`;

function App() {
  // 리액트 쿼리 클라이언트
  const queryClient = new QueryClient();

  // 스플래시 스크린
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);

  // 딥 링킹
  const linking = {
    prefixes: [
      'signature://',
      'https://signature.com',
      'https://*.signature.com',
    ],
    getInitialURL: async () => {
      const url = await Linking.getInitialURL();
      return url;
    },
    subscribe: (listener: (url: string) => void) => {
      console.log('linking subscribe to ', listener);
      const onReceiveURL = (event: {url: string}) => {
        const {url} = event;
        console.log('link has url', url, event);
        return listener(url);
      };
      Linking.addEventListener('url', onReceiveURL);
      return () => {
        console.log('linking unsubscribe to ', listener);
        Linking.removeAllListeners('url');
      };
    },
    config: {
      screens: {
        AddToWallet: 'add-to-wallet',
        MainPage: 'main',
        FriendManage: 'friend',
        Group: 'friend/group',
        RequestPage: 'request',
        RequestInfo: {
          path: 'request/info/:selectedContact',
          parse: {
            selectedContact: (selectedContact: string) => {
              return decodeData<Friends[]>(selectedContact);
            },
          },
          stringify: {
            selectedContact: (data: Friends) => {
              return encodeData(data);
            },
          },
        },
        RequestDone: 'request/done',
        GiveCardPage: 'give',
        GiveLimit: {
          path: 'give/limit/:selectedContacts/:selectedContactIds',
          parse: {
            selectedContacts: (selectedContacts: string) => {
              return decodeData<Friends[]>(selectedContacts);
            },
            selectedContactIds: (selectedContactIds: string) => {
              return decodeData<number[]>(selectedContactIds);
            },
          },
          stringify: {
            selectedContacts: (data: Friends[]) => {
              return encodeData(data);
            },
            selectedContactIds: (data: number[]) => {
              return encodeData(data);
            },
          },
        },
        GiveDate: {
          path: 'give/date/:selectedContacts/:selectedContactIds/:amount',
          parse: {
            selectedContacts: (selectedContacts: string) => {
              return decodeData<Friends[]>(selectedContacts);
            },
            selectedContactIds: (selectedContactIds: string) => {
              return decodeData<number[]>(selectedContactIds);
            },
            amount: Number,
          },
          stringify: {
            selectedContacts: (data: Friends[]) => {
              return encodeData(data);
            },
            selectedContactIds: (data: number[]) => {
              return encodeData(data);
            },
          },
        },
        GiveDone: 'give/done',
        HistoryTabNavigator: {
          path: 'history',
          screens: {
            AppliedContents: {path: 'applied', exact: true},
            ApprovedContents: {path: 'approved', exact: true},
          },
        },
        GivenListPage: {path: 'given', screens: {GivenCardPage: ''}},
        Approve: {
          path: 'approve',
          screens: {
            ApproveDetail: {
              path: 'detail/:signature_detail_id',
              parse: {signature_detail_id: Number},
            },
            ApproveComplete: {
              path: 'complete',
            },
          },
        },
        Applied: {
          path: 'apply',
          screens: {
            AppliedDetail: {
              path: 'detail/:signature_detail_id',
              parse: {signature_detail_id: Number},
            },
          },
        },
        Account: {
          path: 'account',
          screens: {
            AccountMain: '',
            AccountServices: 'services',
            Signin: 'signin',
            SelectAge: 'selectage',
            IdVerifyFunnel: 'idverify',
            SignupFunnel: 'signup/:lastName/:firstName/:registNums/:phoneNums',
          },
        },
        Permissions: 'permissions',
      },
    },
  };

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerContainer>
          <NavigationContainer linking={linking}>
            <RootNavigator />
          </NavigationContainer>
        </GestureHandlerContainer>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
