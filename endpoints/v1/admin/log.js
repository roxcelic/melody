const express = require('express');
const utils = require('../../../utils');
const router = express.Router();

router.get('/admin/viewlog', utils.myLogger, async (req, res) => {

    let data = await utils.readDataFile("data");

    res.json({
        status: data.ips
    });
});

module.exports = router;