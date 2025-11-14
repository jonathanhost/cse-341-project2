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


const productRules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('price')
        .isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),
    body('brand').notEmpty().withMessage('Brand is required'),
    body('color').notEmpty().withMessage('Color is required'),
    body('size').notEmpty().withMessage('Size is required'),
    body('createdAt')
        .optional()
        .isISO8601()
        .withMessage('createdAt must be a valid date')
];

module.exports = { productRules, validate };