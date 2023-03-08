
import Product from "../models/productModel.js";

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
        case photos && photos.size > 1000000:
            return res
                .status(500)
                .send({ error: "photo is Required and should be less then 1mb" });
    }
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

        const { id } = req.params;

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