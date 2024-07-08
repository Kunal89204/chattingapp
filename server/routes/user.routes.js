const express = require("express")
const router  = express.Router()
const requireAuth = require("../middlewares/requireAuth")

const {testRoute, loginUser, registerUser,validate_token, userInfo}  = require("../controllers/user.controller")

router.get("/testroute", requireAuth , testRoute)
router.post("/register", registerUser)
router.post("/login", loginUser)
router.get('/userinfo/:id', userInfo)
router.get("/validate-token",requireAuth,  validate_token)

module.exports = router;