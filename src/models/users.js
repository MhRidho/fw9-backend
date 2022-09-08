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

exports.getUserByEmail = (email, cb) => {
  db.query('SELECT * FROM users WHERE email=$1', [email], (err, res) => {
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
  let val = [id];
  const filtered = {};
  const obj = {
    email: data.email,
    password: data.password,
    username: data.username,
    pin: data.pin
  };
  for (let x in obj) {
    if (obj[x] !== null) {
      if (obj[x] !== undefined) {
        filtered[x] = obj[x];
        val.push(obj[x]);
      }
    }
  }
  console.log(obj);
  const key = Object.keys(filtered);
  const finalResult = key.map((el, index) => `${el}=$${index + 2}`);
  const q = `UPDATE users SET ${finalResult} WHERE id=$1 RETURNING *`;
  db.query(q, val, (err, res) => {
    cb(err, res);
  });
};

exports.deleteUser = (id, cb) => {
  const q = 'DELETE FROM users WHERE id=$1 RETURNING *';
  const val = [id];
  db.query(q, val, (err, res) => {
    cb(res.rows);
  });
};