import {API_BASE} from '@env';
import {rest} from 'msw';
import API_PATH from '../../constants/apiPath';
import friendList from './friendList.json';

export const syncHandler = [
  // 동기화 요청
  rest.get(`${API_BASE}${API_PATH.FRIEND.SYNC}`, async (req, res, ctx) => {
    // 동기화 요청을 받으면 항상 같은 응답을 반환합니다.
    console.log(await req.json());

    return res(ctx.status(200), ctx.json(friendList));
  }),
];
