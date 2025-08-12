const express = require('express');
const cors = require('cors');
const authenticateToken = require('./middleware/auth');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const driverRoutes = require('./routes/drivers');
const routeRoutes = require('./routes/routes');
const orderRoutes = require('./routes/orders');
const simulationRoutes = require('./routes/simulation');
const { loadInitialData } = require('./services/dataLoader');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', authenticateToken, dashboardRoutes);
app.use('/api/drivers', authenticateToken, driverRoutes);
app.use('/api/routes', authenticateToken, routeRoutes);
app.use('/api/orders', authenticateToken, orderRoutes);
app.use('/api/simulation', authenticateToken, simulationRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await loadInitialData();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();