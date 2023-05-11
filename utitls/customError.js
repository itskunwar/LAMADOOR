const throwCustomError = (statusCode, message) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  throw err;
};

module.exports = throwCustomError;
