const knex = require('knex')(require('../knexfile'));

const HospitalController = {
  // Método para listar hospitais
  async index(req, res) {
    const hospitais = await knex('hospitais');
    return res.json(hospitais);
  },

  // Método para criar um hospital
  async create(req, res) {
    try {
      const { nome, cnpj, endereco, phone, treatment, postal_code, city, state } = req.body;
  
      // Verifica se todos os campos obrigatórios foram preenchidos
      if (!nome || !cnpj || !phone || !treatment || !postal_code || !city || !state || !endereco) {
        return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos.' });
      }
  
      // Insere no banco de dados
      await knex('hospitais').insert({
        nome,
        endereco,
        cnpj,
        phone,
        treatment,
        postal_code,
        city,
        state,
      });
  
      return res.status(201).json({ message: 'Hospital cadastrado com sucesso!' });
    } catch (error) {
      console.error('Erro ao cadastrar hospital:', error);
      return res.status(500).json({ message: 'Erro ao cadastrar hospital.' });
    }
  },

   // Método para buscar um hospital por ID
  async show(req, res) {
    try {
        const { id } = req.params;
        const hospital = await knex('hospitais').where({ id }).first();

        if (!hospital) {
            return res.status(404).json({ message: 'Hospital não encontrado' });
        }

        return res.json(hospital);
    } catch (error) {
        console.error('Erro ao buscar hospital:', error);
        return res.status(500).json({ message: 'Erro ao buscar hospital.' });
    }
  },


  // Método para atualizar um hospital
  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        nome,
        endereco,
        cnpj,
        phone,
        treatment,
        postal_code,
        city,
        state,
      } = req.body;

      await knex('hospitais')
        .where({ id })
        .update({
          nome: nome,
          cnpj,
          treatment: treatment,
          phone: phone,
          endereco: endereco,
          postal_code: postal_code,
          city: city,
          state: state,
        });

      return res.json({ message: 'Hospital atualizado com sucesso!' });
    } catch (error) {
      console.error('Erro ao atualizar hospital:', error);
      return res.status(500).json({ message: 'Erro ao atualizar hospital.' });
    }
  },

  // Método para deletar um hospital
  async delete(req, res) {
    const { id } = req.params;
    await knex('hospitais').where({ id }).del();
    return res.json({ message: 'Hospital removido com sucesso!' });
  }
};

module.exports = HospitalController;
