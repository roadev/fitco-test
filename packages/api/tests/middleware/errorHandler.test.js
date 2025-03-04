const errorHandler = require('../../middleware/errorHandler');

describe('Error Handling Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  it('should return 500 for generic errors', () => {
    const error = new Error('Something went wrong');
    errorHandler(error, req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Something went wrong' });
  });

  it('should return custom status code if provided', () => {
    const error = new Error('Not Found');
    error.status = 404;
    errorHandler(error, req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Not Found' });
  });
});
