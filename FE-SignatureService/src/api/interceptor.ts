import axios, {
  AxiosInterceptorOptions,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import DeviceInfo from 'react-native-device-info';
import getAccessToken from '../functions/getAccessToken';
import getRefreshToken from '../functions/getRefreshToken';

const useAxios = () => {
  const appAxios = axios;

  // 요청 인터셉터
  const onRequestFulfilled = async (value: InternalAxiosRequestConfig<any>) => {
    const {accessToken} = await getAccessToken();
    value.headers.Authorization = `Bearer ${accessToken}`;

    const UID = await DeviceInfo.getUniqueId();
    value.headers.UID = UID;

    const {refreshToken} = await getRefreshToken();
    value.headers.set('Set-Cookie', `refresh_token=${refreshToken};`);

    return value;
  };
  const onRequestRejected = (error: any) => {
    return Promise.reject(error);
  };
  const requestOptions: AxiosInterceptorOptions = {};

  axios.interceptors.request.use(
    onRequestFulfilled,
    onRequestRejected,
    requestOptions,
  );

  // 응답 인터셉터
  const onResponseFulfilled = async (value: AxiosResponse<any, any>) => {
    return value;
  };
  const onResponseRejected = (error: any) => {
    error.response.statusText = JSON.parse(
      error.response.request._response,
    ).message;

    return Promise.reject(error);
  };
  const responseOptions: AxiosInterceptorOptions = {};

  axios.interceptors.response.use(
    onResponseFulfilled,
    onResponseRejected,
    responseOptions,
  );
  return appAxios;
};
export default useAxios;
