const rateLimitStore = new Map();

const loginRateLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxAttempts = 5;
  // Block for 10 minutes after exceeding limit
  const blockDuration = 10 * 60 * 1000;

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, { attempts: 0, firstAttemptTime: now, blockedUntil: null });
  }

  const entry = rateLimitStore.get(ip);

  // If IP is blocked, check if the block period has expired
  if (entry.blockedUntil && now < entry.blockedUntil) {
    return res.status(429).json({ error: "Too many failed login attempts. Try again later." });
  } else if (entry.blockedUntil && now >= entry.blockedUntil) {
    entry.attempts = 0;
    entry.blockedUntil = null;
  }

  if (now - entry.firstAttemptTime > windowMs) {
    entry.attempts = 0;
    entry.firstAttemptTime = now;
  }

  entry.attempts += 1;

  if (entry.attempts > maxAttempts) {
    entry.blockedUntil = now + blockDuration;
    return res.status(429).json({ error: "Too many failed login attempts. Try again later." });
  }

  rateLimitStore.set(ip, entry);
  next();
};

module.exports = loginRateLimiter;
