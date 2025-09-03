// variables
let dataPath = "./accounts/";

// imports
const { isLoggedIn, isLoggedInSafe, adminControl, adminLock } = require(`${dataPath}loggedIn.js`);
const { logIn } = require(`${dataPath}login.js`);
const { genAccessToken } = require(`${dataPath}genAccessToken.js`);
const { findIp } = require(`${dataPath}findIp.js`);
const { editAccountData } = require(`${dataPath}editAccountData.js`);
const { isAdmin } = require(`${dataPath}isAdmin.js`);

// exports
module.exports = {
    isLoggedIn, isLoggedInSafe, adminControl, adminLock,
    logIn,
    genAccessToken,
    findIp,
    editAccountData,
    isAdmin
}