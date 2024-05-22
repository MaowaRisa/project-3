import mongoose from 'mongoose';
import { isEmptyOrNull } from '../../utility/utility';
import { TProduct, TSearchTerm } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};
const getAllProductsFromDB = async (searchTerm: string) => {
  let result;
  if (searchTerm) {
    result = await Product.find({
      $and: [
        { isDeleted: false },
        {
          $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } },
            { category: { $regex: searchTerm, $options: 'i' } },
          ]
        }
      ]
    });
  } else {
    result = await Product.find({isDeleted: false});
  }
  return result;
};
const getSingleProductFromDB = async (id: string) => {
  // Built in static method for checking deleted product
  if(await Product.isProductDeleted(id)){
    throw new Error("This product already deleted or moved!")
  }
  const result = await Product.findOne({ _id: id, isDeleted: false });
  return result;
};
const updateProductIntoDB = async (id: string, productData: object) => {
  // Built in static method for checking deleted product
  if(await Product.isProductDeleted(id)){
    throw new Error("This product already deleted or moved!")
  }
  const result = await Product.findByIdAndUpdate(id, productData, {
    new: true,
  });
  return result;
};
const deleteProductFromDB = async (id: string) =>{
  console.log('this is the product ID ' + id + typeof id);
  if(await Product.isProductDeleted(id)){
    throw new Error("This product already deleted or moved!")
  }
  const result = await Product.updateOne({ _id : id }, {isDeleted: true});
  return result;
}
// check available product 
const isQuantityAvailableInDB = async (id:string, quantity: number) => {
  const result = await Product.findOne({ _id: id, isDeleted: false, quantity: {$gte : quantity} });
  return result;
}
export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  updateProductIntoDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  isQuantityAvailableInDB,
};
