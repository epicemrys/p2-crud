const Validator = require('validatorjs');

const validator = (body, rules, customMessages) => {
    return new Promise((resolve, reject) => {
        const validation = new Validator(body, rules, customMessages);
        if (validation.passes()) {
            resolve(true);
        } else {
            reject(validation.errors);
        }
    });
};

module.exports = validator;