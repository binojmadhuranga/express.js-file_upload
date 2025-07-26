const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1235',
  database: 'mydatabase'
});

connection.connect(err => {
  if (err) throw err;
  console.log('MySQL connected this user for image upload...');
});

module.exports = connection;
