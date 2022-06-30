const response = require('../helpers/standardResponse');
const profileModel = require('../models/profiles');

exports.getAllProfiles = (req, res) => {
  profileModel.getAllProfiles((results) => {
    return response(res, 'Message Get All Profiles', results);
  });
};

// Syntax untuk validasi create Profiles
const { validationResult } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');
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

exports.editProfiles = (req, res) => {
  const { id } = req.params;
  profileModel.updateProfiles(id, req.body, (results) => {
    return response(res, 'Profiles edit success', results[0]);
  });
};

exports.deleteProfiles = (req, res) => {
  const { id } = req.params;
  profileModel.deleteProfiles(id, (results) => {
    return response(res, 'Profile success deleted!', results[0]);
  });
};