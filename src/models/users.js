const db = require('../helpers/db');

const { LIMIT_DATA } = process.env;

exports.getAllUsers = (keyword, sortBy, sortType, limit = parseInt(LIMIT_DATA), offset = 0, cb) => {

  const q = `SELECT * FROM users WHERE ${sortBy} LIKE '%${keyword}%' ORDER BY id ${sortType} LIMIT $1 OFFSET $2`;
  db.query(q, [limit, offset], (err, res) => {
    console.log(err);
    cb(err, res.rows);
  });
};

exports.countAllUsers = (keyword, cb) => {
  db.query(`SELECT FROM users WHERE email LIKE '%${keyword}%'`, (err, res) => {
    cb(err, res.rowCount);
  });
};

exports.getUserById = (id, cb) => {
  db.query('SELECT * FROM users WHERE id=$1', [id], (err, res) => {
    cb(err, res);
  });
};

exports.createUser = (data, cb) => {
  const q = 'INSERT INTO users(email, password, username, pin) VALUES ($1, $2, $3, $4) RETURNING *';
  const val = [data.email, data.password, data.username, data.pin];
  db.query(q, val, (err, res) => {
    if (res) {
      cb(err, res.rows);
    } else {
      cb(err);
    }
  });
};

exports.updateUser = (id, data, cb) => {
  const q = 'UPDATE users SET email=$1, password=$2, username=$3, pin=$4 WHERE id=$5 RETURNING *';
  const val = [data.email, data.password, data.username, data.pin, id];
  db.query(q, val, (err, res) => {
    cb(res.rows);
  });
};

exports.deleteUser = (id, cb) => {
  const q = 'DELETE FROM users WHERE id=$1 RETURNING *';
  const val = [id];
  db.query(q, val, (err, res) => {
    cb(res.rows);
  });
};