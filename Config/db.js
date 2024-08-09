import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost', 
  user: 'root',      
  password: '',      
  database: 'libros_db', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;

/*Tambien se puede hacer asi

const properties = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rest-api'
}

export const pool = mysqlConnection.createPool(properties);*/
