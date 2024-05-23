import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {useEffect, useState} from 'react';
import {View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Profile from '../../assets/images/profile.png';
import Empty from '../../assets/lotties/Empty.json';
import {RootStackParams} from '../../routes/RootNavigator';
import * as S from './RequestPage.style';

const RequestPage = () => {
  const [selectedContact, setSelectedContact] = useState<Friends | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<null>(null);
  const [items, setItems] = useState<any[]>([]);

  const [friends, setFriends] = useState<Friends[]>([]);
  const [favorites, setFavorites] = useState<Friends[]>([]);

  type Friends = {
    id: number;
    name: string;
    phone_number: string;
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

  const handleContactSelect = (friends: Friends) => {
    setSelectedContact(friends);
  };

  const handleNextButtonClick = () => {
    if (selectedContact) {
      navigation.navigate('RequestInfo', {selectedContact});
    }
  };

  return (
    <View style={{flex: 1}}>
      <S.RequestView>
        <S.RequestMessage>카드를 요청할</S.RequestMessage>
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
              대리결제를 요청할 수 있는 친구가 없습니다
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
            {favorites.map((item, index) => (
              <S.ContactItem
                key={index.toString()}
                onPress={() => handleContactSelect(item)}
                selected={selectedContact === item}>
                <S.Thumbnail source={Profile} />
                <S.ContactInfo>
                  <S.NameView>
                    <S.ContactName>{item.name}</S.ContactName>
                  </S.NameView>
                  <S.ContactPhoneNumber>
                    {item.phone_number}
                  </S.ContactPhoneNumber>
                </S.ContactInfo>
              </S.ContactItem>
            ))}
            <S.FView>
              <S.FText>친구</S.FText>
            </S.FView>
            {friends.map((item, index) => (
              <S.ContactItem
                key={index.toString()}
                onPress={() => handleContactSelect(item)}
                selected={selectedContact === item}>
                <S.Thumbnail source={Profile} />
                <S.ContactInfo>
                  <S.NameView>
                    <S.ContactName>{item.name}</S.ContactName>
                  </S.NameView>
                  <S.ContactPhoneNumber>
                    {item.phone_number}
                  </S.ContactPhoneNumber>
                </S.ContactInfo>
              </S.ContactItem>
            ))}
          </S.ListArea>
        )}
      </S.FriendView>
      <S.ButtonView>
        <S.NextButton
          onPress={handleNextButtonClick}
          disabled={!selectedContact}>
          <S.NextText>다음</S.NextText>
        </S.NextButton>
      </S.ButtonView>
    </View>
  );
};

export default RequestPage;
