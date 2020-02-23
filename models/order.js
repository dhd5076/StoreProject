var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = require('./product').schema;

var OrderSchema = mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    invoice: [{
        product: {
            type: ProductSchema,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    shipping_address: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Order', OrderSchema);