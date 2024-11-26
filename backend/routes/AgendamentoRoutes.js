const express = require('express');
const agendamentoController = require('../controllers/AgendamentoController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', agendamentoController.index);
router.post('/', agendamentoController.create);
router.put('/:id', agendamentoController.update);
router.delete('/:id', agendamentoController.delete);
router.get('/:id', agendamentoController.show);

module.exports = router;
