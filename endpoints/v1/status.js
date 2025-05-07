const express = require('express');
const utils = require('../../utils');
const router = express.Router();

router.get('/status', async (req, res) => {
    try {
        let currentData = await utils.readDataFile("status") || {};

        res.json(currentData);
    } catch (e) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;