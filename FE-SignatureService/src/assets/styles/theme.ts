export type SpaceTokens = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type Space = Record<SpaceTokens, string>;

const space = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '16px',
  4: '32px',
  5: '64px',
  6: '128px',
};

// add negative margins
Object.assign(
  space,
  Object.entries(space).reduce(
    (a, [key, val]) => ({
      ...a,
      [-1 * Number(key)]: `-${val}`,
    }),
    {},
  ),
);

const colors = {
  samsungBlue: '#1428A0', // 삼성 블루
  gray: '#9B9B9B', // 짙은 회색
  lightGray: '#EDEDED', // 옅은 회색
  white: '#FFFFFF',
  black: '#000000',
  limeGreen: '#32CD32', // 라임 초록색
  red: '#F32424', // 빨간색
  blue: '#6F83FF', // 파란색
  background: '#F9FAFD',
  lightbackground: '#F3F5F5',

  // Account 색상들
  darkgray: '#2f2f2f',
  lightgray: '#b3b3b3',
  lightergray: '#dedede',
  lightblue: '#94c3d7',
  googleblue: '#4285f2',
  samsungblue: '#1428A0',
  transparent: 'transparent',
};

const fontSizes = {
  0: '12px',
  1: '14px',
  2: '16px',
  3: '18px',
  4: '24px',
  5: '32px',
  6: '48px',
  7: '64px',
};

const fontWeights = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
};

const fonts = {
  samsungR: 'SamsungSans-Regular',
  samsungB: 'SamsungSans-Bold',
};

const sizes = {
  container: '1280px',
  narrow: '1024px',
  wide: '1440px',
  tight: '848px',
  avatar: '48px',
  navGroupBoxMin: '300px',
  navGroupBoxMax: '400px',
  navIcon: '32px',
  navIconSmall: '30px',
};

export type Radii = 'button' | 'large' | 'circle';

const radii: Record<Radii, string> = {
  button: '10px',
  large: '24px',
  circle: '99999px',
};

export const theme = {
  colors,
  space,
  fontSizes,
  fontWeights,
  fonts,
  sizes,
  radii,
};
