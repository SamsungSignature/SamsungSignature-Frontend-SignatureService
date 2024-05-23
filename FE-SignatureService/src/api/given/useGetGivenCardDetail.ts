import {API_BASE} from '@env';
import {AxiosError, AxiosResponse} from 'axios';
import API_PATH from '../../constants/apiPath';
import urlCreater from '../../functions/urlCreater';
import useAxios from '../interceptor';

interface GivenCardData {
  given_card_detail_list: [
    {
      given_card_id: number;
      card_username: string;
      validate_type: 'ON' | 'OFF';
    },
  ];
}

type GivenCardResponse = BaseResponse<GivenCardData>;

const useGetGivenCardDetail = (cardNum: number) => {
  const appAxios = useAxios();

  const resultUrl = urlCreater(`${API_BASE}${API_PATH.GIVEN.DETAIL}`, {
    card_id: cardNum,
  });

  const getGivenCard = async () => {
    const response = await appAxios
      .get(resultUrl)
      .then((res: AxiosResponse<GivenCardResponse>) => {
        console.log(res.data.message);
        console.log('빌려준 카드 세부내역 데이터', res.data.body);
        return res.data.body;
      })
      .catch((err: AxiosError<BaseResponse<null>>) => {
        console.log(err.message);
      });
    return response;
  };
  return getGivenCard;
};

export type {GivenCardResponse};
export default useGetGivenCardDetail;
