const express = require('express');
const multer = require('multer');
const fs = require('fs');
const utils = require('../../../utils');
const path = require('path');
const router = express.Router();

// multer shinanigans
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, utils.getDataPath());
    },
    filename: function (req, file, cb) {
        cb(null, `wallpaper`);
    }
});

const upload = multer({ storage });

router.get('/wallpaper', (req, res) => {
    const imagePath = `${utils.getDataPath()}wallpaper`;
    
    res.setHeader('Content-Type', 'image/png');
    res.sendFile(imagePath);
});
  

// upload status image
router.post('/admin/wallpaper/upload', utils.myLogger, upload.single('image'), async (req, res) => {

    let status = "succesfull";

    res.json({
        status
    });
});

module.exports = router;