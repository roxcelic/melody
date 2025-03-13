const express = require('express');
const utils = require('../../utils');
const router = express.Router();

router.get('/', async (req, res) => {
    res.json({
        status: "online"
    });
});

module.exports = router;