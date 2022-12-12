/**
 * Check if user is authorized, else redirect to /
 * @param {Object} req - request
 * @param {Object} res - response
 * @param {Function} next - callback to proceed
 * @return {any}
 */
function userIsAuthorized(req, res, next) {
  if (req.user) return next();

  req.flash('error', 'You are not authrized for this view');
  res.redirect('/');
};

/**
 *
 * @param {Object} req - request
 * @param {Object} res - response
 * @param {Function} next - callback to proceed
 * @return {any}
 */
function userIsAnon(req, res, next) {
  if (!req.user) return next();

  req.flash('error', 'You are already authrized');
  res.redirect('/');
};

export {userIsAuthorized, userIsAnon};
