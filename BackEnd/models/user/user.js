const mongoose = require('mongoose');
const user = new mongoose.Schema({
    username:String,
    password:String,
    fullname:String,
    image:{
        type:String,
        default:("https://res.cloudinary.com/cuong/image/upload/v1616435985/messenger/IMG_0011_-_Copy.jpg")
    },
    friendId:[]

});
module.exports = mongoose.model("user", user);   