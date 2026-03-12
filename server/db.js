const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'CareerCraft',
    password: 'careerCraft123',
    port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.log('Database connection error:', err);
    } else {
        console.log('Database connected successfully');
        console.log('Current time:', res.rows[0].now);
    }
});