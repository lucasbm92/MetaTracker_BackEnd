const mongoose = require('mongoose');

const metaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    prazo: {
        type: Date,
        required: true
    },
});

const Meta = mongoose.model('Meta', metaSchema);

module.exports = Meta;