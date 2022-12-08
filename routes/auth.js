import { Router } from 'express';

const router = Router();

router.get('/sign-up', (req, res, next) => {
  res.render('pages/signup-form', {title: 'Sign Up'});
}).post('/sign-up', () => {

});

export default router;
