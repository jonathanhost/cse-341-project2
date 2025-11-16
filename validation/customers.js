const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    next();
};

const customerRules = [
    body('firstName')
        .notEmpty().withMessage('firstName is required'),

    body('lastName')
        .notEmpty().withMessage('lastName is required'),

    body('email')
        .isEmail().withMessage('A valid email is required'),

    body('phone')
        .notEmpty().withMessage('phone is required')
        .isMobilePhone().withMessage('phone must be a valid phone number'),

    body('birthday')
        .optional()
        .isISO8601().withMessage('birthday must be a valid date, exemple 1995-08-21'),

    body('address')
        .notEmpty().withMessage('address is required')
];

module.exports = { customerRules, validate };
