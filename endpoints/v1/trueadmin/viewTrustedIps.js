const express = require('express');
const utils = require('../../../utils');
const router = express.Router();

router.get('/trueAdmin/viewTrustedIps', utils.TrueLogger, async (req, res) => {
    try {
        let ips = await utils.readDataFile("trustedIps");

        res.json({
            ips
        });
    } catch (e) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;