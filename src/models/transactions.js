const db = require('../helpers/db');

exports.getAllTransactions = (cb) => {
  db.query('SELECT * FROM transaction', (err, res) => {
    cb(res.rows);
  });
};

exports.getTransactionById = (id, cb) => {
  db.query('SELECT * FROM transaction WHERE id=$1', [id], (err, res) => {
    cb(err, res);
  });
};

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