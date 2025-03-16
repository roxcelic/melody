const express = require('express');
const utils = require('../../utils');
const router = express.Router();

router.get('/blog', async (req, res) => {
    let method = req.query.method || 0;

    switch (method){
        case 0:
            let currentData = {message: await utils.readDataFile(`/blog/${req.query.post}`, ".md")} || {};
            res.json(currentData);

            break;
    }
});
module.exports = router;