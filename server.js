const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { Pool } = require('pg');

// PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    host: '192.168.1.118',
    database: 'verify',
    password: 'Riju@2004',
    port: 5432,
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Check PostgreSQL connection
pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

// Default route - index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Signup route
app.post('/signup', async (req, res) => {
    const { username, verificationId, email, phone, password } = req.body;
    console.log(req.body);

    try {
        // Check if the verification ID and email exist in the 'people' table
        const peopleCheckQuery = 'SELECT * FROM people WHERE roll = $1 AND email = $2';
        const peopleResult = await pool.query(peopleCheckQuery, [verificationId, email]);

        if (peopleResult.rowCount === 0) {
            return res.json({ success: false, message: 'Verification ID or Email not found in people.' });
        }

        // Check if verificationId or email already exists in 'users' table
        const userCheckQuery = 'SELECT * FROM users WHERE verification_id = $1 OR email = $2';
        const userResult = await pool.query(userCheckQuery, [verificationId, email]);

        if (userResult.rowCount > 0) {
            return res.json({ success: false, message: 'Verification ID or Email already exists.' });
        }

        // Check if phone is a valid number
        if (isNaN(phone)) {
            return res.json({ success: false, message: 'Phone must be a number.' });
        }

        // Insert the new user into 'users' table
        const insertQuery = 'INSERT INTO users (verification_id, username, email, phone, password) VALUES ($1, $2, $3, $4, $5)';
        await pool.query(insertQuery, [verificationId, username, email, phone, password]);

        res.json({ success: true });
    } catch (error) {
        console.error('Error during signup:', error); // Log the error
        res.json({ success: false, message: 'An error occurred during signup.' });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email exists in the 'users' table
        const userQuery = 'SELECT * FROM users WHERE email = $1';
        const userResult = await pool.query(userQuery, [email]);

        if (userResult.rowCount === 0) {
            return res.json({ success: false, reason: 'email' });
        }

        // Check if the password matches
        const user = userResult.rows[0];
        if (user.password !== password) {
            return res.json({ success: false, reason: 'password' });
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Error during login:', error); // Log the error
        res.json({ success: false, message: 'An error occurred during login.' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
