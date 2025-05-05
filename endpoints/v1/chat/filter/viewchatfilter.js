const express = require('express');
const utils = require('../../../../utils');
const router = express.Router();
const fs = require('fs');

router.get('/chat/filter/view', utils.myLogger, async (req, res) => {
    let filter = await utils.readDataFile('filter');

    res.json(filter);
});

module.exports = router;