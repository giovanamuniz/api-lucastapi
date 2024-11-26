// FuncionarioController.js
const knex = require('knex')(require('../knexfile'));
const bcrypt = require('bcryptjs'); 
const { sendSMS } = require('../twilio');

const FuncionarioController = {
  // Método para listar funcionários
  async index(req, res) {
    const funcionarios = await knex('funcionarios');
    return res.json(funcionarios);
  },

  // Método para login do funcionário
  async login(req, res) {
    const { email, senha } = req.body;

    try {
      const funcionario = await knex('funcionarios').where({ email }).first();

      // Verifica se o funcionário existe e se a senha está correta
      if (funcionario && await bcrypt.compare(senha, funcionario.senha)) {
        // Lógica de geração do token JWT aqui
        const token = 'seu_token_jwt_aqui';

        // Enviar SMS ao funcionário
        await sendSMS(funcionario.telefone, 'Você fez login com sucesso!');

        return res.json({ message: 'Login realizado com sucesso!', token, funcionarioId: funcionario.id });
      } else {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      return res.status(500).json({ error: 'Erro interno ao realizar login' });
    }
  },

  // Método para atualizar um funcionário
  async update(req, res) {
    const { id } = req.params;
    const { nome, email, senha, telefone } = req.body;

    const updateData = { nome, email, telefone };
    if (senha) {
      const hashedPassword = await bcrypt.hash(senha, 10);
      updateData.senha = hashedPassword;
    }

    await knex('funcionarios').where({ id }).update(updateData);
    return res.json({ message: 'Funcionário atualizado com sucesso!' });
  },

  // Método para deletar um funcionário
  async delete(req, res) {
    const { id } = req.params;
    await knex('funcionarios').where({ id }).del();
    return res.json({ message: 'Funcionário removido com sucesso!' });
  }
};

module.exports = FuncionarioController;
