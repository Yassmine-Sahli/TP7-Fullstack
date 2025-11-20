const mongoose = require('mongoose');

const livreSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    auteur: { type: String, required: true },
    date_publication: { type: Date, required: true },
    genre: { type: String, required: true },
    disponible: { type: Boolean, default: true }
});

module.exports = mongoose.model('Livre', livreSchema);
