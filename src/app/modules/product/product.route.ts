import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

// create new product
router.post('/create-product', ProductControllers.createProduct);
// get products, and search operation
router.get('/', ProductControllers.getAllProducts);
// update product
router.put('/:productId', ProductControllers.updateProduct);
// Get a single product
router.get('/:productId', ProductControllers.getSingleProduct);
// Delete a product 
router.delete('/:productId', ProductControllers.deleteProduct)
export const ProductRoutes = router;
