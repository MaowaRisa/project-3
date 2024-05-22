import express from 'express';
import { OrderControllers } from './order.controller';

const router = express.Router();

// create new order
router.post('/', OrderControllers.createNewOrder)
// retrieve all orders
router.get('/', OrderControllers.getAllOrders)

export const OrderRoutes = router;