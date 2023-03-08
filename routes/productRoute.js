import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {createProduct,editProduct,getAllProducts} from '../controllers/productController.js'
import formidable from 'express-formidable'


//router object
const router = express.Router();


router.post('/create-product',requireSignIn,isAdmin,formidable(), createProduct)
router.put('/update-product/:id',requireSignIn,isAdmin,formidable(), editProduct)
router.get('/get-products/',requireSignIn,isAdmin,formidable(), getAllProducts)




export default router;
