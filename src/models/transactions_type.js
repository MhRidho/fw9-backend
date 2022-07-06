const db = require('../helpers/db');

exports.getAllTrans_type = (cb) => {
  db.query('SELECT * FROM transaction_type', (err, res) => {
    cb(res.rows);
  });
};

exports.getTrans_typeById = (id, cb) => {
  db.query('SELECT * FROM transaction_type WHERE id=$1', [id], (err, res) => {
    cb(err, res);
  });
};

exports.createTrans_type = (data, cb) => {
  const val = [data.name, data.description];
  db.query('INSERT INTO transaction_type(name, description) VALUES ($1, $2) RETURNING *', val, (err, res) => {
    cb(res.rows);
  });
};

exports.updateTrans_type = (id, data, cb) => {
  const q = 'UPDATE transaction_type SET name=$1, description=$2 WHERE id=$3 RETURNING *';
  const val = [data.name, data.description, id];
  db.query(q, val, (err, res) => {
    cb(res.rows);
  });
};

exports.deleteTrans_type = (id, cb) => {
  const q = 'DELETE FROM transaction_type WHERE id=$1 RETURNING *';
  const val = [id];
  db.query(q, val, (err, res) => {
    cb(res.rows);
  });
};