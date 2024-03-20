const express=require('express');
const cors = require("cors")
const app = express();

app.use(cors())
app.use(express.json())
require("dotenv").config()

require("dotenv").config()
var dbConnection = require('./db')

var productRoutes =  require("./routes/productsRoute")
var userRoute = require("./routes/userRouter")
var stripe = require("./routes/stripeRoute")

app.use('/api/products/',productRoutes)
app.use('/api/user/',userRoute)
app.use('/api/orders/',stripe)

// CORS configuration for preflight requests
app.options('*', cors());

// Error handling for CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const PORT =process.env.SERVER_PORT || 8080


app.listen(PORT,()=>console.log("Node server started"));
