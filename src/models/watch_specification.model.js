const { Schema, model } = require('mongoose');


const watchSpecificationSchema = Schema(
    {
        brand: {
            type: String,
        },
        model: {
            type: String,
        },
        reference_number: {
            type: String,
        },
        version_number: {
            type: String,
        },
        web_link: {
            type: String,
        },
        watch_main_pic: {
            type: String,
        },
        model_case_pic: {
            type: String,
        },
        movement_pic: {
            type: String,
        },
        bracelet_pic: {
            type: String,
        },
        dial_pic: {
            type: String,
        },
        pdf_download_brochure: {
            type: String,
        },
        pdf_download_userguide: {
            type: String,
        },
        price: {
            type: String,
        },
        price_currency: {
            type: String,
        },
        model_case: {
            type: String,
        },
        oyster_architecture: {
            type: String,
        },
        diameter: {
            type: String,
        },
        material: {
            type: String,
        },
        bezel: {
            type: String,
        },
        winding_crown: {
            type: String,
        },
        crystal: {
            type: String,
        },
        water_resistance: {
            type: String,
        },
        movement: {
            type: String,
        },
        calibre: {
            type: String,
        },
        precision: {
            type: String,
        },
        functions: {
            type: String,
        },
        oscillator: {
            type: String,
        },
        winding: {
            type: String,
        },
        power_reserve: {
            type: String,
        },
        bracelet: {
            type: String,
        },
        bracelet_material: {
            type: String,
        },
        dial: {
            type: String,
        },
        details: {
            type: String,
        },
        certification: {
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

module.exports = model('WatchSpecification',watchSpecificationSchema)
