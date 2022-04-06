const express = require('express');
const PORT = process.env.PORT || 3001;
const mysql = require('mysql2')
const app = express();

// require('dotenv').config();

// Express middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// connect to db
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password:"1100",
    // password: process.env.DB_PW,
    database: "emp_tracker",
  },
  console.log("Connected to the emp_tracker")
)
// default response for "not found" 
app.use((req, res) => {
  res.status(400).end()
})

app.listen(PORT, () => {
  console.log(`Server running on prt ${PORT}`)
  
})