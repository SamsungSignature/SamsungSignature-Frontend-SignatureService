import {API_BASE} from '@env';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import API_PATH from '../../constants/apiPath';
import useAxios from '../interceptor';

interface GetSignatureResponseData {
  is_exists_signature_card: boolean;
}

type GetSignatureResponse = BaseResponse<GetSignatureResponseData>;

const useGetSignature = () => {
  const appAxios = useAxios();

  const getSignatureConfig = () => {
    const axiosConfig: AxiosRequestConfig<null> = {
      url: `${API_BASE}${API_PATH.SIGNATURE.GET}`,
      method: 'get',
    };

    return axiosConfig;
  };

  const getSignature = async () => {
    const config = getSignatureConfig();
    const result: AxiosResponse<GetSignatureResponse, null> =
      await appAxios.request(config);

    return result;
  };

  return getSignature;
};

export type {GetSignatureResponse};
export default useGetSignature;
