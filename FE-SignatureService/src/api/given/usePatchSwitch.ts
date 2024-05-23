import {API_BASE} from '@env';
import API_PATH from '../../constants/apiPath';
import urlCreater from '../../functions/urlCreater';
import useAxios from '../interceptor';

interface PatchSwitchData {
  given_card_id: number;
  validate_type: 'ON' | 'OFF';
}

type PatchSwitchResponse = BaseResponse<null>;

const usePatchSwitch = () => {
  const appAxios = useAxios();

  const patchSwitch = async (data: PatchSwitchData) => {
    // console.log('제일 불안한데 여기 data는 들어오겠지?', data);
    const {given_card_id, validate_type} = data;

    const resultUrl = urlCreater(`${API_BASE}${API_PATH.GIVEN.DELETE}`, {
      given_card_id,
    });

    const response = await appAxios.patch(resultUrl, {validate_type});
    return response;
  };
  return patchSwitch;
};

export type {PatchSwitchData, PatchSwitchResponse};
export default usePatchSwitch;
