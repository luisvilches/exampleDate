const config = require("../settings");
const moment = require("moment");
const jwt = require("jwt-simple");

exports.createTokens = (user) => {
    let payload = {
        sub: user._id,
        iat: '',//moment().unix(),
        exp: '',//moment().add(14, 'days').unix(),
        username: user.name,
    };

    return jwt.encode(payload, config.SERVER.security.jwt_secret_key);
};