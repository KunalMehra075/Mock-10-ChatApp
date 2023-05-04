const jwt = require("jsonwebtoken")

const Authentication = (req, res, next) => {
    let token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ Message: "Unauthorized, Token not found" })
    }
    jwt.verify(token, process.env.key, (err, decoded) => {
        if (decoded) {
            console.log(decoded.userID)
            next()
        } else {
            return res.status(200).json({ Message: "Token Expired, Please Login Again" });
        }
    })
}
module.exports = Authentication;