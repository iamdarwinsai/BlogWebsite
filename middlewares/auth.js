const { validateToken } = require("../authentication/auth");

function checkForCookie(cookieName){
    return (req,res,next)=>{
        const tokenValue=req.cookies[cookieName];
        if(!tokenValue) return next();

        try {
            const userPayload=validateToken(tokenValue);
            req.user=userPayload
        } catch (error) {
            return next()
        }
        return next();
    }
}   

module.exports={
    checkForCookie
}