import { rest, type MockedRequest } from 'msw';
import type { Reservation, PostReservationPayload, ReservationByDay } from '@/types/reservation';
import { Product } from '@/types/product';
function uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const currentDay = new Date().toJSON().slice(0, 10);

const product: Product = {
  _id: 'pp1',
  name: '會議室A',
  seats: 5,
  image: [],
  description: '會議室A description',
  projector: true,
  television: true,
  window: true,
  is_confirmed: true,
};

const reservations: Reservation[] = [
  {
    _id: 'r1',
    start_time: `${currentDay} 09:30`,
    end_time: `${currentDay} 12:30`,
    confirmed: true,
    product_id: 'pp1',
    user_id: 'uu1',
    admin_id: 'aa1',
    team_id: 'vue',
    createdAt: '2023-09-07T06:02:55.185Z',
    updatedAt: '2023-09-07T06:02:55.185Z',
    product: product,
    user: {
      account: 'tz',
      name: 'tz',
    },
    team: 'vue',
  },
  {
    _id: 'r2',
    start_time: `${currentDay} 09:30`,
    end_time: `${currentDay} 12:30`,
    confirmed: false,
    product_id: 'pp2',
    user_id: 'uu1',
    admin_id: 'aa1',
    team_id: 'h5',
    createdAt: '2023-09-07T06:02:55.185Z',
    updatedAt: '2023-09-07T06:02:55.185Z',
    product: product,
    user: {
      account: 'tz',
      name: 'tz',
    },
    team: 'vue',
  },
];
for (let i = 0; i < 101; i += 1) {
  reservations.push({
    _id: `r${i + 1}`,
    start_time: `${currentDay} 09:30`,
    end_time: `${currentDay} 12:30`,
    confirmed: true,
    product_id: 'pp1',
    user_id: 'uu1',
    admin_id: 'aa1',
    team_id: 'vue',
    createdAt: '2023-09-07T06:02:55.185Z',
    updatedAt: '2023-09-07T06:02:55.185Z',
    product: product,
    user: {
      account: `tz${i}`,
      name: 'tz',
    },
    team: 'vue',
  });
}

const reservationsByDay: ReservationByDay[] = [
  {
    _id: 'r1',
    start_time: `${currentDay} 09:30`,
    end_time: `${currentDay} 12:30`,
    confirmed: true,
    createdAt: '2023-09-07T06:02:55.185Z',
    updatedAt: '2023-09-07T06:02:55.185Z',
    product: {
      _id: 'pp1',
      name: '會議室A',
    },
    team: 'vue',
  },
];

const mockReservationsApi = {
  getReservations: rest.get('*/reservations', (req, res, ctx) => {
    const params = Object.fromEntries(req.url.searchParams);
    console.log('getReservations', params);

    const startRecord = (Number(params.page) - 1) * Number(params.page_size);
    const reservs = reservations.slice(startRecord, startRecord + Number(params.page_size));
    console.log('params', startRecord, Number(params.page_size), reservs, reservations);
    const totalPage = Math.ceil(reservations.length / Number(params.page_size));

    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        message: 'success',
        data: {
          page: Number(params.page),
          page_size: Number(params.page_size),
          total_page: totalPage,
          total_size: reservations.length,
          reservations: reservs,
        },
      }),
    );
  }),

  getReservationByDay: rest.get('*/reservations/day', (req, res, ctx) => {
    console.log('req', req.url.searchParams.get('start_time'));

    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        message: 'success',
        data: {
          reservationsByDay,
        },
      }),
    );
  }),

  createNewReservation: rest.post('*/reservation', (req: MockedRequest<PostReservationPayload>, res, ctx) => {
    const { start_time: startTime, end_time: endTime, product_id: productId, team_id: teamId } = req.body;
    const newReservation = {
      _id: uuid(),
      start_time: startTime,
      end_time: endTime,
      confirmed: true,
      createdAt: new Date().toJSON(),
      updatedAt: new Date().toJSON(),
      user_id: 'uu1',
      admin_id: 'aa1',
      product_id: productId,
      team_id: teamId,
      product: product,
      user: {
        account: 'tz',
        name: 'tz',
      },
      team: 'vue',
    };

    reservations.push(newReservation);

    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        message: 'success',
      }),
    );
  }),

  cancelReservation: rest.delete('*/reservation/:reservationId', (req, res, ctx) => {
    const { reservationId } = req.params;
    console.log('reservationId', reservationId);

    const index = reservations.findIndex(({ _id: productId }) => productId === reservationId);
    if (index === -1) {
      return res(
        ctx.status(404),
        ctx.json({
          code: 404,
          message: 'Not found',
        }),
      );
    }

    reservations.splice(index, 1);
    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        message: 'success',
      }),
    );
  }),

  approveReservation: rest.put('*/reservation/:reqReservationId', (req, res, ctx) => {
    const { reqReservationId } = req.params;
    console.log('reqReservationId', reqReservationId);

    const index = reservations.findIndex(({ _id: reservationId }) => reservationId === reqReservationId);

    if (index === -1) {
      return res(
        ctx.status(404),
        ctx.json({
          code: 404,
          message: 'Not found',
        }),
      );
    }

    reservations.forEach(reservation => {
      // eslint-disable-next-line no-underscore-dangle
      if (reservation._id === reqReservationId) {
        Object.assign(reservation, { confirmed: true });
      }
    });

    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        message: 'success',
      }),
    );
  }),
};

export default mockReservationsApi;
