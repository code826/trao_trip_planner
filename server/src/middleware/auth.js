import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const checkNotAuthenticated = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token) {
      // If there's a token, try to verify it
      try {
        jwt.verify(token, process.env.JWT_SECRET);
        return res.status(400).json({ error: 'You are already logged in. Please logout first.' });
      } catch (err) {
        // Token is invalid, so it's okay to proceed to login/register
        return next();
      }
    }
    next();
  } catch (error) {
    next();
  }
};

export default auth;
