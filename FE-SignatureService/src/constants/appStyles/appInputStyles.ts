import {theme} from '../../assets/styles/theme';
import {AppInputStyle} from '../../components/common/AppInput';

const SIGNUP_INPUT: AppInputStyle = {
  titleColor: theme.colors.darkgray,
  titleWeight: theme.fontWeights.medium,
  focusColor: theme.colors.googleblue,
};

interface InputStyles {
  SIGNUP_INPUT: AppInputStyle;
}

const INPUTS: InputStyles = {
  SIGNUP_INPUT,
};

export default INPUTS;
