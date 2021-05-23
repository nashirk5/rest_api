const jwt = require('jsonwebtoken');
const db = require('./db');

function getToken(param) {
    // Get auth header value
    const bearerHeader = param.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        return bearerToken;
    } else {
        // Forbidden
        res.status(401).json({
            'status': false,
            'data': "Invalid or expired token provided!",
            'error': err
        });
    }
}

function verifyAuth(req, res, next) {
    // get token from header
    const token = getToken(req);
    // decode the token 
    jwt.verify(token, process.env.JWT_SECRET_TICKET, (err, decode) => {
        if (err) {
            res.status(401).json({
                'status': false,
                'data': "Invalid or expired token provided!",
                'error': err
            });
            return false;
        }
        // verify user from the db
        let sql = `select id, name, email from users where id = '${decode.id}'`;
        db.query(sql, async(err, result) => {
            try {
                if (err) throw new Error(err);
                // if didn't found any record send error msg
                if (result.length > 0) {
                    throw new Error('Ivalid user token');
                }
                // store the data in the req
                req.userData = result;
                next();
            } catch (error) {
                res.status(401).json({
                    'status': false,
                    'data': error.message,
                });
            }
        });
    });
}

function createToken(param) {
    let token = jwt.sign(param, process.env.JWT_SECRET_TICKET, { expiresIn: '1d' });
    return token;
}

module.exports = {
    createToken,
    verifyAuth
}