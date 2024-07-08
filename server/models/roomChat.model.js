const mongoose = require('mongoose');

const groupChatSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  message: { type: String, required: true },
});

const GroupChat = mongoose.model('GroupChat', groupChatSchema);
module.exports = GroupChat;
