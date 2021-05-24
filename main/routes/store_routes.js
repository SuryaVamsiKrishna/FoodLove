import express from 'express';

import { getProducts,getProductById} from '../controllers/product_controller.js';
const store_router = express.Router();

store_router.get('/', getProducts);
store_router.get('/:id',getProductById);

export default store_router;
