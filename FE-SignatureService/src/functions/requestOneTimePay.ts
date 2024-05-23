import {API_BASE} from '@env';
import API_PATH from '../constants/apiPath';
import useAxios from '../api/interceptor';

interface RequestBody {
  to_id: number;
  limit_amount: number;
  market_name?: string;
  item?: string;
  item_image?: string;
}

const useRequestOneTimePay = async (
  amount: string,
  selectedContact: {id: number},
  marketName: string,
  itemName: string,
) => {
  const appAxios = useAxios();
  if (amount) {
    try {
      const cleanedAmount = amount.replace(/,/g, '');
      const requestBody: RequestBody = {
        to_id: Number(selectedContact.id),
        limit_amount: Number(cleanedAmount),
        market_name: marketName,
        item: itemName,
        item_image: undefined,
      };
      const response = await appAxios({
        method: 'POST',
        url: `${API_BASE}${API_PATH.REQUESTPAY.ONCE}`,
        data: requestBody,
      });

      console.log('요청성공', response.data);
    } catch (error) {
      console.error('요청 실패', error);
    }
  }
};

export default useRequestOneTimePay;
