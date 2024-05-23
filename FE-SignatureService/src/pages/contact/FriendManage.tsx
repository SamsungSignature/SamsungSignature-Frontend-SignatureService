import {ScrollView, StyleSheet, View} from 'react-native';
import Sync from '../../assets/icons/sync.svg';
// import GroupImg from '../../assets/images/group.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import {useEffect, useState} from 'react';
import {Animated} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Profile from '../../assets/images/profile.png';
import Empty from '../../assets/lotties/Empty.json';
import syncContacts from '../../functions/syncContacts';
import {Friends} from '../giveCards/GiveCardPage';
import * as S from './FriendManage.style';

const FriendManage = () => {
  const [friends, setFriends] = useState<Friends[]>([]);
  const [favorites, setFavorites] = useState<Friends[]>([]);

  const isFavorite = (item: Friends) => {
    return favorites.some(favorite => favorite.id === item.id);
  };

  const handleFavorite = async (item: Friends) => {
    if (isFavorite(item)) {
      setFavorites(prevFavorites =>
        prevFavorites.filter(favorite => favorite.id !== item.id),
      );
      await AsyncStorage.setItem(
        'favorite_contacts',
        JSON.stringify(favorites.filter(favorite => favorite.id !== item.id)),
      );
    } else {
      setFavorites(prevFavorites => [...prevFavorites, item]);
      await AsyncStorage.setItem(
        'favorite_contacts',
        JSON.stringify([...favorites, item]),
      );
    }
  };

  const renderLeftActions = (
    _: Animated.AnimatedInterpolation<string>, // progress
    dragX: Animated.AnimatedInterpolation<string>,
    item: Friends,
  ) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [0, 0, 0, 1],
    });

    return (
      <S.SwipeView>
        <RectButton
          onPress={() => handleFavorite(item)}
          style={style.rectButton}>
          <View style={style.view}>
            <Animated.Text
              style={[{transform: [{translateX: trans}]}, style.animatedText]}>
              {isFavorite(item) ? '즐겨찾기 해제' : '즐겨찾기 추가'}
            </Animated.Text>
          </View>
        </RectButton>
      </S.SwipeView>
    );
  };

  const handleSync = async () => {
    try {
      const friendsList = await syncContacts();
      setFriends(friendsList);
    } catch (error) {
      console.error(error);
    }
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

  return (
    <View>
      <S.SyncView>
        <S.TouchView onPress={handleSync}>
          <S.SyncText>연락처 동기화</S.SyncText>
          <Sync width={20} height={20} />
        </S.TouchView>
      </S.SyncView>
      <S.FriendView>
        <S.TitleView>
          <S.FriendText>친구목록</S.FriendText>
          {/* <AddView>
            <Friend1>
              <Text>그룹 추가</Text>
            </Friend1>
          </AddView> */}
        </S.TitleView>
        {friends.length === 0 ? (
          <View>
            <S.EmptyView>
              <S.EmptyText>
                Signature를 이용하고 있는 친구가 없습니다
              </S.EmptyText>
              <LottieView
                style={{width: 250, height: 250}}
                source={Empty}
                autoPlay
                loop
              />
            </S.EmptyView>
          </View>
        ) : (
          <ScrollView>
            <S.Favorite>즐겨찾기</S.Favorite>
            <S.ListArea2>
              {favorites.map(item => (
                <Swipeable
                  key={item.id}
                  renderRightActions={(progress, dragX) =>
                    renderLeftActions(progress, dragX, item)
                  }>
                  <S.ContactItem>
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
                </Swipeable>
              ))}
            </S.ListArea2>
            {/* <Group>그룹</Group>
            <ListArea2>
              <Thumbnail source={GroupImg} />
            </ListArea2> */}
            <S.FriendTitle>친구</S.FriendTitle>
            <S.ListArea>
              {friends.map(item => (
                <Swipeable
                  key={item.id}
                  renderRightActions={(progress, dragX) =>
                    renderLeftActions(progress, dragX, item)
                  }>
                  <S.ContactItem>
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
                </Swipeable>
              ))}
            </S.ListArea>
          </ScrollView>
        )}
      </S.FriendView>
    </View>
  );
};

const style = StyleSheet.create({
  rectButton: {},
  view: {},
  animatedText: {
    color: 'black',
    textAlign: 'center',
  },
});

export default FriendManage;
