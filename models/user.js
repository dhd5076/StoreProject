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
    password: {
        type: String,
        required: [true, 'Password Required']
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