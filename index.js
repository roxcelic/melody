// requirements
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const utils = require('./utils');

require('dotenv').config()

// env
let port = process.env.PORT || 3000;

// makes the data folder if it doesnt exist
if (!fs.existsSync("data")) fs.mkdirSync("data");

// define app
const app = express();

// middleware
app.use(cors());
app.use(utils.rateIp);
app.use(express.json()); 
app.set('trust proxy', 1);

// frontends
app.get('/', (req, res) => {res.redirect('/frontends');});
app.use('/frontends', utils.myLogger, express.static('./frontends'));

// uploads
app.use('/media/', express.static('./data/uploads'));

// import V1 of the api
const apiRoutes = require('./endpoints/v1');
app.use('/api/', apiRoutes);

// 404 page 
app.get('*', function(req, res){
    res.status(404).redirect("/frontends/");
});

/* test
uitls.writeDataFile('test', 'hi');
console.log(uitls.readDataFile('test'));
*/

// boot
app.listen(port, () => {
    console.log(`http://localhost:${port}/`)
})