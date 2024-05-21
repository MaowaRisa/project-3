import express, { Application} from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';
const app: Application = express();

//Parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/products', ProductRoutes);

export default app;
