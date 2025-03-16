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
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// change status
router.post('/admin/changeStatus', utils.myLogger, async (req, res) => {
    let status = "succesfull";

    try {
        let {text} = req.body;
        let currentData = await utils.readDataFile("status") || {};
    
        currentData.status = text.message;
        currentData.image = text.image;

        console.log(currentData)
        utils.writeDataFile("status", currentData);
    } catch (e) {
        status = "failed";
    }

    res.json({
        status
    });
});

// upload status image
router.post('/admin/upload', utils.myLogger, upload.single('image'), async (req, res) => {
    let status = "succesfull";
    
    res.json({
        status
    });
});

module.exports = router;