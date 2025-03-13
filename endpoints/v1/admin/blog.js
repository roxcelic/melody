const express = require('express');
const utils = require('../../../utils');
const router = express.Router();

router.post('/admin/blog/edit', utils.myLogger, async (req, res) => {
    let status = "succesfull";

    try {
        let text = req.body;

        let currentData = await utils.readDataFile(`/blog/${text.fileName}.md`) || {};
    
        currentData = text.message;
        utils.writeDataFile(`/blog/${text.fileName}.md`, currentData);
    } catch (e) {
        status = "failed";
    }

    res.json({
        status
    });
});

router.post('/admin/blog/delete', utils.myLogger, async (req, res) => {
    let text = req.body;
    let status = "succesfull";

    try {
        utils.deleteDataFile(`/blog/${text.fileName}.md`);
    } catch (e) {
        status = 'failed';
    }

    res.json({
        status
    });
});

module.exports = router;