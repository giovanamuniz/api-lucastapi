// authcontroller.js
const knex = require('knex')(require('../knexfile'));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendSMS } = require('../twilio'); // Importa o módulo Twilio

const AuthController = {
  // Método para registrar um funcionário
  async register(req, res) {
    const { nome, email, senha, telefone } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 10);

    try {
      // Registra o novo funcionário no banco
      await knex('funcionarios').insert({ nome, email, senha: hashedPassword, telefone });
      
      // Envia um SMS ao funcionário após o registro
      await sendSMS(telefone, `Olá ${nome}, seu registro foi concluído com sucesso!`);

      return res.status(201).json({ message: 'Funcionário cadastrado com sucesso!' });
    } catch (error) {
      console.error('Erro ao registrar funcionário:', error);
      return res.status(500).json({ error: 'Erro ao registrar funcionário' });
    }
  },

  // Método para login de funcionário
  async login(req, res) {
    const { email, senha } = req.body;
    const funcionario = await knex('funcionarios').where({ email }).first();
  
    if (!funcionario || !(await bcrypt.compare(senha, funcionario.senha))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
  
    // Gera o token JWT
    const token = jwt.sign({ id: funcionario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    // Inclui o ID do funcionário na resposta
    return res.json({ 
      token, 
      funcionarioId: funcionario.id // Adiciona o ID do funcionário
    });
  }
  
};

module.exports = AuthController;
