import styled from 'styled-components/native';
import {theme} from '../../assets/styles/theme';

const {colors, fontSizes} = theme;

export const SyncView = styled.View`
  background-color: ${colors.white};
  display: flex;
  justify-content: center;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
`;

export const TouchView = styled.TouchableOpacity`
  height: auto;
  display: flex;
  margin-top: 5px;
  margin-bottom: 10px;
  padding-right: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const SyncText = styled.Text`
  font-size: ${fontSizes[2]};
  color: ${colors.black};
  margin-right: 10px;
  padding-top: 5px;
  padding-bottom: 3px;
`;

export const FriendView = styled.View`
  background-color: ${colors.white};
  height: auto;
  display: flex;
  /* padding: 20px; */
  margin-top: 3px;
  margin-bottom: 10px;
  border-radius: 30px;
  height: 100%;
`;

export const FriendText = styled.Text`
  font-weight: bold;
  font-size: ${fontSizes[3]};
  color: ${colors.black};
`;

export const TitleView = styled.View`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

// const AddView = styled.View`
//   display: flex;
//   flex-direction: row;
//   align-self: flex-end;
// `;

// const Friend1 = styled.TouchableOpacity`
//   font-size: ${fontSizes[2]};
//   color: ${colors.black};
//   padding: 5px;
//   border-color: ${colors.gray};
//   border-radius: 10px;
// `;

export const ContactItem = styled.TouchableOpacity`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  display: flex;
  flex-direction: row;
`;

export const EmptyView = styled.View`
  display: flex;
  align-items: center;
  margin-top: 70px;
`;

export const EmptyText = styled.Text`
  font-size: ${fontSizes[3]};
  color: ${colors.darkgray};
`;

export const ContactName = styled.Text`
  font-size: 18px;
  margin-right: 5px;
`;

export const ContactPhoneNumber = styled.Text`
  font-size: 16px;
  color: #666;
`;

export const Thumbnail = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const ListArea = styled.ScrollView`
  display: flex;
  /* overflow-y: scroll; */
  height: 430px;
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 10px;
`;

export const ListArea2 = styled.View`
  display: flex;
  overflow-y: scroll;
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

export const ContactInfo = styled.View`
  padding-left: 15px;
`;

export const NameView = styled.View`
  display: flex;
  flex-direction: row;
`;

export const Favorite = styled.Text`
  font-size: ${fontSizes[3]};
  color: ${colors.black};
  padding-left: 20px;
`;

// const Group = styled.Text`
//   font-size: ${fontSizes[3]};
//   color: ${colors.black};
//   padding-left: 20px;
// `;

export const FriendTitle = styled.Text`
  font-size: ${fontSizes[3]};
  color: ${colors.black};
  padding-left: 20px;
`;

export const SwipeView = styled.View`
  display: flex;
  width: 60px;
  justify-content: center;
  align-items: center;
`;
