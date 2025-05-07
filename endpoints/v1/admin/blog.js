const express = require('express');
const utils = require('../../../utils');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/admin/blog/edit', utils.myLogger, async (req, res) => {
    try {
        let status = "succesfull";

        let blogPath = path.join(__dirname, `../../../data/blog`)
        if (!fs.existsSync(blogPath)) fs.mkdirSync(blogPath);
    
        try {
            let {text} = req.body;
    
            let currentData = await utils.readDataFile(`/blog/${text.fileName}`) || {};
        
            currentData = text.message;
            utils.writeDataFile(`/blog/${text.fileName}`, currentData, ".md", false);
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

router.post('/admin/blog/delete', utils.myLogger, async (req, res) => {
    try {
        let {text} = req.body;
        let status = "succesfull";
    
        try {
            utils.deleteDataFile(`/blog/${text.fileName}`, ".md");
        } catch (e) {
            status = 'failed';
        }
    
        res.json({
            status
        });
    } catch (e) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;