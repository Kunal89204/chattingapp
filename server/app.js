const express = require("express")
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")

app.use(cors())
dotenv.config()
app.use(bodyParser.json())

module.exports = app;