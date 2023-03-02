// category.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subcategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
    }
    ],
    slug: {
        type: String,
        lowercase: true
    },
});

export default mongoose.model('Category', categorySchema);
