import { rest, type MockedRequest } from 'msw';
import type { LoginPayload, GoogleAuthPayload } from '@/types/user';

const MOCK_USER_INFO = {
  ACCOUNT: 'root12@skylinetw.com',
  NAME: 'root12',
  PWD: 'root12',
  TEAM: 'Vue',
};

const mockUserApi = {
  loginUser: rest.post('*/login', (req: MockedRequest<LoginPayload>, res, ctx) => {
    const { account, password } = req.body;
    const isCorrectMockAccount = account === MOCK_USER_INFO.ACCOUNT || account === MOCK_USER_INFO.NAME;
    const isAuthenticated = isCorrectMockAccount && password === MOCK_USER_INFO.PWD;
    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        }),
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        message: 'success',
        data: {
          token: 'snsTg7Gz4R#PDLJr',
          user: {
            account: MOCK_USER_INFO.ACCOUNT,
            name: MOCK_USER_INFO.NAME,
            team: MOCK_USER_INFO.TEAM,
          },
        },
      }),
    );
  }),

  logoutUser: rest.get('*/logout', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'success',
      }),
    );
  }),

  getUserInfo: rest.get('*/user', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'success',
        user: {
          account: MOCK_USER_INFO.ACCOUNT,
          name: MOCK_USER_INFO.NAME,
          team: MOCK_USER_INFO.TEAM,
        },
      }),
    );
  }),

  postGoogleAuth: rest.post('*/googleAuth', (req: MockedRequest<GoogleAuthPayload>, res, ctx) => {
    // 去google 驗證token...
    // google回傳資料...
    // 利用google回傳的資料比對db...
    // 有此人 給予token...
    // 無此人 建立帳號後 給予token...
    const { credential } = req.body;
    console.log('postGoogleAuth mock credential', req, credential);
    return res(
      ctx.status(200),
      ctx.json({
        message: 'success',
        data: {
          token: 'snsTg7Gz4R#PDLJr',
          user: {
            account: MOCK_USER_INFO.ACCOUNT,
            name: MOCK_USER_INFO.NAME,
            team: MOCK_USER_INFO.TEAM,
          },
        },
      }),
    );
  }),
};

export default mockUserApi;
