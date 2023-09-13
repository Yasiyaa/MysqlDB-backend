const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// MySQL Database Configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'users'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Create a new user
app.post('/users', (req, res) => {
    const { username, password } = req.body;
    const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(insertQuery, [username, password], (err, result) => {
      if (err) {
        console.error('Error creating user: ' + err);
        res.status(500).json({ error: 'Error creating user' });
      } else {
        res.status(201).json({ message: 'User created successfully', userId: result.insertId });
      }
    });
  });
  
  
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
