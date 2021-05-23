const bcrypt = require('bcrypt');

module.exports = {
    encryptPass: (pass = '') => {
        if (pass) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(pass, salt);
            return hash;
        } else {
            return '';
        }
    },
    comparePass: (pass = '', hashPass = '') => {
        let result = bcrypt.compareSync(pass, hashPass);
        return result;
    }
}