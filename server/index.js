const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const pool = require('./db');

const PORT = 3000;
app.use(express.json());
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
app.post('/api/users', async (req, res) => {
    try {
        const { email, password, name} = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const result = await pool.query( 'INSERT INTO users( email, password, name)  VALUES ($1, $2, $3) RETURNING *',
            [email, hashedPassword, name]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });

    }
});
    
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});