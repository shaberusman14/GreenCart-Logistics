const pool = require('../config/db');

class Driver {
  static async getAll() {
    const result = await pool.query('SELECT * FROM drivers');
    return result.rows;
  }

  static async create(data) {
    const { name, shift_hours, past_week_hours } = data;
    if (!name || !shift_hours || !past_week_hours) {
      throw new Error('Missing required fields');
    }
    const result = await pool.query(
      'INSERT INTO drivers (name, shift_hours, past_week_hours) VALUES ($1, $2, $3) RETURNING *',
      [name, shift_hours, past_week_hours]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { name, shift_hours, past_week_hours } = data;
    if (!name || !shift_hours || !past_week_hours) {
      throw new Error('Missing required fields');
    }
    const result = await pool.query(
      'UPDATE drivers SET name = $1, shift_hours = $2, past_week_hours = $3 WHERE id = $4 RETURNING *',
      [name, shift_hours, past_week_hours, id]
    );
    if (result.rows.length === 0) throw new Error('Driver not found');
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM drivers WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) throw new Error('Driver not found');
    return result.rows[0];
  }
}

module.exports = Driver;