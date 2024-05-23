import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import Complete from '../../assets/lotties/Complete.json';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../routes/RootNavigator';
import * as S from './RequestDone.style';
import {theme} from '../../assets/styles/theme';

const RequestDone = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const handleReturnHome = () => {
    navigation.navigate('MainPage');
  };
  return (
    <View style={{flex: 1}}>
      <S.CompleteView>
        <S.TextArea>
          <S.BoldText>결제 요청이 완료되었습니다</S.BoldText>
          <S.NormalText>상대방이 승인할 때까지 기다려주세요</S.NormalText>
        </S.TextArea>
        <LottieView
          style={{width: 320, height: 320}}
          source={Complete}
          autoPlay
          loop
        />
      </S.CompleteView>
      <S.BottomArea
        onPress={handleReturnHome}
        style={({pressed}) => ({
          backgroundColor: pressed ? theme.colors.lightergray : 'transparent',
        })}>
        <S.BottomText>홈으로 이동</S.BottomText>
      </S.BottomArea>
    </View>
  );
};

export default RequestDone;
