const {Schema, model} = require('mongoose')

const sellerCustomerSchema = new Schema({
    myId : {
        type : String,
        required : true
    },
    myFriend : {
        type : Array,
        default : []
    }
}, {timestamps : true})

module.exports = model('sellers_customers', sellerCustomerSchema)