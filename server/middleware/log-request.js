module.exports = function() {
  return function(req, res, next) {
    console.log('Received request:', req.method, req.url);
    next();
  };
};
