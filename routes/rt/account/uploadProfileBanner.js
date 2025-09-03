const multer  = require('multer')
const express = require('express');
const path = require('path');

const router = express.Router();

const { isLoggedIn } = require("../../../utils/accounts");

// multer shinanigans -- profile picture
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let profilePath = path.join(__dirname, `../../../data/profiles/${req.cookies.username}/`);
        cb(null, profilePath);
    },
    filename: function (req, file, cb) {
        cb(null, "banner");
    }
});

const upload = multer({ 
    limits: {
        fileSize: 8000000
    },
    fileFilter: function(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
            return cb('File must be an image.');
        }
        cb(undefined, true);
    },
    storage 
});


// profile picture
    router.post('/account/uploadBanner', isLoggedIn, upload.single('profile-file'), async (req, res, next) => {
        if (!req.file) {
            console.log(req.file);
            return res.status(400).send('No file uploaded.');
        }
        
        res.json({status: "succesfull"});
    });

module.exports = router;