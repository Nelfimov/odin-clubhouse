/**
 * Check if user is authorized, else redirect to /
 * @param {Object} req - request
 * @param {Object} res - response
 * @param {Function} next - callback to proceed
 * @return {any}
 */
function userIsAuthorized(req, res, next) {
  if (req.user) return next();

  req.flash('error', 'You are not authorized for this view');
  res.redirect('/auth/log-in');
};

/**
 * Check if user is unauthorized
 * @param {Object} req - request
 * @param {Object} res - response
 * @param {Function} next - callback to proceed
 * @return {any}
 */
function userIsAnon(req, res, next) {
  if (!req.user) return next();

  req.flash('error', 'You are already authorized');
  res.redirect('/');
};

/**
 * Check if user is authorized and a member of the club
 * @param {Object} req - request
 * @param {Object} res - response
 * @param {Function} next - callback
 * @return {any}
 */
function userIsMember(req, res, next) {
  if (!req.user) {
    req.flash('error', 'You have to be authorized');
    return res.redirect('/auth/log-in');
  };

  if (!req.user.status) {
    req.flash('error', 'You have to be a member to access');
    return res.redirect('/auth/confirm');
  };

  return next();
}

export {userIsAuthorized, userIsAnon, userIsMember};
