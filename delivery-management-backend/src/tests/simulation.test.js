const Simulation = require('../models/Simulation');
const pool = require('../config/db');

jest.mock('../config/db');

describe('Simulation Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should throw error for invalid inputs', async () => {
    await expect(Simulation.run({})).rejects.toThrow('Invalid or missing parameters');
    await expect(Simulation.run({ drivers: -1, startTime: '08:00', maxHours: 8 })).rejects.toThrow('Invalid or missing parameters');
  });

  test('should throw error if drivers exceed available', async () => {
    pool.connect.mockResolvedValue({
      query: jest.fn().mockResolvedValueOnce({ rows: [{ id: 1, past_week_hours: 0 }] }),
      release: jest.fn(),
    });
    await expect(Simulation.run({ drivers: 2, startTime: '08:00', maxHours: 8 })).rejects.toThrow('Requested drivers exceed available drivers');
  });

  test('should calculate KPIs correctly', async () => {
    pool.connect.mockResolvedValue({
      query: jest.fn()
        .mockResolvedValueOnce({ rows: [{ id: 1, past_week_hours: 0 }] })
        .mockResolvedValueOnce({ rows: [
          { id: 1, value_rs: 1500, route_id: 1, delivery_timestamp: new Date(), distance: 10, traffic_level: 'Low', base_time: 30 },
        ] })
        .mockResolvedValueOnce({ rows: [{}] }),
      release: jest.fn(),
    });

    const results = await Simulation.run({ drivers: 1, startTime: '08:00', maxHours: 8 });
    expect(results.profit).toBe(1450);
    expect(results.eAblefficiency).toBe(100);
    expect(results.deliveries).toEqual({ onTime: 1, late: 0 });
    expect(results.fuelCosts).toEqual({ base: 50, surcharge: 0 });
  });

  test('should apply late delivery penalty', async () => {
    pool.connect.mockResolvedValue({
      query: jest.fn()
        .mockResolvedValueOnce({ rows: [{ id: 1, past_week_hours: 0 }] })
        .mockResolvedValueOnce({ rows: [
          { id: 1, value_rs: 500, route_id: 1, delivery_timestamp: new Date(Date.now() + 1000 * 60 * 31), distance: 10, traffic_level: 'Low', base_time: 30 },
        ] })
        .mockResolvedValueOnce({ rows: [{}] }),
      release: jest.fn(),
    });

    const results = await Simulation.run({ drivers: 1, startTime: '08:00', maxHours: 8 });
    expect(results.profit).toBe(400);
    expect(results.efficiency).toBe(0);
  });

  test('should apply fuel surcharge for high traffic', async () => {
    pool.connect.mockResolvedValue({
      query: jest.fn()
        .mockResolvedValueOnce({ rows: [{ id: 1, past_week_hours: 0 }] })
        .mockResolvedValueOnce({ rows: [
          { id: 1, value_rs: 500, route_id: 1, delivery_timestamp: new Date(), distance: 10, traffic_level: 'High', base_time: 30 },
        ] })
        .mockResolvedValueOnce({ rows: [{}] }),
      release: jest.fn(),
    });

    const results = await Simulation.run({ drivers: 1, startTime: '08:00', maxHours: 8 });
    expect(results.fuelCosts).toEqual({ base: 50, surcharge: 20 });
  });
});