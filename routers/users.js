const { User } = require('../models/user');
const { Store } = require('../models/store');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//importing JWT
const jwt = require('jsonwebtoken');

//to hash the password
const bcrypt = require('bcryptjs');

//Get all the users
router.get('/', async (req, res) => {
    const usersList = await User.find().select('-passwordHash');
    if (!usersList) {
        return res.status(404).send('no users fonud');
    } else {
        return res.status(200).json(usersList);
    }
})

//Get a single user
router.get('/:id', async (req, res) => {

    const user = await User.findById(req.params.id).select('-passwordHash');

    if (!user) {
        return res.status(404).send('no user with the ID');
    } else {
        return res.status(200).json(user);
    }
})


//Get user count
router.get('/get/count', async (req, res) => {
    const userCount = await User.countDocuments();

    if (!userCount) {
        return res.status(500).json({ success: false });
    }
    res.status(200).json({ count: userCount });
})


//POST a new User 
router.post('/register', async (req, res) => {
    console.log(req.body);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        apartment: req.body.apartment,
        street: req.body.street,
        city: req.body.city,
        zip: req.body.zip,
        district: req.body.district,
        phone: req.body.phone       
    });

    try {
        const newUser = await user.save();
        return res.status(200).json(newUser);
    } catch (error) {
        return res.status(500).send({ message: 'The User cannot be created', error: error });

    }

})


//Update an existing user
router.put('/:id', async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(500).json({ message: 'Invalid User ID' });
    } else {

        const userExsist = await User.findById(req.params.id);
        let newPassword
        if (req.body.password) {
            newPassword = bcrypt.hashSync(req.body.password, 10);
        } else {
            newPassword = userExsist.passwordHash;
        }

        User.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                email: req.body.email,
                passwordHash: newPassword,
                street: req.body.street,
                apartment: req.body.apartment,
                city: req.body.city,
                zip: req.body.zip,
                country: req.body.country,
                phone: req.body.phone,                
            },
            { new: true, runValidators: true }).then(result => {
                if(result){
                    return res.status(200).json(result);
                }else {
                    return res.status(404).send('No User found under that id')
                }
                
            }).catch(err => {
                return res.status(400).json({ success: false, error: err, message: 'User Update Failed' });
            })
    }
})


//User authentication
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    const secret = process.env.secret;

    if (!user) {
        return res.status(404).send('Invalid Username');
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isSeller: user.isSeller                          

            },
            secret,
            {
                expiresIn: '1h'
            }
        )
        return res.status(200).send({ user: user.email, token: token });
    } else {
        return res.status(400).send('User is not authenticated');
    }

})


//Delete a user
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id).then( async user => {        
        if (user) {
            (await Store.find({owner: user._id})).map(async store => {
                await Store.findByIdAndRemove(store._id)
            });                                   
            return res.status(200).json({ success: true, message: 'The User deleted successfully' })
        } else {
            return res.status(404).json({ success: false, message: 'User not found to delete' });
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err });
    })
})



//Update User Activeness
router.put('/updateactive/:id', async (req, res) => {       
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(500).json({ message: 'Invalid User ID' });
    }

    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                isActive: req.body.isActive
            },
            { new: true, runValidators: true });
        if (user) {
            return res.status(201).json(user);
        } else {
            return res.status(404).send('No User found under that id')
        }
    }
    catch(error) {
        console.log(error);
        return res.status(500).send('The User cannot be Updated')
    }
})




module.exports = router;