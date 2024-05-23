import styled from 'styled-components/native';
import {theme} from '../../assets/styles/theme';
import STYLES from '../../constants/appStyles';
import AppButton from '../common/AppButton';

const BtnBox = styled.View`
  flex-direction: row;
  padding: ${theme.space[2]} ${theme.space[3]};
  gap: ${theme.space[2]};
`;

const BtnView = styled.View`
  flex: 1;
`;

interface ButtonsProps {
  type?: boolean;
  onPress: (props: 'left' | 'right' | 'center') => void;
  text1?: string;
  text2?: string;
}

const Buttons = ({
  type,
  onPress,
  text1 = type ? '확인' : '거절',
  text2 = '다음',
}: ButtonsProps) => {
  if (type) {
    return (
      <BtnBox>
        <BtnView>
          <AppButton
            text={text1}
            style={STYLES.BUTTONS.TRANSPARENT}
            type="pressable"
            onPress={() => onPress('center')}
          />
        </BtnView>
      </BtnBox>
    );
  }

  return (
    <BtnBox>
      <BtnView>
        <AppButton
          text={text1}
          style={{...STYLES.BUTTONS.TRANSPARENT, color: theme.colors.darkgray}}
          type="pressable"
          onPress={() => onPress('left')}
        />
      </BtnView>
      <BtnView>
        <AppButton
          text={text2}
          style={{
            ...STYLES.BUTTONS.TRANSPARENT,
            color: theme.colors.darkgray,
          }}
          type="pressable"
          onPress={() => onPress('right')}
        />
      </BtnView>
    </BtnBox>
  );
};

export default Buttons;
