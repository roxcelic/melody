// variables
let dataPath = './'

// imports
const { readDataFile, writeDataFile, deleteDataFile } = require(`${dataPath}files`);

const myLogger = async function (req, res, next) {
    let currentData = await readDataFile("data") || {ips: []};

    // ip grabber
    let clientIP = req.headers["x-forwarded-for"] || req.ip;
    clientIP = clientIP.startsWith("::ffff:") ? clientIP.substring(7) : clientIP

    data = {
        ip: clientIP,
        time: new Date(),
        path: req.originalUrl,
        succefull: false
    }

    let splitIP = clientIP.split(".");

    if (splitIP[0] == 100 || splitIP[0] == 127 ){
        data.succefull = true;
        next();
    } else {
        res.json({
            error: "you aint allowed to see this"
        });
    }

    currentData.ips.push(data);
    writeDataFile("data",currentData);
}

module.exports = {myLogger}