const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        name: String,
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },
        points: Number,
        answers: Object,
        active: Boolean,
    },

    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', UserSchema)
