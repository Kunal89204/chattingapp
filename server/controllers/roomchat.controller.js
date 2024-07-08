const Room  =require("../models/roomChat.model")


const getRoomChats = async (req, res) => {
    try {
        const roomId = req.params.roomId
        const chats = await Room.find({roomId}).populate('sender', '-password')
        res.json(chats)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getRoomChats}