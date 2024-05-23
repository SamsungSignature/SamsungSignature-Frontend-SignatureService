import {API_BASE} from '@env';
import useAxios from '../interceptor';
import API_PATH from './../../constants/apiPath';
import urlCreater from './../../functions/urlCreater';

type DeleteCardResponse = BaseResponse<null>;

const useDeleteCard = () => {
  const appAxios = useAxios();

  const deleteCard = async (given_card_id: number) => {
    // console.log('정상적이라면 여기 id가 나와야겠지?', given_card_id);
    const resultUrl = urlCreater(`${API_BASE}${API_PATH.GIVEN.DELETE}`, {
      given_card_id,
    });
    const response = await appAxios.delete(resultUrl);
    return response;
  };
  return deleteCard;
};

export type {DeleteCardResponse};
export default useDeleteCard;
