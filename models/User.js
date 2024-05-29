const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    tipo: {
        type: Number,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;