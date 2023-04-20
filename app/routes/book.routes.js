const router = require("express").Router();
const bookController = require("../controller/book.controller");
const auth = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/isAdmin");

router.post("/add", auth, isAdmin, bookController.addBook);
router.get("/AllBooks", bookController.getAll);
router.patch("/:id", auth, isAdmin, bookController.editBook);
router.delete("/:id", auth, isAdmin, bookController.deleteBook);
router.delete("/", auth, isAdmin, bookController.delAll);
router.get("/search",bookController.find)
// ========================================= Borrow Function required ======================
router.post('/borrow/:id',auth,bookController.borrow)

module.exports = router;
