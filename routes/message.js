import {Router as router} from 'express';

import {userIsMember} from '../middleware/index.js';

const customRouter = router();

customRouter.get('/new', userIsMember, (req, res, next) => {
  res.render('pages/message-form', {title: 'Create new message'});
});

export default customRouter;
