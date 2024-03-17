
const mongoose = require("mongoose");

var mongoDBURL = "mongodb+srv://chaitanya:chaitanya@cluster0.1v9qlix.mongodb.net/mern-ecommerce";

mongoose.connect(mongoDBURL, {useUnifiedTopology: true, useNewUrlParser: true})

var dbConnect= mongoose.connection

dbConnect.on('error',()=>{
    console.log("MongoDB Connection Error: Could not connect to the database.");
})
dbConnect.on("connected",()=>{
    console.log("Connected to Database!");
})

module.exports = mongoose