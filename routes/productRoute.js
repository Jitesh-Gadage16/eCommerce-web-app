import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {createProduct,editProduct,getAllProducts,getProductbySlug,deleteProductController,getProductbyId,getprodutbycategory} from '../controllers/productController.js'
import formidable from 'express-formidable'


//router object
const router = express.Router();


router.post('/create-product',requireSignIn,isAdmin,formidable(), createProduct)


router.put('/update-product/:id',requireSignIn,isAdmin, editProduct)
  
// get all products 
router.get('/get-products/',requireSignIn,isAdmin,formidable(), getAllProducts)

// get products by category id (categoryid product id)
router.get('/get-product/:id',requireSignIn,isAdmin,formidable(), getProductbyId)

// get products by slug 
router.get('/get-product/:slug',requireSignIn,isAdmin,formidable(), getProductbySlug)

// get product by category and subcategoryid
router.get('/get-product/:categoryId/:subcategoryId',formidable(), getprodutbycategory)

//delet product
router.delete("/delete-product/:pid",requireSignIn,isAdmin, deleteProductController);




export default router;
