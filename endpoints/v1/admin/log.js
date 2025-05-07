const express = require('express');
const utils = require('../../../utils');
const router = express.Router();

router.get('/admin/viewlog', utils.myLogger, async (req, res) => {
    try {
        let data = await utils.readDataFile("data");

        res.json({
            status: data
        });
    } catch (e) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;