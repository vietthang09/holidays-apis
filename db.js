const mysql = require("mysql");

const db = mysql.createConnection({
  user: "holidays",
  host: "153.92.222.161",
  password: "asYEibHDm46qOCP6E7h3",
  database: "holidays",
});

module.exports = db;
