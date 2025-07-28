export const checkAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    next();
  } else {
    res.status(403).send('Admins only');
  }
};

export const checkUser = (req, res, next) => {
  if (req.session.userId && !req.session.isAdmin) {
    next();
  } else {
    res.status(403).send('Users only');
  }
};

export const isAuthenticated = (req, res, next) => {
  if (req.session.userId || req.session.isAdmin) {
    return next();
  }
  res.redirect('/');
};
