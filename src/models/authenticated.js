/* eslint-disable indent */
const db = require('../helpers/db');
const { LIMIT_DATA } = process.env;

exports.createTransfer = (sender_id, amount, data, cb) => {
  db.query('BEGIN', err => {
    if (err) {
      cb(err);
    } else {
      const q = 'INSERT INTO transaction(amount, recipient_id, sender_id, notes, time, type_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
      const val = [amount, data.recipient_id, sender_id, data.notes, data.time, data.type_id];
      db.query(q, val, (err, res) => {
        if (err) {
          cb(err);
        } else {
          const updProfileSender = 'UPDATE profile SET balance = balance - $1 WHERE user_id = $2';
          const valProfileSender = [amount, res.rows[0].sender_id];
          db.query(updProfileSender, valProfileSender, (err) => {
            if (err) {
              cb(err);
            } else {
              const updProfileReceiver = 'UPDATE profile SET balance = balance + $1 WHERE user_id = $2';
              const valProfileReceiver = [amount, data.recipient_id];
              db.query(updProfileReceiver, valProfileReceiver, (err) => {
                if (err) {
                  cb(err);
                } else {
                  cb(err, res);
                  db.query('COMMIT', err => {
                    if (err) {
                      console.log('ERROR transfer', err.stack);
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
};

exports.createTopup = (amount, recipient_id, type_id, data, cb) => {
  db.query('BEGIN', err => {
    if (err) {
      cb(err);
    } else {
      const qTrans = 'INSERT INTO transaction(amount, recipient_id, notes, time, type_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const val = [amount, recipient_id, data.notes, data.time, type_id];
      db.query(qTrans, val, (err, res) => {
        if (err) {
          cb(err);
        } else {
          const updProfileSender = 'UPDATE profile SET balance = balance + $1 WHERE user_id=$2 RETURNING *';
          const valProfileSender = [amount, res.rows[0].recipient_id];
          db.query(updProfileSender, valProfileSender, (err) => {
            if (err) {
              cb(err);
            } else {
              cb(err, res);
              db.query('COMMIT', err => {
                if (err) {
                  console.log('Error Transfer', err.stack);
                }
              });
            }
          });
        }
      });
    }
  });
};

exports.createPhone = (id, data, cb) => {
  const q = 'UPDATE profile SET phonenumber=$1 WHERE id=$2';
  const val = [data.phonenumber, id];
  db.query(q, val, (err, res) => {
    if (res) {
      cb(err, res.rows);
    } else {
      cb(err);
    }
  });
};


exports.createUserProfile = (data, cb) => {
  db.query('BEGIN', err => {
    if (err) {
      console.log(err);
      cb(err);
    } else {
      const queryUser = 'INSERT INTO users (email, password, username, pin) VALUES ($1, $2, $3, $4) RETURNING *';
      const valUser = [data.email, data.password, data.username, data.pin];
      db.query(queryUser, valUser, (err, res) => {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          const queryProfile = 'INSERT INTO profile (user_id) VALUES ($1)';
          const valProfile = [res.rows[0].id];
          db.query(queryProfile, valProfile, (err, res) => {
            if (err) {
              console.log('ini error dari profile', err);
              cb(err);
            } else {
              cb(err, res);
              db.query('COMMIT', err => {
                if (err) {
                  console.log(err);
                }
              });
            }
          });
        }
      });
    }
  });
};

exports.getAllTransactions = (id, searchBy, keyword, order_by, sortType, limit = parseInt(LIMIT_DATA), offset = 0, cb) => {
  const q = `SELECT * FROM transaction WHERE recipient_id=${id} OR sender_id=${id} AND ${searchBy} LIKE '%${keyword}%' ORDER BY ${order_by} ${sortType} LIMIT $1 OFFSET $2`;
  db.query(q, [limit, offset], (err, res) => {
    if (res) {
      cb(err, res.rows);
    } else {
      cb(err);
    }
  });
};

exports.countAllTransactions = (id, searchBy, keyword, cb) => {
  db.query(`SELECT * FROM transaction WHERE recipient_id=${id} OR sender_id=${id} AND ${searchBy} LIKE '%${keyword}%'`, (err, res) => {
    cb(err, res.rowCount);
  });
};

exports.editProfile = (user_id, picture, data, cb) => {
  // Untuk filter tanpa upload file 
  let val = [user_id];
  const filtered = {};
  const obj = {
    picture,
    fullname: data.fullname,
    phonenumber: data.phonenumber
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

  const q = `UPDATE profile SET ${finalResult} WHERE user_id=$1 RETURNING *`;
  db.query(q, val, (err, res) => {
    console.log(err);
    cb(err, res);
  });
};

exports.changePassword = (id, data, cb) => {
  let val = [id];
  const filtered = {};
  const obj = {
    password: data.password,
  };
  for (let x in obj) {
    if (obj[x] !== null) {
      if (obj[x] !== undefined) {
        filtered[x] = obj[x];
        val.push(obj[x]);
      }
    }
  }
  const key = Object.keys(filtered);
  const finalResult = key.map((el, index) => `${el}=$${index + 2}`);
  const q = `UPDATE users SET ${finalResult} WHERE id=$1 RETURNING *`;
  db.query(q, val, (err, res) => {
    cb(err, res);
  });
};

exports.changePin = (id, data, cb) => {
  let val = [id];
  const filtered = {};
  const obj = {
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
  const key = Object.keys(filtered);
  const finalResult = key.map((el, index) => `${el}=$${index + 2}`);
  const q = `UPDATE users SET ${finalResult} WHERE id=$1 RETURNING *`;
  db.query(q, val, (err, res) => {
    cb(err, res);
  });
};

exports.changePhone = (user_id, picture, data, cb) => {
  // Untuk filter tanpa upload file 
  let val = [user_id];
  const filtered = {};
  const obj = {
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

  const q = `UPDATE profile SET ${finalResult} WHERE user_id=$1 RETURNING *`;
  db.query(q, val, (err, res) => {
    cb(err, res);
  });
};