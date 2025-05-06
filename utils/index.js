// variables
let dataPath = './house/'

// imports
const { makefolder } = require(`${dataPath}test`);
const { readDataFile, writeDataFile, deleteDataFile, getPaths, getDataPath } = require(`${dataPath}files`);
const { fetchUserPosts } = require(`${dataPath}bsky`);
const { getUserInfo } = require(`${dataPath}discord`);
const { getCurrentlyPlaying, parseSpotifyData } = require(`${dataPath}spotify`);
const { myLogger, TrueLogger, rateIp, IsAdmin, IsTrueAdmin } = require(`${dataPath}log`);
const { newChatId } = require(`${dataPath}chat`);
const { CheckPost } = require(`${dataPath}post`);

// export functions
module.exports = {
    makefolder,
    readDataFile, writeDataFile, deleteDataFile, getPaths, getDataPath,
    fetchUserPosts,
    getUserInfo,
    getCurrentlyPlaying, parseSpotifyData,
    myLogger, TrueLogger, rateIp, IsAdmin, IsTrueAdmin,
    newChatId,
    CheckPost
}