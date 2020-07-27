const mongoose = require('mongoose')

const QuestionSchema = mongoose.Schema({
    name: String,
    answers: Array,
    index: Number,

    //For True Answers because I keep them in the same document, there's no point in creating a separate
    trueAnswers: Array,
    type: String,
})

module.exports = mongoose.model('Question', QuestionSchema)
