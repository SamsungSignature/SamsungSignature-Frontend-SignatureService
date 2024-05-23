import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useState} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import ArrowDown from '../../assets/icons/arrow-down.svg';
import ArrowUp from '../../assets/icons/arrow-up.svg';
import useRequestOneTimePay from '../../functions/requestOneTimePay';
import {RootStackParams} from '../../routes/RootNavigator';
import * as S from './RequestInfo.style';

type RequestInfoRouteProp = RouteProp<RootStackParams, 'RequestInfo'>;

const RequestInfo = () => {
  const {selectedContact} = useRoute<RequestInfoRouteProp>().params;

  const [showDetail, setShowDetail] = useState(false);
  const [amount, setAmount] = useState('');
  const [marketName, setMarketName] = useState('');
  const [itemName, setItemName] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const toggleDetail = () => {
    setShowDetail(prevState => !prevState);
  };

  const requestOneTimePay = useRequestOneTimePay;

  const handleNextButtonClick = async () => {
    if (amount) {
      try {
        await requestOneTimePay(amount, selectedContact, itemName, marketName);
        navigation.navigate('RequestDone');
      } catch (error) {
        Alert.alert(
          '결제 요청 실패',
          '결제 요청에 실패했습니다. 잠시 후 다시 시도해주세요',
        );
      }
    }
  };

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
          <S.BoldText>결제요청</S.BoldText>에 대한
        </S.MessageText>
        <S.MessageText>
          <S.BoldText>정보</S.BoldText>를 작성해주세요
        </S.MessageText>
        <S.MessageSubText>
          상세정보를 입력하면 이후 내역에서 다시 확인할 수 있습니다
        </S.MessageSubText>
      </S.MessageView>
      <ScrollView>
        <S.InfoArea>
          <S.Amount>
            <S.BoldText>금액 (필수)</S.BoldText>
            {/* <S.StyledTextInput
              placeholder="요청금액을 입력하세요 (필수입력)"
              keyboardType="number-pad"
              onChangeText={text => setAmount(text)}
            /> */}
            <S.StyledTextInput
              placeholder="요청금액을 입력하세요 (필수입력)"
              keyboardType="number-pad"
              value={amount}
              onChangeText={handleAmountChange}
            />
          </S.Amount>
          <S.DetailButton onPress={toggleDetail}>
            <S.BoldText>상세정보 (선택)</S.BoldText>
            <S.IconWrapper>
              {showDetail ? (
                <ArrowUp width={20} height={20} />
              ) : (
                <ArrowDown width={20} height={20} />
              )}
            </S.IconWrapper>
          </S.DetailButton>

          {showDetail && (
            <S.Detail>
              <S.DetailText>상호명</S.DetailText>
              <S.StyledTextInput
                placeholder="상호명을 입력하세요"
                onChangeText={text => setMarketName(text)}
              />
              <S.DetailText>상품명</S.DetailText>
              <S.StyledTextInput
                placeholder="상품명을 입력하세요"
                onChangeText={text => setItemName(text)}
              />
            </S.Detail>
          )}
          <S.CheckView>
            <View>
              <S.NameText>
                <S.BoldText>{selectedContact.name} </S.BoldText> 님에게
              </S.NameText>
            </View>
            <S.NameText>{amount}원에 대한 대리결제를 요청합니다</S.NameText>
          </S.CheckView>
        </S.InfoArea>
        <S.NextButton onPress={handleNextButtonClick} disabled={!amount}>
          <S.NextText>요청하기</S.NextText>
        </S.NextButton>
      </ScrollView>
    </View>
  );
};

export default RequestInfo;
