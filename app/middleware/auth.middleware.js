const { resHandler } = require("../helper");
const { verify } = require("jsonwebtoken");
const userModel = require("../../DB/models/user.model");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("bearer ", "");
    const decodedToken = verify(token, process.env.JWTKEY);
    const userData = await userModel.findOne({
      _id: decodedToken._id,
      "tokens.token": token,
    });
    if (!userData) throw new Error("unauth");
    req.user = userData;
    req.token = token;
    next();
  } catch (e) {
    resHandler(res, 500, false, e, "unauthorized");
  }
};

module.exports = auth;
