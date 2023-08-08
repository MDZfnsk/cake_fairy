const { Order } = require('../models/order')
const { Product } = require('../models/product')
const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const stripe = require('stripe')('sk_test_51N2rTNCaqVFK5FUVYhM9xHCcn0T9rj9RLGBWdAfFyscTVeLYlLXbkaUnST6WKqlA9LlqZ3KwlEKS2NATkRjUKX0b00CFuU85br');


//Post new order
router.post('/', async (req, res) => {

    if (!mongoose.isValidObjectId(req.body.product)) {
        return res.status(500).json({ message: 'Invalid Product ID' });
    }

    if (!mongoose.isValidObjectId(req.body.user)) {
        return res.status(500).json({ message: 'Invalid User ID' });
    }

    const orderProduct = await Product.findById(req.body.product);
    if(!orderProduct){
        return res.status(404).json({ message: 'Product Not found' });
    }else{
        // console.log(orderProduct);
        // console.log(req.body.quantity);
        // console.log(typeof(req.body.quantity));

        const orderTotalPrice = (orderProduct.price * req.body.quantity);
        

        const order = new Order({
            product: req.body.product ,
            quantity: req.body.quantity,
            apartment: req.body.apartment,
            city: req.body.city,
            street: req.body.street,
            zip: req.body.zip,
            district: req.body.district,
            phone: req.body.phone,        
            totalPrice: orderTotalPrice,
            status:req.body.status,
            user: req.body.user, 
            dateOrdered: req.body.dateOrdered           
        })

        try {
            result = await order.save();
            return res.status(201).json(result);
        }
        catch(error){
            return res.status(500).send({ messsage: 'Order creation Unsuccessfull', error: error });

        }    

    }
    
})


//Update an Order
router.put('/:id', async (req, res) => {   

    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(500).json({ message: 'Invalid Order ID' });
    }

    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status
            },
            { new: true, runValidators: true });
        if (order) {
            return res.status(201).json(order);
        } else {
            return res.status(404).send('No Order found under that id')
        }
    }
    catch {
        return res.status(500).send('The Order cannot be Updated')
    }
})


//Get all orders
router.get('/', async (req, res) => {
    //Order from newest to oldest
    const orderList = await Order.find().populate('user').sort({ 'dateOrdered': -1 });
    if (!orderList) {
        return res.status(404).send('No Orders fonud');
    } else {
        return res.status(200).json(orderList);
    }
})



//Get one order
router.get('/:id', async (req, res) => {   

    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(500).json({ message: 'Invalid Order ID' });       
    }
    const order = await Order.findById(req.params.id)
    .populate('user')
    .populate({ path: 'product', populate: { path: 'category' } })
    .populate({ path: 'product', populate: { path: 'store', populate: 'owner' } });

    if (!order) {
        return res.status(404).send('No Order fonud');
    } else {
        return res.status(200).json(order);
    }
})


//Get Order count
router.get('/get/count', async(req,res)=>{

    try{
        const orderCount = await Order.countDocuments();
        if(!orderCount){
            return res.status(500).json({success:false});
        }else{
            return res.status(200).json({count : orderCount});
        }

    }catch(error){
        console.log(error);
        
    } 
   
})



//Get all orders by a specific user
router.get('/userorders/:userId', async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.userId)) {
       return res.status(500).json({ message: 'Invalid User ID' });  
     }    
    const userOrderList = await Order.find({ user: req.params.userId }).populate({ path: 'product', populate: 'store' });

    if (!userOrderList || userOrderList == '') {
        return res.status(404).send('No Orders fonud');
    } else {
        return res.status(200).json(userOrderList);
    }
})


//Get order count by a specific user
router.get('/userordercount/:userId', async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.userId)) {
       return res.status(500).json({ message: 'Invalid User ID' });  
     }    
    const userOrderCount = await Order.find({ user: req.params.userId }).countDocuments();

    if (!userOrderCount) {
        return res.status(404).send('No Orders fonud');
    } else {
        return res.status(200).json({count: userOrderCount});
    }
})


//Get all Orders for a specific store
router.get('/storeorders/:storeId', async (req, res) => {  
    
    if (!mongoose.isValidObjectId(req.params.storeId)) {
        return res.status(500).json({ message: 'Invalid Store ID' });  
      } 

    const productsByStore = await Product.find({store: req.params.storeId});
    

    if(!productsByStore || productsByStore.length === 0){
        return res.status(404).send('There are no products by this store');        
    }
    else{
       
        // productsByStore.map(product => console.log(product._id));

        const storeOrderList = await Order.find({ product: productsByStore })
        .populate('user')
        .populate({ path: 'product', populate: 'store' });

        if (!storeOrderList || storeOrderList.length === 0) {
            return res.status(404).send('No Orders fonud');
        } else {
            return res.status(200).json(storeOrderList);
        }


        //   Order.find({ product: productsByStore }).then(result => {
        //     if(result.length>0){
        //         return res.status(200).json(result);
        //     }else {
        //         return res.status(404).send('There are no Orders to this store');
        //     }           
            
        //   }).catch(err => {
        //     return res.status(404).send({messsage: 'Error Occured', error: err});
        //   })  
    }      
  
})


//Get order count for a specific store
router.get('/storeordercount/:storeId', async (req, res) => {    

    if (!mongoose.isValidObjectId(req.params.storeId)) {
        return res.status(500).json({ message: 'Invalid Store ID' });  
      } 

    const productsByStore = await Product.find({store: req.params.storeId});

    if(!productsByStore || productsByStore.length === 0){
        return res.status(200).json({count: 0});      
    }
    else{
        productsByStore.map(product => console.log(product._id));

          Order.find({ product: productsByStore }).countDocuments().then(result => {
            console.log(result);
            return res.status(200).json({count: result});
          }).catch(err => {
            return res.status(404).send({messsage: 'Error Occured', error: err});
          })  
    }      
  
})


//Get "Pending" order count for a specific store
router.get('/storeordercount/pending/:storeId', async (req, res) => {    

    if (!mongoose.isValidObjectId(req.params.storeId)) {
        return res.status(500).json({ message: 'Invalid Store ID' });  
      } 

    const productsByStore = await Product.find({store: req.params.storeId});

    if(!productsByStore || productsByStore == ''){
        return res.status(404).send('There are no Orders to this store');        
    }
    else{       
        const storeOrderList = await Order.find({ product: productsByStore });

        const orderCount = storeOrderList.filter(order => order.status === 0).length
        console.log(orderCount);

        if(orderCount === 0){
            return res.status(404).send({messsage: 'No Items'});
        }else{
            return res.status(200).json({count: orderCount});
        }
       
    }      
  
})



//Get Total Number of Sales
router.get('/get/totalsales', async (req, res) => {
    const totalSales = await Order.aggregate([
        { $group: { _id: null, totalsales: { $sum: '$totalPrice' } } }
    ])

    if (!totalSales) {
        return res.status(400).send('The total sales cannot be generated')
    }else{
        return res.send({ totalsales: totalSales.pop().totalsales })

    }
    
})


//Get Total Number of Sales for a specific store
router.get('/storetotalsales/:storeId', async (req, res) => {
    
    if (!mongoose.isValidObjectId(req.params.storeId)) {
        return res.status(500).json({ message: 'Invalid Store ID' });  
    } 

    const productsByStore = await Product.find({store: req.params.storeId});

    if(!productsByStore || productsByStore == ''){
        return res.status(404).send('There are no Orders to this store');        
    }
    else{
        const productIds = productsByStore.map(product => product._id);

        console.log(productIds);

        const totalSales = await Order.aggregate([
            { $match: { product: { $in: productIds } } },
            { $group: { _id: null, totalsales: { $sum: '$totalPrice' } } }
        ]);

        if (!totalSales || totalSales.length === 0) {
            return res.status(400).send('The total sales cannot be generated');
        } else {            
            return res.send({ totalsales: totalSales.pop().totalsales });
        }
    }      
});


//Delete Order
router.delete('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(500).json({ message: 'Invalid Order ID' });  
      } 
    Order.findByIdAndRemove(req.params.id).then(result => {
        if (result) {          
            return res.status(200).json({ success: true, message: 'The Order Deleted Successfully' })
        } else {
            return res.status(404).json({ success: false, message: 'No Matching Order to Deleted' })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })

})







//Stripe checkout API
router.post('/create-checkout-session', async( req,res) => {

    // return res.status(400).send('Checkout session cannot be created .. !!!'); 

    console.log(req.body);


    const product = await Product.findById(req.body.product);
    
    if(!product){
        return res.status(400).send('Checkout session cannot be created .. !!!');
    }else{
        const session = await stripe.checkout.sessions.create({
            payment_method_types : ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'lkr',
                        product_data: {
                          name: product.name,
                        },
                        unit_amount: product.price * 100,
                      },
                      quantity: req.body.quantity,
                },
            ],
            mode: 'payment',
            // success_url: `http://localhost:4200/success`, 
            success_url: `http://localhost:4200/success?session_id={CHECKOUT_SESSION_ID}`,           
            cancel_url: 'http://localhost:4200/error',
        });

        res.json({id: session.id});

    }
    
})











module.exports = router;