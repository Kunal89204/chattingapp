const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        mongoose.connect("mongodb+srv://kunalkhandelwal108:Kunal892004@cluster0.eks5ipn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
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