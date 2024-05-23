import {API_BASE} from '@env';
import {rest} from 'msw';
import API_PATH from '../../constants/apiPath';
import appliedDetail from './appliedDetail.json';
import appliedHistory from './appliedHistory.json';
import approvedDetail from './approvedDetail.json';
import approvedHistory from './approvedHistory.json';

export const historyHandler = [
  // 내역 받기 요청
  rest.get(`${API_BASE}${API_PATH.HISTORY.LIST}`, (req, res, ctx) => {
    if (req.url.searchParams.get('type') === 'applied') {
      return res(ctx.status(200), ctx.json(appliedHistory));
    } else if (req.url.searchParams.get('type') === 'approved') {
      return res(ctx.status(200), ctx.json(approvedHistory));
    }
  }),

  // 세부내역 받기
  rest.get(`${API_BASE}${API_PATH.HISTORY.DETAIL}`, (req, res, ctx) => {
    if (req.url.searchParams.get('type') === 'applied') {
      return res(ctx.status(200), ctx.json(appliedDetail));
    } else if (req.url.searchParams.get('type') === 'approved') {
      return res(ctx.status(200), ctx.json(approvedDetail));
    }
  }),
];
