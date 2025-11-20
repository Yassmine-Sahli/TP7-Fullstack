const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/bibliotheque", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connexion à MongoDB réussie !"))
.catch(err => console.error("Erreur de connexion à MongoDB :", err));

const livreSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    auteur: { type: String, required: true },
    date_publication: { type: Date, required: true },
    genre: { type: String, required: true },
    disponible: { type: Boolean, default: true }
});

const Livre = mongoose.model("Livre", livreSchema);

const app = express();
const port = 3000;

app.use(bodyParser.json());


app.post("/livres", async (req, res) => {
    try {
        const livre = new Livre(req.body);
        await livre.save();
        res.status(201).json({
            message: "Livre ajouté avec succès",
            livre
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/livres", async (req, res) => {
    try {
        const livres = await Livre.find();
        res.json(livres);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/livres/:id", async (req, res) => {
    try {
        const livre = await Livre.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!livre) {
            return res.status(404).json({ message: "Livre non trouvé" });
        }

        res.json({
            message: "Livre mis à jour avec succès",
            livre
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/livres/:id", async (req, res) => {
    try {
        const livre = await Livre.findByIdAndDelete(req.params.id);

        if (!livre) {
            return res.status(404).json({ message: "Livre non trouvé" });
        }

        res.json({ message: "Livre supprimé avec succès" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
