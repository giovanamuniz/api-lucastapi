const knex = require('knex')(require('../knexfile'));

const AgendamentoController = {
  // Método para listar agendamentos
  async index(req, res) {
    try {
      const agendamentos = await knex('agendamentos');
      return res.json(agendamentos);
    } catch (error) {
      console.error('Erro ao listar agendamentos:', error);
      return res.status(500).json({ message: 'Erro ao listar agendamentos.' });
    }
  },

  // Método para criar um agendamento
  async create(req, res) {
    try {
      const {
        data,
        horario,
        tipo,
        paciente_id,
        profissional_id,

      } = req.body;

      // Verifica se os campos obrigatórios estão preenchidos
      if (!data || !horario || !tipo || !paciente_id || !profissional_id) {
        return res.status(400).json({ message: 'Campos obrigatórios não preenchidos.' });
      }

      // Insere o agendamento no banco de dados
      await knex('agendamentos').insert({
        data: data,
        horario: horario,
        tipo: tipo,
        paciente_id,
        profissional_id,
      });

      return res.status(201).json({ message: 'Agendamento cadastrado com sucesso!' });
    } catch (error) {
      console.error('Erro ao cadastrar agendamento:', error);
      return res.status(500).json({ message: 'Erro ao cadastrar agendamento.' });
    }
  },

  // Método para atualizar um agendamento
  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        data,
        horario,
        tipo,
        paciente_id,
        profissional_id,

      } = req.body;

      await knex('agendamentos')
        .where({ id })
        .update({
          data: data,
          horario: horario,
          tipo: tipo,
          paciente_id,
          profissional_id,
        });

      return res.json({ message: 'Agendamento atualizado com sucesso!' });
    } catch (error) {
      console.error('Erro ao atualizar agendamento:', error);
      return res.status(500).json({ message: 'Erro ao atualizar agendamento.' });
    }
  },

  // Método para buscar um agendamento por ID
async show(req, res) {
  try {
      const { id } = req.params;
      const agendamento = await knex('agendamentos').where({ id }).first();

      if (!agendamento) {
          return res.status(404).json({ message: 'Agendamento não encontrado' });
      }

      return res.json(agendamento);
  } catch (error) {
      console.error('Erro ao buscar agendamento:', error);
      return res.status(500).json({ message: 'Erro ao buscar agendamento.' });
  }
},

  // Método para deletar um agendamento
  async delete(req, res) {
    try {
      const { id } = req.params;
      await knex('agendamentos').where({ id }).del();
      return res.json({ message: 'Agendamento removido com sucesso!' });
    } catch (error) {
      console.error('Erro ao deletar agendamneto:', error);
      return res.status(500).json({ message: 'Erro ao remover agendamento.' });
    }
  },
};

module.exports = AgendamentoController;
