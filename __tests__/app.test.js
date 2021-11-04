const pool = require('../lib/utils/pool');
const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
  }
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then(res => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          quantity: 10
        });
      });
  });
  it('gets an order by id', async() => {
    const order = await Order.insert(11);
    const res = await request(app).get('/api/v1/orders/1');
    expect(res.body).toEqual(order);
  });
  it('gets all orders', async() => {
    const order = await Order.insert(12);
    const order1 = await Order.insert(13);
    const order2 = await Order.insert(14);
    const res = await request(app).get('/api/v1/orders');
    expect(res.body).toEqual([order, order1, order2]);

  });
  it('deletes an order by id', async() => {
    const order1 = await Order.insert(11);
    // eslint-disable-next-line no-unused-vars
    const order2 = await Order.insert(12);
    const order3 = await Order.insert(13);
    await request(app).delete('/api/v1/orders/2');
    const getOrders = await Order.getAll();
    expect(getOrders).toEqual([order1, order3]);
  });
  it('updates an order by id', async() => {
    await Order.insert(17);
    const res = await request(app)
      .patch('/api/v1/orders/1')
      .send({ quantity: 26 });
    expect(res.body).toEqual({ id: '1', quantity: 26 });
  });
});
