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

let trustedIps = async function () {
    return await readDataFile("trustedIps");
}

const rateIp = async function (req, res, next) {
    // ip grabber, i would never re-use code
    let clientIP = req.headers["x-forwarded-for"] || req.ip;
    clientIP = clientIP.startsWith("::ffff:") ? clientIP.substring(7) : clientIP;

    let splitIP = clientIP.split(".");

    // ip check, again id never re-use code
    let ips = await trustedIps();
    if (splitIP[0] == 100 || splitIP[0] == 127  || ips.includes(clientIP)){
        return next();
    } else {
        return limiter(req, res, next);
    }
}

const myLogger = async function (req, res, next) {
    let currentData = await readDataFile("data") || {ips: []};
    currentData = currentData != "empty" ? currentData : [];

    // ip grabber
    let clientIP = req.headers["x-forwarded-for"] || req.ip;
    clientIP = clientIP.startsWith("::ffff:") ? clientIP.substring(7) : clientIP;

    data = {
        ip: clientIP,
        time: new Date(),
        path: req.originalUrl,
        succefull: false,
        access: "normal"
    }

    let splitIP = clientIP.split(".");

    let ips = await trustedIps();
    if (splitIP[0] == 100 || splitIP[0] == 127  || ips.includes(clientIP)){
        data.succefull = true;
        next();
    } else {
        res.json({
            error: "you aint allowed to see this"
        });
    }

    writeDataFile("data",currentData);
}

const TrueLogger = async function (req, res, next) {
    let currentData = await readDataFile("data") || {ips: []};

    // ip grabber
    let clientIP = req.headers["x-forwarded-for"] || req.ip;
    clientIP = clientIP.startsWith("::ffff:") ? clientIP.substring(7) : clientIP;

    data = {
        ip: clientIP,
        time: new Date(),
        path: req.originalUrl,
        succefull: false,
        access: "true"
    }

    let splitIP = clientIP.split(".");

    if (splitIP[0] == 100 || splitIP[0] == 127){
        data.succefull = true;
        next();
    } else {
        res.json({
            error: "you aint allowed to see this"
        });
    }

    currentData.push(data);
    writeDataFile("data",currentData);
}

const IsAdmin = async function (req, res) {
    // ip grabber, i would never re-use code squared
    let clientIP = req.headers["x-forwarded-for"] || req.ip;
    clientIP = clientIP.startsWith("::ffff:") ? clientIP.substring(7) : clientIP;

    let splitIP = clientIP.split(".");

    // ip check, again id never re-use code squared
    let ips = await trustedIps();

    return (splitIP[0] == 100 || splitIP[0] == 127  || ips.includes(clientIP))
}

const IsTrueAdmin = async function (req, res) {
    // ip grabber, i would never re-use code cubed
    let clientIP = req.headers["x-forwarded-for"] || req.ip;
    clientIP = clientIP.startsWith("::ffff:") ? clientIP.substring(7) : clientIP;

    let splitIP = clientIP.split(".");

    // ip check, again id never re-use code cubed
    return (splitIP[0] == 100 || splitIP[0] == 127)
}

module.exports = {rateIp, myLogger, TrueLogger, IsAdmin, IsTrueAdmin}