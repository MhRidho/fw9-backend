const profiles = require('express').Router();
const profileController = require('../controllers/profiles');
const { body } = require('express-validator');

const createProfileValidator = [
  body('phonenumber')
    .isMobilePhone().withMessage('Phone number must be true')
];

const createProfileSanitizer = [
  body('fullname').trim()
];

profiles.get('/', profileController.getAllProfiles);
profiles.post('/', ...createProfileValidator, ...createProfileSanitizer, profileController.createProfiles);
profiles.patch('/:id', profileController.editProfiles);
profiles.delete('/:id', profileController.deleteProfiles);

module.exports = profiles;