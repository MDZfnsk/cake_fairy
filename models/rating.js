const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',        
    },
    rating: {
        type: Number,
    },
    comment: {
        type: String,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }

})

ratingSchema.virtual('id').get(function(){
    return this._id.toHexString();
})

ratingSchema.set('toJSON',{virtuals: true});

exports.Rating = mongoose.model('Rating',ratingSchema);