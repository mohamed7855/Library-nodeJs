const router = require("express").Router();
const userController = require("../controller/user.controller");
const auth = require("../middleware/auth.middleware.js");
const isAdmin = require("../middleware/isAdmin.js");
const uploadImg = require("../middleware/uploadImg.middleware");

router.patch(
  "/updatePImg",
  auth,
  uploadImg.single("img"),
  userController.updatePimg
);
router.get("/allUsers", auth, isAdmin, userController.allUsers);
router.post("/Sign_up", userController.register);
router.get("/:id", auth, userController.profile);
router.patch("/:id", auth, userController.editProfile);
router.post("/Sign_in", userController.login);
router.post("/Sign_out", auth, userController.logout);

module.exports = router;
