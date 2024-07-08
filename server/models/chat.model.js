const { default: mongoose } = require("mongoose");

const chatSchema = new mongoose.Schema({
    roomId: { type: String},
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    message: { type: String, required: true },
}, {timestamps:true})

module.exports = mongoose.model("chats", chatSchema)