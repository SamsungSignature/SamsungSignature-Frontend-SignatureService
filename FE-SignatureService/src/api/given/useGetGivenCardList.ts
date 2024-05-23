import {API_BASE} from '@env';
import {AxiosError, AxiosResponse} from 'axios';
import API_PATH from '../../constants/apiPath';
import useAxios from '../interceptor';

interface GivenCardsData {
  given_card_list: [
    {
      card_id: number;
      card_img: string;
      card_name: string;
    },
  ];
}

type GivenCardsResponse = BaseResponse<GivenCardsData>;

const useGetGivenCardList = () => {
  const appAxios = useAxios();

  const getGivenCards = async () => {
    const response = await appAxios
      .get(`${API_BASE}${API_PATH.GIVEN.LIST}`)
      .then((res: AxiosResponse<GivenCardsResponse>) => {
        console.log(res.data.message);
        console.log(
          '빌려준 카드 목록 응답 데이터',
          res.data.body.given_card_list,
        );
        return res.data.body;
      })
      .catch((err: AxiosError<BaseResponse<null>>) => {
        console.log(err.message);
      });
    return response;
  };
  return getGivenCards;
};

export type {GivenCardsResponse};
export default useGetGivenCardList;
