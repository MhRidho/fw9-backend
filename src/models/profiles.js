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
  console.log(data.fullname);
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

// create model profile upload
exports.createProfileUpload = (picture, data, cb) => {
  const q = 'INSERT INTO profile(fullname, phonenumber, balance, picture, user_id) VALUES($1, $2, $3, $4, $5) RETURNING *';
  const val = [data.fullname, data.phonenumber, data.balance, picture, data.user_id];
  db.query(q, val, (err, res) => {
    if (res) {
      cb(err, res.rows);
    } else {
      cb(err);
    }
  });
};

exports.updateProfiles = (id, picture, data, cb) => {
  // Untuk filter tanpa upload file 
  let val = [id];
  const filtered = {};
  const obj = {
    picture,
    fullname: data.fullname,
    balance: data.balance,
    phoneNumber: data.phonenumber
  };
  for (let x in obj) {
    if (obj[x] !== null) {
      filtered[x] = obj[x];
      val.push(obj[x]);
    }
  }
  const key = Object.keys(filtered);
  const finalResult = key.map((el, index) => `${el}=$${index + 2}`);
  // close tanpa upload file

  const q = `UPDATE profile SET ${finalResult} WHERE id=$1 RETURNING *`;
  db.query(q, val, (err, res) => {
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

exports.getProfileByUserIdAuth = (user_id, cb) => {
  const q = 'SELECT * FROM profile WHERE user_id=$1';
  const val = [user_id];
  db.query(q, val, (err, res) => {
    cb(err, res);
  });
};

exports.getProfileByUserIdTransfer = (user_id, cb) => {
  const q = 'SELECT * FROM profile WHERE user_id=$1';
  const val = [user_id];
  db.query(q, val, (err, res) => {
    if (res) {
      cb(err, res);
    } else {
      cb(err);
    }
  });
};