const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/connection')

// require('dotenv').config();
const menuInput = require('./menu')

// Express middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// default response for "not found" 
app.use((req, res) => {
  res.status(400).end()
})

db.connect(err => {
  if (err) throw err;
  console.log(`
  ===========================
  Welcome to Employee Tracker
  ===========================
  `);

  menuInput();
})


// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })