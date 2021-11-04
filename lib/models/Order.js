const pool = require('../utils/pool');

// static method: JSON.parse(), JSON.stringify(), Math.random()
// instance method: .toUpperCase(), .map/.reduce/.filter/.find/.some/.every
module.exports = class Order {
  id;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.quantity = row.quantity;
  }

  static async insert(quantity) {
    const { rows } = await pool.query(
      'INSERT INTO orders (quantity) VALUES ($1) RETURNING *',
      [quantity]
    );

    return new Order(rows[0]);
  }

  static async getById(id) {
    const { row } = await pool.query(
      `SELECT id, quantity FROM orders WHERE id = ${id}`
    );
    return new Order(row);
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM orders'
    );
    return new Order(rows);
  }

  static async update(id, quantity) {
    const { row } = await pool.query(
      `UPDATE orders SET quantity = ${quantity} WHERE id = ${id}`
    );
    return new Order(row);
  }

  static async delete(id) {
    await pool.query(
      `DELETE FROM orders WHERE id = ${id}`
    );
    
  }
};

 
