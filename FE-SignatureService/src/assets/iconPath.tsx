import {SvgProps} from 'react-native-svg';
import Alarm from './icons/alarm.svg';
import ArrowDown from './icons/arrow-down.svg';
import ArrowUp from './icons/arrow-up.svg';
import Bell from './icons/bell.svg';
import Camera from './icons/camera.svg';
import Check from './icons/check.svg';
import Chevron from './icons/chevron.svg';
import Contact from './icons/contact.svg';
import CreditCard from './icons/credit-card.svg';
import History from './icons/history.svg';
import Invisible from './icons/invisible.svg';
import More from './icons/more.svg';
import Plus from './icons/plus.svg';
import Question from './icons/question.svg';
import Request from './icons/request.svg';
import Search from './icons/search.svg';
import Visible from './icons/visible.svg';
import Wallet from './icons/wallet.svg';

interface IconPathType {
  [key: string]: (props?: SvgProps) => JSX.Element;
  alarm: (props?: SvgProps) => JSX.Element;
  'arrow-down': (props?: SvgProps) => JSX.Element;
  'arrow-up': (props?: SvgProps) => JSX.Element;
  bell: (props?: SvgProps) => JSX.Element;
  camera: (props?: SvgProps) => JSX.Element;
  check: (props?: SvgProps) => JSX.Element;
  chevron: (props?: SvgProps) => JSX.Element;
  contact: (props?: SvgProps) => JSX.Element;
  'credit-card': (props?: SvgProps) => JSX.Element;
  history: (props?: SvgProps) => JSX.Element;
  invisible: (props?: SvgProps) => JSX.Element;
  more: (props?: SvgProps) => JSX.Element;
  plus: (props?: SvgProps) => JSX.Element;
  question: (props?: SvgProps) => JSX.Element;
  request: (props?: SvgProps) => JSX.Element;
  search: (props?: SvgProps) => JSX.Element;
  visible: (props?: SvgProps) => JSX.Element;
  wallet: (props?: SvgProps) => JSX.Element;
}

const IconPath: IconPathType = {
  alarm: (props?: SvgProps) => <Alarm {...props} />,
  'arrow-down': (props?: SvgProps) => <ArrowDown {...props} />,
  'arrow-up': (props?: SvgProps) => <ArrowUp {...props} />,
  bell: (props?: SvgProps) => <Bell {...props} />,
  camera: (props?: SvgProps) => <Camera {...props} />,
  check: (props?: SvgProps) => <Check {...props} />,
  chevron: (props?: SvgProps) => <Chevron {...props} />,
  contact: (props?: SvgProps) => <Contact {...props} />,
  'credit-card': (props?: SvgProps) => <CreditCard {...props} />,
  history: (props?: SvgProps) => <History {...props} />,
  invisible: (props?: SvgProps) => <Invisible {...props} />,
  more: (props?: SvgProps) => <More {...props} />,
  plus: (props?: SvgProps) => <Plus {...props} />,
  question: (props?: SvgProps) => <Question {...props} />,
  request: (props?: SvgProps) => <Request {...props} />,
  search: (props?: SvgProps) => <Search {...props} />,
  visible: (props?: SvgProps) => <Visible {...props} />,
  wallet: (props?: SvgProps) => <Wallet {...props} />,
};

export default IconPath;
