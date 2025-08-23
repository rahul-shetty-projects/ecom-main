const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ type: "Invalid", message: "Access denied. No token provided." });
    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        if (decoded.userEmail == 'admin@gmail.com') {
            return res.status(401).json({ type: "Invalid", message: "Admin Account Access revoked" });
        }
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(401).json({ type: "Invalid", message: "Session Timeout" });
    }
}


module.exports = auth;