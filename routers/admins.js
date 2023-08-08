const { Admin } = require('../models/admin');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//importing JWT
const jwt = require('jsonwebtoken');

//to hash the password
const bcrypt = require('bcryptjs');





//POST a new Admin 
router.post('/', async (req, res) => {
    const admin = new Admin({       
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10)       
    });

    try {
        const newAdmin = await admin.save();
        return res.status(200).json(newAdmin);
    } catch (error) {
        return res.status(500).send({ message: 'The Admin cannot be created', error: error });

    }

})



//Admin authentication
router.post('/login', async (req, res) => {
    const admin = await Admin.findOne({ email: req.body.email });
    const secret = process.env.secret;

    if (!admin) {
        return res.status(404).send('Invalid admin');
    }

    if (admin && bcrypt.compareSync(req.body.password, admin.passwordHash)) {
        const token = jwt.sign(
            {
                adminId: admin.id,
                isAdmin: true                                        

            },
            secret,
            {
                expiresIn: '1h'
            }
        )
        return res.status(200).send({ admin: admin.email, token: token });
    } else {
        return res.status(400).send('User is not authenticated');
    }

})





module.exports = router;