const { validateRegistration, validateLogin } = require('../../middleware/validation');

describe('Validation Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  describe('validateRegistration', () => {
    it('should pass valid registration input', () => {
      req = { body: { name: 'John Doe', email: 'john@example.com', password: 'securePass123' } };
      validateRegistration(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('should return 400 for invalid email', () => {
      req = { body: { name: 'John Doe', email: 'invalid-email', password: 'securePass123' } };
      validateRegistration(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email format' });
    });

    it('should return 400 for short password', () => {
      req = { body: { name: 'John Doe', email: 'john@example.com', password: 'short' } };
      validateRegistration(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Password must be at least 8 characters long' });
    });
  });

  describe('validateLogin', () => {
    it('should pass valid login input', () => {
      req = { body: { email: 'john@example.com', password: 'securePass123' } };
      validateLogin(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('should return 400 for missing email', () => {
      req = { body: { password: 'securePass123' } };
      validateLogin(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Email is required and must be a string' });
    });

    it('should return 400 for missing password', () => {
      req = { body: { email: 'john@example.com' } };
      validateLogin(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Password is required and must be a string' });
    });
  });
});
