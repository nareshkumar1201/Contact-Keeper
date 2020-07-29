const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  //Get token header- req.header('x-auth-token');

  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(400).json({ msg: "No token authorization denied" });
  }

  try {
    //verify token -- on verify we get only payload (not header,secret)
    const payload = jwt.verify(token, config.get("jwtSecret"));
    console.log("payloadd token", payload);
    req.user = payload.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};
