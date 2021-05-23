const { loginSrv, signupSrv } = require('./auth.service');
const { createToken } = require('../../config/token');
const { createUuid } = require('../../config/uuid');
const { getDateTime } = require('../../config/date');
const { encryptPass, comparePass } = require('../../config/pass');

module.exports = {

    loginCtl: (req, res) => {
        var param = req.body;
        // callback function loginSrv
        loginSrv(param, (err, result) => {
            try {
                if (err) throw new Error(err);

                if (result.length < 1) throw new Error('Invalid email');

                // compare the password with db password 
                let passStatus = comparePass(param.password, result[0]['password']);
                if (!passStatus) throw new Error('Invalid password');

                var userData = {
                    'id': result[0]['id'],
                    'name': result[0]['name'],
                    'email': result[0]['email'],
                }

                var token = createToken(userData);

                res.status(200).json({ "status": true, "data": { 'token': token } });
            } catch (err) {
                res.status(400).json({ "status": false, "data": err.message });
            }
        });
    },

    signupCtl: (req, res) => {
        var param = req.body;

        var userData = {
            'id': createUuid('usr'),
            'name': param.name,
            'email': param.email,
            'password': encryptPass(param.password),
            'created_at': getDateTime(),
        }

        // callback function signupSrv
        signupSrv(userData, (err, result) => {
            try {
                if (err) throw new Error(err);

                res.status(200).json({ "status": true, "data": result });
            } catch (err) {
                res.status(400).json({ "status": false, "data": err.message });
            }
        });
    }

}