const mongoose = require('mongoose');
const config = require('./db.config')
mongoose.connect(config.url, config.option)
.then( () =>{
    console.log("Mongoose Connected ...");
})
.catch( (err) =>{
    console.log("Mongoose connect fail ...");
})