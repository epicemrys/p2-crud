const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));

// router.get('/', (req, res) => {
//     //#swagger.tags=['Match Maker']
//     res.send('Welcome to Match Maker');
// });

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

router.get('/github/callback', passport.authenticate('github', {
    failureRedirect: 'api-docs',
    session: false
}),
(req, res) => {
    req.session.user = {
        id: req.user.id,
        displayName: req.user.displayName || req.user.username || req.user.name,
    };
    res.redirect('/');
});

module.exports = router;