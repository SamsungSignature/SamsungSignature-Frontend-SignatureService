import {Dispatch, SetStateAction} from 'react';
import AppRadio from '../../common/AppRadio';
import {BudgetLink, Wrapper} from './MobileCarrier.stlye';

interface MobileCarrierProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const MobileCarrier = ({value, setValue}: MobileCarrierProps) => {
  const mobileCarriers = [
    'SKT',
    'KT',
    'LGU+',
    'SKT 알뜰폰',
    'KT 알뜰폰',
    'LGU+ 알뜰폰',
  ];

  return (
    <Wrapper>
      <AppRadio
        value={value}
        setValue={setValue}
        title="이동통신사"
        items={mobileCarriers}
        option={{columns: 2}}
      />
      <BudgetLink>알뜰폰 통신사별 분류</BudgetLink>
    </Wrapper>
  );
};

export default MobileCarrier;
