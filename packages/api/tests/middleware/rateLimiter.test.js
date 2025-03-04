const { loginRateLimiter, rateLimitStore } = require('../../middleware/rateLimiter');

describe('Rate Limiter Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { ip: '127.0.0.1' };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
    rateLimitStore.clear();
  });

  it('should allow first login attempt', () => {
    loginRateLimiter(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should block after exceeding max attempts', () => {
    for (let i = 0; i < 6; i++) {
      loginRateLimiter(req, res, next);
    }
    expect(res.status).toHaveBeenCalledWith(429);
    expect(res.json).toHaveBeenCalledWith({ error: 'Too many failed login attempts. Try again later.' });
  });

  it('should reset attempts after time window', () => {
    jest.useFakeTimers();
    for (let i = 0; i < 5; i++) {
      loginRateLimiter(req, res, next);
    }
    // Move time forward by 16 minutes
    jest.advanceTimersByTime(16 * 60 * 1000);
    loginRateLimiter(req, res, next);
    expect(next).toHaveBeenCalled();
    jest.useRealTimers();
  });
});
