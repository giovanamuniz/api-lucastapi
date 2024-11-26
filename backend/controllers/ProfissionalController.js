const knex = require('knex')(require('../knexfile'));

const ProfissionalController = {
  // Método para listar profissionais
  async index(req, res) {
    const profissionais = await knex('profissionais');
    return res.json(profissionais);
  },

  // Método para criar um profissional
  async create(req, res) {
    try {
      const {
        nome,
        cpf_cnpj,
        especialidade,
        telefone,
        endereco,
        cep,
        cidade,
        estado,
      } = req.body;

      // Verifica se os campos obrigatórios estão preenchidos
      if (!nome || !cpf_cnpj || !especialidade) {
        return res.status(400).json({ message: 'Campos obrigatórios não preenchidos.' });
      }

      // Insere o profissional no banco de dados
      await knex('profissionais').insert({
        nome: nome,
        cpf_cnpj,
        especialidade: especialidade,
        telefone: telefone,
        endereco: endereco,
        cep: cep,
        cidade: cidade,
        estado: estado,
      });

      return res.status(201).json({ message: 'Profissional cadastrado com sucesso!' });
    } catch (error) {
      console.error('Erro ao cadastrar profissional:', error);
      return res.status(500).json({ message: 'Erro ao cadastrar profissional.' });
    }
  },

  // Método para atualizar um profissional
  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        nome,
        cpf_cnpj,
        especialidade,
        telefone,
        endereco,
        cep,
        cidade,
        estado,
      } = req.body;

      await knex('profissionais')
        .where({ id })
        .update({
          nome: nome,
          cpf_cnpj,
          especialidade: especialidade,
          telefone: telefone,
          endereco: endereco,
          cep: cep,
          cidade: cidade,
          estado: estado,
        });

      return res.json({ message: 'Profissional atualizado com sucesso!' });
    } catch (error) {
      console.error('Erro ao atualizar profissional:', error);
      return res.status(500).json({ message: 'Erro ao atualizar profissional.' });
    }
  },

  // Método para buscar um profissional por ID
  async show(req, res) {
    try {
        const { id } = req.params;
        const profissional = await knex('profissionais').where({ id }).first();

        if (!profissional) {
            return res.status(404).json({ message: 'Profissional não encontrado' });
        }

        return res.json(profissional);
    } catch (error) {
        console.error('Erro ao buscar profissional:', error);
        return res.status(500).json({ message: 'Erro ao buscar profissional.' });
    }
  },

  // Método para deletar um profissional
  async delete(req, res) {
    const { id } = req.params;
    await knex('profissionais').where({ id }).del();
    return res.json({ message: 'Profissional removido com sucesso!' });
  }
};

module.exports = ProfissionalController;
