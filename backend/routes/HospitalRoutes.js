const express = require('express');
const hospitalController = require('../controllers/HospitalController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', hospitalController.index);
router.post('/', hospitalController.create);
router.put('/:id', hospitalController.update);
router.delete('/:id', hospitalController.delete);
router.get('/:id', hospitalController.show);

module.exports = router;
