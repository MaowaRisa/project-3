import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

// create new product
router.post('/create-product', ProductControllers.createProduct);
// get products
router.get('/', ProductControllers.getAllProducts);
export const ProductRoutes = router;
