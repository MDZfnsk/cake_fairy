const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({    
    email: {
        type: String,
        required: true,
             
        // validate: {
        //     validator: function(v) {
        //         // Use a regular expression to validate email format
        //         return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid email address!`
        // }
    },
    passwordHash: {
        type: String,
        required: true
    }

});

adminSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

adminSchema.set('toJSON',{
    virtuals: true
});


exports.Admin = mongoose.model('Admin',adminSchema);

//exports.userSchema = userSchema;