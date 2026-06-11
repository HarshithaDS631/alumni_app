const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    institution: { type: String },
    password: { type: String },
    branch: { type: String },
    batchYear: { type: String },
    company: { type: String },
    designation: { type: String },
    location: { type: String },
    profilePicture: { type: String },
    bio: { type: String },
    verified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    authProvider: { type: String, default: 'local' },
    providerId: { type: String }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
