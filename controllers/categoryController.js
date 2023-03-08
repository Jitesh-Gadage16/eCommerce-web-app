import Category from "../models/categoryModel.js";
import Subcategory from "../models/subCategoryModel.js";

import slugify from "slugify";

//create category

export const createCategory = async (req, res) => {
    const { name } = req.body;

    try {
        const category = await Category.create({ name, slug: slugify(name) });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Unable to create category' });
    }
};


//create subcategory

export const createSubcategory = async (req, res) => {
    const { name, categoryId } = req.body;

    try {
        const subcategory = await Subcategory.create({ name, slug: slugify(name), category: categoryId });

        // Update the parent category with the new subcategory
        await Category.findByIdAndUpdate(categoryId, { $push: { subcategories: subcategory._id } });

        res.status(201).json({ subcategory });
    } catch (error) {
        res.status(500).json({ error: 'Unable to create subcategory' });
    }
};

//update category

export const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await Category.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        console.log(category)
        res.status(200).send({
            success: true,
            messsage: "Category Updated Successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating category",
        });
    }
};


//update subcategory

export const updateSubCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;


        console.log("qqs", name,id)

        const category = await Subcategory.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        
        console.log("sas",category)

        res.status(200).send({
            success: true,
            messsage: "Category Updated Successfully",
            category,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating subcategory",
        });
    }
}

//Delete Category

export const deleteCategory = async (req,res) => {
    try {

        const {categoryId} = req.params;

        const category =await Category.findByIdAndDelete(categoryId)

        console.log(category)
        res.status(200).send({
            success: true,
            messsage: "Category Deleted Successfully",
            category,
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while delete category",
        });
    }
}


//Delete SubCategory

export const deleteSubCategory = async (req,res) => {
    try {

        const {categoryId} = req.params;

        const category =await Subcategory.findByIdAndDelete(categoryId)

        console.log(category)
        res.status(200).send({
            success: true,
            messsage: "SubCategory Deleted Successfully",
            category,
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while delete subcategory",
        });
    }
}

export const getAllSubCategoryById = async (req, res) => {
    try {

          const {categoryId} = req.params;

        const subcategory =await Subcategory.findById(categoryId) 
        console.log("subcateg",subcategory)
        res.status(200).send({
            success: true,
            messsage: "SubCategory Deleted Successfully",
            subcategory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while get subcategory by id",
        });
    }
}



export const getAllCategory = async (req, res) => {
    try {
        const category =await Category.find()
        
        res.status(200).send({
            success: true,
            messsage: "Category got Successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while delete subcategory",
        });
    }
}


export const getAllSubCategory = async (req, res) => {
    try {
        const category =await Subcategory.find()
        
        res.status(200).send({
            success: true,
            messsage: "Category got Successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while delete subcategory",
        });
    }
}
