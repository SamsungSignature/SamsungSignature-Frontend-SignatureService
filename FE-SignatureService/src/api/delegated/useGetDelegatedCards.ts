import {API_BASE} from '@env';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {Card} from '../../components/main/Cards';
import API_PATH from '../../constants/apiPath';
import useAxios from '../interceptor';

interface GetDelegatedCardsResponseData {
  cards: Card[];
}

type GetDelegatedCardsResponse = BaseResponse<GetDelegatedCardsResponseData>;

const useGetDelegatedCards = () => {
  const appAxios = useAxios();

  const getDelegatedCardsConfig = () => {
    const axiosConfig: AxiosRequestConfig<null> = {
      url: `${API_BASE}${API_PATH.DELEGATED.GET}`,
    };
    return axiosConfig;
  };

  const getDelegatedCards = async () => {
    const config = getDelegatedCardsConfig();
    const result: AxiosResponse<GetDelegatedCardsResponse, null> =
      await appAxios.request(config);

    return result;
  };

  return getDelegatedCards;
};

export type {GetDelegatedCardsResponse};
export default useGetDelegatedCards;
