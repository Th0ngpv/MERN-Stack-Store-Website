import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success:true, data: products}) // code 200 for success request
    } catch (error) {
        console.log("error in fetching products:", error.message);
        res.status(500).json({ success:false, message: "Server Error"}) // code 500 for internal server error
    }
});

router.post("/", async (req, res) => {
    const product = req.body; // user will send this data

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ success:false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct}); // code 201 for new creation
    } catch (error) {
        console.log("Error in create product:", error.message);
        res.status(500).json({ success:false, message: "Server Error"}) 
    }
});

router.put("/:id", async (req, res) =>{
    const {id} = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid Product Id" }); // code 404 for not found
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({ success:true, data: updatedProduct}) 
    } catch (error) {
        console.log("error in updating product:", error.message);
        res.status(500).json({ success:false, message: "Server Error"}) 
    }
});

router.delete("/:id", async (req, res) => {
    const{id} = req.params;
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success:true, message: "Product deleted"}); // code 200 for new deletion
    } catch (error) {
        console.log("error in deleting product",error.message);
        res.status(404).json({ success:true, message: "Product not found"}); 
    }
});

export default router;