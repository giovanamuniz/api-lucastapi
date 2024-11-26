// FuncionarioRoutes.js

const express = require('express');
const funcionarioController = require('../controllers/FuncionarioController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware); // Todas as rotas abaixo requerem autenticação

router.get('/', funcionarioController.index);
router.put('/:id', funcionarioController.update);
router.delete('/:id', funcionarioController.delete);

module.exports = router;
