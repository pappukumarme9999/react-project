import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim : true
    },
    edition: {
        type: String,
        required: true,
        trim : true
    },
    author: {
        type: String,
        required: true,
        trim : true
    },
    price: {
        type: Number,
        default: 0
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    language: {
        type: String,
        required: true,
        trim : true
    },
    stateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'state',
    },
    cityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'city',
    },
    pincode: {
        type: Number,
        required: true,
        trim : true
    },
    publicationDate: {
        type: String,
        required: true,
        trim : true
    },
    photos: {
        type: String,
        required: true,
        trim : true
    },
    description: {
        type: String,
        required: true,
        trim : true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId || String,  // my change
        ref: 'user'
    }
});
export const Book = mongoose.model("book", bookSchema);
