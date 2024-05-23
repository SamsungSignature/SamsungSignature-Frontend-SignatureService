import {API_BASE} from '@env';
import {rest} from 'msw';
import {PatchPermissionRequestData} from '../../api/delegated/usePatchPermission';
import API_PATH from '../../constants/apiPath';
import delegatedCards from './delegatedCards.json';
import permissionApproved from './permissionApproved.json';
import permissionRejected from './permissionRejected.json';

export const delegatedHandler = [
  // 받은 카드 목록 요청
  rest.get(`${API_BASE}${API_PATH.DELEGATED.GET}`, (req, res, ctx) => {
    const UID = req.headers.get('UID');
    const access = req.headers.get('Authorization');
    const cookie = req.headers.get('set-cookie') as string;
    const regex = /refresh_token=([^;]+)/;
    const match = cookie.match(regex);
    const refresh = match ? match[1] : null;

    if (!UID || !access || !refresh) {
      console.log(`
Error: Something is missing
access_token: ${access}
refresh_token: ${refresh}
UID: ${UID}
`);

      return res(ctx.status(400));
    }

    return res(ctx.status(200), ctx.json(delegatedCards));
  }),
  // 카드 요청 승인/거절
  rest.patch(
    `${API_BASE}${API_PATH.DELEGATED.PATCH_PERMISSION}`,
    async (req, res, ctx) => {
      const params = req.params;
      const body: PatchPermissionRequestData = await req.json();
      console.log(params, body);

      if (body.permission === 'APPROVED') {
        return res(ctx.status(200), ctx.json(permissionApproved));
      } else {
        return res(ctx.status(200), ctx.json(permissionRejected));
      }
    },
  ),
];
