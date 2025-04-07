// variables
let dataPath = './house/'

// imports
const { makefolder } = require(`${dataPath}test`);
const { readDataFile, writeDataFile, deleteDataFile, getPaths } = require(`${dataPath}files`);
const { fetchUserPosts } = require(`${dataPath}bsky`);
const { getUserInfo } = require(`${dataPath}discord`);
const { getCurrentlyPlaying, parseSpotifyData } = require(`${dataPath}spotify`);
const { myLogger, rateIp } = require(`${dataPath}log`);

// export functions
module.exports = {
    makefolder,
    readDataFile, writeDataFile, deleteDataFile, getPaths,
    fetchUserPosts,
    getUserInfo,
    getCurrentlyPlaying, parseSpotifyData,
    myLogger, rateIp
}