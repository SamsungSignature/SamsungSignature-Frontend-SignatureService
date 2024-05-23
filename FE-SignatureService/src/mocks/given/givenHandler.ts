import {API_BASE} from '@env';
import {rest} from 'msw';
import API_PATH from '../../constants/apiPath';
import givenCardDetail from './givenCardDetail.json';
import givenCardList from './givenCardList.json';

export const givenHandler = [
  // 빌려준 카드 목록 요청
  rest.get(`${API_BASE}${API_PATH.GIVEN.LIST}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(givenCardList));
  }),

  // 빌려준 카드 세부 정보 요청
  rest.get(`${API_BASE}${API_PATH.GIVEN.DETAIL}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(givenCardDetail));
  }),
];
