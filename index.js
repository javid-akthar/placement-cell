const express = require('express');
const path = require('path');
const env = require('./config/environment');
const logger = require('morgan');
const expressLayout = require('express-ejs-layouts')
const cookieParser = require('cookie-parser');
// setting up the port
const port = process.env.PORT || 3007;
const app = express();
const db = require('./config/mongoose');
const bodyParser = require('body-parser');
// used for session cookie

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongodb-session')(session);
const sassMiddleware =require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');


// setting up sass middleware
app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css',
}));

// setting up logger
app.use(logger(env.morgan.mode, env.morgan.options));
// setting expressLayout
app.use(expressLayout);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setting up body parser
app.use(bodyParser.urlencoded({extended: false}));
// setting up cookieParser
app.use(cookieParser());
app.use(express.static(env.asset_path));


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
app.use(flash());
app.use(customMware.setFlash);
app.use('/',require('./routes'));



app.listen(port, function(err){
    if(err){
        console.log(`error in running the server ${err}`);
    }
    console.log(`server is running on port ${port}`);
});