const express = require('express');
const router = express.Router();

const loveboxController = require('../controllers/lovebox');
const validation = require('../middleware/validate');

router.get('/', loveboxController.getAll);

router.get('/:id', loveboxController.getSingle);

router.post('/', validation.saveLovebox, loveboxController.createLovebox);

router.put('/:id', validation.saveLovebox, loveboxController.updateLovebox);

router.delete('/:id' , loveboxController.deleteLovebox);

module.exports = router;