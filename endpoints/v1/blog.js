const express = require('express');
const marked = require('marked');
const utils = require('../../utils');
const router = express.Router();

router.get('/blog', async (req, res) => {
    let method = req.query.method || 0;
    let currentData = {
        message: await utils.readDataFile(`/blog/${req.query.post}`, ".md")
    };

    if (method == 1) {
        console.log(currentData);
        currentData.message = marked.parse(currentData.message);
    }

    res.json(currentData);
});
module.exports = router;