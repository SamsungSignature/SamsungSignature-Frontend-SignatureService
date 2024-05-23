import {API_BASE} from '@env';
import API_PATH from '../../constants/apiPath';
import useAxios from '../interceptor';

const useGetNotiData = async () => {
  const appAxios = useAxios();
  try {
    const response = await appAxios({
      method: 'GET',
      url: `${API_BASE}${API_PATH.HISTORY.NOTI}`,
    });

    console.log('요청성공', response.data.body);
    return response.data.body;
  } catch (error) {
    console.error('요청 실패', error);
  }
};

export default useGetNotiData;
