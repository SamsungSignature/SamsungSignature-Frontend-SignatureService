import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CheckBoxBlank from '../../assets/icons/checkbox-blank.svg';
import CheckBoxFilled from '../../assets/icons/checkbox-circle.svg';
import Profile from '../../assets/images/profile.png';
import Empty from '../../assets/lotties/Empty.json';
import {RootStackParams} from '../../routes/RootNavigator';
import * as S from './GiveCardPage.style';

interface Friends {
  id: number;
  name: string;
  phone_number: string;
}

const GiveCardPage = () => {
  const [selectedContacts, setSelectedContacts] = useState<Friends[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const [friends, setFriends] = useState<Friends[]>([]);
  const [favorites, setFavorites] = useState<Friends[]>([]);

  // 친구 그룹을 위한 상태
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<null>(null);
  const [items, setItems] = useState<any[]>([]);

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const handleToggleSelectAll = () => {
    setSelectAll(prevState => !prevState);
    setSelectedContacts(prevState =>
      prevState.length === 0 || !selectAll ? friends : [],
    );
  };

  useEffect(() => {
    // Async Storage에서 저장된 친구 목록
    const fetchFriendsFromStorage = async () => {
      try {
        const storedFriends = await AsyncStorage.getItem('friends_list');

        if (storedFriends) {
          setFriends(JSON.parse(storedFriends));
        }
      } catch (error) {
        console.error(error);
      }
    };
    // Async Storage에서 저장된 즐겨찾기 목록
    const fetchFavoriteContactsFromStorage = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorite_contacts');

        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFriendsFromStorage();
    fetchFavoriteContactsFromStorage();
  }, []);

  // id 배열 추출
  const extractContactIds = () => {
    return selectedContacts.map(contact => contact.id);
  };

  const handleContactSelect = (friend: Friends) => {
    const index = selectedContacts.findIndex(
      selectedContact => selectedContact.id === friend.id,
    );
    if (index === -1) {
      //추가
      setSelectedContacts([...selectedContacts, friend]);
    } else {
      //제거
      const updatedSelectedContacts = [...selectedContacts];
      updatedSelectedContacts.splice(index, 1);
      setSelectedContacts(updatedSelectedContacts);
    }
  };

  // const handleNextButtonClick = () => {
  //   if (selectedContacts.length > 0) {
  //     navigation.navigate('GiveLimit', {selectedContacts});
  //   }
  // };
  const handleNextButtonClick = () => {
    const selectedContactIds = extractContactIds();
    if (selectedContactIds.length > 0) {
      navigation.navigate('GiveLimit', {selectedContacts, selectedContactIds});
      console.log(selectedContactIds);
    }
  };
  return (
    <View style={{flex: 1}}>
      <S.RequestView>
        <S.RequestMessage>카드를 보낼</S.RequestMessage>
        <S.RequestMessage>
          <S.BoldText>친구</S.BoldText>를 선택해주세요
        </S.RequestMessage>
      </S.RequestView>
      <S.FriendView>
        <S.MessageContainer>
          <S.RequestMessage>
            <S.BoldText>친구목록</S.BoldText>
          </S.RequestMessage>
          <S.DropDownView>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="그룹"
              style={{minHeight: 20}}
            />
          </S.DropDownView>
        </S.MessageContainer>
        {friends.length === 0 ? (
          <S.NoContactsView>
            <S.NoContactsMessage>
              카드를 보낼 수 있는 친구가 없습니다.
            </S.NoContactsMessage>
            <LottieView
              style={{width: 250, height: 250}}
              source={Empty}
              autoPlay
              loop
            />
          </S.NoContactsView>
        ) : (
          <S.ListArea>
            <S.FView>
              <S.FText>즐겨찾기</S.FText>
            </S.FView>
            {favorites.map(item => (
              <S.ContactItem
                key={item.id.toString()}
                onPress={() => handleContactSelect(item)}
                selected={
                  selectedContacts.findIndex(
                    selectedContact => selectedContact.id === item.id,
                  ) !== -1
                }>
                <S.ViewInfo>
                  <S.Thumbnail source={Profile} />
                  <S.ContactInfo>
                    <S.NameView>
                      <S.ContactName>{item.name}</S.ContactName>
                    </S.NameView>
                    <S.ContactPhoneNumber>
                      {item.phone_number}
                    </S.ContactPhoneNumber>
                  </S.ContactInfo>
                </S.ViewInfo>
                <View>
                  <S.IconView>
                    {selectedContacts.findIndex(
                      selectedContact => selectedContact.id === item.id,
                    ) !== -1 ? (
                      <CheckBoxFilled width={30} height={30} />
                    ) : (
                      <CheckBoxBlank width={30} height={30} />
                    )}
                  </S.IconView>
                </View>
              </S.ContactItem>
            ))}
            <S.FView>
              <S.FText>친구</S.FText>
            </S.FView>
            {friends.map(item => (
              <S.ContactItem
                key={item.id.toString()}
                onPress={() => handleContactSelect(item)}
                selected={
                  selectedContacts.findIndex(
                    selectedContact => selectedContact.id === item.id,
                  ) !== -1
                }>
                <S.ViewInfo>
                  <S.Thumbnail source={Profile} />
                  <S.ContactInfo>
                    <S.NameView>
                      <S.ContactName>{item.name}</S.ContactName>
                    </S.NameView>
                    <S.ContactPhoneNumber>
                      {item.phone_number}
                    </S.ContactPhoneNumber>
                  </S.ContactInfo>
                </S.ViewInfo>
                <View>
                  <S.IconView>
                    {selectedContacts.findIndex(
                      selectedContact => selectedContact.id === item.id,
                    ) !== -1 ? (
                      <CheckBoxFilled width={30} height={30} />
                    ) : (
                      <CheckBoxBlank width={30} height={30} />
                    )}
                  </S.IconView>
                </View>
              </S.ContactItem>
            ))}
          </S.ListArea>
        )}
      </S.FriendView>
      <S.SumView>
        <S.SumText1> 총 {selectedContacts.length} 명</S.SumText1>
        <S.CheckView>
          <S.SumText2>전체선택</S.SumText2>
          <TouchableOpacity onPress={handleToggleSelectAll}>
            {selectAll ? (
              <CheckBoxFilled width={30} height={30} />
            ) : (
              <CheckBoxBlank width={30} height={30} />
            )}
          </TouchableOpacity>
        </S.CheckView>
      </S.SumView>
      <S.ButtonView>
        <S.NextButton
          onPress={handleNextButtonClick}
          disabled={!selectedContacts}>
          <S.NextText>다음</S.NextText>
        </S.NextButton>
      </S.ButtonView>
    </View>
  );
};

export type {Friends};
export default GiveCardPage;
