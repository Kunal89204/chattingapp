const express = require("express")
const router = express.Router()

const {getRoomChats} = require("../controllers/roomchat.controller")

router.get("/roomchats/:roomId", getRoomChats)

module.exports = router;