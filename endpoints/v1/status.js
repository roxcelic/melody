const express = require('express');
const utils = require('../../utils');
const router = express.Router();

router.get('/status', async (req, res) => {
    let currentData = await utils.readDataFile("status") || {};

    res.json(currentData);
});

module.exports = router;