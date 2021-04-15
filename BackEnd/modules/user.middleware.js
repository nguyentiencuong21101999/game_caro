const joi = require('joi')
const validate = require('../helpers/validate_joi/validate_joi');
const validateRegister = (req, res, next) => {
    try {
        const schema = joi.object({
            fullname:joi.string().min(3).max(50).required(),
            username: joi.string().min(4).max(20).required(),
            password: joi.string().min(3).max(15).required()
           
        })
        const validates = schema.validate(req.body)
        validate(validates);
        next()
    } catch (err) {
        next(err)
    }
}

const validateLogin = (req, res, next) => {
    try {
        const schema = joi.object({
            username: joi.string().required(),
            password: joi.string().required()
           
        })
        const validates = schema.validate(req.body)
        validate(validates);
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = {
    validateRegister,
    validateLogin
}