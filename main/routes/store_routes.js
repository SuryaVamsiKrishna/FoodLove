import express from 'express';

import { getProducts,getProductById,addCart } from '../controllers/product_controller.js';
const store_router = express.Router();

store_router.get('/', getProducts);
store_router.get('/:id',getProductById);
store_router.post('/:id',addCart);

export default store_router;
