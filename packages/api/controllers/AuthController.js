const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateToken } = require('../middleware/auth');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const newUser = await User.create({ name, email, password });
    res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    console.log("Login request received:", req.body);

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.error("User not found for email:", email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log("User found:", user.email);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error("Invalid password for user:", email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log("Password is valid for:", user.email);

    const token = generateToken(user);
    console.log("Generated token:", token);

    res.json({ token });
  } catch (error) {
    console.error("🔥 Login Error:", error);
    res.status(500).json({ error: 'Error logging in' });
  }
};


module.exports = { register, login };