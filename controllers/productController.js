
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import Subcategory from "../models/subCategoryModel.js";
import slugify from "slugify";
import fs from 'fs'

export const createProduct = async (req, res) => {

    const { name, description, price, sizes, stock, categoryId, subcategoryId, brand, photos } = req.fields
    // console.log("sas",images)
    // const { photo } = req.files;

    //multiple image pending
    // console.log("photo", photo)

    //validation
    switch (true) {
        case !name:
            return res.status(500).send({ error: "Name is required" })
        case !description:
            return res.status(500).send({ error: "description is required" })
        case !price:
            return res.status(500).send({ error: "price is required" })
        case !sizes:
            return res.status(500).send({ error: "sizes is required" })
        case !stock:
            return res.status(500).send({ error: "stock is required" })
        case !categoryId:
            return res.status(500).send({ error: "categoryId is required" })
        case !subcategoryId:
            return res.status(500).send({ error: "subcategoryId is required" })
        case !brand:
            return res.status(500).send({ error: "brand is required" })
        case !photos:
            return res   
                .status(500)
                .send({ error: "photo is Required and should be less then 1mb" });
    }

    const getcategory = await Category.findById(categoryId)
    console.log("getcategory",getcategory)

    const productData = {
        name,
        description,
        price,
        sizes,
        stock,
        categoryId,
        subcategoryId,
        brand,
        photos,
        category:getcategory
    }
    
    console.log("wwww",productData)


    const products = new Product({ ...req.fields, slug: slugify(name) })

    // if(photo){
    //     products.photo.data = fs.readFileSync(photo.path);
    //     console.log(products.photo.data)
    //     products.photo.contentType = photo.type
    // }
    await products.save()
    res.status(200).send({
        success: true,
        message: "Product created Successfully ",
        products
    })

    try {

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while createting product",
        });
    }
}


export const editProduct = async (req, res) => {
    try {

        const { name, description, price, sizes, stock, categoryId, subcategoryId, brand, photos } = req.fields;
        // const blogId = req.query.blogId;
        const { id } = req.params;
        console.log(id)

        const product = await Product.findByIdAndUpdate(
            id,
            { name, description, price, sizes, stock, categoryId, subcategoryId, brand, photos, slug: slugify(name) },
            { new: true }
        );
        console.log("product", product)
        res.status(200).send({
            success: true,
            messsage: "product Updated Successfully",
            product,
        });
    } catch (error) {
        console.log("error in update product", error)
    }
}

export const getProduct = async (req, res) => {
    try {
        const { slug } = req.params;
        console.log(slug)
        const product = await Product
      .findOne({slug:slug})

        console.log("asa",product)
        res.status(200).send({
            success: true,
            messsage: "product got Successfully",
            product,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while get all product",
        });
    }
}

export const getProductbyCategoryId = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const product = await Product
      .findOne({id})

        console.log("produts by category",product)
        res.status(200).send({
            success: true,
            messsage: "product got Successfully",
            product,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while get all product",
        });
    }
}



export const getAllProducts = async (req, res) => {
    try {
        const getProducts = await Product.find({}).select("-photo")

        console.log("asa",getProducts)
        res.status(200).send({
            success: true,
            messsage: "product Updated Successfully",
            getProducts,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while get all product",
        });
    }
}


//delete controller
export const deleteProductController = async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.pid).select("-photo");
      res.status(200).send({
        success: true,
        message: "Product Deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while deleting product",
        error,
      });
    }
  };