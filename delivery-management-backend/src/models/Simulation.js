const pool = require('../config/db');

class Simulation {
  static async run(inputs) {
    const { drivers: numDrivers, startTime, maxHours } = inputs;
    if (!numDrivers || !startTime || !maxHours || numDrivers < 0 || maxHours < 0) {
      throw new Error('Invalid or missing parameters');
    }

    const client = await pool.connect();
    try {
      const drivers = (await client.query('SELECT * FROM drivers')).rows;
      if (numDrivers > drivers.length) {
        throw new Error('Requested drivers exceed available drivers');
      }

      const orders = (await client.query('SELECT o.*, r.distance, r.traffic_level, r.base_time FROM orders o JOIN routes r ON o.route_id = r.id')).rows;
      const assignments = [];
      const driverHours = new Map(drivers.map(d => [d.id, { hours: 0, speedFactor: d.past_week_hours > 56 ? 0.7 : 1 }]));

      orders.forEach(order => {
        const availableDriver = drivers.find(d => driverHours.get(d.id).hours < maxHours);
        if (availableDriver) {
          assignments.push({ orderId: order.id, driverId: availableDriver.id });
          driverHours.get(availableDriver.id).hours += order.base_time / 60 * driverHours.get(availableDriver.id).speedFactor;
        }
      });

      let totalProfit = 0;
      let onTimeDeliveries = 0;
      let totalDeliveries = orders.length;
      let baseFuelCost = 0;
      let surchargeFuelCost = 0;

      orders.forEach(order => {
        const deliveryTime = new Date(order.delivery_timestamp).getTime();
        const expectedTime = order.base_time + 10; // 10-minute buffer
        const isOnTime = deliveryTime <= expectedTime * 60 * 1000;
        let orderProfit = order.value_rs;

        if (!isOnTime) {
          orderProfit -= 50;
        } else if (order.value_rs > 1000) {
          orderProfit += order.value_rs * 0.1;
        }

        const fuelCost = order.distance * 5;
        baseFuelCost += fuelCost;
        if (order.traffic_level === 'High') {
          surchargeFuelCost += order.distance * 2;
        }

        totalProfit += orderProfit - (fuelCost + (order.traffic_level === 'High' ? order.distance * 2 : 0));
        if (isOnTime) onTimeDeliveries++;
      });

      const efficiency = totalDeliveries > 0 ? (onTimeDeliveries / totalDeliveries) * 100 : 0;
      const results = {
        profit: totalProfit,
        efficiency,
        deliveries: { onTime: onTimeDeliveries, late: totalDeliveries - onTimeDeliveries },
        fuelCosts: { base: baseFuelCost, surcharge: surchargeFuelCost },
      };

      await client.query(
        'INSERT INTO simulations (inputs, results) VALUES ($1, $2) RETURNING *',
        [inputs, results]
      );

      return results;
    } finally {
      client.release();
    }
  }

  static async getHistory() {
    const result = await pool.query('SELECT * FROM simulations ORDER BY created_at DESC');
    return result.rows;
  }
}

module.exports = Simulation;