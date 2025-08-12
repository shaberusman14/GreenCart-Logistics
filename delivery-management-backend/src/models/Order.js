const pool = require('../config/db');

class Order {
  static async getAll() {
    const result = await pool.query('SELECT * FROM orders');
    return result.rows;
  }

  static async create(data) {
    const { value_rs, route_id, delivery_timestamp } = data;
    if (!value_rs || !route_id || !delivery_timestamp) {
      throw new Error('Missing required fields');
    }
    const result = await pool.query(
      'INSERT INTO orders (value_rs, route_id, delivery_timestamp) VALUES ($1, $2, $3) RETURNING *',
      [value_rs, route_id, delivery_timestamp]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { value_rs, route_id, delivery_timestamp } = data;
    if (!value_rs || !route_id || !delivery_timestamp) {
      throw new Error('Missing required fields');
    }
    const result = await pool.query(
      'UPDATE orders SET value_rs = $1, route_id = $2, delivery_timestamp = $3 WHERE id = $4 RETURNING *',
      [value_rs, route_id, delivery_timestamp, id]
    );
    if (result.rows.length === 0) throw new Error('Order not found');
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) throw new Error('Order not found');
    return result.rows[0];
  }
}

module.exports = Order;