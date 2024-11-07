import { request, response } from "express";
import { Book } from "../model/book.model.js";
import { User } from "../model/user.model.js"
import { validationResult } from "express-validator";
import fs from "fs";
import path from "path";

export const saveProduct = async (request, response, next) => {
    try {
        for (let book of request.body.book) {
            await Book.create(book);
        }
        return response.status(200).json({ msg: "Add products Succesfully", status: true })
    } catch (err) {
        return response.status(500).json({ msg: "Internal Server Error", status: false });
    }
}

export const addBook = async (request, response, next) => {
    console.log("Received request to add a book");
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        console.error("Validation errors:", errors.array());
        return response.status(400).json({ errors: errors.array() });
      }
  
      const { name, description, author, price, categoryId, language, edition, publicationDate, userId, cityId, pincode, photos } = request.body;
  
      const newBook = await Book.create({
        name,
        description,
        author,
        price: price || 0,
        categoryId,
        language,
        edition,
        publicationDate,
        photos,
        userId,
        cityId,
        pincode
      });
  
      await newBook.save();
      console.log("Book saved to database");
      response.status(200).json({ message: "Book added successfully", book: newBook });
    } catch (error) {
      console.error("Error in addBook controller:", error);
      response.status(500).json({ error: "Failed to add book" });
    }
  };
  
    
export const removeBook = async (request, response, next) => {
    try {
        let book = await Book.findById({ _id: request.params.id })
        if (!book)
            return response.status(401).json({ message: "Book ID not found" })
        if (book.status == false)
            return response.status(200).json({ status: "Book is already Deleted" })
        book = await Book.findByIdAndUpdate(
            request.params.id,
            {
                status: false
            }, { new: true }
        )
        return response.status(200).json({ Book: book, status: true })
    }
    catch (err) {
        return response.status(500).json({ error: "Internal Server Error" })

    }
}

export const permissionAllowed = async (request, response, next) => {

    try {
        let book = await Book.findById({ _id: request.params.id })
        if (!book)
            return response.status(401).json({ message: "Book ID not found" })
        if (book.permission == true)
            return response.status(200).json({ status: "Book is already Allowed" })
        book = await Book.findByIdAndUpdate(
            request.params.id,
            {
                permission: true
            }, { new: true }
        )
        return response.status(200).json({ Book: book, status: true })
    }
    catch (err) {
        return response.status(500).json({ error: "Internal Server Error" })

    }
}

// export const bookList = (request, response, next) => {

//     // let page = parseInt(request.query.page) || 1;
//     // let perPage = 10;
//     Book.find()
//         // .skip((page-1) * 10).limit(10)
//         .then(result => {
//             return response.status(200).json({ bookList: result, status: true });
//         }).catch(err => {
//             return response.status(500).json({ Message: "Internal server error...", status: false });
//         })

// }

export const bookList = async (request, response) => {
    try {
        const books = await Book.find();  // Fetch all books
        return response.status(200).json({ bookList: books, status: true });
    } catch (error) {
        return response.status(500).json({ message: "Internal server error", status: false });
    }
};

export const TotalBook = (request, response, next) => {
    let page = parseInt(request.query.page) || 1;
    let perPageData = 10;
    Book.find().skip((page - 1) * 10).limit(10).then(result => {
        return response.status(200).json({ bookList: result, status: true });
    }).catch(err => {
        return response.status(500).json({ Message: "Internal server error...", status: false });
    })
}

export const TopBooks = (request, response, next) => {
    Book.find().limit(12).then(result => {
        return response.status(200).json({ topbookList: result, status: true });
    }).catch(err => {
        return response.status(500).json({ Message: "Internal server error...", status: false });
    })
}

export const DonateBookList = (request, response, next) => {
    Book.find({ price: 0 }).then(result => {
        return response.status(200).json({ bookList: result, status: true });
    }).catch(err => {
        return response.status(500).json({ Message: "Internal server error...", status: false });
    })
}

export const searchByAuthor = (request, response, next) => {
    Book.find({ author: request.body.author }).then(result => {
        return response.status(200).json({ result: result, message: "list", status: true })
    }).catch(err => {
        return response.status(500).json({ message: "Internal server error" });
    })
}

export const searchByBookName = (request, response, next) => {
    Book.find({ name: request.params.name }).then(result => {
        return response.status(200).json({ result: result, message: "Search By Book Name", status: true })
    }).catch(err => {
        return response.status(500).json({ message: "Internal server error" });
    })
}

export const searchByCategoryId = (request, response, next) => {

    Book.find({ categoryId: request.body.categoryId }).then(result => {
        return response.status(200).json({ result: result, status: true })
    }).catch(err => {
        return response.status(500).json({ msg: "Internal Server Error" });
    })
}

export const viewByUserId = (request, response, next) => {
    Book.find({
        userId: request.body.userId
    }).then((result) => {
        return response.status(200).json({ book: result, status: true });
    }).catch((err) => {
        return response.status(500).json({ msg: "Internal Server Error", status: false });
    })
}

export const searchByKeyWord = async (request, response, next) => {
    try {

        let searchResult = await Book.find({
            $or: [{ name: { $regex: request.body.keyword, $options: "i" } },
            { description: { $regex: request.body.keyword, $options: "i" } },
            { author: { $regex: request.body.keyword, $options: "i" } }
            ]
        })
        if (searchResult.length > 0)
            return response.status(200).json({ Product: searchResult, status: true })
        else
            return response.status(401).json({ result: "NO result found", status: false })
    }
    catch (err) {
        return response.status(500).json({ error: err, status: false })
    }
}

export const updateBook = async (request, response, next) => {
    try {
        let ubook = await Book.findById(request.body.id)
        if (ubook) {
            ubook.name = request.body.name.trim() || ubook.name,
                ubook.price = request.body.price || ubook.price,
                ubook.author = request.body.author.trim() || ubook.author,
                ubook.pincode = request.body.pincode || ubook.pincode,
                ubook.description = request.body.description.trim() || ubook.description
            ubook.cityId = request.body.cityId.trim() || ubook.cityId
            ubook.categoryId = request.body.categoryId.trim() || ubook.categoryId,
                ubook.edition = request.body.edition.trim() || ubook.edition,
                ubook.language = request.body.language.trim() || ubook.language,
                ubook.publicationDate = request.body.publicationDate.trim() || ubook.publicationDate,
                ubook.photos = request.body.photos || ubook.photos,
                ubook.status = request.body.status || ubook.status,
                ubook.userId = request.body.userId || ubook.userId,
                ubook.permission = request.body.permission || ubook.permission;
            ubook.photos = "Pustakalaya@" + request.file.filename || ubook.photos;
        }
        const updated = await ubook.save()

        return response.status(200).json({ result: updated, message: "book update succesfully", status: true })
    }
    catch (err) {
        return response.status(500).json({ error: "Internal server error", status: false });
    }
}

export const TotalPendingBook = (request, response, next) => {
    Book.find({ permission: false }).then(result => {
        return response.status(200).json({ bookList: result, status: true });
    }).catch(err => {
        return response.status(500).json({ Message: "Internal server error...", status: false });
    })
}

export const searchByuserId = async (request, response, next) => {
    try {
        let books = await Book.find({ userId: request.body.userId });
        return response.status(200).json({ message: "book list ", status: true, result: books });
    }
    catch (err) {
        return response.status(500).json({ error: "Internal server error" });
    }
}

export const price = async (request, response, next) => {
    try {
        const minPrice = request.body.minPrice
        const maxPrice = request.body.maxPrice
        let books = await Book.find({ price: { $gte: maxPrice, $lte: minPrice } })
        return response.status(200).json({ result: books, message: "book list" });
    }
    catch (err) {
        return response.status(500).json({ error: "Internal server error" });
    }
}

export const donetors = async (request, response, next) => {
    try {
        var userAndBook = [];
        var newData = {};
        let books = await Book.find({ price: 0 });
        const uniqueUserIds = {};
        for (let book of books) {
            uniqueUserIds[book.userId] = true;
        }
        const unique = Object.keys(uniqueUserIds);
        for (let userId of unique) {
            let freeBook = await Book.find({ $and: [{ userId: userId }, { price: 0 }] })
            const donetors = await User.findOne({ _id: userId });
            newData = { user: donetors, books: freeBook.length };
            userAndBook = [...userAndBook, newData];
        }

        let sortedData = userAndBook.sort((a, b) => {
            return b.books - a.books
        })
        sortedData = sortedData.slice(0, 3);
        return response.status(200).json({ donetors: sortedData, message: "donetors" })
    }
    catch (err) {
        return response.status(200).json({ error: "Internal server error" });
    }
}