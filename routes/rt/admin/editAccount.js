const express = require('express');
const router = express.Router();

const { adminLock } = require("../../../utils/accounts");
const {readProfileFile, editProfileFile} = require("../../../utils/files");

router.post('/admin/edit', adminLock, async (req, res) => {
    try {
        let targetID = req.query.target;
        let targetHeading = req.body.heading;
        let data = req.body.data;

        let profileData = await readProfileFile(targetID, "profile");
        profileData[targetHeading] = data;

        await editProfileFile(targetID, profileData);

        res.json({"status": "succesfull"});
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = router;