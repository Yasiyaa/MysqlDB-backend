const router = require("express").Router();
const { response, request } = require("express");


// Create a new user
router.route("/add").post(async(req,res)=>{

    const { username, password } = req.body;
    const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(insertQuery, [username, password], (err, result) => {
      if (err) {
        console.error('Error creating user: ' + err);
        res.status(500).json({ error: 'Error creating user' });
      } else {
        res.status(200).json({ message: 'User created successfully', userId: result.insertId });
      }
    });
})
   

  
