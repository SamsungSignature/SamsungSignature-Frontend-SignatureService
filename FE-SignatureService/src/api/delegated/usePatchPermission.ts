import {API_BASE} from '@env';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import API_PATH from '../../constants/apiPath';
import urlCreater from '../../functions/urlCreater';
import useAxios from '../interceptor';

interface PatchPermissionPathParams {
  signature_detail_id: number;
}

interface PatchPermissionRequestData {
  permission_type: 'APPROVED' | 'REJECTED';
  card_id?: number;
}

interface PatchPermissionResponseData {
  from_id: number;
  from_name: string;
  limit_amount: number;
  permission_type: 'Approve' | 'Rejected';
}

type PatchPermissionResponse = BaseResponse<PatchPermissionResponseData>;

const usePatchPermission = () => {
  const appAxios = useAxios();

  const patchPermissionConfig = (
    pathParams: PatchPermissionPathParams,
    data: PatchPermissionRequestData,
  ) => {
    const url = urlCreater(
      `${API_BASE}${API_PATH.DELEGATED.PATCH_PERMISSION}`,
      pathParams,
    );
    const axiosConfig: AxiosRequestConfig<PatchPermissionRequestData> = {
      url,
      method: 'patch',
      data,
    };

    return axiosConfig;
  };

  const patchPermission = async (
    pathParams: PatchPermissionPathParams,
    data: PatchPermissionRequestData,
  ) => {
    const config = patchPermissionConfig(pathParams, data);
    const result: AxiosResponse<
      PatchPermissionResponse,
      PatchPermissionRequestData
    > = await appAxios.request(config);

    return result;
  };

  return patchPermission;
};

export type {
  PatchPermissionPathParams,
  PatchPermissionRequestData,
  PatchPermissionResponse,
  PatchPermissionResponseData,
};
export default usePatchPermission;
