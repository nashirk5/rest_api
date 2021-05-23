const { v4: uuidv4 } = require('uuid');

module.exports = {
    createUuid: (str = null) => {
        let prefix = (str) ? str + '-' : '';
        let id = prefix + uuidv4();
        return id;
    }
}