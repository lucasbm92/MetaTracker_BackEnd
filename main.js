const express = require('express');
const userRoutes = require('./routes/userRoutes');
const metaRoutes = require('./routes/metaRoutes');

const app = express();
require('./config');

app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);
app.use(metaRoutes);

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/insertMeta", (req, res) => {
    res.render("insertMeta");
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});