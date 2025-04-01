const express = require('express');
const router = express.Router();

const loveboxController = require('../controllers/lovebox');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', loveboxController.getAll);

router.get('/:id', isAuthenticated, loveboxController.getSingle);

router.post('/', isAuthenticated, validation.saveLovebox, loveboxController.createLovebox);

router.put('/:id', isAuthenticated, validation.saveLovebox, loveboxController.updateLovebox);

router.delete('/:id', isAuthenticated, loveboxController.deleteLovebox);

module.exports = router;