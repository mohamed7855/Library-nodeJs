const router = require("express").Router();
const bookController = require("../controller/book.controller");
const auth = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/isAdmin");

router.get("/AllBooks", bookController.getAll);
router.get("/:id", bookController.getBook);
router.post("/add", auth, isAdmin, bookController.addBook);
router.patch("/:id", auth, isAdmin, bookController.editBook);
router.delete("/:id", auth, isAdmin, bookController.deleteBook);
router.delete("/", auth, isAdmin, bookController.delAll);

// ========================================= Borrow Function required ======================
module.exports = router;
