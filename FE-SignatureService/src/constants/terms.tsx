import styled from 'styled-components/native';
import {theme} from '../assets/styles/theme';

const ContentText = styled.Text`
  width: 100%;
  line-height: 21px;
`;

const ContentLink = styled.Text`
  text-decoration: underline;
  font-weight: ${theme.fontWeights.medium};
`;

interface Term {
  title: string;
  titleLink?: boolean;
  detail?: string;
  content?: JSX.Element;
  isOptional?: true;
}

const SIGNIN: Term[] = [
  {
    title: '이용약관',
    detail: 'noService',
  },
  {
    title: '특별 약관',
    detail: 'noService',
  },
  {
    title: '개인정보 수집 및 이용',
    detail: 'noService',
  },
  {
    title: '삼성 맞춤형 서비스 이용하기',
    detail: 'noService',
    content: (
      <ContentText>
        내 관심사와 위치를 기반으로 맞춤 콘텐츠와 추천 제안(광고 및 직접 마케팅
        포함)을 받아보세요. <ContentLink>개인정보 설정</ContentLink>
        에서 데이터별로 서용 여부를 변경할 수 있습니다.
      </ContentText>
    ),
  },
  {
    title: '오프라인 찾기를 위한 개인정보 수집·이용',
    detail: 'noService',
    content: (
      <ContentText>
        디바이스가 네트워크에 연결되어 있지 않아도 해당 디바이스 위치를 찾을 수
        있습니다.
      </ContentText>
    ),
    isOptional: true,
  },
];

const SIGNUP: Term[] = [
  {
    title: '이용약관',
    detail: 'noService',
  },
  {
    title: '특별 약관',
    detail: 'noService',
  },
  {
    title: '개인정보 수집 및 이용',
    detail: 'noService',
  },
  {
    title: '삼성 맞춤형 서비스 이용하기',
    detail: 'noService',
    content: (
      <ContentText>
        내 관심사와 위치를 기반으로 맞춤 콘텐츠와 추천 제안(광고 및 직접 마케팅
        포함)을 받아보세요. <ContentLink>개인정보 설정</ContentLink>
        에서 데이터별로 서용 여부를 변경할 수 있습니다.
      </ContentText>
    ),
  },
  {
    title: '오프라인 찾기를 위한 개인정보 수집·이용',
    detail: 'noService',
    content: (
      <ContentText>
        디바이스가 네트워크에 연결되어 있지 않아도 해당 디바이스 위치를 찾을 수
        있습니다.
      </ContentText>
    ),
    isOptional: true,
  },
];

const ID_VERIFY: Term[] = [
  {
    title: '개인정보 수집 및 이용',
    titleLink: true,
    detail: 'noService',
  },
  {
    title: '연결 정보 사용',
    titleLink: true,
    detail: 'noService',
  },
  {
    title: '서비스 공급자 이용약관',
    titleLink: true,
    detail: 'noService',
  },
  {
    title: '이용약관',
    titleLink: true,
    detail: 'noService',
  },
];

interface Terms {
  [key: string]: Term[];
  SIGNIN: Term[];
  SIGNUP: Term[];
  ID_VERIFY: Term[];
}

const TERMS: Terms = {
  SIGNIN,
  SIGNUP,
  ID_VERIFY,
};

export type {Term};
export default TERMS;
