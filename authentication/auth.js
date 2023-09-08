const jwt = require('jsonwebtoken');


const secret="batman";
function generateToken(user){
    const payload={
        _id:user._id,
        fullName:user.fullName,
        email:user.email,
    }

    const token=jwt.sign(payload,secret);

    return token;
}

function validateToken(token){
    const user=jwt.verify(token,secret);
    return user;
}

module.exports={
    generateToken,validateToken
}