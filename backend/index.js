const express = require('express');
const cors = require('cors');
const knex = require('knex')(require('./knexfile'));
const dotenv = require('dotenv');
const authRoutes = require('./routes/AuthRoutes');
const funcionarioRoutes = require('./routes/FuncionarioRoutes');
const pacienteRoutes = require('./routes/PacienteRoutes');
const profissionalRoutes = require('./routes/ProfissionalRoutes');
const hospitalRoutes = require('./routes/HospitalRoutes');
const agendamentoRoutes = require('./routes/AgendamentoRoutes');

dotenv.config(); // Carrega variáveis de ambiente

const app = express(); // Inicializa o app do Express

app.use(cors({
  origin: 'http://localhost:4200', // Permite requisições apenas do Angular
}));

app.use(express.json()); // Para permitir o uso de JSON nas requisições

// Rotas
app.use('/auth', authRoutes);
app.use('/funcionarios', funcionarioRoutes);
app.use('/pacientes', pacienteRoutes);
app.use('/profissionais', profissionalRoutes);
app.use('/hospitais', hospitalRoutes);
app.use('/agendamentos', agendamentoRoutes);


const PORT = process.env.PORT || 4040;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
