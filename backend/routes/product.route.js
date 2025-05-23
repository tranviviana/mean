import express from "express";
import { getProducts } from "../controllers/product.controller.js";
import { createProduct } from "../controllers/product.controller.js";
import { updatedProduct } from "../controllers/product.controller.js";
import { deleteProduct } from "../controllers/product.controller.js";


const router = express.Router();
router.get('/', getProducts);

router.post('/', createProduct);

router.delete('/:id', deleteProduct)

router.put('/:id', updatedProduct);


export default router;