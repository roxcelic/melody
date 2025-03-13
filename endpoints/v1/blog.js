const express = require('express');
const utils = require('../../utils');
const router = express.Router();

router.get('/status', async (req, res) => {
    let currentData = await utils.readDataFile(`/blog/${req.query.post}.md`) || {};

    res.json(currentData);
});
module.exports = router;