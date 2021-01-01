const jwt = require('jsonwebtoken');

const verifyJwtToken = (req, res, next)=> {
    var token;
    if('authorization' in req.headers)
    token = req.headers['authorization'].split(' ')[1];

    if(!token){
        return res.status(403).send(({auth: false, message: 'no token provided.'}));
    }else{
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded)=> {
            if(error)
            return res.status(212).send({auth: false, message:'token authentication failed.'});
            else{
                req._id = decoded._id;
                next();
            }
        });
    }
}
module.exports = {verifyJwtToken}