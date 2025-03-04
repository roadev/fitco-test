const { validateRegistration, validateLogin } = require('../../middleware/validation');

describe('Validation Middleware', () => {
  test('should pass valid registration input', () => {
    const req = { body: { name: 'John Doe', email: 'john@example.com', password: 'securePass123' } };
    const res = {};
    const next = jest.fn();

    validateRegistration(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('should fail invalid email in registration', () => {
    const req = { body: { name: 'John Doe', email: 'invalid-email', password: 'securePass123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    validateRegistration(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid email format" });
  });

  test('should pass valid login input', () => {
    const req = { body: { email: 'john@example.com', password: 'securePass123' } };
    const res = {};
    const next = jest.fn();

    validateLogin(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('should fail empty login password', () => {
    const req = { body: { email: 'john@example.com', password: '' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    validateLogin(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Password is required and must be a string" });
  });
});
