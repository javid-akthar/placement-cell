const mongoose = require('mongoose');
const env = require('./environment');

//connect to the database
mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('error', function(err) { console.log(err.message); });

//up and running handler
db.once('open', function() {
  
    console.log("Successfully connected to the database");

});