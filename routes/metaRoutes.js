const express = require("express");
const router = express.Router();
const Meta = require("../models/Meta");
const { authenticateToken } = require("../main");

const app = express();
app.use(express.json());

// Route to handle the form submission
router.post("/meta", async (req, res) => {
  try {
    console.log(req.body);

    const newMeta = new Meta({
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      status: 0,
      aluno: req.body.aluno,
      prazo: req.body.prazo,
    });

    newMeta.status = 0;

    await newMeta.save();
    console.log("Meta criada com sucesso!");
    res.redirect("homeprofessor"); // Enviar resposta ao cliente
  } catch (error) {
    console.error("Erro ao criar meta:", error);
    res.status(500).json({ error: "Erro ao criar meta" }); // Enviar erro ao cliente
  }
});

router.get("/alunometasaberto", authenticateToken, async (req, res) => {
  const metas = await Meta.find({ status: 0, aluno: req.user.nome });
  res.render("alunometasaberto", { metas });
});

router.get("/alunometasconcluido", authenticateToken, async (req, res) => {
  const metas = await Meta.find({ status: 1, aluno: req.user.nome });
  res.render("alunometasconcluido", { metas });
});

router.get("/aberto", authenticateToken, async (req, res) => {
  const currentDate = new Date();
  const metas = await Meta.find({ status: 0, prazo: { $gt: currentDate } });
  res.render("aberto", { metas });
});

router.get("/concluido", authenticateToken, async (req, res) => {
  const metas = await Meta.find({ status: 1 });
  res.render("concluido", { metas });
});

router.get("/atrasado", authenticateToken, async (req, res) => {
  const currentDate = new Date();
  const metas = await Meta.find({
    status: { $ne: 1 },
    prazo: { $lt: currentDate },
  });
  res.render("atrasado", { metas });
});

router.delete("/deleteMeta/:id", async (req, res) => {
  try {
    const metaId = req.params.id;
    await Meta.findByIdAndDelete(metaId);
    res.status(200).json({ message: "Meta deletada com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar meta:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Alteração de status
router.post("/meta/:id", async (req, res) => {
  try {
    console.log(req.body);

    const meta = await Meta.findById(req.params.id);
    if (!meta) {
      return res.status(404).json({ error: "Meta não encontrada" });
    }

    meta.status = req.body.status;
    await meta.save();

    res.json({ message: "Status alterado com sucesso" });
  } catch (error) {
    console.error("Erro ao alterar o status:", error);
    res.status(500).json({ error: "Erro ao alterar o status" });
  }
});

module.exports = router;
