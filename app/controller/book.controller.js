const bookModel = require("../../DB/models/book.model");
const Helper = require("../helper.js");

class Book {
  static addBook = async (req, res) => {
    try {
      const { availableCopies, totalCopies, author, title } = req.body;
      const book = await bookModel.create(req.body);
      Helper.resHandler(res, 200, true, book, "added Successfully");
    } catch (error) {
      Helper.resHandler(res, 500, false, error.message, "Error in add");
    }
  };
  static getAll = async (req, res) => {
    try {
      const books = await bookModel.find();
      Helper.resHandler(res, 200, true, books, "done");
    } catch (error) {
      Helper.resHandler(res, 500, false, error.message, "Error in finding");
    }
  };

  static getBook = async (req, res) => {
    try {
      const bookData = await bookModel.findById(req.params.id);

      Helper.resHandler(res, 200, true, bookData, "bookData fetched");
    } catch (error) {
      Helper.resHandler(res, 500, false, error.message, "Error get book data");
    }
  };

  static editBook = async (req, res) => {
    try {
      const book = await bookModel.findById(req.params.id);
      for (let key in req.body) {
        book[key] = req.body[key];
      }
      await book.save();
      Helper.resHandler(res, 200, true, book, "edited Successfully");
    } catch (error) {
      Helper.resHandler(res, 500, false, error.message, "Error in editing");
    }
  };
  static deleteBook = async (req, res) => {
    try {
      const book = await bookModel.findByIdAndDelete(req.params.id);
      Helper.resHandler(res, 200, true, book, "deleted Successfully");
    } catch (error) {
      Helper.resHandler(res, 500, false, error.message, "Error in deleting");
    }
  };
  static delAll = async (req, res) => {
    try {
      await bookModel.deleteMany();
      Helper.resHandler(res, 200, true, "deleted All Successfully");
    } catch (error) {
      Helper.resHandler(res, 500, false, error.message, "Error in deleting");
    }
  };
}
module.exports = Book;
