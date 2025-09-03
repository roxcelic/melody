// requirements
const express = require('express');
const session = require('express-session')

const cookieParser = require('cookie-parser');
const fs = require('fs');
const cors = require('cors');

// utils
const accountUtils = require('./utils/accounts.js');
const autimation = require('./utils/autimation.js');

// config
const { config } = require('./config.js');
require('dotenv').config()

// env
let port = process.env.PORT || 3000;

// makes the data folder if it doesnt exist
if (!fs.existsSync("data")) fs.mkdirSync("data");

// define app
const app = express();

// cors
let whitelist = [
    'http://localhost:3000', 
    'https://roxcelic.love', 
    'http://localhost:4321', 
    'http://100.116.121.101:4321'
];

let corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(null, true)
    }
  },
  allowedHeaders: ['Content-Type', 'Cross-Origin-Resource-Policy']
}

app.use(cors(corsOptions));

// middleware
app.set('trust proxy', 1);
app.use(cookieParser());
app.use(express.json()); 
app.use(accountUtils.adminControl);

app.use(session({
    secret: 'your-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: true,
        sameSite: 'none'
    }
}));
  

// uploads
app.use('/media/', express.static('./data/uploads'));

// 404 page 

// app.get('*', function(req, res){
//     res.status(404).redirect("/");
// }); -- couldnt tell you why this doesnt work but it doesnt

// import api
console.log("initalising routes...");
const apiRoutes = require('./routes/dynamic');
app.use('/api/', apiRoutes);
console.log("initialised routes.");

// import frontends
app.use('/frontends', express.static('./frontends'));

// boot
app.listen(port, () => {
    console.log(`http://localhost:${port}/`)
});

// chat -- clear on start
if (config.chat.clearOnStart) autimation.clearChat();

// autimated tasks
setInterval(async () => {await autimation.clearChat()}, config.chat.clearRate);