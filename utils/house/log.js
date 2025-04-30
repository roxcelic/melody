// variables
let dataPath = './'

// imports
const { readDataFile, writeDataFile, deleteDataFile } = require(`${dataPath}files`);
const rateLimit = require('express-rate-limit');    


let max = parseInt(process.env.RATELIMIT || 30);
console.log(max);

const limiter = rateLimit({
    windowMs: 30 * 1000,
    max: max,
    standardHeaders: true,
    legacyHeaders: false,
    message: "why"
});

const myLogger = async function (req, res, next) {
    let currentData = await readDataFile("data") || {ips: []};

    // ip grabber
    let clientIP = req.headers["x-forwarded-for"] || req.ip;
    clientIP = clientIP.startsWith("::ffff:") ? clientIP.substring(7) : clientIP;

    data = {
        ip: clientIP,
        time: new Date(),
        path: req.originalUrl,
        succefull: false
    }

    let splitIP = clientIP.split(".");

    let trustedIps = process.env.TRUSTED_IPS.split(",");

    console.log(splitIP);

    if (splitIP[0] == 100 || splitIP[0] == 127  || trustedIps.includes(clientIP)){
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

const rateIp = async function (req, res, next) {
    // ip grabber, i would never re-use code
    let clientIP = req.headers["x-forwarded-for"] || req.ip;
    clientIP = clientIP.startsWith("::ffff:") ? clientIP.substring(7) : clientIP;

    let splitIP = clientIP.split(".");

    let trustedIps = process.env.TRUSTED_IPS.split(",");

    // ip check, again id never re-use code
    if (splitIP[0] == 100 || splitIP[0] == 127  || trustedIps.includes(clientIP)){
        return next();
    } else {
        return limiter(req, res, next);
    }
}

module.exports = {myLogger, rateIp}