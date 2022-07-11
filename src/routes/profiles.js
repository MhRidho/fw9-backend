const profiles = require('express').Router();
const profileController = require('../controllers/profiles');
const { body } = require('express-validator');
const uploadProfile = require('../middleware/uploadProfile');

const createProfileValidator = [
  body('phonenumber')
    .isMobilePhone('id-ID').withMessage('Phone number must be true, don\'t use alphabet'),
  body('fullname').trim()
];

const updateProfileRules = require('./profile.validator');
const validation = require('../middleware/validation');
const authMiddleware = require('../middleware/auth');


profiles.get('/', body('limit').toInt(), body('page').toInt(), profileController.getAllProfiles);
profiles.get('/:id', profileController.getProfileById);
profiles.post('/', ...createProfileValidator, profileController.createProfiles);
profiles.patch('/:id', authMiddleware, uploadProfile, ...updateProfileRules, validation, profileController.editProfiles);
profiles.delete('/:id', profileController.deleteProfiles);

module.exports = profiles;