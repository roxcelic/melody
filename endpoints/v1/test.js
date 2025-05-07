const express = require('express');
const utils = require('../../utils');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.json({
            status: "online"
        });
    } catch (e) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;