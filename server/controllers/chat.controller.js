const Chats = require("../models/chat.model")


const getChats = async (req, res) => {
    try {
        const {roomId} = req.params

        const chats = await Chats.find({roomId}).populate('receiver', '-password').populate('sender', '-password')
        res.json(chats)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getChats}