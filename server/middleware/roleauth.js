const jwt = require('jsonwebtoken');

function superadminauth(req,res,next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).json({ type: "Invalid", message: "Access denied. No token provided."});
    try{
        const decoded = jwt.verify(token,process.env.JWT_PRIVATE_KEY);
        req.user = decoded;
        if(req.user.userRole != 'super-admin'){
            res.status(405).json({ type: "Invalid", message: "Not Allowed"});
        }else{
            next();
        }
    }catch (ex) {
        res.status(401).json({ type: "Invalid", message: "Session Timeout"});
    }
}

function adminauth(req,res,next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).json({ type: "Invalid", message: "Access denied. No token provided."});
    try{
        const decoded = jwt.verify(token,process.env.JWT_PRIVATE_KEY);
        req.user = decoded;
        if(req.user.userRole != 'admin'){
            res.status(405).json({ type: "Invalid", message: "Not Allowed"});
        }else{
            next();
        }
    }catch (ex) {
        res.status(401).json({ type: "Invalid", message: "Session Timeout"});
    }
}

function institutionauth(req,res,next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).json({ type: "Invalid", message: "Access denied. No token provided."});
    try{
        const decoded = jwt.verify(token,process.env.JWT_PRIVATE_KEY);
        req.user = decoded;
        if(req.user.userRole != 'institution'){
            res.status(405).json({ type: "Invalid", message: "Not Allowed"});
        }else{
            next();
        }
    }catch (ex) {
        res.status(401).json({ type: "Invalid", message: "Session Timeout"});
    }
}

function careercounselorauth(req,res,next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).json({ type: "Invalid", message: "Access denied. No token provided."});
    try{
        const decoded = jwt.verify(token,process.env.JWT_PRIVATE_KEY);
        req.user = decoded;
        if(req.user.userRole != 'career-counselor'){
            res.status(405).json({ type: "Invalid", message: "Not Allowed"});
        }else{
            next();
        }
    }catch (ex) {
        res.status(401).json({ type: "Invalid", message: "Session Timeout"});
    }
}   

module.exports = superadminauth;
module.exports = adminauth;
module.exports = institutionauth;
module.exports = careercounselorauth;