// subcategory.js
import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    slug: {
        type: String,
        lowercase: true
    },

});

export default mongoose.model('Subcategory', subcategorySchema);
