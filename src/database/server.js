const db = require('better-sqlite3')('database.db');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

// Get all users
app.get('/users', (req, res) => {
    const sql = `SELECT * FROM users`;
    const users = db.prepare(sql).all();
    res.json(users);
});

// Insert a new user
app.post('/users', (req, res) => {
    const { name, age } = req.body;
    const sql = `INSERT INTO users (name, age) VALUES (?, ?)`;
    const info = db.prepare(sql).run(name, age);
    res.status(201).json({ id: info.lastInsertRowid });
});

// Update a user by id
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;
    const sql = `UPDATE users SET name = ?, age = ? WHERE id = ?`;
    const info = db.prepare(sql).run(name, age, id);
    if (info.changes > 0) {
        res.json({ message: 'User updated successfully' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Delete a user by id
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM users WHERE id = ?`;
    const info = db.prepare(sql).run(id);
    if (info.changes > 0) {
        res.json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
