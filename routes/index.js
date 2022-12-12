import {router} from 'express';
const customRouter = router();

customRouter.get('/', function(req, res, next) {
  res.render('pages/index', {title: 'Main'});
});

export default router;
