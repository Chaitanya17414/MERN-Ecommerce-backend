const jwt = require("jsonwebtoken")

const secretKey = process.env.JWT_SECRET_KEY || "supertoken433242"
const getAuthToken= (user) =>{
    const token = jwt.sign ({
        _id: user._id,
        name: user.name,
        email:user.email,
        isAdmin:user.isAdmin
    },secretKey)
    return  token
}

module.exports = getAuthToken