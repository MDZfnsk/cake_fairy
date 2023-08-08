const { Store } = require('../models/store');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const multer = require('multer');




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
        cb(uploadError, 'public/stores')
    },
    filename: function (req, file, cb) {

        const fileName = file.originalname.split(' ').join('-');  //same wit .replace('','-')
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
})

const uploadOptions = multer({ storage: storage })



//Add New Store
router.post('/',uploadOptions.single('profileImage'), async (req, res) => {   
    
    if (!mongoose.isValidObjectId(req.body.owner)) {
        res.status(500).json({ message: 'Invalid User ID' });
    } else {
        const user = await User.findById(req.body.owner);
        if (!user) {
            return res.status(400).send('No such User available');
        } else {
            const file = req.file;
            if (!file) {
                return res.status(400).send('No Image is selected to Upload');
            } else {
                const fileName = req.file.filename;
                const basePath = `${req.protocol}://${req.get('host')}/public/stores/`;


            const store = new Store({
                name: req.body.name,
                description: req.body.description,
                owner: req.body.owner,
                profileImage: `${basePath}${fileName}`                
            })

            store.save().then(async (newStore) => {
                if (newStore) {
                    await User.findByIdAndUpdate(req.body.owner,{isSeller: true},{ new: true, runValidators: true }).then(result => {
                        if(result){
                            console.log("User isSeller Updated");
                            res.status(201).json(newStore);
                        }else{
                            res.status(500).json({ message: 'Couldnt create Store & Update User' });
                        }                        
                    })                    
                } else {
                    res.status(500).json({ message: 'Couldnt create Store' });
                }
            }).catch((error) => {                
                res.status(500).json({error: error, message: 'The Store cannot be created' });
            })
        }
        }
    }
})



//Get all stores
router.get('/', async (req, res) => {
    const storeList = await Store.find().populate('owner');
    if (!storeList) {
        res.status(404).json({ success: false, message: 'Error getting Stores form Database' });
    } else {
        res.status(200).send(storeList);
    }
})


//Get store by ID
router.get('/:id', async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(500).json({ message: 'Invalid Store ID' });
    } else {
        const store = await Store.findById(req.params.id).populate('owner');
        if (store) {
            res.status(200).json(store);
        } else {
            res.status(404).json({ message: 'The Store with given Id was not found' });
        }
    }
})



//Get store by User ID
router.get('/user/:id', async (req, res) => {    

    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(500).json({ message: 'Invalid User ID' });
    } else {       
        const store = await Store.find({owner: req.params.id}).populate('owner');
        if (store) {
            if(store.length === 0){
                res.status(404).json({ message: 'The User has no store owned' });
            }else{                
                res.status(200).json(store);
            }            
        } else {
            res.status(404).json({ message: 'The Store with given User Id was not found' });
        }
    }
})



//Update Store
router.put('/:id',uploadOptions.single('profileImage'), async (req, res) => {    

    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(500).json({ message: 'Invalid Store ID' });
    } else {

        const existingStore = await Store.findById(req.params.id);

        if(!existingStore){
            return res.status(404).send('cannot find the Store to update');
        }else{
            const file = req.file;
            let imagepath;

            if (file) {
                const fileName = req.file.filename;
                const basePath = `${req.protocol}://${req.get('host')}/public/stores/`;
                imagepath = `${basePath}${fileName}`;
            }else{
                imagepath = existingStore.profileImage;
            }

            try {
                const store = await Store.findByIdAndUpdate(
                    req.params.id,
                    {
                        name: req.body.name,
                        description: req.body.description,                   
                        profileImage: imagepath,                   
                    },
                    { new: true, runValidators: true }
                );
                if (!store) {
                    return res.status(404).send('Updating Store Unsuccessfull..!');
                } else {
                    return res.status(201).json(store);
                }
            }
            catch(error){
                return res.status(500).send({messsage: 'Store Update Unsuccessfull', error: error});
            }            
        }
    }  
       
})


//Delete Store
router.delete('/:id', async (req, res) => {    
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(500).json({ message: 'Invalid Store ID' });
    } else {
        const store = await Store.findById(req.params.id);
        if (store) {
            await User.findByIdAndUpdate(store.owner,{isSeller: false},{ new: true, runValidators: true }).then((updatedUser) => {
                if(updatedUser){
                    console.log("User isSeller Updated");
                    // res.status(201).json(store);
                    Store.findByIdAndRemove(req.params.id).then(async (result) => {
                        if (result) {                
                            return res.status(200).json({ success: true, message: 'The Store deleted successfully' });
                        } else {
                            return res.status(404).json({ success: false, message: 'Store not found to delete' });
                        }
                    }).catch(err => {
                        return res.status(400).json({ success: false, error: err, message: 'Invalid Store ID' });
                    })
                }else{
                    res.status(500).json({ message: 'Couldnt Delete Store & Update User' });
                }                        
            })           
        } else {
            res.status(404).json({ message: 'The Store with given Id was not found' });
        }
    }

    // Store.findByIdAndRemove(req.params.id).then(async (result) => {
    //     if (result) {


    //         return res.status(200).json({ success: true, message: 'The Store deleted successfully' });
    //     } else {
    //         return res.status(404).json({ success: false, message: 'Store not found to delete' });
    //     }
    // }).catch(err => {
    //     return res.status(400).json({ success: false, error: err, message: 'Invalid Store ID' });
    // })
})

//Get all Stores Count
router.get('/get/count', async(req,res)=>{

    try{
        const storeCount = await Store.countDocuments();
        if(!storeCount){
            return res.status(500).json({success:false});
        }else{
            return res.status(200).json({count : storeCount});
        }

    }catch(error){
        console.log(error);
        
    } 
   
})









module.exports = router;

