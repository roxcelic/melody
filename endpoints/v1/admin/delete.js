const express = require('express');
const utils = require('../../../utils');
const router = express.Router();

router.post('/admin/deleteUpload', utils.myLogger, async (req, res) => {
    let {text} = req.body;
    let status = "succesfull";

    try {
        console.log(text.fileName)
        utils.deleteDataFile(`/uploads/${text.fileName}`, "");
    } catch (e) {
        status = 'failed';
    }

    res.json({
        status
    });
});

module.exports = router;