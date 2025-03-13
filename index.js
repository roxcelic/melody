// requirements
const express = require('express');
const fs = require('fs');
const NodeCache = require( "node-cache" );
const cors = require('cors');
const rateLimit = require('express-rate-limit');    
const utils = require('./utils');

require('dotenv').config()

// env
let port = process.env.PORT || 3000;

// makes the data folder if it doesnt exist
if (!fs.existsSync("data")) fs.mkdirSync("data");

// cache storage
const myCache = new NodeCache();

// rate limiting
const limiter = rateLimit({
    windowMs: 30 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
});


// define app
const app = express();

// middleware
app.use(cors());
app.use(limiter);
app.use(express.json()); 
app.set('trust proxy', 1);

// frontends
app.use('/frontends/', utils.myLogger, express.static('./frontends'));

// uploads
app.use('/media/', express.static('./data/uploads'));

// import V1 of the api
const apiRoutes = require('./endpoints/v1');
app.use('/api/', apiRoutes);

/* test
uitls.writeDataFile('test', 'hi');
console.log(uitls.readDataFile('test'));
*/

// boot
app.listen(port, () => {
    console.log(`http://localhost:${port}/`)
})