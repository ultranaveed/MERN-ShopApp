import express from 'express';
import dotenv from "dotenv";
import path from "path"
import cors from "cors"; // Import cors


import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express(); // allows us to accept json data in the req.body
const PORT = process.env.PORT

const __dirname = path.resolve();

app.use(cors()); // Enable CORS for all routes

app.use(express.json());

app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/FE/dist")));
    app.get("*", (req,res) =>{
        res.sendFile(path.resolve(__dirname, "FE", "dist", "index.html"));
    });
}

app.listen(PORT, () =>{
    console.log("What's up Novo");
    connectDB();
    console.log("Server started at http://localhost:"+ PORT);
    
});
