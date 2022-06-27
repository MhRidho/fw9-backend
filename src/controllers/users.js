const response = require('../helpers/standardResponse')

exports.getAllUsers = (req, res) => {
    return response(res, 'Message from standard response', 404)
}