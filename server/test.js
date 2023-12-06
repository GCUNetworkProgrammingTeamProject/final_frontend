const mysql = require('mysql');

const db = mysql.createPool({
  connectionLimit: 10, // 연결 풀의 최대 연결 수
  host: 'ceprj.gachon.ac.kr',
  port: 6009,
  user: 't23209',
  password: 'gachon0404',
  database: 'db23209',
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('MySQL connection error: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
  connection.release(); // 연결 풀에 반환
});

db.getConnection((err, connection) => {
    if (err) {
      console.error('MySQL connection error: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
    connection.release(); // 연결 풀에 반환
  });
