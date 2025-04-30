const express = require('express');
const utils = require('../../../utils');
const router = express.Router();

router.get('/trueAdmin/viewTrustedIps', utils.TrueLogger, async (req, res) => {
    let ips = await utils.readDataFile("trustedIps");

    res.json({
        ips
    });
});

module.exports = router;