const mongoose = require('mongoose');
const friend = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId },
   friendId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
});
module.exports = mongoose.model("friend", friend);