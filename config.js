const mongoose = require("mongoose");

const dbURI = process.env.CONNECTION_STRING;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conexão com o MongoDB estabelecida.");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });
