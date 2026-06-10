const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/servicesController');

router.get('/', servicesController.getAllServices);
router.get('/:id', servicesController.getServiceById);
router.post('/', servicesController.createService);
router.patch('/:id', servicesController.updateService);
router.delete('/:id', servicesController.deleteService);
router.post('/:id/comments', servicesController.addComment);

module.exports = router;
