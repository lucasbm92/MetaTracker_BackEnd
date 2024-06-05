const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

// Rota de cadastro
router.post("/signup", async (req, res) => {
  try {
    // console.log(req.body);

    // const { email, senha, nome, tipo } = req.body;
    // const newUser = new User({ email, senha, nome, tipo });

    const hashedPassword = await bcrypt.hash(req.body.senha, saltRounds);

    const newUser = new User({
      email: req.body.email,
      nome: req.body.nome,
      senha: hashedPassword, // Save the encrypted password
      tipo: req.body.tipo,
    });

    console.log(newUser);

    await newUser.save();
    console.log("Usuário criado com sucesso!");
    res.redirect("/login");
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Rota de login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user == null) {
    console.log("Usuário não encontrado");
    res.redirect("/login?error=Credenciais inválidas");
  }
  try {
    console.log("req.body:", req.body); // Verificar o corpo da solicitação
    console.log("user:", user); // Verificar o usuário encontrado
    if (req.body.senha === "" || user.senha === "") {
      console.log("Senha vazia");
      res.redirect("/login?error=Credenciais inválidas");
    }
    if (await bcrypt.compare(req.body.senha, user.senha)) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_TOKEN_SECRET
      );
      res.cookie("accessToken", accessToken, { httpOnly: true });
      // res.json({ accessToken: accessToken });
      res.redirect("/");
    } else {
      console.log("Senha incorreta");
      // res.send("Senha incorreta");
      res.redirect("/login?error=Credenciais inválidas");
    }
  } catch (error) {
    console.log("Erro ao fazer login:", error);
    res.redirect("/login?error=", error);
  }
});

// Rota de logout
router.post("/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.redirect("/login");
});

// Export the router
module.exports = router;
