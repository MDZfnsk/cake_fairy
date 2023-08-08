const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Get all categories
router.get('/', async (req, res) => {
    const categoryList = await Category.find();
    if (!categoryList) {
        res.status(404).json({ success: false, message: 'Error getting categories form Database' });
    } else {
        res.status(200).send(categoryList);
    }

})

//Get category by ID
router.get('/:id', async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(500).json({ message: 'Invalid Category ID' });
    } else {
        const category = await Category.findById(req.params.id);
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ message: 'The Category with given Id was not found' });
        }

    }

})


//Add New Category
router.post('/', async (req, res) => {
    const category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })

    category.save().then((result) => {
        if (result) {
            res.status(201).json(result);
        } else {
            res.status(500).json({ message: 'Couldnt create category' });
        }
    }).catch(() => {
        res.status(500).json({ message: 'The Category cannot be created' });
    })

})


//Delete category
router.delete('/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id).then(result => {
        if (result) {
            return res.status(200).json({ success: true, message: 'The category deleted successfully' });
        } else {
            return res.status(404).json({ success: false, message: 'Category not found to delete' });
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err, message: 'Invalid Category ID' });
    })
})


//Updte category
router.put('/:id', async (req, res) => {
    //passing two parameters to the function findByIdAndUpdate()
    //id and the object

    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(500).json({ message: 'Invalid Category ID' });
    } else {
        Category.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                icon: req.body.icon,
                color: req.body.color
            },
            { new: true, runValidators: true })
            .then(result => {
                if (result) {
                    return res.status(201).json(result);
                } else {
                    return res.status(404).send('No category found under that id')
                }
            })
            .catch(err => {
                return res.status(400).json({ success: false, error: err, message: 'Category Update Failed' });
            })

    }
})


module.exports = router;

