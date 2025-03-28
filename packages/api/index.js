require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const app = express();
const authRoutes = require('./routes/authRoutes');
const tasksRoutes = require('./routes/tasksRoutes');
const projectsRoutes = require('./routes/projectsRoutes');
const teamsRoutes = require('./routes/teamsRoutes');

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

async function initializeDatabase() {
    try {
      await sequelizeInstance.sync({ alter: false });
      console.log('Database synchronized successfully.');
    } catch (error) {
      console.error('Database synchronization failed:', error.message);
    }
  }
  
  initializeDatabase();

app.use('/api/auth', authRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/teams', teamsRoutes);

app.get('/', (req, res) => {
  res.send('Task Manager API is running');
});

const PORT = process.env.APP_PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { app, server }; 
