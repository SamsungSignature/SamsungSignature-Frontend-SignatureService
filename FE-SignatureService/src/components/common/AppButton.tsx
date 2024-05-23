import {GestureResponderEvent, ImageSourcePropType} from 'react-native';
import {theme} from '../../assets/styles/theme';
import parseWithDefault from '../../functions/parseWithDefault';
import {
  ButtonImage,
  ButtonImageView,
  ButtonText,
  ButtonView,
  PressableView,
  Wrapper,
} from './AppButton.style';

interface AppButtonStyle {
  width?: string;
  backgroundColor?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  padding?: string;
  margin?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: string;
  imageSize?: string;
  imagePadding?: string;
  underlayColor?: string;
  rippleColor?: string;
}

interface AppButtonProps {
  text: string;
  style?: AppButtonStyle;
  image?: ImageSourcePropType;
  type?: 'pressable';
  onPress?: (e?: GestureResponderEvent) => void;
  disabled?: boolean;
}

const AppButton = ({
  text,
  image,
  type,
  style,
  onPress,
  disabled,
}: AppButtonProps) => {
  const defaultStyle: AppButtonStyle = {
    width: '100%',
    backgroundColor: theme.colors.googleblue,
    borderRadius: theme.radii.circle,
    borderWidth: '0px',
    borderColor: theme.colors.darkgray,
    padding: '10px 0',
    margin: '0',
    color: theme.colors.white,
    fontSize: theme.fontSizes[3],
    fontWeight: theme.fontWeights.semibold,
    textAlign: 'center',
    imageSize: '23px',
    imagePadding: '5px',
    underlayColor: theme.colors.lightergray,
    rippleColor: theme.colors.lightgray,
  };
  const parsedStyle = parseWithDefault(style, defaultStyle);
  const onPressed = ({pressed}: {pressed: boolean}) => ({
    backgroundColor: pressed
      ? parsedStyle.underlayColor
      : parsedStyle.backgroundColor,
  });

  if (type === 'pressable') {
    return (
      <Wrapper $style={parsedStyle}>
        <PressableView
          onPress={onPress}
          disabled={disabled}
          style={onPressed}
          android_ripple={{color: parsedStyle.rippleColor}}
          $style={parsedStyle}
          $disabled={disabled}>
          <>
            {image ? (
              <ButtonImageView $style={parsedStyle}>
                <ButtonImage
                  source={image}
                  $style={parsedStyle}
                  resizeMode="cover"
                />
              </ButtonImageView>
            ) : null}
            <ButtonText $style={parsedStyle}>{text}</ButtonText>
          </>
        </PressableView>
      </Wrapper>
    );
  }

  return (
    <ButtonView
      onPress={onPress}
      disabled={disabled}
      $style={parsedStyle}
      $disabled={disabled}>
      <>
        {image ? (
          <ButtonImageView $style={parsedStyle}>
            <ButtonImage
              source={image}
              $style={parsedStyle}
              resizeMode="cover"
            />
          </ButtonImageView>
        ) : null}
        <ButtonText $style={parsedStyle}>{text}</ButtonText>
      </>
    </ButtonView>
  );
};

export type {AppButtonStyle};
export default AppButton;
