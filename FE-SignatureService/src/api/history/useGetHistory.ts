import {API_BASE} from '@env';
import {AxiosError, AxiosResponse} from 'axios';
import API_PATH from '../../constants/apiPath';
import useAxios from '../interceptor';

interface HistoryData {
  signature_history_list: [
    {
      signature_detail_id: number;
      signature_name: string;
      permission_status: string;
      signature_date: string;
      limit_amount: number;
    },
  ];
}

type HistoryResponse = BaseResponse<HistoryData>;

const useGetHistory = (type: string) => {
  const appAxios = useAxios();

  const history = async () => {
    const response = await appAxios
      .get(`${API_BASE}${API_PATH.HISTORY.LIST}`, {
        params: {type},
      })
      .then((res: AxiosResponse<HistoryResponse>) => {
        console.log(res.data.message);
        return res.data.body;
      })
      .catch((err: AxiosError<BaseResponse<null>>) => {
        console.log(err.message);
      });

    return response;
  };

  return history;
};

export type {HistoryData, HistoryResponse};
export default useGetHistory;
