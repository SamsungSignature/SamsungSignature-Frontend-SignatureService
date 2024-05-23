import {API_BASE} from '@env';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import API_PATH from '../../constants/apiPath';
import urlCreater from '../../functions/urlCreater';
import useAxios from '../interceptor';

interface PostPayCardPathParams {
  signature_detail_card_id: number;
}

type PostPayCardResponse = BaseResponse<null>;

const usePostPayCard = () => {
  const appAxios = useAxios();

  const postPayCardConfig = (pathParams: PostPayCardPathParams) => {
    const url = urlCreater(
      `${API_BASE}${API_PATH.PAYMENT.POST_PAY_CARD}`,
      pathParams,
    );

    const axiosConfig: AxiosRequestConfig<null> = {
      url,
      method: 'post',
    };

    console.log('url:', url);

    return axiosConfig;
  };

  const postPayCard = async (pathParams: PostPayCardPathParams) => {
    const config = postPayCardConfig(pathParams);
    const result: AxiosResponse<PostPayCardResponse, null> =
      await appAxios.request(config);

    return result;
  };

  return postPayCard;
};

export type {PostPayCardPathParams};
export default usePostPayCard;
