const express = require('express');
const utils = require('../../utils');
const fs = require('fs');
const router = express.Router();

router.get('/paths', async (req, res) => {
    let method = req.query.method || 0;
    let filepaths = await utils.getPaths(method);

    res.json(filepaths);
});

module.exports = router;