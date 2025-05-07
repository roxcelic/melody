const express = require('express');
const marked = require('marked');
const utils = require('../../utils');
const router = express.Router();

router.get('/blog', async (req, res) => {
    try {
        let method = req.query.method || 0;
        let currentData = {
            message: await utils.readDataFile(`/blog/${req.query.post}`, ".md")
        };
    
        if (method == 1) {
            currentData.message = marked.parse(currentData.message);
        }
    
        res.json(currentData);
    } catch (e) {
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;