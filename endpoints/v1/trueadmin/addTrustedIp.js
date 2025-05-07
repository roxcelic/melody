const express = require('express');
const utils = require('../../../utils');
const router = express.Router();

router.get('/trueAdmin/addTrustedIp', utils.TrueLogger, async (req, res) => {
    try {
        let ips = await utils.readDataFile("trustedIps");
        ips = ips == "empty" || ips == {} ? [] : ips;
    
        if (!ips.includes(req.query.Ip) && Array.isArray(ips) && req.query.Ip){
            ips.push(req.query.Ip);
    
            await utils.writeDataFile("trustedIps", ips);
        }
    
        res.json({
            ips
        });
    } catch (e) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;