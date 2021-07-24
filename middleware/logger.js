// creating middleware
const logger = (req, res, next) => {
    req.hello = 'Hello Sajid!';
    console.log(`${req.method} - ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
  };

module.exports = logger;