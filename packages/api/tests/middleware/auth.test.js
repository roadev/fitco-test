const { verifyToken } = require('../../middleware/auth');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

describe('Auth Middleware - verifyToken', () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  it('should return 401 if no token is provided', () => {
    verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
  });

  it('should return 403 if token is invalid', () => {
    req.headers.authorization = 'Bearer invalid_token';
    jwt.verify.mockImplementation((token, secret, callback) => callback(new Error('Invalid token')));

    verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' });
  });

  it('should call next() if token is valid', () => {
    req.headers.authorization = 'Bearer valid_token';
    jwt.verify.mockImplementation((token, secret, callback) => callback(null, { id: 1, email: 'test@example.com' }));

    verifyToken(req, res, next);

    expect(req.user).toEqual({ id: 1, email: 'test@example.com' });
    expect(next).toHaveBeenCalled();
  });
});
