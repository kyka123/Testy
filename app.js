const dotenv = require('dotenv').config({ path: '.env' })
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const session = require('express-session')
const mongoose = require('mongoose')

const routes = require('./routes/index')
const errorsHandler = require('./middlewares/errors')
const settings = require('./config/settings');

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

mongoose.Promise = global.Promise
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection e3rror:'))

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(
    session({
        secret: 'testy',
        resave: false,
        saveUninitialized: true,
        cookie: {},
    })
)

app.use(flash())

app.use('/', routes)

app.use(errorsHandler.notFound)
app.use(errorsHandler.catchError)


if (process.env.NODE_ENV === 'development') reload(app);

app.listen(settings.server.port || 8080, () => console.log('Server is up!'));


