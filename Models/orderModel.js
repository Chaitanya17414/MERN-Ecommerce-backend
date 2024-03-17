const mongoose= require("mongoose")

const orderSchema = new mongoose.Schema ({
    userId:{type:String,require},
    name:{type:String,require},
    email:{type:String,require},
    orderItems:[{
        name:{type:String,require},
        quantity:{type: Number,require},
        id:{type: Number,require},
        price:{type: Number,require}
    }],
    shippingAddress:[{
        address:{type:String,require},
        city:{type:String,require},
        zipcode:{type:Number,require},
        country:{type:String,require} 
    }],
    orderAmount:{type:Number,require},
    transactionId:{type:String,require}, 
    isDelivered:{type:Boolean,require},
},{
    timestamps:true
})
const Order = mongoose.model("order",orderSchema)
module.exports= Order