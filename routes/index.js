const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));

router.use('/lovebox', require('./lovebox'));
router.use('/connectbox', require('./connectbox'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            return next(err);
        }
        res.redirect('/?message=You have been Logged out successfully');
    });
});

module.exports = router;