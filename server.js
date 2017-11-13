const express = require('express');
const app = express();
const router = express.Router();
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');  
const bodyParser = require('body-parser');
const config = require('./config/database');
//
const productRouter=require('./router/product.router')(router);
const cartRouter=require('./router/cart.router')(router);
//start connect database
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('Could Not connect to database : ', err);
    }
    else {
        console.log('Connect to database : ' + config.db);
    }
});

//start bodyParse and session
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));
app.use(express.static(__dirname + '/my-app/dist/'));
//default
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/my-app/dist/index.html'));
});
//
app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use('/products', productRouter);
app.use('/carts', cartRouter);
//
var server = app.listen(8080, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});
