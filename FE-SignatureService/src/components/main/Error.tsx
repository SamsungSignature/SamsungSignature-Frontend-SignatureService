import {QueryObserverResult, RefetchOptions} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {GetDelegatedCardsResponse} from '../../api/delegated/useGetDelegatedCards';
import {theme} from '../../assets/styles/theme';
import {Title, Wrapper} from './Common.stlye';
import {
  ReloadButton,
  ReloadSkeleton,
  ReloadText,
  ReloadView,
} from './Error.style';

interface ErrorProps {
  refetch: (
    options?: RefetchOptions,
  ) => Promise<
    QueryObserverResult<AxiosResponse<GetDelegatedCardsResponse, null>, Error>
  >;
}

const Error = ({refetch}: ErrorProps) => {
  const pressableStyle = ({pressed}: {pressed: boolean}) => ({
    backgroundColor: pressed ? theme.colors.blue : theme.colors.samsungblue,
  });

  return (
    <Wrapper>
      <Title>카드 목록 불러오기에 실패했습니다</Title>
      <ReloadView>
        <ReloadSkeleton>
          <ReloadButton
            onPress={() => refetch()}
            style={pressableStyle}
            android_ripple={{color: theme.colors.samsungblue}}>
            <ReloadText>다시 불러오기</ReloadText>
          </ReloadButton>
        </ReloadSkeleton>
      </ReloadView>
    </Wrapper>
  );
};

export default Error;
