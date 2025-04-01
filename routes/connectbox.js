const router = require('express').Router();
const { authenticate } = require('passport');
const connectboxController = require('../controllers/connectbox');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');


router.get('/', connectboxController.getAll);

router.get('/:id', isAuthenticated, connectboxController.getSingle);

router.post('/', isAuthenticated, validation.saveConnectbox, connectboxController.createConnectbox);

router.put('/:id', isAuthenticated, validation.saveConnectbox, connectboxController.updateConnectbox);

router.delete('/:id', isAuthenticated, connectboxController.deleteConnectbox);

module.exports = router;