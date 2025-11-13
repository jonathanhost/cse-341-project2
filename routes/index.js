const router = require('express').Router();

router.use('/', require('./swagger'));


const customersRoutes = require('./customers');
const productsRoutes = require('./products');


router.use('/customers', customersRoutes);
router.use('/products', productsRoutes);

router.get('/', (req, res) => {
    //#swagger-tags=['Hello World']
    res.send('Hello World');
});

module.exports = router;
