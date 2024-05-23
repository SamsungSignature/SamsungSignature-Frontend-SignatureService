import {RouteProp, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {Alert, Linking, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import styled from 'styled-components/native';
import {LongTermRequestData} from '../../api/delegated/useLongTerm';
import {theme} from '../../assets/styles/theme';
import encodeData from '../../functions/encodeData';
import {RootStackParams} from '../../routes/RootNavigator';
import * as S from '../requestPayment/RequestInfo.style';

type GiveInfoRouteProp = RouteProp<RootStackParams, 'GiveDate'>;

type DateStyle = {
  color: string;
  textColor: string;
};

const {colors} = theme;

const GiveDate = () => {
  const route = useRoute<GiveInfoRouteProp>();
  const {amount, selectedContactIds} = route.params;

  const todayDateString = new Date().toISOString().split('T')[0];

  const [selectedRange, setSelectedRange] = useState<{
    [date: string]: DateStyle;
  }>({
    [todayDateString]: {
      color: `${colors.samsungBlue}`,
      textColor: `${colors.white}`,
    },
  });

  const [startDate, setStartDate] = useState<string>(todayDateString);
  const [endDate, setEndDate] = useState<string | null>(null);

  const handleNextButtonClick = async () => {
    if (!endDate) {
      Alert.alert('만료일을 선택해주세요.');
      return;
    }
    const originData: Omit<LongTermRequestData, 'card_id'> = {
      to_ids: selectedContactIds,
      limit_amount: amount,
      limit_date: endDate,
    };

    const linkData: LinkData = {
      origin: 'signature',
      route: 'give/done',
      originData,
    };
    const data = encodeData(linkData);
    await Linking.openURL(`fakewallet://wallet/select?data=${data}`);
  };

  const handleDayPress = (day: any) => {
    // 오늘보다 전의 날짜는 선택 불가
    const selectedDate = new Date(day.dateString);
    const today = new Date();
    const isToday = selectedDate.toDateString() === today.toDateString();

    if (!isToday && selectedDate < today) {
      return;
    }

    const newRange: {[date: string]: DateStyle} = {
      [startDate]: {
        color: `${colors.samsungBlue}`,
        textColor: `${colors.white}`,
      },
    };

    const rangeStart = new Date(startDate);
    const rangeEnd = new Date(day.dateString);
    const datesInRange: string[] = [];

    for (
      let date = new Date(rangeStart);
      date <= rangeEnd;
      date.setDate(date.getDate() + 1)
    ) {
      datesInRange.push(date.toISOString().split('T')[0]);
    }

    datesInRange.forEach(date => {
      newRange[date] = {
        color: `${colors.samsungBlue}`,
        textColor: `${colors.white}`,
      };
    });

    setEndDate(day.dateString);
    setSelectedRange(newRange);
  };

  return (
    <View style={{flex: 1}}>
      <S.MessageView>
        <S.MessageText>
          <S.BoldText>만료 날짜</S.BoldText>를
        </S.MessageText>
        <S.MessageText>설정해주세요</S.MessageText>
        <S.MessageSubText>
          날짜를 입력하지 않을 시 만료일 없이 보내집니다
        </S.MessageSubText>
      </S.MessageView>
      <CalendarArea>
        <AppCalendar
          markingType={'period'}
          onDayPress={handleDayPress}
          markedDates={selectedRange}
        />
        <DateView>
          <S.NameText>
            승인일:{' '}
            {startDate ? startDate : new Date().toISOString().split('T')[0]}
          </S.NameText>
          <S.NameText>만료일: {endDate ? endDate : '무기한'}</S.NameText>
        </DateView>
      </CalendarArea>
      <S.NextButton onPress={handleNextButtonClick}>
        <S.NextText>카드 선택</S.NextText>
      </S.NextButton>
    </View>
  );
};

export default GiveDate;

const CalendarArea = styled.View`
  flex: 1;
  background-color: ${colors.white};
  border-radius: 30px;
  margin-bottom: 45px;
`;

const DateView = styled.View`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  padding: ${theme.space[2]};
`;

const AppCalendar = styled(Calendar)`
  background: transparent;
`;
