const express = require('express');
const utils = require('../../../utils');
const router = express.Router();

// arr = arr.filter(e => e !== 'B'); 

router.get('/trueAdmin/removeTrustedIp', utils.TrueLogger, async (req, res) => {
    let ips = await utils.readDataFile("trustedIps");
    ips = ips == "empty" ? [] : ips;

    if (ips.includes(req.query.Ip) && Array.isArray(ips) && req.query.Ip){
        ips = ips.writeDataFile(e => e !== req.query.Ip);
    }

    await utils.writeDataFile("trustedIps", ips);

    res.json({
        ips
    });
});

module.exports = router;