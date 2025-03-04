const db = require('../config/db');
const bcrypt = require('bcrypt');

class User {
  static async createUser(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
  }

  static async findByEmail(email) {
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return users.length ? users[0] : null;
  }
}

module.exports = User;
