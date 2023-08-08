const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true     
    },
    description: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true        
    },
    profileImage:{
        type:String,
        default:''
    },
    isActive: {
        type: Boolean,
        default: true
    }

})

storeSchema.virtual('id').get(function(){
    return this._id.toHexString();
})

storeSchema.set('toJSON',{virtuals: true});

exports.Store = mongoose.model('Store',storeSchema);