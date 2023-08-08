const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, 
        unique: true,      
        validate: {
            validator: function(v) {
                // Use a regular expression to validate email format
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    passwordHash: {
        type: String,
        required: true
    },
    apartment: {
        type: String,
        default: ''
    },
    street: {
        type:String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    zip: {
        type: Number,       
        default: ''
    },
   district: {
        type: String,
        default: ''
    },
    phone: {
        type: Number,
        required: true,
        unique: true,       
        validate: {
            validator: function(v) {
                // Use a regular expression to validate phone number
                return /^\d{9}$/.test(v);
                // return /^07\d{8}$/.test(v);             

            },
            message: props => `${props.value} is not a valid phone number!`
        }

    },
    isSeller: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }

});

userSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

userSchema.set('toJSON',{
    virtuals: true
});


exports.User = mongoose.model('User',userSchema);

//exports.userSchema = userSchema;