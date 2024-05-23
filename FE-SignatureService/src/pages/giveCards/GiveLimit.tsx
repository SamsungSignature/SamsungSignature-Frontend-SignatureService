import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useState} from 'react';
import {View} from 'react-native';
import {RootStackParams} from '../../routes/RootNavigator';
import * as S from '../requestPayment/RequestInfo.style';

type GiveInfoRouteProp = RouteProp<RootStackParams, 'GiveLimit'>;

const GiveLimit = () => {
  const route = useRoute<GiveInfoRouteProp>();
  const {selectedContacts, selectedContactIds} = route.params;

  const [amount, setAmount] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const handleNextButtonClick = () => {
    if (amount) {
      const cleanedAmount = amount.replace(/,/g, '');
      navigation.navigate('GiveDate', {
        selectedContacts: selectedContacts,
        selectedContactIds: selectedContactIds,
        // amount: Number(amount),
        amount: Number(cleanedAmount),
      });
    }
  };
  // (금액 쉼표) 추가한 부분
  const formatAmount = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, '');
    return numValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleAmountChange = (text: string) => {
    setAmount(formatAmount(text));
  };

  return (
    <View style={{flex: 1}}>
      <S.MessageView>
        <S.MessageText>
          <S.BoldText>금액 제한</S.BoldText>을
        </S.MessageText>
        <S.MessageText>설정해주세요</S.MessageText>
        <S.MessageSubText>
          금액을 입력하지 않을 시 제한없이 보내집니다
        </S.MessageSubText>
      </S.MessageView>
      <S.InfoArea>
        <S.Amount>
          <S.BoldText>금액 제한</S.BoldText>
          {/* <S.StyledTextInput
            placeholder="결제 제한 금액을 입력하세요"
            keyboardType="number-pad"
            onChangeText={text => setAmount(text)}
          /> */}
          <S.StyledTextInput
            placeholder="결제 제한 금액을 입력하세요"
            keyboardType="number-pad"
            value={amount}
            onChangeText={handleAmountChange}
          />
        </S.Amount>
      </S.InfoArea>
      <S.NextButton onPress={handleNextButtonClick} disabled={!amount}>
        <S.NextText>다음</S.NextText>
      </S.NextButton>
    </View>
  );
};

export default GiveLimit;
