import {API_BASE} from '@env';
import {rest} from 'msw';
import API_PATH from '../../constants/apiPath';
import longReqeustPay from './longReqeustPay.json';

export const longtermHandler = [
  rest.post(
    `${API_BASE}${API_PATH.REQUESTPAY.PERIOD}`,
    async (req, res, ctx) => {
      console.log(await req.json());

      return res(ctx.status(200), ctx.json(longReqeustPay));
    },
  ),
];
