import { rest } from 'msw';

export const handlers = [
  rest.post('/api/admin/login', (req, res, ctx) => {
    // 模擬登錄返回的請求
    return res(ctx.status(200), ctx.json({ message: 'success' }));
  }),

  rest.get('/api/admin/products', (req, res, ctx) => {
    // 模擬取得所有會議室資訊
    return res(ctx.status(200), ctx.json({ message: 'success' }));
  }),

  rest.get('/api/admin/reservations', (req, res, ctx) => {
    // 模擬取得所有會議室資訊
    return res(ctx.status(200), ctx.json({ message: 'success' }));
  }),
];
