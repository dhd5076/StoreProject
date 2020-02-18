var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Product = required('./product');

var OrderSchema = mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    invoice: {
        type: Schema.Types.Mixed,
        required: true
    }
});

module.exports = mongoose.model('Product', OrderSchema);