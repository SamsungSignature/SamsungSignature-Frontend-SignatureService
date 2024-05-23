import {Dimensions, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {theme} from '../../assets/styles/theme';

const {colors, fontSizes} = theme;
const windowHeight = Dimensions.get('window').height;

export const ContactItem = styled.TouchableOpacity<{selected: boolean}>`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: 15px;
  margin-bottom: 2px;
  margin-left: 15px;
  background-color: ${({selected}) => (selected ? '#e0e0e0' : 'transparent')};
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

export const RequestMessage = styled.Text`
  font-size: 16px;
  color: black;
  font-size: 18px;
`;

export const RequestView = styled.View`
  display: flex;
  align-items: left;
  padding: 20px;
  margin-bottom: 5px;
  background-color: white;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
`;

export const FriendView = styled.View`
  flex: 1;
  background-color: white;
  border-radius: 30px;
  padding-bottom: 5px;
`;

export const BoldText = styled.Text`
  font-weight: bold;
  color: black;
`;

export const MessageContainer = styled.View`
  display: flex;
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ListArea = styled.ScrollView`
  display: flex;
  overflow-y: scroll;
  /* height: 400px; */
  height: ${windowHeight * 0.5}px;
`;

export const ContactInfo = styled.View`
  padding-left: 15px;
`;

export const NameView = styled.View`
  display: flex;
  flex-direction: row;
`;

export const NextButton = styled(TouchableOpacity)`
  background-color: ${colors.samsungBlue};
  width: 280px;
  height: 40px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  margin: 10px;
  justify-content: center;
  align-self: center;
`;

export const NextText = styled.Text`
  color: ${colors.white};
  font-size: 18px;
  font-weight: bold;
`;

export const NoContactsMessage = styled.Text`
  color: ${colors.black};
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const NoContactsView = styled.View`
  display: flex;
  height: 350px;
  align-items: center;
`;

export const SumView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2% 6%;
`;

export const SumText1 = styled.Text`
  color: ${colors.black};
  font-size: ${fontSizes[2]};
`;

export const SumText2 = styled.Text`
  color: ${colors.black};
  font-size: ${fontSizes[2]};
  align-self: right;
  margin-right: 5px;
`;

export const CheckView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const IconView = styled.View`
  display: flex;
  justify-content: center;
`;

export const ViewInfo = styled.View`
  display: flex;
  flex-direction: row;
`;

export const ViewIcon = styled.View``;

export const DropDownView = styled.View`
  width: 100px;
  display: flex;
`;

export const FView = styled.View`
  margin-bottom: 2%;
  padding: 1.5%;
  width: 100%;
  background-color: ${theme.colors.lightGray};
`;

export const FText = styled.Text`
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes[1]};
  font-family: ${theme.fonts.samsungB};
`;

export const ButtonView = styled.View`
  padding: 5% 0;
`;
