// server.js

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // 추가

const app = express();
const port = 3001;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'ceprj.gachon.ac.kr',
  user: 'dbid232',
  password: 'dbpass232',
  database: 'db23209',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});

// JWT 토큰을 검증하는 미들웨어
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send('No token provided');
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(500).send('Failed to authenticate token');
    }
    req.userId = decoded.id;
    next();
  });
};

app.get('/chatbotLogs/:userSeq/:videoSeq', verifyToken, (req, res) => {
  const userSeq = req.params.userSeq;
  const videoSeq = req.params.videoSeq;

  const query = `
    SELECT tcd.answer, tcd.question
    FROM tb_per_chatbot_log_detail tcd
    JOIN tb_chatbot_log tcl ON tcd.per_chatbot_log_seq = tcl.chatbot_log_seq
    WHERE tcl.user_seq = ? AND tcl.video_seq = ?
  `;

  db.query(query, [userSeq, videoSeq], (err, results) => {
    if (err) {
      console.error('MySQL query error: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
