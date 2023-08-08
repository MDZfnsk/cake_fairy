const { Product } = require('../models/product');
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const multer = require('multer');

const mongoose = require('mongoose');
const { Store } = require('../models/store');

//To determine the extension of the uploaded image
const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
}

//Uploading Images with multer {renaming the image using diskstorage}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('Invalid image type');

        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, 'public/products')
    },
    filename: function (req, file, cb) {

        const fileName = file.originalname.split(' ').join('-');  //same wit .replace('','-')
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
})

const uploadOptions = multer({ storage: storage })



//Creating a New Product
router.post('/', uploadOptions.array('images', 10), async (req, res) => {
    const files = req.files;    
    if (!files) {
        return res.status(400).send('No Images are selected to Upload into the Gallery');
    } else {
        let imagesPaths = [];
        const basePath = `${req.protocol}://${req.get('host')}/public/products/`;

        files.map(file => {
            imagesPaths.push(`${basePath}${file.filename}`);
        })

        if (!mongoose.isValidObjectId(req.body.store)) {
            return res.status(500).json({ message: 'Invalid Store ID' });
        }

        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            images: imagesPaths,
            price: req.body.price,
            category: req.body.category,
            store: req.body.store
        })

        try {
            const result = await product.save();
            return res.status(201).json(result);
        }
        catch (error) {
            return res.status(500).send({ messsage: 'Product Creation Unsuccessfull', error: error });
        }

    }
})



//Updating product
router.put('/:id', uploadOptions.array('images', 10), async (req, res) => {
    console.log(req.files);

    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(500).send('InValid Product ID !!');
    }  

    const existingProduct = await Product.findById(req.params.id);

    if (!existingProduct) {
        return res.status(404).send('cannot find the product to update');
    } else {
        const files = req.files;
        console.log(files.length);
        let imagepathes = [];

        if (files.length > 0) {
            console.log("Yo nigga");
            const basePath = `${req.protocol}://${req.get('host')}/public/products/`;
            files.map(file => {
                imagepathes.push(`${basePath}${file.filename}`);
            })

        } else {
            console.log("Pac");
            imagepathes = existingProduct.images;
        }

        try {
            const product = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    name: req.body.name,
                    description: req.body.description,
                    richDescription: req.body.richDescription,
                    images: imagepathes,
                    price: req.body.price,
                    category: req.body.category
                },
                { new: true, runValidators: true }
            );
            if (!product) {
                return res.status(404).send('Updating Product Unsuccessfull..!');
            } else {
                return res.status(201).json(product);
            }

        }
        catch (error) {
            return res.status(500).send({ messsage: 'Product Update Unsuccessfull', error: error });
        }

    }


})


//Get all the products and If querry parameters available get related categories
//The sample URL may look like follows
// http://localhost:3000/api/products?categories=5f15d54cf3a046427a1c26e3,5f15d545f3a046427a1c26e2
router.get(`/`, async (req, res) => {   
    let filter = {};
    if (req.query.categories) {
        filter = { category: req.query.categories.split(',') }
    }
    const productList = await Product.find(filter).populate('category').populate({ path: 'store', populate: 'owner'});
    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send(productList);
})


//Get products by name (Index Search)
router.get(`/search/searchby`, async (req, res) => {
    console.log("hello");
    const searchString = req.query.search;
    const productList = await Product.find({ $text: { $search: searchString } }).populate('category').populate({ path: 'store', populate: 'owner'});
    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send(productList);   
   
})


//Get products by a specific store
router.get(`/store/:id`, async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(500).json({ message: 'Invalid Store ID' });
    }
    const store = await Store.findById(req.params.id);

    if (!store) {
        return res.status(404).json({ message: 'No such store found' });
    } else {
        const productList = await Product.find({ store: req.params.id }).populate('category');
        if (!productList) {
            res.status(500).json({ success: false, message: 'No Products from the store' })
        } else {
            res.send(productList);
        }

    }

})



//Get one product
router.get('/:id', async (req, res) => {   
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(500).json({ message: 'Invalid Product ID' });
    }
    const product = await Product.findById(req.params.id).populate('category store');

    if (!product) {
        res.status(404).send('no product with thta id');
    }else{
        res.send(product);
    }
    
})



//Delete a product
router.delete('/:id', (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(500).json({ message: 'Invalid Product ID' });
    }
    Product.findByIdAndDelete(req.params.id).then(product => {
        if (product) {
            return res.status(200).json({ success: true, message: 'The Product deleted successfully' })
        } else {
            return res.status(404).json({ success: false, message: 'Product not found to delete' });
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err });
    })
})








//Get Products count
//tutor uses {await Product.countDocuments((count)=>count)} but it throw an error
router.get('/get/count', async (req, res) => {
    const productCount = await Product.countDocuments();

    if (!productCount) {
        return res.status(500).json({ success: false });
    }
    res.status(200).json({ count: productCount });
})









module.exports = router;