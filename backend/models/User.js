const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: String,
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    // googleId: String,
    githubId: String,
    otp: String,
    otpExpires: Date,
});

UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.getSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('user', UserSchema);

