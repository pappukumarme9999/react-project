import { verifyToken } from "../verification/tokenVerification.js";
import "../controller/book.controller.js";
import express from "express";
import { body } from "express-validator";
import multer from "multer";
import {
  addBook,
  saveProduct,
  permissionAllowed,
  removeBook,
  TopBooks,
  bookList,
  DonateBookList,
  searchByCategoryId,
  TotalPendingBook,
  searchByAuthor,
  searchByBookName,
  viewByUserId,
  searchByKeyWord,
  updateBook,
  TotalBook,
  searchByuserId,
  price,
  donetors,
} from "../controller/book.controller.js";
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/images"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });
// Logging middleware to confirm route entry
router.use((req, res, next) => {
  console.log(`Received request in book.router: ${req.method} ${req.originalUrl}`);
  next();
});
router.post(
  "/addBook",
  upload.single("photos"),
  [
    body("name").notEmpty().withMessage("Book Name Required"),
    body("author").notEmpty().withMessage("Author is required"),
    body("language").notEmpty().withMessage("Language is required"),
    body("price").notEmpty().withMessage("Price is required"),
    body("edition").notEmpty().withMessage("Edition is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("userId").notEmpty().withMessage("User ID is required"),
    body("cityId").notEmpty().withMessage("City ID is required"),
    body("pincode").notEmpty().withMessage("Pincode is required"),
    body("categoryId").notEmpty().withMessage("Category ID is required"),
    body("publicationDate").notEmpty().withMessage("Publication Date is required")
],
(req, res, next) => {
  console.log("Entering /book/add route"); // Log entry to route
  console.log("File received:", req.file); // Log file info
  next();
},
addBook
);

router.post("/saveAll", saveProduct);
router.get("/topBooks", TopBooks);
router.get("/list", bookList);
router.get("/totalbook", TotalBook);
router.get("/freeBookList", DonateBookList);
router.put("/removeBook/book/:id", removeBook);
router.post("/searchbyAuthor", searchByAuthor);
router.post("/searchByCategoryId", searchByCategoryId);
router.get("/searchByBookName/:name", searchByBookName);
router.post("/byuserId", viewByUserId);
router.post("/searchByKeyWord", searchByKeyWord);
router.post("/update-book", upload.single("profile"), updateBook);
router.get("/totalpendingbook", TotalPendingBook);
router.post("/serachByuserId", searchByuserId);
router.post("/price", price);
router.get("/donetors", donetors);
router.put("/change/permissionAllowed/:id", permissionAllowed);
export default router;