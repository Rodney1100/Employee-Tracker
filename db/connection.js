const mysql = require('mysql2');
require('dotenv')
// connect to db
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "1100",
    // password: process.env.DB_PW,
    database: "emp_tracker",
  },
)

module.exports = db;