var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    username: {
        type: String,
        required: [true, 'Username Required']
    },
    firstname: {
        type: String,
        required: [true, 'First Name Required']
    },
    lastname: {
        type: String,
        required: [true, 'Last Name Required']
    },
    password: {
        type: String,
        required: [true, 'Password Required']
    },
    shipping_address: {
        line_1: {
            type: String,
            required: false
        },
        line_2: {
            type: String,
            required: false
        },
        line_3: {
            type: String,
            required: false
        }
    },
    billing_address: {
        line_1: {
            type: String,
            required: false
        },
        line_2:  {
            type: String,
            required: false
        },
        line_3: {
            type: String,
            required: false
        }
    }
});

UserSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('password')) return next();
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
    });
 });

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);