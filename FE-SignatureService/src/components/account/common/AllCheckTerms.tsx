import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import STYLES from '../../../constants/appStyles';
import TERMS from '../../../constants/terms';
import createCheckArray from '../../../functions/createCheckArray';
import AppCheckbox from '../../common/AppCheckbox';
import {
  AllCheckText,
  AllCheckView,
  TermsView,
  Wrapper,
} from './AllCheckTerms.style';
import Term from './Term';
import {CheckboxView} from './Term.style';

interface TermsProps {
  setAgreement: Dispatch<SetStateAction<boolean>>;
  termChecks: boolean[];
  setTermChecks: Dispatch<SetStateAction<boolean[]>>;
}

const Terms = ({setAgreement, termChecks, setTermChecks}: TermsProps) => {
  // 모두 동의하기
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (checked) {
      setTermChecks(createCheckArray(TERMS.ID_VERIFY.length, {fillTrue: true}));
    } else if (!termChecks.some(item => !item)) {
      setTermChecks(createCheckArray(TERMS.ID_VERIFY.length));
    }
  }, [checked]);

  // 동의 체크 해제
  useEffect(() => {
    if (!termChecks.some(item => !item)) {
      setAgreement(true);
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [termChecks]);

  return (
    <Wrapper>
      <TermsView>
        {TERMS.ID_VERIFY.map((term, idx) => (
          <Term
            key={term.title}
            idx={idx}
            term={term}
            checked={termChecks[idx]}
            setChecks={setTermChecks}
          />
        ))}
      </TermsView>
      <AllCheckView>
        <CheckboxView>
          <AppCheckbox
            checked={checked}
            setChecked={setChecked}
            style={STYLES.CHECKBOX.SMALL}
          />
        </CheckboxView>
        <AllCheckText>모두 동의하기</AllCheckText>
      </AllCheckView>
    </Wrapper>
  );
};

export default Terms;
