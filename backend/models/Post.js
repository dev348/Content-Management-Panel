const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    filename: { type: String, default: '' },
    originalname: { type: String, default: '' },
    mimetype: { type: String, default: '' },
});

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    poster: { type: imageSchema },
    createdBy: { type: String, default: 'Admin' },
    updatedBy: { type: String, default: 'Admin' },
}, { timestamps: true });


module.exports = mongoose.model("Post", postSchema)