const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

// code to create logs directory
const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// code for storing logs
const accessLogStream = rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});

// Environemnt variable for development
const development = {
    name :'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'placement_cell_database',
    morgan:{
        mode:'dev',
        options:{stream: accessLogStream}
    }
}

// Environemnt variable for production
const production = {
    name :'production',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'placement_cell_production_db',
    morgan:{
        mode:'combined',
        options:{stream: accessLogStream}
    }
}

module.exports = eval(process.env.NODE_ENV)== undefined ? development:eval(process.env.NODE_ENV);