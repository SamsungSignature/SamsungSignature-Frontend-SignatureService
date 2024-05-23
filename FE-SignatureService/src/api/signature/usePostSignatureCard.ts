import {API_BASE} from '@env';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import API_PATH from '../../constants/apiPath';
import useAxios from '../interceptor';

interface PostSignatureCardRequestData {
  card_img: string;
}

type PostSignatureCardResponse = BaseResponse<null>;

const usePostSignatureCard = () => {
  const appAxios = useAxios();

  const postSignatureCardConfig = (data: PostSignatureCardRequestData) => {
    const axiosConfig: AxiosRequestConfig<PostSignatureCardRequestData> = {
      url: `${API_BASE}${API_PATH.SIGNATURE.POST}`,
      method: 'post',
      data,
    };

    return axiosConfig;
  };

  const postSignatureCard = async (data: PostSignatureCardRequestData) => {
    const config = postSignatureCardConfig(data);
    const result: AxiosResponse<
      PostSignatureCardResponse,
      PostSignatureCardRequestData
    > = await appAxios.request(config);

    return result;
  };

  return postSignatureCard;
};

export type {PostSignatureCardRequestData, PostSignatureCardResponse};
export default usePostSignatureCard;
