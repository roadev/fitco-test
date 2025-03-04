require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const app = express();

const db = require('./config/db');

async function testDBConnection() {
  try {
    const [result] = await db.query('SELECT 1');
    console.log('MySQL Connection Successful:', result);
  } catch (error) {
    console.error('MySQL Connection Failed:', error.message);
    process.exit(1);
  }
}

testDBConnection();

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

app.get('/', (req, res) => {
  res.send('Task Manager API is running');
});

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
