const response = (res, msg, status = 200) => {
    let success = true;
    if (status >= 400) {
        success = false;
    }
    return res.status(status).send({
        success,
        message: msg
    });
};

module.exports = response;