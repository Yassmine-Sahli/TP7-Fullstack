const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bibliotheque', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connexion à MongoDB réussie !"))
.catch(err => console.error("Erreur de connexion MongoDB :", err));
