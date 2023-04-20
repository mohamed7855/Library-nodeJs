const { resHandler } = require("../helper");
const { verify } = require("jsonwebtoken");
const userModel = require("../../DB/models/user.model");

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.userType !== "admin") throw new Error("not admin");
    next();
  } catch (e) {
    resHandler(res, 500, false, e.message, "not Admin");
  }
};

module.exports = isAdmin;
