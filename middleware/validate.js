const validator = require('../push/validate');


const saveLovebox = (req, res, next) => {
  const validationRule = {
    firstName: 'string',
    lastName: 'string',
    email: 'email',
    favoriteHobby: 'string',
    birthdayMonth: 'string',
    age: 'numeric',
    city: 'string'
  };

  validator(req.body, validationRule)
    .then(() => next())
    .catch((errors) => {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: errors
      });
    });
};


const saveConnectbox = (req, res, next) => {
  const validationRule = {
    firstName: 'string',
    lastName: 'string',
    email: 'email',
    favoriteHobby: 'string',
    birthdayMonth: 'string',
    age: 'numeric',
    city: 'string'
  };

  validator(req.body, validationRule)
    .then(() => next())
    .catch((errors) => {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: errors
      });
    });
};

module.exports = {
  saveLovebox,
  saveConnectbox
};