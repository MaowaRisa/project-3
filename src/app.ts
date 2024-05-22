import express, { Application } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';
import { OrderRoutes } from './app/modules/order/order.route';
const app: Application = express();

//Parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

// wrong route error
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    })
}); 

export default app;
