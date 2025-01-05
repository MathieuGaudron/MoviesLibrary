const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());


mongoose.connect("mongodb://localhost:27042/MoviesLibrary", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connecté"))
    .catch((err) => console.error("Erreur MongoDB :", err));


const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);



app.get("/", (req, res) => {
    res.send("Route de base");
});

app.get("/users", async (req, res) => {
    try {
        const users = await User.find({}); 
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur.", error: err.message });
    }
});


// INSCRIPTION USER
app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email déjà utilisé." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "Utilisateur créé avec succès." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur.", error: err.message });
    }
});

// CONNEXION USER
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Mot de passe incorrect." });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            "secret_key",
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Connexion réussie.", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur.", error: err.message });
    }
});




const PORT = 4000;
app.listen(PORT, () => console.log(`Serveur HTTP démarré sur le port ${PORT}`));
