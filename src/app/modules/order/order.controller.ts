import { Request, Response } from "express";
import { orderValidationSchema } from "./order.validation";
import { OrderServices } from "./order.service";
import { isEmptyOrNull } from "../../utility/utility";
import { ZodError } from 'zod';
import { ProductServices } from "../product/product.service";

const createNewOrder = async (req:Request, res: Response) => {
    try {
        const orderData = req.body;
        const {productId, quantity} = orderData;
        // check the quantity and valid productId
        const isValidProduct = await ProductServices.getSingleProductFromDB(productId);
        console.log(isValidProduct);
        if(isEmptyOrNull(isValidProduct)){
            throw new Error("Product not found!")
        }else{
            const {inventory} = isValidProduct;
            if(inventory.inStock === true && inventory.quantity >= quantity){
                // Data validation with zod
                const validatedOrder = orderValidationSchema.parse(orderData);

                const result = await OrderServices.createNewOrderIntoDB(validatedOrder);

                if(!isEmptyOrNull(result)){
                    // update the product inventory quantity and stock 
                    const remainingQuantity = inventory.quantity - quantity;
                    const stockStatus = remainingQuantity > 0 ? true : false;
                    const updatedInventory = {
                        "inventory":{
                            "quantity": remainingQuantity,
                            "inStock": stockStatus,
                        }
                    }
                    console.log(updatedInventory);
                    const updatedProduct = ProductServices.updateProductIntoDB(productId, updatedInventory);
                    res.status(200).json({
                        success: true,
                        message: 'Order created successfully!',
                        data: result,
                    });
                }else{
                    throw new Error("Order creation is not successful!")
                }
            }else{
                throw new Error("Insufficient quantity available in inventory")
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
}
export const OrderControllers = {
    createNewOrder,
}