const { Schema, model } = require('mongoose');


const itemSpecificationSchema = Schema(
    {
        brand: {
            type: String,
        },
        model: {
            type: String,
        },
        price: { //per day
            type: String,
        },
        details: {
            type: String,
        },
        itemPic:{
            type: String,
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"user"
        }
    },
    {
        timestamps: true,
    }
);

module.exports = model('ItemSpecification',itemSpecificationSchema)
