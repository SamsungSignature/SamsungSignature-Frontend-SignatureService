import {LogoText} from './Logo.style';

interface Option {
  size: 'small';
}

interface LogoProps {
  option?: Option;
}

const Logo = ({option}: LogoProps) => {
  return <LogoText $option={option}>SAMSUNG Account</LogoText>;
};

export type {Option};
export default Logo;
