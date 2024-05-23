import {API_BASE} from '@env';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import API_PATH from '../../constants/apiPath';

interface SignupRequestData {
  email: string;
  password: string;
  phone_number: string;
  username: string;
}

interface SignupResponseData {
  email: string;
  phone_number: string;
  username: string;
}

type SignupResponse = BaseResponse<SignupResponseData>;

const useSignup = () => {
  const signupConfig = (data: SignupRequestData) => {
    const axiosConfig: AxiosRequestConfig<SignupRequestData> = {
      url: `${API_BASE}${API_PATH.AUTH.SIGNUP}`,
      method: 'post',
      data,
    };
    return axiosConfig;
  };

  const signup = async (data: SignupRequestData) => {
    const config = signupConfig(data);
    const result: AxiosResponse<SignupResponse, SignupRequestData> =
      await axios.request(config);
    return result;
  };

  return signup;
};

export type {SignupRequestData, SignupResponse};
export default useSignup;
