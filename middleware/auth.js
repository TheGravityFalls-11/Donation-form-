const isAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  return res.status(401).json({
    success: false,
    message: 'Unauthorized'
  });
};

const notAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    return res.status(400).json({
      success: false,
      message: 'Already logged in'
    });
  }
  next();
};

module.exports = { isAuth, notAuth };
