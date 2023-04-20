const userModel = require("../../DB/models/user.model");
const Helper = require("../helper");
class User {
  static register = async (req, res) => {
    try {
      const userData = new userModel(req.body);
      await userData.save();
      Helper.resHandler(res, 200, true, userData, "added Successfully");
    } catch (error) {
      Helper.resHandler(res, 500, false, error.message, "Error Register");
    }
  };

  static profile = async (req, res) => {
    try {
      const userData = await userModel.findById(req.params.id);

      Helper.resHandler(res, 200, true, userData, "Profile");
    } catch (error) {
      Helper.resHandler(res, 500, false, error.message, "Error Profile");
    }
  };

  static editProfile = async (req, res) => {
    try {
      const {id}=req.params
      console.log(id);
      const userData = await userModel.findById(id);
      for (let key in req.body) {
        userData[key] = req.body[key];
      }
      await userData.save();
      Helper.resHandler(res, 200, true, userData, "users fetched");
    } catch (e) {
      Helper.resHandler(res, 500, false, e.message, "Error fetch data");
    }
  };

  static login = async (req, res) => {
    try {
      const userData = await userModel.loginMe(
        req.body.email,
        req.body.password
      );
      const token = await userData.generateToken();
      Helper.resHandler(res, 200, true, { userData, token }, "user login done");
    } catch (error) {
      Helper.resHandler(res, 500, false, error.message, "Error Login");
    }
  };

  static logout = async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((t) => t.token != req.token);
      await req.user.save();
      Helper.resHandler(res, 200, true, "done", "logged out");
    } catch (error) {
      Helper.resHandler(res, 500, false, error.message, "Error Logout");
    }
  };

  static allUsers = async (req, res) => {
    try {
      const userData = await userModel.find();

      Helper.resHandler(res, 200, true, userData, "All Users");
    } catch (error) {
      Helper.resHandler(res, 500, false, error.message, "Error All Users");
    }
  };

  static updatePimg = async (req, res) => {
    try {
      const fs = require("fs");
      const extentionImg = req.file.originalname.split(".").pop();
      const newNameImg = req.file.filename + "." + extentionImg;
      fs.renameSync(req.file.path, "public/" + newNameImg);
      req.user.image = process.env.APPURL + newNameImg;
      await req.user.save();
      Helper.resHandler(res, 200, true, req.user, "Done upload Img");
    } catch (error) {
      Helper.resHandler(res, 500, false, error.message, "Error upload Img");
    }
  };
}
module.exports = User;
