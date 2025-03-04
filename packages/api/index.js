require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const authRoutes = require('./routes/authRoutes');

const sequelizeInstance = require('./config/db');

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(errorHandler);

async function initializeDatabase() {
    try {
      await sequelizeInstance.sync({ alter: true });
      console.log('Database synchronized successfully.');
    } catch (error) {
      console.error('Database synchronization failed:', error.message);
    }
  }
  
  initializeDatabase();

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Task Manager API is running');
});

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
