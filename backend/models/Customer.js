const mongoose = require('mongoose');
const crypto = require('crypto');

const customerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    avatarImageUrl: {
        type: String
    },
    mobileNumber: {
        type: String
    },
    email: {
        type: String
    },
    birthday: {
        type: Date
    },
    location: {
        address: {
            type: String
        },
        district: {
            type: String
        },
        city: {
            type: String
        }
    },
    shippingInformation: [
        {
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            },
            district: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            }
        }
    ],
    paymentMethods: [
        {
            cardNumber: {
                type: String,
                required: true
            },
            nameOnCard: {
                type: String,
                required: true
            },
            expirationMonth: {
                type: String,
                required: true
            },
            expirationYear: {
                type: String,
                required: true
            },
            CVV: {
                type: String,
                required: true
            }
        }
    ],
    cart: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    wishList: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            }
        }
    ],
    notifications: [
        {
            title: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true
            },
            notifiedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

customerSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt,
        1000, 64, `sha512`).toString(`hex`);
};

customerSchema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password,
        this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.passwordHash === hash;
};

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
