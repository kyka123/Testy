const mailer = require('../config/nodemailer')
const EmailTemplates = require('../models/EmailTemplates')
const User = require('../models/User')
const Question = require('../models/Question')

exports.home = (req, res, next) => {
    const message = req.flash('withMessage')[0]
    res.render('home', { message })
}

exports.question = async (req, res, next) => {
    const { userId, name, email, checkedAnswers } = req.cookies
    const { questionId } = req.params

    const questionData = await Question.findOne({ index: `${questionId}` })
    if (questionData) {
        res.render('question', {
            question: questionData.name,
            answers: questionData.answers,
            questionId,
            name,
            checked: checkedAnswers[questionId] || null,
        })
    } else {
        const trueAnswers = await Question.findOne({ type: 'trueAnswers' })
        const points = countPoints(checkedAnswers, trueAnswers.trueAnswers)
        mailer.transporter.sendMail(EmailTemplates.clientTemplate(name, email, points))
        await User.updateOne({ _id: userId }, { points: points, answers: checkedAnswers, active: false })
        req.flash('withMessage', `Cześć: ${name}, Całkiem nieźle Ci poszło, wniki zoszały przesłane na twój email: ${email}. Dzięki za udział.`)
        res.clearCookie('userId').clearCookie('checkedAnswers').clearCookie('name').clearCookie('email').redirect('/')
    }
}

function countPoints(checkedAnswers, trueAnswers) {
    return Object.values(checkedAnswers).reduce((acc, val, index) => (parseInt(val) == trueAnswers[index] ? acc + 1 : acc), 0)
}
