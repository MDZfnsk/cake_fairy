const express = require('express');
const app = express();
require('dotenv/config');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler')


//Cors
app.use(cors());
app.options('*', cors());



//Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use('/public/stores', express.static(__dirname + '/public/stores'));
app.use('/public/products', express.static(__dirname + '/public/products'));
app.use(errorHandler);


//Routes
const productsRouter = require('./routers/products');
const categoriesRouter = require('./routers/categories');
const usersRouter = require('./routers/users')
const ordersRouter = require('./routers/orders');
const storesRouter = require('./routers/stores');
const ratingsRouter = require('./routers/ratings');
const adminsRouter = require('./routers/admins');





const api = process.env.API_URL;


//Routers
app.use(`${api}/products`, productsRouter)
app.use(`${api}/categories`, categoriesRouter)
app.use(`${api}/users`, usersRouter)
app.use(`${api}/orders`, ordersRouter)
app.use(`${api}/stores`, storesRouter)
app.use(`${api}/ratings`, ratingsRouter)
app.use(`${api}/admins`, adminsRouter)


//Connecting to Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'cake_fairyDB'
})
    .then(() => {
        console.log('Database Connection is ready..')
    })
    .catch((err) => {
        console.log(err);
    })

app.listen(3000, () => {
    // console.log(api);
    console.log("Server is listening on http://localhost:3000");
})



