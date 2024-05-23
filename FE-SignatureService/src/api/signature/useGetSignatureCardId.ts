import {API_BASE} from '@env';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import API_PATH from '../../constants/apiPath';
import useAxios from '../interceptor';

interface GetSignatureCardIdResponseData {
  signature_card_id: number;
}

type GetSignatureCardIdResponse = BaseResponse<GetSignatureCardIdResponseData>;

const useGetSignatureCardId = () => {
  const appAxios = useAxios();

  const getSignatureCardIdConfig = () => {
    const axiosConfig: AxiosRequestConfig<null> = {
      url: `${API_BASE}${API_PATH.SIGNATURE.GET_ID}`,
      method: 'get',
    };

    return axiosConfig;
  };

  const getSignatureCardId = async () => {
    const config = getSignatureCardIdConfig();
    const result: AxiosResponse<GetSignatureCardIdResponse, null> =
      await appAxios.request(config);

    return result;
  };

  return getSignatureCardId;
};

export default useGetSignatureCardId;
