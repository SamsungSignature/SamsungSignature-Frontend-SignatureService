import {API_BASE} from '@env';
import {rest} from 'msw';
import {GetSignatureResponse} from '../../api/signature/useGetSignature';
import {
  PostSignatureCardRequestData,
  PostSignatureCardResponse,
} from '../../api/signature/usePostSignatureCard';
import API_PATH from '../../constants/apiPath';

export const signatureHandler = [
  // Add To Wallet
  rest.post(`${API_BASE}${API_PATH.SIGNATURE.POST}`, async (req, res, ctx) => {
    const UID = req.headers.get('UID');
    const access = req.headers.get('Authorization');
    const cookie = req.headers.get('set-cookie') as string;
    const regex = /refresh_token=([^;]+)/;
    const match = cookie.match(regex);
    const refresh = match ? match[1] : null;
    const body: PostSignatureCardRequestData = await req.json();
    const {card_img} = body;

    if (!UID || !access || !refresh || !card_img) {
      console.log(`
Error: Something is missing
access_token: ${access}
refresh_token: ${refresh}
UID: ${UID}
card_img: ${card_img}
`);

      return res(ctx.status(400));
    }
    const response: PostSignatureCardResponse = {
      message: 'wallet 앱 카드 등록 완료',
      body: null,
    };

    return res(ctx.status(200), ctx.json(response));
  }),
  // 월렛에 시그니쳐 카드 등록 여부 확인
  rest.get(`${API_BASE}${API_PATH.SIGNATURE.GET}`, async (req, res, ctx) => {
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
    const response: GetSignatureResponse = {
      message: '시그니처 카드 유무 조회 성공',
      body: {
        is_exists_signature_card: true,
      },
    };

    return res(ctx.status(200), ctx.json(response));
  }),
];
