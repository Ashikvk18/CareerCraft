const express = require('express');
const app = express();
const pool = require('./db');

const PORT = 3000;
app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
})
app.get('/', (req, res) => {
    res.send('CarrerCraft backend is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});