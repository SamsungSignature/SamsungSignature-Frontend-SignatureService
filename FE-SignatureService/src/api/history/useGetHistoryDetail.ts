import {API_BASE} from '@env';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import API_PATH from '../../constants/apiPath';
import urlCreater from '../../functions/urlCreater';
import useAxios from '../interceptor';

interface GetHistoryDetailParams {
  type: 'applied' | 'approved';
}

interface GetHistoryDetailPathParams {
  signature_detail_id: number;
}

interface GetHistoryDetailResponseData {
  signature_detail_id: number;
  signature_name: string;
  limit_amount: number;
  signature_date: string;
  limit_date?: string;
  market_name?: string;
  item?: string;
  item_image?: string; // 나중에 S3 이미지 사용할듯?
  permission_status: 'INPROGRESS' | 'APPROVED' | 'REJECTED';
  progress_status?:
    | 'INPROGRESS_SUBMIT'
    | 'INPROGRESS_CONSIDER'
    | 'INPROGRESS_PICKCARD';
}

type GetHistoryDetailResponse = BaseResponse<GetHistoryDetailResponseData>;

const useGetHistoryDetail = () => {
  const appAxios = useAxios();

  const getHistoryDetailConfig = (
    pathParams: GetHistoryDetailPathParams,
    params: GetHistoryDetailParams,
  ) => {
    const url = urlCreater(`${API_BASE}${API_PATH.HISTORY.DETAIL}`, pathParams);
    const axiosConfig: AxiosRequestConfig<null> = {
      url,
      params,
    };

    return axiosConfig;
  };

  const getHistoryDetail = async (
    pathParams: GetHistoryDetailPathParams,
    params: GetHistoryDetailParams,
  ) => {
    const config = getHistoryDetailConfig(pathParams, params);
    const result: AxiosResponse<GetHistoryDetailResponse, null> =
      await appAxios.request(config);

    return result;
  };

  return getHistoryDetail;
};

export type {
  GetHistoryDetailParams,
  GetHistoryDetailPathParams,
  GetHistoryDetailResponse,
  GetHistoryDetailResponseData,
};
export default useGetHistoryDetail;
