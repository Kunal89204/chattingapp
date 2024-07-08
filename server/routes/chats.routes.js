const express = require("express")
const router = express.Router()


const {getChats} = require("../controllers/chat.controller")

router.get('/getchats/:roomId', getChats)

module.exports = router;