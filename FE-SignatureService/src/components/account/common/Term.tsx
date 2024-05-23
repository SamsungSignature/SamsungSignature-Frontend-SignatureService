import {Dispatch, SetStateAction} from 'react';
import {Alert} from 'react-native';
import {Term as TermType} from '../../../constants/terms';
import AppCheckbox from '../../common/AppCheckbox';
import {
  CheckboxView,
  Optional,
  Title,
  TitleView,
  ToDetail,
  Wrapper,
} from './Term.style';

interface TermProps {
  term: TermType;
  idx: number;
  checked: boolean;
  setChecks: Dispatch<SetStateAction<boolean[]>>;
}

const Term = ({term, idx, checked, setChecks}: TermProps) => {
  const {title, titleLink, detail, content, isOptional} = term;
  const setChecked = () => {
    setChecks(prev => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  // 네비게이션
  const toDetail = () => {
    if (detail === 'noService') {
      Alert.alert('지원하지 않는 기능입니다');
    }
  };
  const pressTitle = () => {
    if (!titleLink) {
      return;
    }
    toDetail();
  };

  return (
    <Wrapper>
      <TitleView>
        <CheckboxView>
          <AppCheckbox checked={checked} setChecked={setChecked} />
        </CheckboxView>
        <Title $titleLink={!!titleLink} numberOfLines={2} onPress={pressTitle}>
          {title} {isOptional && <Optional>(선택)</Optional>}
        </Title>
      </TitleView>
      {!titleLink && <ToDetail onPress={toDetail}>자세히 보기</ToDetail>}
      {content}
    </Wrapper>
  );
};

export default Term;
