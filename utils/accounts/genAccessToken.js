const crypto = require('crypto');

const { readProfileFile } = require('../files/readProfileFile');
const { editProfileFile } = require('../files');

async function genAccessToken(id, expiration = null) {
    // expiration
    let today = new Date();
    if (expiration == null) expiration = today.setMonth(today.getMonth() + 6);
    let expirationDate = new Date(expiration);

    // token
    let token = crypto.randomBytes(64).toString('hex');

    // save profile
    let profileData = await readProfileFile(id, "auth");
    let accessTokens = profileData.accessTokens || [];

    accessTokens.push([token, expirationDate]);
    profileData.accessTokens = accessTokens;

    editProfileFile(id, "auth", profileData);


    // return
    return token;
}

module.exports = {genAccessToken}