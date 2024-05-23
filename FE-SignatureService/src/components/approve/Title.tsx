import {StyleSheet, Text, View} from 'react-native';
import styled from 'styled-components/native';
import {theme} from '../../assets/styles/theme';

const Wrapper = styled.View`
  background: ${theme.colors.background};
  justify-content: center;
  border-radius: 0 0 24px 24px;
  padding: ${theme.space[3]};
  gap: ${theme.space[2]};
`;

const TitleText = styled.Text`
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes[4]};
`;

const Hightlight = styled.Text`
  font-weight: ${theme.fontWeights.semibold};
`;

interface TitleProps {
  from?: string;
}

const Title = ({from}: TitleProps) => {
  return (
    <Wrapper style={styles.shadow}>
      <View>
        <TitleText>
          <Hightlight>{from}님</Hightlight>의
        </TitleText>
        <TitleText>대리 결제 요청</TitleText>
      </View>
      <Text>금액과 조건을 확인하세요!</Text>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  shadow: {
    elevation: 2,
  },
});

export default Title;
