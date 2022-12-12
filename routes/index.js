import {Router as router} from 'express';

import Message from '../models/message.js';

const customRouter = router();

customRouter.get('/', function(req, res, next) {
  Message.find().populate('author').lean().then((messages) => {
    res.render('pages/index', {title: 'Main', allMessages: messages});
  }).catch((err) => next(err));
});

export default customRouter;
