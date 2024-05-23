import {API_BASE} from '@env';
import {rest} from 'msw';
import API_PATH from '../../constants/apiPath';
import requestPay from './requestPay.json';

export const onceHandler = [
  rest.post(`${API_BASE}${API_PATH.REQUESTPAY.ONCE}`, async (req, res, ctx) => {
    console.log(await req.json());

    return res(ctx.status(200), ctx.json(requestPay));
  }),
];
