const express = require('express');
const utils = require('../../../utils');
const router = express.Router();

router.post('/admin/deleteUpload', utils.myLogger, async (req, res) => {
    try {
        let {text} = req.body;
        let status = "succesfull";
    
        try {
            utils.deleteDataFile(`/uploads/${text.fileName}`, "");
        } catch (e) {
            status = 'failed';
        }
    
        res.json({
            status
        });
    } catch (e) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;