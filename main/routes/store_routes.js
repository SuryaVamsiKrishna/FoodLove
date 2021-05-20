import express from 'express';

import { getProducts } from '../controllers/product_controller.js';
const store_router = express.Router();

store_router.get('/', getProducts);

export default store_router;