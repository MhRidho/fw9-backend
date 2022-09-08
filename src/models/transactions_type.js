const db = require('../helpers/db');
const { LIMIT_DATA } = process.env;

exports.getAllTrans_type = (keyword, sortType, limit = parseInt(LIMIT_DATA), offset = 0, cb) => {
  const q = `SELECT * FROM transaction_type WHERE name LIKE '%${keyword}%' ORDER BY id ${sortType} LIMIT $1 OFFSET $2`;
  db.query(q, [limit, offset], (err, res) => {
    cb(err, res.rows);
  });
};

exports.countAllTrans_type = (keyword, cb) => {
  db.query(`SELECT * FROM transaction_type WHERE name LIKE '%${keyword}%'`, (err, res) => {
    cb(err, res.rowCount);
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

// example
exports.searchSortTransType = (searchBy, keyword, sort_by, sort_type, limit = parseInt(LIMIT_DATA), offset = 0, cb) => {
  db.query(`SELECT * FROM transaction_type WHERE ${searchBy} LIKE '%${keyword}%' ORDER BY ${sort_by} ${sort_type} LIMIT $1 OFFSET $2`, [limit, offset], (err, res) => {
    cb(res.rows);
  });
};

exports.countAllTransType = (keyword, cb) => {
  db.query(`SELECT * FROM transaction_type WHERE name LIKE '%${keyword}%'`, (err, res) => {
    cb(err, res.rowCount);
  });
};
// end example