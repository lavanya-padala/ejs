const { Schema, model } = require('mongoose');

const requestsSchema = new Schema({
    item:{
        type:Schema.Types.ObjectId,
        ref:"ItemSpecification"
    },
    requestBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    isAccepted:{
        type:Boolean,
        default:false
    },
    startDate:{
        type:String,
        default:""
    },
    returnDate:{
        type:String,
        default:""
    },
    proofImage:{
        type:String,
        default:""
    },
    status:{
        type:Boolean,//watch return status
        default:false
    },
    returnProofImage:{
        type:String,
        default:""
    }
})
module.exports = model('requestsSchema',requestsSchema)
