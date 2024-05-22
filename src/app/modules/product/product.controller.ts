import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import {
  partialProductValidationSchema,
  productValidationSchema,
} from './product.validation';
import { ZodError } from 'zod';
import { isEmptyOrNull } from '../../utility/utility';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    // Adding this field for delete function
    productData.isDeleted = false;
    // Data validation using zod
    const validatedProduct = productValidationSchema.parse(productData);
    const result = await ProductServices.createProductIntoDB(validatedProduct);
    // Send Response
    if (!isEmptyOrNull(result)) {
      res.status(200).json({
        success: true,
        message: 'Product created successfully!',
        data: productData,
      });
    } else {
      throw new Error('Product creation is not successful!');
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

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm: any = req.query.searchTerm;
    const result = await ProductServices.getAllProductsFromDB(searchTerm);
    if (!isEmptyOrNull(result)) {
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      });
    } else {
      throw new Error('No Products! Something went wrong!');
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error,
    });
  }
};
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = await ProductServices.getSingleProductFromDB(productId);

    if (!isEmptyOrNull(productData)) {
      res.status(200).json({
        success: true,
        message: 'Product fetched successfully!',
        data: productData,
      });
    } else {
      throw new Error('Product retrieved not successful! Check the data is deleted or moved!');
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body;
    // product data validation (zod)
    const validatedData = partialProductValidationSchema.parse(productData);
    // update the product
    const updatedData = await ProductServices.updateProductIntoDB(
      productId,
      validatedData,
    );

    if (!isEmptyOrNull(updatedData)) {
      res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: updatedData,
      });
    } else {
      throw new Error('Update is not successful!');
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
    });
  }
};
const deleteProduct = async (req: Request, res: Response) =>{
  try {
    const {productId} = req.params;
    const result = await ProductServices.deleteProductFromDB(productId);
    if(!isEmptyOrNull(result)){
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: result
      })
    }else{
      throw new Error("Delete not successful!")
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
      error: error,
    });
  }
}
export const ProductControllers = {
  createProduct,
  getAllProducts,
  updateProduct,
  getSingleProduct,
  deleteProduct,
};
