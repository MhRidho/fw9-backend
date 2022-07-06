const profiles = require('express').Router();
const profileController = require('../controllers/profiles');
const { body } = require('express-validator');

const createProfileValidator = [
  body('phonenumber')
    .isMobilePhone().withMessage('Phone number must be true,don\'t use alphabet'),
  body('fullname').trim()
];

profiles.get('/', body('limit').toInt(), body('page').toInt(), profileController.getAllProfiles);
profiles.get('/:id', profileController.getProfileById);
profiles.post('/', ...createProfileValidator, profileController.createProfiles);
profiles.patch('/:id', profileController.editProfiles);
profiles.delete('/:id', profileController.deleteProfiles);

module.exports = profiles;