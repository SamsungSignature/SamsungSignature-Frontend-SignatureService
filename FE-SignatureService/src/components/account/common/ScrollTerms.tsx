import {Dispatch, SetStateAction} from 'react';
import TERMS from '../../../constants/terms';
import AppCheckbox from '../../common/AppCheckbox';
import {
  AgreeText,
  AgreeView,
  CheckboxView,
  Content,
  TermsView,
  Title,
} from './ScrollTerms.style';
import Term from './Term';

interface TermsProps {
  title?: string;
  terms: string;
  agreement: boolean;
  setAgreement: Dispatch<SetStateAction<boolean>>;
  termChecks: boolean[];
  setTermChecks: Dispatch<SetStateAction<boolean[]>>;
}

const ScrollTerms = ({
  title,
  terms,
  agreement,
  setAgreement,
  termChecks,
  setTermChecks,
}: TermsProps) => {
  return (
    <>
      <Content>
        <TermsView>
          {title && <Title>{title}</Title>}
          {TERMS[terms].map((term, idx) => (
            <Term
              key={idx}
              term={term}
              idx={idx}
              checked={termChecks[idx]}
              setChecks={setTermChecks}
            />
          ))}
        </TermsView>
      </Content>
      <AgreeView>
        <CheckboxView>
          <AppCheckbox checked={agreement} setChecked={setAgreement} />
        </CheckboxView>
        <AgreeText>위의 내용을 모두 읽었으며 이에 동의합니다.</AgreeText>
      </AgreeView>
    </>
  );
};

export default ScrollTerms;
