const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../settings');

exports.auth = (req,res,next) => {
    console.log("AUTH",req.headers.authorization)
    if (!req.headers.authorization) {
        return res.status(403).send({message: 'Error de auntenticación'})
    }

    let token = req.headers.authorization.split(" ")[1];
    let payload = jwt.decode(token,config.SERVER.security.jwt_secret_key);

    /*if (payload.exp <= moment().unix()) {
        return res.status(401).send({message: 'Session expirada'})
    }*/

    req.user = payload.sub;
    req.username = payload.username;
    //console.log(`user: ${req.username} ID: ${req.user}`)
    next()
}