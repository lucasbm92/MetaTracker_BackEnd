const mongoose = require("mongoose");

const dbURI =
  "mongodb+srv://lucasbm2016:lbm123@cluster0.zhqiozh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conexão com o MongoDB estabelecida.");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });
