
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim : true

    },
    description: {
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
        required: true,
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
    edition: {
        type: String,
        required: true,
        trim : true
    },
    photos: {
        type: String,
        required: true,
        trim : true
    },
    publicationDate: {
        type: String,
        required: true,
        trim : true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    status: {
        type: Boolean,
        default:true

    },
    cityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'city',
        trim : true
    },
    permission: {
        type: Boolean,
        default:false,
        trim : true
    },
    pincode: {
        type: Number,
        required: true,
        trim : true
    }

});

export const Book = mongoose.model("book", bookSchema);