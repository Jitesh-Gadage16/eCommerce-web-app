import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a product name"],
        trim: true,
        maxLength: [120, "Product name should be a max of 120 characters"]
    },
    slug: {
        type: String,
        lowercase: true
    },
    description: {
        type: String,
        required: [true, "please provide product description"],
        // use some form of editor - personal assignment
    },
    price: {
        type: Number,
        required: [true, "Please provide a product price"],
        maxLength: [5, "Product price should not be more than 5 digits"]
    },
    sizes: [{
        type: String,
        required: true
    }],
  
    stock: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory"
    },
    category:{
        type: Object,
        default: null
    },
    
    brand: {
        type: String,
        required: [true, "please add a brand for product"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    numberOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],
    photos: {
        type: Array,
        default: null
    },
    
    // userDetails: {
    //     type: Object,
    //     default: null
    // },
},
    {
        timestamps: true
    }
)

export default mongoose.model("Product", productSchema)
