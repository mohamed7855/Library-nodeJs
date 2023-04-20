const express = require("express");
const app = express();
require("../DB/connection.js");

app.use(express.json()); //===> buffer Data
app.use(express.urlencoded({ extended: true })); //==>encoding when go live or uploading files

const cors = require("cors");
app.use(cors());

const path = require("path");
app.use(express.static(path.join(__dirname, "../public")));

const userRouter = require("./routes/user.routes.js");
app.use("/api/user", userRouter);

const bookRouter = require("./routes/book.routes.js");
app.use("/api/book", bookRouter);

app.all("*", (req, res) => {
  res
    .status(404)
    .send({ apiStatus: false, data: null, message: "page not found" });
});

module.exports = app;
