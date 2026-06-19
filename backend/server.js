const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Calea către baza de date JSON (aflată în folderul principal)
const FILE_PATH = path.join(__dirname, '../users.json');

app.use(cors());
app.use(express.json());

// Servim fișierele statice din folderul 'frontend'
app.use(express.static(path.join(__dirname, '../frontend')));

// --- RUTA FORȚATĂ: Doar Autentificare la deschidere ---
app.get('/', (req, res) => {
    // Forțăm deschiderea paginii de autentificare
    res.sendFile(path.join(__dirname, '../frontend/autentificare.html'));
});

// --- RUTA 1: ÎNREGISTRARE ---
app.post('/api/register', (req, res) => {
    const { name, phone, email, password } = req.body;

    let users = [];
    if (fs.existsSync(FILE_PATH)) {
        try {
            users = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
        } catch (e) { users = []; }
    }

    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'Email deja înregistrat!' });
    }

    const newUser = {
        id: `LUM-${Math.floor(1000 + Math.random() * 9000)}`,
        name, phone, email, password, points: 173
    };

    users.push(newUser);
    fs.writeFileSync(FILE_PATH, JSON.stringify(users, null, 2));
    return res.status(201).json({ message: 'Cont creat!', user: newUser });
});

// --- RUTA 2: LOGIN ---
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!fs.existsSync(FILE_PATH)) {
        return res.status(400).json({ message: 'Nu există conturi!' });
    }

    const users = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(400).json({ message: 'Date incorecte!' });
    }

    return res.status(200).json({ message: 'Succes!', user });
});

// Pornire
app.listen(PORT, () => {
    console.log(`===================================================`);
    console.log(`🚀 Serverul rulează pe http://localhost:${PORT}`);
    console.log(`👉 ACCESEAZĂ: http://localhost:${PORT}`);
    console.log(`===================================================`);
});