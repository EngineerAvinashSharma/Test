const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const app = express();
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order.js');


//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


//Db Connection 
mongoose.connect(config.mongoUri,
    { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:false})
    .then(() => {
        console.log("DataBase Connected");
    })
    .catch((error) => {
        console.log(error);
    });


//routes
app.use('/user', userRoutes);
app.use('/order', orderRoutes);


//Routes
app.get('/', (req, res) => {
    res.status(200).send('Get Request SuccessFul');
});


//Application Listen 
const port = config.port || process.env.PORT;
app.listen(port, () => {
    console.log(`App Listening On Port Number ${port}`);
})
