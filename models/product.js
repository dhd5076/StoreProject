var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    title: {
        type: String,
        required: [true, 'Item Title Required']
    },
    description: {
        type: String,
        required: [true, 'Item Description Required']
    },
    price: {
        type: Number,
        required: [true, 'Item Price Required']
    }
});

module.exports = mongoose.model('Product', ProductSchema);