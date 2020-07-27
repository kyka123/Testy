const express = require('express')
const router = express.Router()

const errors = require('../middlewares/errors')
const veryfications = require('../middlewares/verifications')

const pagesControllers = require('../controllers/pagesControllers')
const appControllers = require('../controllers/appControllers')

router.get('/', veryfications.isLoggedId, pagesControllers.home)
router.get('/login', (req, res) => res.redirect('/'))
router.get('/question/:questionId', veryfications.idVeryfication, errors.catchAsync(pagesControllers.question))

router.post('/login', appControllers.validate, appControllers.checkValidation, errors.catchAsync(appControllers.login))
router.post('/saveAnswerAndRedirect/:redirectLocation', veryfications.idVeryfication, errors.catchAsync(appControllers.saveAnswerAndRedirect))

module.exports = router
