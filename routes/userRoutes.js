const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    console.log(req.body);

    const { email, senha, nome, tipo } = req.body; // Dados enviados pelo cliente
    const newUser = new User({ email, senha, nome, tipo });
    
    await newUser.save();
    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Export the router
module.exports = router;