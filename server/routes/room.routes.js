const express = require("express")
const router = express.Router()

const {getroom, addRoom} = require("../controllers/group.controller")

router.get("/getrooms", getroom)
router.post("/addroom/:userId", addRoom)

module.exports = router;