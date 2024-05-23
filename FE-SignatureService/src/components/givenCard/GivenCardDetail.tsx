import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {AxiosError, AxiosResponse} from 'axios';
import {TouchableWithoutFeedback, View} from 'react-native';
import useGetGivenCardDetail from '../../api/given/useGetGivenCardDetail';
import imagePath from '../../assets/imagePath';
import Loading from '../common/Loading';
import useDeleteCard, {
  DeleteCardResponse,
} from './../../api/given/useDeleteCard';
import CardAuthorSwitch from './CardAuthorSwitch';
import * as S from './GivenCardDetail.style';

type GivenCardDetailProps = {
  cardNum: number;
};

const GivenCardDetail = ({cardNum}: GivenCardDetailProps) => {
  const queryClient = useQueryClient();
  const getCardDetail = useGetGivenCardDetail(cardNum);
  const deleteCard = useDeleteCard();

  const {isLoading: getCardDetailLoading, data: getCardDetailData} = useQuery({
    queryKey: ['get-given-card', cardNum],
    queryFn: () => getCardDetail(),
  });

  const mutation = useMutation<
    AxiosResponse<DeleteCardResponse>,
    AxiosError<BaseResponse<null>>,
    number
  >({
    mutationKey: ['delete-card'],
    mutationFn: given_card_id => deleteCard(given_card_id),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({queryKey: ['get-given-card']});
        queryClient.invalidateQueries({queryKey: ['get-given-cards']});
      }, 800);
    },
  });

  if (getCardDetailLoading) {
    return <Loading />;
  }

  return (
    <S.Container>
      <S.HeaderWrapper>
        <S.TextContent>카드 사용자</S.TextContent>
        <S.TextContent>권한 On/Off</S.TextContent>
      </S.HeaderWrapper>
      {getCardDetailData?.given_card_detail_list.map((info, idx) => (
        <View key={idx}>
          {getCardDetailData.given_card_detail_list.length === idx + 1 ? (
            <S.Wrapper>
              <S.UserWrapper>
                <S.ImageBox source={imagePath.profile} />
                <S.TextContent>{info.card_username}</S.TextContent>
              </S.UserWrapper>
              <S.AuthorWrapper>
                <CardAuthorSwitch
                  info={{
                    id: info.given_card_id,
                    validate: info.validate_type,
                  }}
                />
                <TouchableWithoutFeedback
                  onPress={() => mutation.mutate(info.given_card_id)}>
                  <S.ImageBox source={imagePath.redtrash} />
                </TouchableWithoutFeedback>
              </S.AuthorWrapper>
            </S.Wrapper>
          ) : (
            <S.BorderWrapper>
              <S.UserWrapper>
                <S.ImageBox source={imagePath.profile} />
                <S.TextContent>{info.card_username}</S.TextContent>
              </S.UserWrapper>
              <S.AuthorWrapper>
                <CardAuthorSwitch
                  info={{
                    id: info.given_card_id,
                    validate: info.validate_type,
                  }}
                />
                <TouchableWithoutFeedback
                  onPress={() => mutation.mutate(info.given_card_id)}>
                  <S.ImageBox source={imagePath.redtrash} />
                </TouchableWithoutFeedback>
              </S.AuthorWrapper>
            </S.BorderWrapper>
          )}
        </View>
      ))}
    </S.Container>
  );
};

export default GivenCardDetail;
