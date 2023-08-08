const { Store } = require('../models/store');
const { User } = require('../models/user');
const { Rating } = require('../models/rating');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


//Add New Rating
router.post('/', async (req, res) => {

    if (!mongoose.isValidObjectId(req.body.user)) {
        return res.status(500).json({ message: 'Invalid User ID' });
    }

    if (!mongoose.isValidObjectId(req.body.store)) {
        return res.status(500).json({ message: 'Invalid Store ID' });
    }


    const rating = new Rating({
        user: req.body.user,
        store: req.body.store,
        rating: req.body.rating,
        comment: req.body.comment
    })

    rating.save().then((result) => {
        if (result) {
            res.status(201).json(result);
        } else {
            res.status(500).json({ message: 'Couldnt Add Rating' });
        }
    }).catch(() => {
        res.status(500).json({ message: 'The Rating be created' });
    })

})


//Get all ratings
router.get('/', async (req, res) => {
    const ratingsList = await Rating.find();
    if (!ratingsList) {
        res.status(404).json({ success: false, message: 'Error getting Ratings form Database' });
    } else {
        res.status(200).send(ratingsList);
    }
})

//Get ratings for a specific store
router.get('/store/:id', async (req, res) => {
   
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(500).json({ message: 'Invalid Store ID' });
    } else {
        const store = await Store.findById(req.params.id);
        if (!store) {
            res.status(404).json({ success: false, message: 'No Such Store' });
        } else {
            const ratingsList = await Rating.find({ store: req.params.id }).populate('user');
            if (!ratingsList) {
                res.status(404).json({ success: false, message: 'Error getting Ratings form Database' });
            } else {
                res.status(200).send(ratingsList);
            }
        }
    }
})










module.exports = router;