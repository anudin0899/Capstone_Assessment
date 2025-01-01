const mysql = require('mysql2/promise.js');




const connectToDatabase = () => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSKEY || '',
    database: process.env.DB_NAME || 'my_database',
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err.stack);
      process.exit(1);
    }
    console.log('Connected to MySQL database');
  });


  connection.on('error', (err) => {
    console.error('MySQL error:', err);
  });

  return connection;
};

module.exports = connectToDatabase;
