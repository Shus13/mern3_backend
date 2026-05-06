const mongoose = require('mongoose')

async function connectDatabase () {
   await mongoose.connect('mongodb+srv://sushitkarki_db_user:mern3@cluster0.zzfrusn.mongodb.net/?appName=Cluster0')
   console.log("Database connection successfully")
}

module.exports = connectDatabase