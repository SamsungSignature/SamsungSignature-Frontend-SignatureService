import SelectAgeButtons from '../../components/account/SelectAgeButtons';
import Title from '../../components/account/common/Title';
import {Wrapper} from './Common.style';

const SelectAge = () => {
  return (
    <Wrapper>
      <Title />
      <SelectAgeButtons />
    </Wrapper>
  );
};

export default SelectAge;
