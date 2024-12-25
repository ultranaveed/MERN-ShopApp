import {create} from "zustand"
import Product from "../../../BE/models/product.model";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.img || !newProduct.price){
            return {success:false, message:"Please fill in all the fields."};
        }
        const res = await fetch("api/products", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(newProduct),
        })
        const data = await res.json();
        set((state) => ({products:[...state.products, data.data]}))
        return {success:true, message:"Product created successfully"};
    },
    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({products: data.data});
    }
}));