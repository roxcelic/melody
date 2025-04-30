// variables
let dataPath = './house/'

// imports
const { makefolder } = require(`${dataPath}test`);
const { readDataFile, writeDataFile, deleteDataFile, getPaths, getDataPath } = require(`${dataPath}files`);
const { fetchUserPosts } = require(`${dataPath}bsky`);
const { getUserInfo } = require(`${dataPath}discord`);
const { getCurrentlyPlaying, parseSpotifyData } = require(`${dataPath}spotify`);
const { myLogger, rateIp, IsAdmin } = require(`${dataPath}log`);
const { newChatId } = require(`${dataPath}chat`);

// export functions
module.exports = {
    makefolder,
    readDataFile, writeDataFile, deleteDataFile, getPaths, getDataPath,
    fetchUserPosts,
    getUserInfo,
    getCurrentlyPlaying, parseSpotifyData,
    myLogger, rateIp, IsAdmin,
    newChatId
}