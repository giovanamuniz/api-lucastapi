const knex = require('knex')(require('../knexfile'));

const PacienteController = {
  // Método para listar pacientes
  async index(req, res) {
    try {
      const pacientes = await knex('pacientes');
      return res.json(pacientes);
    } catch (error) {
      console.error('Erro ao listar pacientes:', error);
      return res.status(500).json({ message: 'Erro ao listar pacientes.' });
    }
  },

  // Método para criar um paciente
  async create(req, res) {
    try {
      const {
        nome,
        cpf,
        genero,
        data_nascimento,
        telefone,
        responsavel,
        telefone_responsavel,
        endereco,
        cep,
        cidade,
        estado,
        hospital_id,
        profissional_id,
      } = req.body;

      // Verifica se os campos obrigatórios estão preenchidos
      if (!nome || !cpf || !genero || !data_nascimento || !hospital_id || !profissional_id) {
        return res.status(400).json({ message: 'Campos obrigatórios não preenchidos.' });
      }

      // Insere o paciente no banco de dados
      await knex('pacientes').insert({
        nome: nome,
        cpf,
        genero: genero,
        data_nascimento: data_nascimento,
        telefone: telefone,
        responsavel: responsavel,
        telefone_responsavel: telefone_responsavel,
        endereco: endereco,
        cep: cep,
        cidade: cidade,
        estado: estado,
        hospital_id, 
        profissional_id,
      });

      return res.status(201).json({ message: 'Paciente cadastrado com sucesso!' });
    } catch (error) {
      console.error('Erro ao cadastrar paciente:', error);
      return res.status(500).json({ message: 'Erro ao cadastrar paciente.' });
    }
  },

  // Método para atualizar um paciente
  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        nome,
        cpf,
        genero,
        data_nascimento,
        telefone,
        responsavel,
        telefone_responsavel,
        endereco,
        cep,
        cidade,
        estado,
      } = req.body;

      await knex('pacientes')
        .where({ id })
        .update({
          nome: nome,
          cpf,
          genero: genero,
          data_nascimento: data_nascimento,
          telefone: telefone,
          responsavel: responsavel,
          telefone_responsavel: telefone_responsavel,
          endereco: endereco,
          cep: cep,
          cidade: cidade,
          estado: estado,
        });

      return res.json({ message: 'Paciente atualizado com sucesso!' });
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error);
      return res.status(500).json({ message: 'Erro ao atualizar paciente.' });
    }
  },

  // Método para buscar um paciente por ID
async show(req, res) {
  try {
      const { id } = req.params;
      const paciente = await knex('pacientes').where({ id }).first();

      if (!paciente) {
          return res.status(404).json({ message: 'Paciente não encontrado' });
      }

      return res.json(paciente);
  } catch (error) {
      console.error('Erro ao buscar paciente:', error);
      return res.status(500).json({ message: 'Erro ao buscar paciente.' });
  }
},

  // Método para deletar um paciente
  async delete(req, res) {
    try {
      const { id } = req.params;
      await knex('pacientes').where({ id }).del();
      return res.json({ message: 'Paciente removido com sucesso!' });
    } catch (error) {
      console.error('Erro ao deletar paciente:', error);
      return res.status(500).json({ message: 'Erro ao remover paciente.' });
    }
  },
};

module.exports = PacienteController;
