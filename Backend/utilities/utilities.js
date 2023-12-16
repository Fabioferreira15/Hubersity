
let jwt = require('jsonwebtoken');

let secret = 'aB&5*pRq#7';

const generateToken = (user,callback) => {
    let token = jwt.sign({
        data: user

    }, secret, { expiresIn: '24h' });
    return callback(token);
};


const verifyToken = (token,callback) => {
    if(!token){
        return callback(false)
    }
    jwt.verify(token.replace("Bearer ",""), secret, function(err, decoded) {
        console.log(decoded);
        if(err){
            return callback(false)
        }else{
            return callback(true)
        }
    })
}

exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
