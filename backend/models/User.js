const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, immutable: true},
    passwordHash: {type: String, required: true},
    salt: {type: String, required: true},
    avatarImageUrl: {type: String},
    coverImageUrl: {type: String},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    birthday: {type: Date, required: true},
    address: {
        city: {type: String, required: true},
        country: {type: String, required: true}
    },
    isVIP: {type: Boolean, required: true, default: false},
    cart: [{
        product: {type: mongoose.Types.ObjectId},
        quantity: {type: Number}
    }],
    followers: [{type: mongoose.Types.ObjectId, required: true, ref: 'User'}],
    followersCount: {type: Number, default: 0},
    followings: [{type: mongoose.Types.ObjectId, required: true, ref: 'User'}],
    followingsCount: {type: Number, default: 0}
});

// Method to set salt and hash the password for a user 
userSchema.methods.setPassword = function(password) { 
     
    // Creating a unique salt for a particular user 
    this.salt = crypto.randomBytes(16).toString('hex'); 
    
    // Hashing user's salt and password with 1000 iterations, 
    
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt,  
    1000, 64, `sha512`).toString(`hex`); 
}; 
     
// Method to check the entered password is correct or not 
userSchema.methods.validPassword = function(password) { 
    const hash = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.passwordHash === hash; 
}; 

userSchema.methods.clearCart = function() { 
    return this.cart = [];
}; 

const User = mongoose.model('User', userSchema);

module.exports = {User};