const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss');

const sanitizeInput = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = xss(req.body[key]);
      }
    });
  }

  // Don't modify req.query as it's read-only in newer Express versions
  // if (req.query) {
  //   Object.keys(req.query).forEach(key => {
  //     if (typeof req.query[key] === 'string') {
  //       req.query[key] = xss(req.query[key]);
  //     }
  //   });
  // }

  if (req.params) {
    Object.keys(req.params).forEach(key => {
      if (typeof req.params[key] === 'string') {
        req.params[key] = xss(req.params[key]);
      }
    });
  }

  next();
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

module.exports = {
  sanitizeInput,
  validateEmail,
  validatePassword,
};
