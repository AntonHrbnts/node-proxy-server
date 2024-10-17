const Exception = require("./exception");

function errorHandler(err, req, res) {
  const statusCode = err instanceof Exception ? err.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
  });
}

module.exports = errorHandler;
