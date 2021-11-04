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

  it('gets all orders', async() => {
    const order1 = await Order.insert(11);
    const order2 = await Order.insert(12);
    return Order
      .getAll()
      .then(res => {
        expect(res).toEqual([order1, order2]);
      });
  });
  it('gets an order by id', async() => {
    const order1 = await Order.insert(11);
    return Order
      .getById(1)
      .then(res => {
        expect(res).toEqual(order1);
      });
  });
  it('updates an order by id', async() => {
    await Order.insert(11);
    return Order
      .update(1, 15)
      .then(res => {
        expect(res).toEqual({ id: '1', quantity: 15 });
      });
  });
  it('deletes an order by id', async() => {
    const order1 = await Order.insert(11);
    return Order
      .delete(1)
      .then(res => {
        expect(res).toEqual(order1);
      });
  });

});
