const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set');
  console.log('JWT_EXPIRE:', process.env.JWT_EXPIRE);
  
  // Use a fallback secret for now
  const secret = process.env.JWT_SECRET || 'fallback_jwt_secret_key_for_development_only';
  
  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET || 'fallback_jwt_secret_key_for_development_only';
  return jwt.verify(token, secret);
};

const extractTokenFromHeader = (authHeader) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
};

module.exports = {
  generateToken,
  verifyToken,
  extractTokenFromHeader,
};
