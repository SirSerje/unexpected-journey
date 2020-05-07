const { check } = require('express-validator');

const userSignupValidator = [
  check('username')
    .not()
    .isEmpty()
    .withMessage('Name is required'),
  check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
  check('pass')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long'),
];


const userSignInValidator = [
  check('username')
    .isEmail()
    .withMessage('Must be a valid email address'),
  check('pass')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long'),
];


export { userSignupValidator, userSignInValidator };
