const response = require('../helpers/standardResponse');
const profileModel = require('../models/profiles');
const { validationResult } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');
const { LIMIT_DATA } = process.env;

exports.getAllProfiles = (req, res) => {
  const { search = '', limit = parseInt(LIMIT_DATA), page = 1 } = req.query;
  const offset = (page - 1) * limit;

  profileModel.getAllProfiles(search, limit, offset, (err, results) => {
    if (results.length < 1) {
      return res.redirect('/404');
    }
    const pageInfo = {};

    profileModel.countAllProfiles(search, (err, totalData) => {
      pageInfo.totalData = totalData;
      pageInfo.totalPage = Math.ceil(totalData / limit);
      pageInfo.currentPage = parseInt(page);
      pageInfo.nextPage = pageInfo.currentPage < pageInfo.totalPage ? pageInfo.currentPage + 1 : null;
      pageInfo.prevPage = pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
      console.log(totalData);
      return response(res, 'List All Profiles', results, pageInfo);
    });
  });
};

// Syntax untuk create Profiles dan validasi
exports.createProfiles = (req, res) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return response(res, 'Error occured', validation.array(), 400);
  }
  profileModel.createProfiles(req.body, (err, results) => {
    if (err) {
      if (err.code === '23505' && err.detail.includes('phonenumber')) {
        const eres = errorResponse('Phone number already exist', 'phonenumber');
        return response(res, 'Error', eres, 400);
      }
      return response(res, 'Error', null, 400);
    }
    else {
      return response(res, 'Create profiles success', results[0]);
    }
  });
};

// create profile upload
exports.createProfileUpload = (req, res) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return response(res, 'error occured', validation.array(), 400);
  }

  let filename = null;

  if (req.file) {
    filename = req.file.filename;
  }

  profileModel.createProfileUpload(filename, req.body, (err, results) => {
    console.log(err);
    if (err) {
      if (err.code === '23505' && err.detail.includes('phonenumber')) {
        const eres = errorResponse('Phone number already exist', 'phonenumber');
        return response(res, 'Error', eres, 400);
      }
      return response(res, 'Error', null, 400);
    }
    else {
      return response(res, 'Create Profile success', results[0]);
    }
  });
};


exports.getProfileById = (req, res) => {
  const { id } = req.params;
  profileModel.getProfileById(id, (err, results) => {
    if (results.rows.length > 0) {
      return response(res, 'Detail Profiles', results.rows[0]);
    } else {
      return res.redirect('/404');
    }
  });
};

exports.editProfiles = (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return response(res, 'Validation Error', errors.array(), null, 400);
  }

  let filename = null;

  if (req.file) {
    filename = req.file.filename;
  }
  profileModel.updateProfiles(id, filename, req.body, (err, results) => {
    if (err) {
      return response(res, `Failed to update: ${err.message}`, null, null, 400);
    }
    console.log(req.body);
    console.log(results);
    return response(res, 'Profiles edit success', results.rows[0]);
  });
};

exports.deleteProfiles = (req, res) => {
  const { id } = req.params;
  profileModel.deleteProfiles(id, (results) => {
    return response(res, 'Profile success deleted!', results[0]);
  });
};