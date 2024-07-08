const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  groupName: { type: String }
}, {timestamps:true});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
