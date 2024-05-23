/* eslint-disable @typescript-eslint/no-explicit-any */
import { TInventory, TProduct } from './../product/product.interface';
import { Request, Response } from 'express';
import { orderValidationSchema } from './order.validation';
import { OrderServices } from './order.service';
import { isEmptyOrNull } from '../../utility/utility';
import { ZodError } from 'zod';
import { ProductServices } from '../product/product.service';

const createNewOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const { productId, quantity } = orderData;
    // check the quantity and valid productId
    const isValidProduct: TProduct | null =
      await ProductServices.getSingleProductFromDB(productId);

    if (isEmptyOrNull(isValidProduct)) {
      throw new Error('Product not found!');
    } else {
      // Explicitly check if the isValidProduct is not null
      const { inventory } = isValidProduct!;
      if (inventory.inStock === true && inventory.quantity >= quantity) {
        // Data validation with zod
        const validatedOrder = orderValidationSchema.parse(orderData);

        const result = await OrderServices.createNewOrderIntoDB(validatedOrder);

        if (!isEmptyOrNull(result)) {
          // update the product inventory quantity and stock
          updateProduct(productId, quantity, inventory);

          res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
          });
        } else {
          throw new Error('Order creation is not successful!');
        }
      } else {
        throw new Error('Insufficient quantity available in inventory');
      }
    }
  } catch (error: any) {
    if (error instanceof ZodError) {
      const errorMessages = error.issues
        .map((issue) => issue.message)
        .join(', ');
      return res.status(400).json({
        success: false,
        message: errorMessages,
        error: error.issues,
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email: any = req.query.email;
    const orderData = await OrderServices.getAllOrdersFromDB(email);
    if (!isEmptyOrNull(orderData)) {
      res.status(200).json({
        success: true,
        message: 'Orders retrieved successfully!',
        data: orderData,
      });
    } else {
      throw new Error('No orders found!');
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error,
    });
  }
};
// update the product
const updateProduct = (
  productId: string,
  quantity: number,
  inventory: TInventory,
) => {
  const remainingQuantity = inventory.quantity - quantity;
  const stockStatus = remainingQuantity > 0 ? true : false;
  const updatedInventory = {
    inventory: {
      quantity: remainingQuantity,
      inStock: stockStatus,
    },
  };
  ProductServices.updateProductIntoDB(productId, updatedInventory);
};
export const OrderControllers = {
  createNewOrder,
  getAllOrders,
};
