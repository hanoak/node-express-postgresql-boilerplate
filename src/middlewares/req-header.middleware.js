const requestHeadersMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    return res.status(200).json({});
  }
  next();
};

module.exports = requestHeadersMiddleware;
