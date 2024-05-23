import {theme} from '../../assets/styles/theme';
import {AppButtonStyle} from '../../components/common/AppButton';

const TO_LOGIN: AppButtonStyle = {
  backgroundColor: 'transparent',
  color: theme.colors.lightgray,
  fontSize: theme.fontSizes[3],
  fontWeight: theme.fontWeights.semibold,
  borderColor: theme.colors.lightgray,
  borderWidth: '1px',
  padding: '10px 20px',
  textAlign: 'left',
};

const SOCIAL_LOGIN: AppButtonStyle = {
  backgroundColor: theme.colors.googleblue,
  fontSize: theme.fontSizes[3],
  fontWeight: theme.fontWeights.semibold,
  padding: '5px',
};

const QR_LOGIN: AppButtonStyle = {
  backgroundColor: theme.colors.lightergray,
  color: theme.colors.black,
  fontWeight: theme.fontWeights.bold,
  padding: '5px',
};

const SERVICE: AppButtonStyle = {
  backgroundColor: theme.colors.lightergray,
  color: theme.colors.black,
  fontWeight: theme.fontWeights.bold,
};

const SMALL: AppButtonStyle = {
  width: '60%',
  backgroundColor: theme.colors.googleblue,
};

const GRAY_SQUARE: AppButtonStyle = {
  color: theme.colors.black,
  fontWeight: theme.fontWeights.bold,
  backgroundColor: theme.colors.lightergray,
  borderRadius: theme.radii.button,
};

const TRANSPARENT: AppButtonStyle = {
  fontWeight: theme.fontWeights.normal,
  backgroundColor: theme.colors.transparent,
  borderRadius: theme.radii.circle,
  color: theme.colors.black,
};

interface ButtonStyles {
  TO_LOGIN: AppButtonStyle;
  SOCIAL_LOGIN: AppButtonStyle;
  QR_LOGIN: AppButtonStyle;
  SERVICE: AppButtonStyle;
  SMALL: AppButtonStyle;
  GRAY_SQUARE: AppButtonStyle;
  TRANSPARENT: AppButtonStyle;
}

const BUTTONS: ButtonStyles = {
  TO_LOGIN,
  SOCIAL_LOGIN,
  QR_LOGIN,
  SERVICE,
  SMALL,
  GRAY_SQUARE,
  TRANSPARENT,
};

export default BUTTONS;
