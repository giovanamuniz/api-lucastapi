const express = require('express');
const pacienteController = require('../controllers/PacienteController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', pacienteController.index);
router.post('/', pacienteController.create);
router.put('/:id', pacienteController.update);
router.delete('/:id', pacienteController.delete);
router.get('/:id', pacienteController.show);

module.exports = router;
