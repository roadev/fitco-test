function validateRegistration(req, res, next) {
    const { name, email, password } = req.body;
  
    if (!name || typeof name !== 'string' || name.trim().length < 3) {
      return res.status(400).json({ error: "Name must be at least 3 characters long" });
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
  
    if (!password || password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters long" });
    }
  
    next();
  }
  
  function validateLogin(req, res, next) {
    const { email, password } = req.body;
  
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: "Email is required and must be a string" });
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
  
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ error: "Password is required and must be a string" });
    }
  
    next();
  }
  
module.exports = { validateRegistration, validateLogin };
  