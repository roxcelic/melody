const express = require('express');
const multer = require('multer');
const fs = require('fs');
const utils = require('../../../utils');
const path = require('path');
const router = express.Router();

// multer shinanigans
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, utils.makefolder("uploads/"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.originalname.slice(0, file.originalname.length - path.extname(file.originalname).length)}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

// change status
router.post('/admin/changeStatus', utils.myLogger, async (req, res) => {
    try {
        let status = "succesfull";

        try {
            let {text} = req.body;
            let currentData = await utils.readDataFile("status");
            if (currentData == "empty") currentData = {};
        
            currentData.status = text.message;
            currentData.image = text.image;
    
            utils.writeDataFile("status", currentData);
        } catch (e) {
            status = "failed";
        }
    
        res.json({
            status
        });
    } catch (e) {
        res.status(500).send('Internal Server Error');
    }
});

// upload status image
router.post('/admin/upload', utils.myLogger, upload.single('image'), async (req, res) => {
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