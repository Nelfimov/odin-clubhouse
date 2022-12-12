import {Router as router} from 'express';

import {userIsMember} from '../middleware/index.js';
import Message from '../models/message.js';

const customRouter = router();

customRouter
    .get('/new', userIsMember, (req, res, next) => {
      res.render('pages/message-form', {title: 'Create new message'});
    })
    .post('/new', userIsMember, (req, res, next) => {
      new Message({
        text: req.body.text,
        time_stamp: new Date(),
        author: req.user,
      }).save((err) => {
        if (err) return next(err);

        res.redirect('/');
      });
    });

export default customRouter;
