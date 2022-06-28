const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    return res.json({
        success: true,
        message: 'Backend is running well'
    });
});

app.use('/', require('./src/routes'));

app.post('/login', (req, res) => {
    console.log(req.query);
    if (req.body.email === 'ridho@gmail.com' && req.body.password === '1234') {
        return res.json({
            success: true,
            message: 'Login success'
        });
    } else {
        return res.json({
            success: false,
            message: 'Login failed'
        });
    }

});

app.use('*', (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'Resource not found'
    });
});

app.listen(3333, () => {
    console.log('Port is running on port 3333');
});