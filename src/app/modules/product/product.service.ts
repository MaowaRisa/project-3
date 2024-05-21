import { TProduct, TSearchTerm } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};
const getAllProductsFromDB = async (searchTerm: string | number) => {
    let result;
    if(searchTerm){
        result = await Product.find({
          $or: [
              {name : {$regex: searchTerm, $options: "i"}},
              {description: {$regex: searchTerm, $options: "i"}},
              {category: {$regex: searchTerm, $options: "i"}},
          ]
        });
    }else{
        result = await Product.find()
    }
  return result;
};
const updateDataIntoDB = async (id:any, productData: object) =>{
    const result = await Product.findByIdAndUpdate(id, productData, {new:true});
    return result;
}

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  updateDataIntoDB,
};
