const express = require('express');
const utils = require('../../utils');
const fs = require('fs');
const router = express.Router();

router.get('/paths', async (req, res) => {
    try {
        let method = req.query.method || 0;
        let filepaths = await utils.getPaths(method);
    
        res.json(filepaths);
    } catch (e) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;