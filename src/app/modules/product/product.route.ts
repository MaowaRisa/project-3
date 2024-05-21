import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

// create new product
router.post('/create-product', ProductControllers.createProduct);
// get products, and search operation
router.get('/', ProductControllers.getAllProducts);
// update product
router.put('/:productId', ProductControllers.updateProduct )
export const ProductRoutes = router;
