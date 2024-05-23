import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import AppBackButton from './AppBackButton';
import {
  LeftView,
  RightView,
  Title,
  TitleView,
  Wrapper,
} from './AppHeader.style';
// import {Header} from '@react-navigation/elements'

type HeaderStyle = {backgroundColor?: string; height?: number};

const AppHeader = (props: NativeStackHeaderProps) => {
  // headerLeft
  const headerLeft = props.options.headerLeft;
  const canGoBack = props.navigation.canGoBack();
  const leftButton = headerLeft
    ? headerLeft({canGoBack})
    : AppBackButton({canGoBack});

  // title
  const customTitle = props.options.headerTitle;
  const title = props.options.title ? props.options.title : props.route.name;
  const headerTintColor = props.options.headerTintColor;
  const headerStyle = props.options.headerStyle as HeaderStyle;

  const headerTitle =
    typeof customTitle !== 'function'
      ? () => <Title $isLeft={canGoBack}>{title}</Title>
      : customTitle;

  // headerRight
  const headerRight = props.options.headerRight;
  const rightButton = headerRight ? headerRight({canGoBack}) : null;

  return (
    <Wrapper $headerStyle={headerStyle}>
      <LeftView>{leftButton}</LeftView>
      <TitleView>
        {headerTitle({
          children: title,
          tintColor: headerTintColor,
        })}
      </TitleView>
      <RightView>{rightButton}</RightView>
    </Wrapper>
  );
};

export type {HeaderStyle};
export default AppHeader;
