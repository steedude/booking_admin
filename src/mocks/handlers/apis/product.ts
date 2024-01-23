import { rest, type MockedRequest, RestRequest, PathParams } from 'msw';
import type { Product, CreateProductPayload, UpdateProductPayload } from '@/types/product';

function uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const meetingRooms: Product[] = [
  {
    _id: 'pp1',
    name: '會議室A',
    seats: 5,
    image: [],
    description: '會議室A description',
    projector: true,
    television: true,
    window: true,
    is_confirmed: true,
  },
  {
    _id: 'pp2',
    name: '會議室B',
    seats: 5,
    image: [],
    description: '會議室B description',
    projector: true,
    television: true,
    window: true,
    is_confirmed: true,
  },
  {
    _id: 'pp3',
    name: '會議室C',
    seats: 5,
    image: [],
    description: '會議室C description',
    projector: true,
    television: true,
    window: true,
    is_confirmed: true,
  },
  {
    _id: 'pp4',
    name: '會議室D',
    seats: 5,
    image: [],
    description: '會議室D description',
    projector: true,
    television: true,
    window: true,
    is_confirmed: true,
  },
  {
    _id: 'pp5',
    name: '會議室E',
    seats: 5,
    image: [],
    description: '會議室E description',
    projector: true,
    television: true,
    window: true,
    is_confirmed: true,
  },
  {
    _id: 'pp6',
    name: '會議室F',
    seats: 5,
    image: [],
    description: '會議室F description',
    projector: true,
    television: true,
    window: true,
    is_confirmed: true,
  },
];

const findMeetingRoomById = (id: string) => {
  return meetingRooms.find(({ _id: roomId }) => roomId === id);
};

const findMeetingRoomIndex = (id: string) => {
  return meetingRooms.findIndex(({ _id: roomId }) => roomId === id);
};

const mockProductApi = {
  getProductList: rest.get('*/products', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        message: 'success',
        data: {
          products: meetingRooms,
        },
      }),
    );
  }),

  getProductInfo: rest.get('*/product/:productId', (req, res, ctx) => {
    const { productId } = req.params;
    const product: Product | undefined = findMeetingRoomById(productId as string);
    console.log('room', product);

    if (!product) {
      return res(
        ctx.status(404),
        ctx.json({
          status: 404,
          message: 'Not found',
        }),
      );
    }
    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        message: 'success',
        data: product,
      }),
    );
  }),

  createNewProduct: rest.post('*/product', (req: MockedRequest<CreateProductPayload>, res, ctx) => {
    const { name, seats, image, description, projector, television, is_confirmed: isConfirmed, window } = req.body;
    const newRoom: Product = {
      _id: uuid(),
      name,
      seats,
      image,
      description,
      projector,
      television,
      is_confirmed: isConfirmed,
      window,
    };
    meetingRooms.push(newRoom);

    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        message: 'success',
      }),
    );
  }),

  updateProductInfo: rest.put(
    '*/product/:productId',
    (req: RestRequest<UpdateProductPayload, PathParams<string>>, res, ctx) => {
      const { name, seats, image, description, projector, television, is_confirmed: isConfirmed, window } = req.body;
      const { productId } = req.params;
      const roomInfo: Product | undefined = findMeetingRoomById(productId as string);
      console.log('roomInfo', roomInfo, productId, name);

      if (!roomInfo) {
        return res(
          ctx.status(404),
          ctx.json({
            status: 404,
            message: 'Not found',
          }),
        );
      }

      meetingRooms.forEach((room, index) => {
        // eslint-disable-next-line no-underscore-dangle
        if (room._id === productId) {
          // eslint-disable-next-line security/detect-object-injection
          meetingRooms[index] = {
            _id: productId as string,
            name,
            seats,
            image,
            description,
            projector,
            television,
            is_confirmed: isConfirmed,
            window,
          };
        }
      });

      return res(
        ctx.status(200),
        ctx.json({
          status: 200,
          message: 'success',
        }),
      );
    },
  ),

  deleteProduct: rest.delete('*/product/:productId', (req, res, ctx) => {
    const { productId } = req.params;
    const index = findMeetingRoomIndex(productId as string);
    if (index === -1) {
      return res(
        ctx.status(404),
        ctx.json({
          status: 404,
          message: 'Not found',
        }),
      );
    }

    meetingRooms.splice(index, 1);
    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        message: 'success',
      }),
    );
  }),
};

export default mockProductApi;
