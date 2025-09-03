const express = require('express');
const router = express.Router();

const { isLoggedInSafe, editAccountData, isAdmin} = require("../../utils/accounts");

router.get('/', async (req, res) => {
    if (req.cookies.test == undefined) res.cookie('test', 0,  { maxAge: 900000, httpOnly: true });
    else res.cookie('test', parseInt(req.cookies.test) + 1,  { maxAge: 900000, httpOnly: true });

    try {
        res.json({
            status: "online",
            session: req.session.test,
            cookie: req.cookies.test,
            username: req.cookies.username,
            loggedIn: await isLoggedInSafe(req, res),
            admin: await isAdmin(req.cookies.username)
        });
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;