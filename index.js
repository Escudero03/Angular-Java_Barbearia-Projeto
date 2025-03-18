const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Base de dados temporária
let agendamentos = [];
let clientes = [];

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API da Barbearia funcionando!' });
});

// API Agendamentos
// Obter todos os agendamentos
app.get('/api/agendamentos', (req, res) => {
  res.json(agendamentos);
});

// Criar um novo agendamento
app.post('/api/agendamentos', (req, res) => {
  const { nome, data, hora, servico } = req.body;
  
  if (!nome || !data || !hora || !servico) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }
  
  const novoAgendamento = {
    id: Date.now().toString(),
    nome,
    data,
    hora,
    servico,
    status: 'agendado'
  };
  
  agendamentos.push(novoAgendamento);
  res.status(201).json(novoAgendamento);
});

// Obter um agendamento específico
app.get('/api/agendamentos/:id', (req, res) => {
  const agendamento = agendamentos.find(a => a.id === req.params.id);
  
  if (!agendamento) {
    return res.status(404).json({ error: 'Agendamento não encontrado' });
  }
  
  res.json(agendamento);
});

// Atualizar um agendamento
app.put('/api/agendamentos/:id', (req, res) => {
  const index = agendamentos.findIndex(a => a.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Agendamento não encontrado' });
  }
  
  const { nome, data, hora, servico, status } = req.body;
  
  agendamentos[index] = {
    ...agendamentos[index],
    nome: nome || agendamentos[index].nome,
    data: data || agendamentos[index].data,
    hora: hora || agendamentos[index].hora,
    servico: servico || agendamentos[index].servico,
    status: status || agendamentos[index].status
  };
  
  res.json(agendamentos[index]);
});

// Excluir um agendamento
app.delete('/api/agendamentos/:id', (req, res) => {
  const index = agendamentos.findIndex(a => a.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Agendamento não encontrado' });
  }
  
  agendamentos.splice(index, 1);
  res.status(204).end();
});

// API Clientes
// Obter todos os clientes
app.get('/api/clients', (req, res) => {
  res.json(clientes);
});

// Criar um novo cliente
app.post('/api/clients', (req, res) => {
  const { nome, telefone, email } = req.body;
  
  if (!nome) {
    return res.status(400).json({ error: 'O nome é obrigatório' });
  }
  
  const novoCliente = {
    id: Date.now().toString(),
    nome,
    telefone: telefone || '',
    email: email || ''
  };
  
  clientes.push(novoCliente);
  res.status(201).json(novoCliente);
});

// Obter um cliente específico
app.get('/api/clients/:id', (req, res) => {
  const cliente = clientes.find(c => c.id === req.params.id);
  
  if (!cliente) {
    return res.status(404).json({ error: 'Cliente não encontrado' });
  }
  
  res.json(cliente);
});

// Atualizar um cliente
app.put('/api/clients/:id', (req, res) => {
  const index = clientes.findIndex(c => c.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Cliente não encontrado' });
  }
  
  const { nome, telefone, email } = req.body;
  
  clientes[index] = {
    ...clientes[index],
    nome: nome || clientes[index].nome,
    telefone: telefone || clientes[index].telefone,
    email: email || clientes[index].email
  };
  
  res.json(clientes[index]);
});

// Excluir um cliente
app.delete('/api/clients/:id', (req, res) => {
  const index = clientes.findIndex(c => c.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Cliente não encontrado' });
  }
  
  clientes.splice(index, 1);
  res.status(204).end();
});

// API Agendamentos por mês
app.get('/api/schedules/:year/:month', (req, res) => {
  const { year, month } = req.params;
  
  // Filtrar agendamentos pelo ano e mês
  // Converte string para números
  const yearNum = parseInt(year);
  const monthNum = parseInt(month);
  
  // Filtra agendamentos que correspondem ao ano e mês solicitados
  const agendamentosFiltrados = agendamentos.filter(agendamento => {
    const data = new Date(agendamento.data);
    return data.getFullYear() === yearNum && data.getMonth() + 1 === monthNum;
  });
  
  res.json(agendamentosFiltrados);
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});