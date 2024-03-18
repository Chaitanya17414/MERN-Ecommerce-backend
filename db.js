
const mongoose = require("mongoose");
require("dotenv").config()

var mongoDBURL = process.env.DB_URI;
mongoose.connect(mongoDBURL, {useUnifiedTopology: true, useNewUrlParser: true})

var dbConnect= mongoose.connection

dbConnect.on('error',()=>{
    console.log("MongoDB Connection Error: Could not connect to the database.");
})
dbConnect.on("connected",()=>{
    console.log("Connected to Database!");
})

module.exports = mongoose