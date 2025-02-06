const mongoose = require("mongoose")

module.exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/forest-shuffle-calculator')
    mongoose.connection.once("open", () => {
        console.log("Connection Succeeded")
    })
}