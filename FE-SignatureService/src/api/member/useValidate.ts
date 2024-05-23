import {API_BASE} from '@env';
import axios, {AxiosRequestConfig} from 'axios';
import API_PATH from '../../constants/apiPath';

interface ValidateParams {
  email: string;
  phone_number: string;
}

type ValidateResponse = BaseResponse<null>;

const useValidate = () => {
  const validateConfig = (params: ValidateParams) => {
    const axiosConfig: AxiosRequestConfig<null> = {
      url: `${API_BASE}${API_PATH.AUTH.VALIDATE}`,
      method: 'get',
      params,
    };

    console.log(axiosConfig);

    return axiosConfig;
  };

  const validate = async (params: ValidateParams) => {
    const config = validateConfig(params);
    const result = await axios
      .request(config)
      .then(() => {
        return true;
      })
      .catch(err => {
        console.log(err);

        return false;
      });

    return result;
  };

  return validate;
};

export type {ValidateParams, ValidateResponse};
export default useValidate;
