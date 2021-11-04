const pool = require('../lib/utils/pool');
const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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
    const res = await request(app).get('/api/v1/orders/id');
    expect(res.body).toEqual({ id: 1, quantity: 10 });
  });
  it('gets all orders', async() => {
    const res = await request(app).get('/api/v1/orders');
    expect(res.body).toEqual(Array);

  });
  it('deletes an order by id', async() => {
    const res = await request(app).delete('/api/v1/orders/id');
    expect(res.body).toEqual(Object);
  });
  it('updates an order by id', async() => {
    const res = await request(app).patch('/api/v1/orders/id');
    expect(res.body).toEqual(Object);
  });
});
