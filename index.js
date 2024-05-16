// index.js
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Conecta ao MongoDB
mongoose.connect("mongodb://localhost/mydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Schema Pessoa
const pessoaSchema = new mongoose.Schema({
  id: Number,
  nome: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Pessoa = mongoose.model("Pessoa", pessoaSchema);

// Define Schema Meta
const metaSchema = new mongoose.Schema({
  id: Number,
  pessoaid: Number,
  descricao: String,
  concluido: Boolean,
});

const Meta = mongoose.model("Meta", metaSchema);

// Rotas CRUD Pessoa
app.get("/pessoas", async (req, res) => {
  const pessoas = await Pessoa.find();
  res.json(pessoas);
});

app.post("/pessoas", async (req, res) => {
  const pessoa = new Pessoa(req.body);
  await pessoa.save();
  res.json(pessoa);
});

app.put("/pessoas/:id", async (req, res) => {
  const { id } = req.params;
  const updatedPessoa = await Pessoa.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json(updatedPessoa);
});

app.delete("/pessoas/:id", async (req, res) => {
  const { id } = req.params;
  await Pessoa.findByIdAndDelete(id);
  res.json({ message: "Pessoa apagada com sucesso" });
});

// Rotas CRUD Meta
app.get("/meta", async (req, res) => {
  const meta = await Meta.find();
  res.json(meta);
});

app.post("/meta", async (req, res) => {
  const metaItem = new Meta(req.body);
  await metaItem.save();
  res.json(metaItem);
});

app.put("/meta/:id", async (req, res) => {
  const { id } = req.params;
  const updatedMeta = await Meta.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json(updatedMeta);
});

app.delete("/meta/:id", async (req, res) => {
  const { id } = req.params;
  await Meta.findByIdAndDelete(id);
  res.json({ message: "Meta apagada com sucesso" });
});

// Cadastro
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await Pessoa.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email já está em uso" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new Pessoa({ email, password: hashedPassword });
  await user.save();

  res.status(201).json({ message: "Usuário cadastrado com sucesso" });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Pessoa.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "E-mail ou senha inválida" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "E-mail ou senha inválida" });
  }

  const token = jwt.sign({ id: user.id }, "your_jwt_secret");
  res.json({ token });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
