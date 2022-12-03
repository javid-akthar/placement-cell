const express = require('express');
const path = require('path');
const expressLayout = require('express-ejs-layouts')
const cookieParser = require('cookie-parser');
const port = 8002 ;
const app = express();
const db = require('./config/mongoose');
const Student = require('./model/student');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator')
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongodb-session')(session);
const sassMiddleware =require('node-sass-middleware');
// const { flash } = require('express-flash-message');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css',
}));

app.use(expressLayout);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('assets'));
// app.use("/static", express.static('./static/'));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
// app.use(flash({ sessionKeyName: 'flashMessage' }));
app.use(flash());
app.use(customMware.setFlash);
app.use('/',require('./routes'));



app.listen(port, function(err){
    if(err){
        console.log(`error in running the server ${err}`);
    }
    console.log(`server is running on port ${port}`);
});