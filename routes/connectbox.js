const router = require('express').Router();
const connectboxController = require('../controllers/connectbox');
const validation = require('../middleware/validate');


router.get('/', connectboxController.getAll);

router.get('/:id', connectboxController.getSingle);

router.post('/', validation.saveConnectbox, connectboxController.createConnectbox);

router.put('/:id', validation.saveConnectbox, connectboxController.updateConnectbox);

router.delete('/:id', connectboxController.deleteConnectbox);

module.exports = router;