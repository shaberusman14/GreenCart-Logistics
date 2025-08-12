const pool = require('../config/db');

class Route {
  static async getAll() {
    const result = await pool.query('SELECT * FROM routes');
    return result.rows;
  }

  static async create(data) {
    const { distance, traffic_level, base_time } = data;
    if (!distance || !traffic_level || !base_time) {
      throw new Error('Missing required fields');
    }
    const result = await pool.query(
      'INSERT INTO routes (distance, traffic_level, base_time) VALUES ($1, $2, $3) RETURNING *',
      [distance, traffic_level, base_time]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { distance, traffic_level, base_time } = data;
    if (!distance || !traffic_level || !base_time) {
      throw new Error('Missing required fields');
    }
    const result = await pool.query(
      'UPDATE routes SET distance = $1, traffic_level = $2, base_time = $3 WHERE id = $4 RETURNING *',
      [distance, traffic_level, base_time, id]
    );
    if (result.rows.length === 0) throw new Error('Route not found');
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM routes WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) throw new Error('Route not found');
    return result.rows[0];
  }
}

module.exports = Route;