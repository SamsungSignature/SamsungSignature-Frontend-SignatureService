import {API_BASE} from '@env';
import {rest} from 'msw';
import {LoginRequestData, LoginResponse} from '../../api/member/useLogin';
import {SignupRequestData, SignupResponse} from '../../api/member/useSignup';
import {ValidateResponse} from '../../api/member/useValidate';
import API_PATH from '../../constants/apiPath';

export const accountHandler = [
  // 로그인
  rest.post(`${API_BASE}${API_PATH.AUTH.LOGIN}`, async (req, res, ctx) => {
    const created_at = new Date().getTime();
    const {id, password} = await req.json<LoginRequestData>();
    const UID = req.headers.get('UID');

    if (id.length > 1 && password.length > 1 && UID) {
      const loginResponseData: LoginResponse = {
        message: '성공적으로 로그인이 되었습니다.',
        body: {
          access_token: 'AAAA',
          created_at,
          expires_in: 3600000,
        },
      };

      return res(
        ctx.status(200),
        ctx.cookie('refresh_token', 'RRRR'),
        ctx.json(loginResponseData),
      );
    } else {
      return res(
        ctx.status(400),
        ctx.json({message: '로그인 정보가 잘못되었습니다.'}),
      );
    }
  }),
  // 중복 검사
  rest.get(`${API_BASE}${API_PATH.AUTH.VALIDATE}`, (req, res, ctx) => {
    const email = req.url.searchParams.get('email');
    const phone_number = req.url.searchParams.get('phone_number');
    console.log(email, phone_number);

    if (email && phone_number) {
      const validateResponse: ValidateResponse = {
        message: '사용할 수 있는 아이디입니다.',
        data: null,
      };
      return res(ctx.status(200), ctx.json(validateResponse));
    } else {
      return res(ctx.status(400));
    }
  }),
  // 회원가입
  rest.post(`${API_BASE}${API_PATH.AUTH.SIGNUP}`, async (req, res, ctx) => {
    const {email, password, phone_number, username} =
      await req.json<SignupRequestData>();
    if (email && password && phone_number && username) {
      const signupResponseData: SignupResponse = {
        message: '회원가입 성공',
        data: {
          email,
          phone_number,
          username,
        },
      };
      return res(ctx.status(200), ctx.json(signupResponseData));
    } else {
      return res(
        ctx.status(400),
        ctx.json({message: '회원 정보가 잘못되었습니다.'}),
      );
    }
  }),
];
