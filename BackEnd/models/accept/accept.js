const mongoose = require('mongoose');
const accept = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId },
  friendId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  send: { type: mongoose.Schema.Types.ObjectId }

});
module.exports = mongoose.model("accept", accept);