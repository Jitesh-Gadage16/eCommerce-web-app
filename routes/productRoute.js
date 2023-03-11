import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {createProduct,editProduct,getAllProducts,getProduct,deleteProductController,getProductbyCategoryId} from '../controllers/productController.js'
import formidable from 'express-formidable'


//router object
const router = express.Router();


router.post('/create-product',requireSignIn,isAdmin,formidable(), createProduct)
router.put('/update-product/:id',requireSignIn,isAdmin,formidable(), editProduct)
router.get('/get-products/',requireSignIn,isAdmin,formidable(), getAllProducts)
router.get('/get-products/:id',requireSignIn,isAdmin,formidable(), getProductbyCategoryId)
router.get('/get-product/:slug',requireSignIn,isAdmin,formidable(), getProduct)
router.delete("/delete-product/:pid",requireSignIn,isAdmin, deleteProductController);




export default router;
