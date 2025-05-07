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
    try {
        const imagePath = `${utils.getDataPath()}wallpaper`;
        if (fs.existsSync(imagePath)){
            res.setHeader('Content-Type', 'image/png');
            res.sendFile(imagePath);
        } else {
            res.send(null);
        }
    } catch (e) {
        res.status(500).send('Internal Server Error');
    }
});
  

// upload status image
router.post('/admin/wallpaper/upload', utils.myLogger, upload.single('image'), async (req, res) => {
    try {
        let status = "succesfull";

        res.json({
            status
        });
    } catch (e) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;