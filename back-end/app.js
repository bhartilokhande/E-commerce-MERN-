const express = require('express');
const app = express();
const mongoose = require('mongoose');

//routers
const authRoutes = require('./src/routes/auth');
const adminRoutes = require('./src/routes/admin/auth');
const categoryRoutes = require('./src/routes/category');
const productRoutes = require('./src/routes/product');
const cartRoutes = require('./src/routes/cart');




//mongoDB connection
mongoose.connect('mongodb://localhost:27017/ecommerce',
{
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database Connected");
})




// //middlerware
// app.use(bodyParser.urlencoded({extends:false}));
app.use(express.json());
app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes)







module.exports = app;




