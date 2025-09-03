const { genAccessToken } = require('./genAccessToken');
const { findIp } = require('./findIp');
const { profileFolderExists, downloadPfp } = require('../files');
const { editAccountData } = require('./editAccountData');
const {config} = require("../../config");

const logIn = async function (req, res, id, username, pfp, website = "https://roxcelic.love", bio = "hi im a new user", color = "#fff") {
    if (! await profileFolderExists(id)) {
        try {
            let accountData = [
                ["username", username],
                ["website_link", website],
                ["bio", bio],
                ["color", color]
            ];

            if(pfp != undefined) downloadPfp(pfp, id);
            await editAccountData(id, accountData);
        } catch (e) {
            console.log(e);
            console.log(`failed to download profile picture`);
        }
    }

    // login
    res.cookie('username', id, {
        maxAge: config.system.loginDuration, 
        httpOnly: true,
        sameSite: 'none',
        secure: true
    });
    res.cookie('token', await genAccessToken(id), {
        maxAge: config.system.loginDuration, 
        httpOnly: true,
        sameSite: 'none',
        secure: true
    })

    console.log(req.cookies.username);


    // log 
    console.log(`${findIp(req, res)} logged in as ${id} on ${new Date()}`);

    // remove old tokens
    // let profileData = await readDataFile(id, "auth");
    // let finalAccessTokens = [];
    // let accessTokens = profileData.accessTokens || [];
    
    // accessTokens.forEach(token => {
    //     if ( (new Date(token[1]) - today) > 0)  finalAccessTokens.push(token);
    //     else console.log(`removed expired token for user ${id}`);
    // });
    // profileData.accessTokens = finalAccessTokens;
    // editProfileFile(req.session.username, "auth", profileData);
}

module.exports = {logIn}