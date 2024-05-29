// metaRoutes.js

const express = require('express');
const router = express.Router();
const Meta = require('../models/Meta'); // Import your Meta model

// Route to display the form for creating a new Meta
router.get('/insertMeta', (req, res) => {
    res.render('insertMeta');
});

// Route to handle the form submission
router.post('/meta', async (req, res) => {
    try {
        console.log(req.body);

        const newMeta = new Meta({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            status: req.body.status,
            prazo: req.body.prazo
        });

        await newMeta.save();
        res.status(201).json({ message: 'Meta criada com sucesso!' });
    } catch (error) {
    console.error('Erro ao criar meta:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
    }
        // .then(() => res.redirect('/'))
        // .catch(err => res.status(400).send("Unable to save to database"));
});

// Add more routes as needed

module.exports = router;