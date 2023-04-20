const multer = require("multer");
const uploadImg = multer({ dest: "public/" });

module.exports = uploadImg;
