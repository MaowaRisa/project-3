import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import { productValidationSchema } from './product.validation';
import { ZodError } from 'zod';
import { TSearchTerm } from './product.interface';
import { isEmpty } from '../../utility/utility';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    // Adding this field for delete function
    productData.isDeleted = false;
    // Data validation using zod
    const validatedProduct = productValidationSchema.parse(productData)
    const result = await ProductServices.createProductIntoDB(validatedProduct);
    // Send Response
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Product created successfully!',
        data: productData,
      });
    }
  } catch (error: any) {
    if (error instanceof ZodError) {
        const errorMessages = error.issues.map(issue => issue.message).join(', ');
        return res.status(400).json({
          success: false,
          message: errorMessages,
          error: error.issues
        });
      }
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm:any= req.query.searchTerm;
    const result = await ProductServices.getAllProductsFromDB(searchTerm);
    if(!isEmpty(result)){
        res.status(200).json({
            success: true,
            message: 'All students are retrieved successfully',
            data: result,
        });
    }else{
        throw new Error("No students! Something went wrong!")
    }
  } catch (error: any) { 
    res.status(500).json({
        success: false,
        message: error.message || "Something went wrong!",
        error: error
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
};
