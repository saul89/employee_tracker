const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD, //.env file containing DB_PASSWORD=yourpassword must be created
  database: "employee_trackerDB"
});

/* if ER_ACCESS_DENIED_ERROR use this command in MySQL
  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password 
  BY 'yourRootPassword' */
connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;
