const express = require('express');
const pool = require('../config/db');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const orders = (await pool.query('SELECT o.*, r.distance, r.traffic_level, r.base_time FROM orders o JOIN routes r ON o.route_id = r.id')).rows;
    let totalProfit = 0;
    let onTimeDeliveries = 0;
    let totalDeliveries = orders.length;
    let baseFuelCost = 0;
    let surchargeFuelCost = 0;

    orders.forEach(order => {
      const deliveryTime = new Date(order.delivery_timestamp).getTime();
      const expectedTime = order.base_time + 10;
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

    res.json({
      profit: totalProfit,
      efficiency,
      deliveries: { onTime: onTimeDeliveries, late: totalDeliveries - onTimeDeliveries },
      fuelCosts: { base: baseFuelCost, surcharge: surchargeFuelCost },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;