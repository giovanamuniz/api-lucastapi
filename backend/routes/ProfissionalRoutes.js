const express = require('express');
const profissionalController = require('../controllers/ProfissionalController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', profissionalController.index);
router.post('/', profissionalController.create);
router.put('/:id', profissionalController.update);
router.delete('/:id', profissionalController.delete);
router.get('/:id', profissionalController.show);

module.exports = router;
