const db = require('../helpers/db');

exports.getAllProfiles = (cb) => {
  db.query('SELECT * FROM profile', (err, res) => {
    cb(res.rows);
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

exports.updateProfiles = (id, data, cb) => {
  const q = 'UPDATE profile SET fullname=$1, phonenumber=$2, balance=$3, picture=$4, user_id=$5 WHERE id=$6 RETURNING *';
  const val = [data.fullname, data.phonenumber, data.balance, data.picture, data.user_id, id];
  db.query(q, val, (err, res) => {
    cb(res.rows);
  });
};

exports.deleteProfiles = (id, cb) => {
  const q = 'DELETE FROM profile WHERE id=$1 RETURNING *';
  const val = [id];
  db.query(q, val, (err, res) => {
    cb(res.rows);
  });
};