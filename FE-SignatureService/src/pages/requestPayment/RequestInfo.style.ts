import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {theme} from '../../assets/styles/theme';

const {colors, fonts, fontSizes} = theme;

export const MessageView = styled.View`
  display: flex;
  align-items: left;
  background-color: white;
  padding: 20px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  margin-bottom: 5px;
`;

export const MessageText = styled.Text`
  font-size: ${fontSizes[4]};
  color: black;
  font-family: ${fonts.samsungR};
`;

export const MessageSubText = styled.Text`
  margin-top: 5px;
`;

export const BoldText = styled.Text`
  font-weight: bold;
  color: black;
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
  bottom: 15px;
`;

export const NextText = styled.Text`
  color: ${colors.white};
  font-size: 18px;
  font-family: ${fonts.samsungB};
`;

export const InfoArea = styled.View`
  flex: 1;
  background-color: ${colors.white};
  border-radius: 30px;
  margin-bottom: 60px;
`;

export const Amount = styled.View`
  display: flex;
  padding: 20px;
`;

export const StyledTextInput = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray};
`;

export const Detail = styled.View`
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
`;

export const DetailButton = styled(TouchableOpacity)`
  padding-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const DetailText = styled.Text`
  font-size: ${fontSizes[2]};
  color: black;
  font-family: ${fonts.samsungR};
  margin-top: 10px;
`;

export const IconWrapper = styled.View`
  margin-right: 20px;
`;

export const CheckView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  padding-top: 90px;
`;

export const NameText = styled.Text`
  font-size: ${fontSizes[2]};
  color: black;
  font-family: ${fonts.samsungR};
`;
