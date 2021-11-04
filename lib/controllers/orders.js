const { Router } = require('express');
const { RowDescriptionMessage } = require('pg-protocol/dist/messages');
const Order = require('../models/Order');
const OrderService = require('../services/OrderService');

module.exports = Router()
  // if (req.method === 'POST' && req.url === '/api/v1/orders/')
  .post('/', async(req, res, next) => {
    try {
      // req.body === { quantity: 10 }
      const order = await OrderService.createOrder(req.body.quantity);
      // order === { id: '1', quantity: 10 }

      res.send(order);
    } catch(err) {
      next(err);
    }
  })
  .get('/:id', async(req, res, next) => {
    try {
      //const { id } = req.params;
      const order = await Order.getById(req.params.id);
      res.send(order);

    } catch(err) {
      next(err);
    }
  })
  .get('/', async(req, res, next) => {
    try {
      const order = await Order.getAll();
      res.send(order);
    } catch(err) {
      next(err);
    }
  })
  .patch('/:id', async(req, res, next) => {
    try {
      const { id } = req.params;
      const order = await Order.update(id, req.body.quantity);
      res.send(order);

    } catch(err) {
      next(err);
    }
  })
  .delete('/:id', async(req, res, next) => {
    try {
      const { id } = req.params;
      const order = await OrderService.deleteOrder(id);
      res.send(order);

    } catch(err) {
      next(err);
    }
  });
