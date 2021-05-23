const db = require('../../config/db');

module.exports = {

    loginSrv: (param, callback) => {
        let sql = `select * from users where email = '${param.email}'`;
        db.query(sql, (err, result) => {
            if (err) return callback(err);
            return callback(null, result);
        });
    },

    signupSrv: (param, callback) => {
        // Check for duplicate user
        let sql = `select * from users where email = '${param.email}'`;
        db.query(sql, (err, result) => {
            if (err) return callback(err);

            if (result.length == 0) {
                // If duplicate didn't found then enter
                let sql2 = `INSERT INTO users set ?`;
                db.query(sql2, param, (err, result) => {
                    if (err) return callback(err);
                    return callback(null, result);
                });
            } else {
                return callback('Duplicate user found');
            }
        });
    }

}