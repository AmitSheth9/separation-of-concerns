const pool = require('../lib/utils/pool');
const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order');
const OrderService = require('../lib/services/OrderService');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
  }
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order', async() => {
    return OrderService
      .createOrder(11)
      .then(res => {
        expect(res).toEqual({ id: '1', quantity: 11 });
      });
  });
  it('updates an order', async() => {
    await OrderService.createOrder(15);
    return OrderService
      .updateOrder(1, 21)
      .then(res => {
        expect(res).toEqual({ id: '1', quantity: 21 });
      });
  });
  it('deletes an order', async() => {
    await OrderService.createOrder(9);
    return OrderService
      .deleteOrder(1)
      .then(res => {
        expect(res).toEqual({ id: '1', quantity: 9 });
      });
  });
});
