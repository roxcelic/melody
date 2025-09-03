function findIp(req, res) {
    return req.headers["x-forwarded-for"] || req.ip;
}

module.exports = {findIp};