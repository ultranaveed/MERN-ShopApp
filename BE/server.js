import express from 'express';
import dotenv from "dotenv";

import Product from './models/product.model.js';
import { connectDB } from '../config/db.js';


dotenv.config();

const app = express(); // allows us to accept json data in the req.body

app.use(express.json());

app.post("/api/products", async (req,res) => {
    const product = req.body; // user will send this data

    if(!product.name || !product.price || !product.img){
        return res.status(400).json({success:false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({success:true, data: newProduct});
    } catch (error) {
        console.error("Error in Create product:", error.message);
        res.status(500).json({success:false, message:"Server Error"});
    }
});

// Postman desktop app


app.listen(5000, () =>{
    connectDB();
    console.log("Server started at http://localhost:5000 What's up Novo");
    
});
