const router = require('express').Router();
const passport = require('passport');
router.use('/', require('./swagger'));


const customersRoutes = require('./customers');
const productsRoutes = require('./products');


router.use('/customers', customersRoutes);
router.use('/products', productsRoutes);

router.get('/', (req, res) => {
    //#swagger-tags=['Hello World']
    res.send('Hello World');
});

router.get('/login', passport.authenticate('github', (req, res) => {}));

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
