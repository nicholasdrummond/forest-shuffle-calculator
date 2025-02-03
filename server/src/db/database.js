const mongoose = require("mongoose")

module.exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/forest-shuffle-calculator')
    mongoose.connection.once("open", () => {
        console.log("Connection Succeeded")
    })
}