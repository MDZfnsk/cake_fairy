const mongoose = require('mongoose');

const productScema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    richDescription: {
        type: String,
        default:''
    },
    images: [{
        type: String
    }],  
    price: {
        type:Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
   
})

productScema.virtual('id').get(function(){
    return this._id.toHexString();
})

productScema.set('toJSON',{virtuals: true});

exports.Product = mongoose.model('Product',productScema);


