const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Match Maker']
    res.send('Welcome to Match Maker');
});

router.use('/lovebox', require('./lovebox'));
router.use('/connectbox', require('./connectbox'));

module.exports = router;