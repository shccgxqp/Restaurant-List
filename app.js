//  express
const express = require('express');
const passport = require('./config/passport')

const flash = require('connect-flash');
const session = require('express-session');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const app = express();
const { engine } = require('express-handlebars');
const port = 3000;

//  method-override -> put & delete
const methodOverride = require('method-override');

const router = require('./routers');
const messageHandler = require('./middlewares/message-handler')
const errorHandler = require('./middlewares/error-handler');

//  init
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use(
  session({
    secret: 'ThisIsSecret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(messageHandler)
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
