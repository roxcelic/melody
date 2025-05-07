const express = require('express');
const utils = require('../../../../utils');
const router = express.Router();
const fs = require('fs');

router.get('/chat/filter/add', utils.myLogger, async (req, res) => {
    try {
        let filter = await utils.readDataFile('filter');
        filter = filter != "empty" ? filter: [];
    
        let word = req.query.word;
    
        if (!filter.includes(word)){
            filter.push(word)
        }
    
        utils.writeDataFile('filter', filter);
    
        res.json({status: "succesfull"});
    } catch (e) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;