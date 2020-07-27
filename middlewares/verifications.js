const User = require('../models/User')

exports.idVeryfication = async (req, res, next) => {
    const userId = req.cookies.userId
    if (userId) {
        await User.findOne({ _id: userId })
            .then(user => {
                if (user.active) {
                    next()
                } else {
                    req.flash('withMessage', 'Konto nie aktywne')
                    res.redirect('/')
                }
            })
            .catch(() => {
                req.flash('withMessage', 'Próba oszukania, twója adres IP został zgłoszony na policje.')
                res.redirect('/')
            })
    } else {
        req.flash('withMessage', 'Nie jesteś zalogowany')
        res.redirect('/')
    }
}

exports.isLoggedId = async (req, res, next) => {
    const userId = req.cookies.userId
    if (userId) {
        res.redirect('/question/1')
    } else {
        next()
    }
}
