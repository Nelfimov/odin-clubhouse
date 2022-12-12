import { Router } from 'express';
const router = Router();

router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Main' });
});

export default router;
