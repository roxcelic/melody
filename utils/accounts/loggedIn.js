// this has basically turned into a middleware file so i should rename this at some point in the future

const { status } = require('express/lib/response');
const { isAdmin } = require("./isAdmin");
const { readProfileFile, editProfileFile } = require('../files');

const rateLimit = require('express-rate-limit');    

let max = parseInt(process.env.RATELIMIT || 120);
const limiter = rateLimit({
    windowMs: 30 * 1000,
    max: max,
    standardHeaders: true,
    legacyHeaders: false,
    message: "why"
});

// middleware to check if the user is logged in
const isLoggedIn = async function (req, res, next) {
    if (await isLoggedInSafe(req, res)) {
        next();
    }
    else res.json({
        status: "unauthorised",
        message: "you are trying to access data which requires an account"
    });
}

// a simple function to check if the user is an admin
const adminControl = async function (req, res, next) {
    if (await isAdmin(req.cookies.username || ""))  return next();
    else return limiter(req, res, next);
}

const adminLock = async function (req, res, next) {
    if (await isAdmin(req.cookies.username)) next();
    else res.json({
        status: "unauthorised",
        message: "you are trying to access admin locked data"
    });
}

// a simple function to check if the user is logged in
const isLoggedInSafe = async function (req, res) {
    let final = false;
    
    // username check
    if (req.cookies.username == undefined) return false;
    
    let profileData = await readProfileFile(req.cookies.username, "auth");

    // token check
    let today = new Date();
    let accessTokens = profileData.accessTokens || [];
    
    accessTokens.forEach(token => {
        if ( (new Date(token[1]) - today) > 0) {
            if (req.cookies.token == token[0]) {
                final = true;
            }
        }
    });

    // return
    return final;
}

module.exports = {isLoggedIn, isLoggedInSafe, adminControl, adminLock};