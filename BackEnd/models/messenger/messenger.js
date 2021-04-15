const mongoose = require('mongoose');
const messenger = new mongoose.Schema({
    sender:"",
    receiver:"",
    messenger:[]

});
module.exports = mongoose.model("messenger", messenger);   