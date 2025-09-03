const express = require('express');
const router = express.Router();

const { adminLock } = require("../../../utils/accounts");
const {readProfileFile, editProfileFile} = require("../../../utils/files");

router.get('/users/:id/admin', adminLock, async (req, res) => {
    try {
        let targetID = req.query.target;
        
        let profileData = await readProfileFile(targetID);
        profileData.admin = !profileData.admin;

        await editProfileFile(targetID, profileData);

        res.json({"status": "succesfull"});
    } catch (e) {
        res.status(e.status).send(e.message);
    }
});

module.exports = router;