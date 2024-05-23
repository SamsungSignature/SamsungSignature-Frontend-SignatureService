import {API_BASE} from '@env';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import API_PATH from '../../constants/apiPath';
import useAxios from '../interceptor';

interface LongTermRequestData {
  to_ids: number[];
  limit_amount: number;
  card_id: number;
  limit_date: string;
}

interface To {
  id: number;
  name: string;
}

interface LongTermResponseData {
  to: To[];
  limit_amount: number;
  limit_date: string;
  card: {
    id: number;
    name: string;
  };
}

type LongTermResponse = BaseResponse<LongTermResponseData>;

const useLongTerm = () => {
  const appAxios = useAxios();

  const longTermConfig = (data: LongTermRequestData) => {
    const axiosConfig: AxiosRequestConfig = {
      url: `${API_BASE}${API_PATH.REQUESTPAY.PERIOD}`,
      method: 'post',
      data,
    };

    return axiosConfig;
  };

  const longTerm = async (data: LongTermRequestData) => {
    const config = longTermConfig(data);
    const result: AxiosResponse<LongTermResponse, LongTermRequestData> =
      await appAxios.request(config);

    return result;
  };

  return longTerm;
};

export type {LongTermRequestData, LongTermResponse, LongTermResponseData};
export default useLongTerm;
