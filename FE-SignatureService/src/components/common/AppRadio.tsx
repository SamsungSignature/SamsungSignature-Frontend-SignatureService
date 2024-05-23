import {Dispatch, SetStateAction} from 'react';
import {theme} from '../../assets/styles/theme';
import groupByRow from '../../functions/groupByRow';
import parseWithDefault from '../../functions/parseWithDefault';
import {
  ItemRadioView,
  ItemRow,
  ItemText,
  ItemView,
  ItemsView,
  Radio,
  RadioInner,
  Title,
  Wrapper,
} from './AppRadio.style';

interface AppRadioOption {
  columns?: number;
  link?: string[];
}

interface AppRadioStyle {
  titleColor?: string;
}

interface AppRadioProps {
  title?: string;
  items: string[];
  option?: AppRadioOption;
  style?: AppRadioStyle;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const AppRadio = ({
  title,
  items,
  option,
  style,
  value,
  setValue,
}: AppRadioProps) => {
  const defaultStyle: AppRadioStyle = {
    titleColor: theme.colors.darkgray,
  };
  const parsedStyle = parseWithDefault(style, defaultStyle);
  const defaultOption: AppRadioOption = {
    columns: 1,
  };
  const parsedOption = parseWithDefault(option, defaultOption);

  // 줄 구분
  const groupedItems = groupByRow(items, parsedOption.columns ?? 1);

  // 클릭 시
  const onPressed = ({pressed}: {pressed: boolean}) => ({
    backgroundColor: pressed ? theme.colors.lightergray : 'transparent',
  });

  return (
    <Wrapper>
      {title && <Title $style={parsedStyle}>{title}</Title>}
      <ItemsView>
        {groupedItems.map((row, idx) => (
          <ItemRow key={idx}>
            {row.map(item => (
              <ItemView key={item}>
                <ItemRadioView onPress={() => setValue(item)} style={onPressed}>
                  <Radio $selected={value === item}>
                    {value === item && <RadioInner />}
                  </Radio>
                </ItemRadioView>
                <ItemText>{item}</ItemText>
              </ItemView>
            ))}
          </ItemRow>
        ))}
      </ItemsView>
    </Wrapper>
  );
};

export type {AppRadioStyle};
export default AppRadio;
