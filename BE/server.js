import express from 'express';
import dotenv from "dotenv";

import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express(); // allows us to accept json data in the req.body
const PORT = process.env.PORT

app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(PORT, () =>{
    console.log("What's up Novo");
    connectDB();
    console.log("Server started at http://localhost:"+ PORT);
    
});
