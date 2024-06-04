const express = require("express");
const router = express.Router();
const Meta = require("../models/Meta");

// Route to handle the form submission
router.post("/meta", async (req, res) => {
  try {
    console.log(req.body);

    const newMeta = new Meta({
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      status: 0,
      aluno: req.body.aluno,
      prazo: req.body.prazo
    });

    await newMeta.save();
    res.status(201).json({ message: "Meta criada com sucesso!" });
  } catch (error) {
    console.error("Erro ao criar meta:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
  // .then(() => res.redirect('/'))
  // .catch(err => res.status(400).send("Unable to save to database"));
});

router.get('/metas', async (req, res) => {
  const metas = await Meta.find({});
  res.render('metas', { metas });
});

module.exports = router;
