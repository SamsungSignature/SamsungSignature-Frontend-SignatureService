import {Dispatch, RefObject, SetStateAction, useEffect, useState} from 'react';
import {
  ImageSourcePropType,
  KeyboardType,
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
} from 'react-native';
import {WithLocalSvg} from 'react-native-svg/css';
import IconPath from '../../assets/iconPath';
import {theme} from '../../assets/styles/theme';
import parseWithDefault from '../../functions/parseWithDefault';
import useHoverUpAnimation from '../../hooks/useHoverUpAnimation';
import useSlideOpenAnimation from '../../hooks/useSlideOpenAnimation';
import {
  Input,
  InputIcon,
  InputView,
  Title,
  TitleView,
  Wrapper,
} from './AppInput.style';
import AppInputBorder from './AppInputBorder';

interface AppInputStyle {
  titleColor?: string;
  titleWeight?: string;
  focusColor?: string;
  color?: string;
  fontSize?: string;
  padding?: string;
  disableFocus?: boolean;
}

interface AppInputProps {
  reference?: RefObject<TextInput>;
  value: string;
  setValue?: Dispatch<SetStateAction<string>>;
  style?: AppInputStyle;
  title?: string;
  placeholder?: string;
  icon?: ImageSourcePropType;
  onPressIcon?: () => void;
  onFocus?: () => void;
  type?: 'hoverUp';
  maxLength?: number;
  textAlign?: 'center';
  keyboardType?: KeyboardType;
  secureTextEntry?: boolean;
  offIcon?: boolean;
  disabled?: boolean;
}

const AppInput = ({
  reference,
  value,
  setValue,
  style,
  title,
  placeholder,
  icon,
  onPressIcon,
  onFocus,
  type,
  maxLength,
  textAlign,
  keyboardType,
  secureTextEntry = false,
  offIcon = false,
  disabled = false,
}: AppInputProps) => {
  if (icon && secureTextEntry) {
    throw new Error('비밀번호에는 아이콘을 함께 사용할 수 없습니다.');
  } else if (type === 'hoverUp' && !(!title || !placeholder)) {
    throw new Error('HoverUp 타입은 제목과 안내문구를 함께쓸 수 없습니다.');
  }

  // 스타일
  const defaultStyle: AppInputStyle = {
    titleColor: theme.colors.gray,
    titleWeight: theme.fontWeights.normal,
    color: theme.colors.black,
    focusColor: theme.colors.googleblue,
    fontSize: theme.fontSizes[2],
    padding: '2px 0',
    disableFocus: false,
  };
  const parsedStyle = parseWithDefault(style, defaultStyle);

  // 입력값
  const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setValue && setValue(e.nativeEvent.text);
  };

  // 포커스 동작
  const [isFocus, setIsFocus] = useState(false);
  const {left, right, open, close} = useSlideOpenAnimation();
  const {Y, up, down} = useHoverUpAnimation();
  const handleFocus = () => {
    onFocus && onFocus();
    if (!parsedStyle.disableFocus) {
      open();
      setIsFocus(true);
      if (type === 'hoverUp') {
        up();
      }
    }
  };
  const onBlur = () => {
    if (!parsedStyle.disableFocus) {
      close();
      setIsFocus(false);
      if (type === 'hoverUp' && !value) {
        down();
      }
    }
  };
  useEffect(() => {
    if (value) {
      up();
    }
  }, []);

  // 비밀번호 보임/숨김
  const [hidden, setHidden] = useState<boolean>(secureTextEntry);
  const onPress = () => {
    setHidden(!hidden);
  };
  const onPressed = ({pressed}: {pressed: boolean}) => ({
    backgroundColor: pressed ? theme.colors.lightergray : 'transparent',
  });
  const onIconPressed = ({pressed}: {pressed: boolean}) => ({
    opacity: pressed ? 0.5 : 1,
  });

  return (
    <Wrapper $type={type}>
      {title && (
        <TitleView $type={type} style={{transform: [{translateY: Y}]}}>
          <Title
            $style={parsedStyle}
            $isFocus={isFocus}
            $type={type}
            $isValue={!!value}>
            {title}
          </Title>
        </TitleView>
      )}
      <InputView $style={parsedStyle} $isFocus={isFocus}>
        <Input
          ref={reference}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={onBlur}
          textAlign={textAlign}
          keyboardType={keyboardType}
          secureTextEntry={hidden}
          maxLength={maxLength}
          editable={!disabled}
          selectTextOnFocus={!disabled}
          $style={parsedStyle}
        />
        {secureTextEntry && !offIcon && (
          <InputIcon onPress={onPress} style={onPressed}>
            {hidden ? <IconPath.invisible /> : <IconPath.visible />}
          </InputIcon>
        )}
        {icon && (
          <InputIcon onPress={onPressIcon} style={onIconPressed}>
            <WithLocalSvg asset={icon} fill={theme.colors.gray} />
          </InputIcon>
        )}
        <AppInputBorder left={left} right={right} style={parsedStyle} />
      </InputView>
    </Wrapper>
  );
};

export type {AppInputStyle};
export default AppInput;
