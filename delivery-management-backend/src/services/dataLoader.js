const pool = require('../config/db');
const fs = require('fs');
const csv = require('csv-parser');

const loadInitialData = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS drivers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        shift_hours INTEGER,
        past_week_hours INTEGER
      );
      CREATE TABLE IF NOT EXISTS routes (
        id SERIAL PRIMARY KEY,
        distance INTEGER,
        traffic_level VARCHAR(50),
        base_time INTEGER
      );
      CREATE TABLE IF NOT EXISTS orders (
        id Serial PRIMARY KEY,
        value_rs INTEGER,
        route_id INTEGER,
        delivery_timestamp TIMESTAMP,
        FOREIGN KEY (route_id) REFERENCES routes(id)
      );
      CREATE TABLE IF NOT EXISTS simulations (
        id SERIAL PRIMARY KEY,
        inputs JSONB,
        results JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const loadCsv = (file, table, mappings) => {
      return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(file)
          .pipe(csv())
          .on('data', (row) => results.push(mappings(row)))
          .on('end', async () => {
            for (const row of results) {
              const fields = Object.keys(row);
              const values = Object.values(row);
              await client.query(
                `INSERT INTO ${table} (${fields.join(', ')}) VALUES (${fields.map((_, i) => `$${i+1}`).join(', ')})`,
                values
              );
            }
            resolve();
          })
          .on('error', reject);
      });
    };

    await loadCsv('data/drivers.csv', 'drivers', row => ({
      name: row.name,
      shift_hours: parseInt(row.shift_hours),
      past_week_hours: parseInt(row.past_week_hours),
    }));
    await loadCsv('data/routes.csv', 'routes', row => ({
      distance: parseInt(row.distance),
      traffic_level: row.traffic_level,
      base_time: parseInt(row.base_time),
    }));
    await loadCsv('data/orders.csv', 'orders', row => ({
      value_rs: parseInt(row.value_rs),
      route_id: parseInt(row.route_id),
      delivery_timestamp: row.delivery_timestamp,
    }));
  } catch (err) {
    console.error('Error loading initial data:', err);
  } finally {
    client.release();
  }
};

module.exports = { loadInitialData };