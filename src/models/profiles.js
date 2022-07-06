const db = require('../helpers/db');
const { LIMIT_DATA } = process.env;

exports.getAllProfiles = (keyword, limit = parseInt(LIMIT_DATA), offset = 0, cb) => {
  const q = `SELECT * FROM profile WHERE fullname LIKE '%${keyword}%' ORDER BY id ASC LIMIT $1 OFFSET $2`;
  db.query(q, [limit, offset], (err, res) => {
    console.log(err);
    cb(err, res.rows);
  });
};

exports.countAllProfiles = (keyword, cb) => {
  db.query(`SELECT * FROM profile WHERE fullname LIKE '%${keyword}%'`, (err, res) => {
    cb(err, res.rowCount);
  });
};

exports.getProfileById = (id, cb) => {
  db.query('SELECT * FROM profile WHERE id=$1', [id], (err, res) => {
    cb(err, res);
  });
};

exports.createProfiles = (data, cb) => {
  const q = 'INSERT INTO profile(fullname, phonenumber, balance, picture, user_id) VALUES($1, $2, $3, $4, $5) RETURNING *';
  const val = [data.fullname, data.phonenumber, data.balance, data.picture, data.user_id];
  db.query(q, val, (err, res) => {
    if (res) {
      cb(err, res.rows);
    } else {
      cb(err);
    }
  });
};

exports.updateProfiles = (id, picture, data, cb) => {
  const q = 'UPDATE profile SET fullname=$1, phonenumber=$2, balance=$3, picture=$4, user_id=$5 WHERE id=$6 RETURNING *';
  const val = [data.fullname, data.phonenumber, data.balance, picture, data.user_id, id];
  db.query(q, val, (err, res) => {
    console.log(err);
    cb(err, res);
  });
};

exports.deleteProfiles = (id, cb) => {
  const q = 'DELETE FROM profile WHERE id=$1 RETURNING *';
  const val = [id];
  db.query(q, val, (err, res) => {
    cb(res.rows);
  });
};