const User = require('../models/User')
const { check, validationResult } = require('express-validator')

exports.login = async (req, res, next) => {
    const { name, email } = req.body
    const user = await new User({ name, email, points: 0, answers: {}, active: true }).save()
    res.cookie('userId', user._id).cookie('name', name).cookie('email', email).cookie('checkedAnswers', {}).redirect('/question/0')
}

exports.validate = [
    check('name').trim().isLength({ min: 1 }).withMessage('Źle podane imię'),
    check('email').isLength({ min: 4 }).trim().isEmail().normalizeEmail().withMessage('Źle podany email'),
]

exports.checkValidation = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.render('home', {
            validated: req.body,
            errors: errors.mapped(),
            showLightbox: true,
        })
    }

    next()
}

exports.saveAnswerAndRedirect = (req, res, next) => {
    const { redirectLocation } = req.params

    const answers = { ...(req.cookies.checkedAnswers || {}), ...req.body }
    res.cookie('checkedAnswers', answers)

    res.redirect(`/question/${redirectLocation >= 0 ? redirectLocation : 0}`)
}
