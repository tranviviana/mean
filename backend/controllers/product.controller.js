import mongoose from "mongoose";
import Product from "../models/product.model.js"


export const getProducts = async(req, res) => {
    try {
     const products = await Product.find({});
     return res.status(200).json({sucess: true, data: products})
    } catch (error) {
         console.log("error in fetching products: ", error.message);
         res.status(500).json({ success: false, message: "Server Error" 
         })
    }
   };

export const createProduct = async (req,res) => {
    const product = req.body; // user sends this data 

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({sucess:false, message: "Please provide all fields"})
    }
    const newProduct = new Product(product)
    try {
        await newProduct.save();
        res.status(201).json({success:true, data: newProduct})
    } catch (error) {
        console.error("Error in Creating Product: ", error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})
    }

};

export const updatedProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    console.log("Request Body:", product);
    console.log("Product ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteProduct = async(req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product Deleted"});
    } catch (error) {
        console.error("Error in finding and deleting id ", error.message);
        res.status(500).json( {success: false, message: "Server error" });
    }
}