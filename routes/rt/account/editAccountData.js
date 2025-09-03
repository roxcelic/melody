const express = require('express');
const router = express.Router();

const { isLoggedIn, editAccountData } = require("../../../utils/accounts");
const {readProfileFile} = require("../../../utils/files");

router.post('/account/editAccountData', isLoggedIn, async (req, res) => {
    try {
        let editaccount = req.body;
        let account = await editAccountData(req.cookies.username, editaccount);

        if (typeof account == Error) {
            res.status(400).send(account.message);
        } else {
            res.json(await readProfileFile(req.cookies.username));
        }

    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
});

module.exports = router;