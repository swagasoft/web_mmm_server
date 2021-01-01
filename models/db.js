const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const DATABASE = 'mongodb://localhost:27017/web_db';
mongoose.connect(DATABASE,{useNewUrlParser : true, useUnifiedTopology: true},(err) => {
    if(!err) console.log(DATABASE,'mongodb connection successful..');
    else
    console.log("error in connection"+ JSON.stringify(err, undefined, 2));
});  
   
require('./users_model'); 


