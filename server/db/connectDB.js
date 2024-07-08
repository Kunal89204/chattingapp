const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('database connected')
        })
        .catch((error) => {
            console.log({error:"The error is "})
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;