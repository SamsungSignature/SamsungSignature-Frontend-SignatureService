import {API_BASE} from '@env';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import DeviceInfo from 'react-native-device-info';
import API_PATH from '../../constants/apiPath';

interface LoginRequestData {
  id: string;
  password: string;
}

interface LoginResponseData {
  access_token: string;
  created_at: number;
  expires_in: number;
}

type LoginResponse = BaseResponse<LoginResponseData>;

const useLogin = () => {
  const loginConfig = async (data: LoginRequestData) => {
    const UID = await DeviceInfo.getUniqueId();
    const axiosConfig: AxiosRequestConfig<LoginRequestData> = {
      url: `${API_BASE}${API_PATH.AUTH.LOGIN}`,
      method: 'post',
      headers: {
        UID,
      },
      data: {
        ...data,
      },
    };

    return axiosConfig;
  };

  const login = async (data: LoginRequestData) => {
    const config = await loginConfig(data);
    const result: AxiosResponse<LoginResponse, LoginRequestData> =
      await axios.request(config);
    return result;
  };

  return login;
};

export type {LoginRequestData, LoginResponse, LoginResponseData};
export default useLogin;
