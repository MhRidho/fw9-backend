const db = require('../helpers/db');
const { LIMIT_DATA } = process.env;

exports.getAllTransactions = (keyword, sortType, limit = parseInt(LIMIT_DATA), offset = 0, cb) => {
  const q = `SELECT * FROM transaction WHERE notes LIKE '%${keyword}%' ORDER BY id ${sortType} LIMIT $1 OFFSET $2`;
  db.query(q, [limit, offset], (err, res) => {
    cb(err, res.rows);
  });
};

exports.countAllTransactions = (keyword, cb) => {
  db.query(`SELECT FROM transaction WHERE notes LIKE '%${keyword}%'`, (err, res) => {
    cb(err, res.rowCount);
  });
};

exports.getTransactionById = (id, cb) => {
  db.query('SELECT * FROM transaction WHERE id=$1', [id], (err, res) => {
    cb(err, res);
  });
};

// example
exports.searchSortTrans = (searchBy, keyword, sort_by, sort_type, limit = parseInt(LIMIT_DATA), offset = 0, cb) => {
  db.query(`SELECT * FROM transactions WHERE ${searchBy} LIKE '%${keyword}%' ORDER BY ${sort_by} ${sort_type} LIMIT $1 OFFSET $2`, [limit, offset], (err, res) => {
    console.log(res);
    cb(res.rows);
  });
};

exports.countAllTrans = (keyword, cb) => {
  db.query(`SELECT * FROM transactions WHERE note LIKE '%${keyword}%'`, (err, res) => {
    cb(err, res.rowCount);
  });
};

exports.countAllTranswithAuth = (search, cb) => {
  db.query(`SELECT * FROM transactions WHERE recipient_id LIKE '%${search}%'`, (err, res) => {
    cb(err, res.rowCount);
  });
};

exports.createTransactionwithAuth = (sender_id, data, cb) => {
  const q = 'INSERT INTO transactions(amount, recipient_id, sender_id, note, time, type_id_trans) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const val = [data.amount, data.recipient_id, sender_id, data.note, data.time, data.type_id_trans];
  db.query(q, val, (err, res) => {
    if (res) {
      cb(err, res);
    } else {
      cb(err);
    }
  });
};
// end example

exports.createTransactions = (data, cb) => {
  const q = 'INSERT INTO transaction(amount, recipient_id, sender_id, notes, time, type_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
  const val = [data.amount, data.recipient_id, data.sender_id, data.notes, data.time, data.type_id];
  db.query(q, val, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(err, res.rows);
    }
  });
};

exports.updateTransactions = (id, data, cb) => {
  const q = 'UPDATE transaction SET amount=$1, recipient_id=$2, sender_id=$3, notes=$4, time=$5, type_id=$6 WHERE id=$7 RETURNING *';
  const val = [data.amount, data.recipient_id, data.sender_id, data.notes, data.time, data.type_id, id];
  db.query(q, val, (err, res) => {
    cb(res.rows);
  });
};

exports.deleteTransactions = (id, cb) => {
  const q = 'DELETE FROM transaction WHERE id=$1 RETURNING *';
  const val = [id];
  db.query(q, val, (err, res) => {
    cb(res.rows);
  });
};