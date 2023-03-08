import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {

    createCategory,
    createSubcategory,
    updateCategory,
    updateSubCategory,
    deleteCategory,
    deleteSubCategory,
    getAllCategory,
    getAllSubCategory,
    getAllSubCategoryById

    


} from "./../controllers/categoryController.js";


//router object
const router = express.Router();


//routes
// create category
router.post(
    "/create-category",
    requireSignIn,
    isAdmin,
    createCategory
);

router.post(
    "/create-subCategory",
    requireSignIn,
    isAdmin,
    createSubcategory
);



//update category
router.put(
    "/update-category/:id",
    requireSignIn,
    isAdmin,
    updateCategory
);


router.put(
    "/update-subcategory/:id",
    requireSignIn,
    isAdmin,
    updateSubCategory
);

//getALl category
router.get("/getAllCategory", getAllCategory);
router.get("/getAllSubCategory", getAllSubCategory);


router.get(
    "/getSubcategory/:categoryId",
    requireSignIn,
    isAdmin,
    getAllSubCategoryById
);


//delete category
router.delete(
    "/delete-category/:categoryId",
    requireSignIn,
    isAdmin,
    deleteCategory
);

router.delete(
    "/delete-subcategory/:categoryId",
    requireSignIn,
    isAdmin,
    deleteSubCategory
);



export default router;