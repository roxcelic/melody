const express = require('express');
const utils = require('../../../utils');
const router = express.Router();

router.get('/admin/', utils.myLogger, async (req, res) => {
    res.json({
        status: "admin"
    });
});

module.exports = router;