// handler.ts
import {LOCAL} from '@env';
import {rest} from 'msw';
import {accountHandler} from './account/accountHandler';
import {delegatedHandler} from './delegated/delegatedHandler';
import {givenHandler} from './given/givenHandler';
import {historyHandler} from './history/historyHandler';
import {signatureHandler} from './signature/signatureHandler';
import {syncHandler} from './sync/syncHandler';
import {onceHandler} from './pay/onceHandler';
import {longtermHandler} from './pay/longtermHandler';

export const handlers = [
  // 로컬 SVG 관련 응답 그대로 반환
  rest.post(`${LOCAL}/*`, async (req, res, ctx) => {
    const originalResponse = await ctx.fetch(req);
    return res(
      ctx.status(originalResponse.status),
      ctx.set(
        'Content-Type',
        originalResponse.headers.get('Content-Type') || '',
      ),
      ctx.body(await originalResponse.text()),
    );
  }),
  rest.get(`${LOCAL}/*`, async (req, res, ctx) => {
    const originalResponse = await ctx.fetch(req);
    return res(
      ctx.status(originalResponse.status),
      ctx.set(
        'Content-Type',
        originalResponse.headers.get('Content-Type') || '',
      ),
      ctx.body(await originalResponse.text()),
    );
  }),
  // 목업 서버 응답
  ...accountHandler,
  ...historyHandler,
  ...syncHandler,
  ...givenHandler,
  ...onceHandler,
  ...longtermHandler,
  ...delegatedHandler,
  ...signatureHandler,
];
