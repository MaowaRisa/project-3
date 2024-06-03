import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (product: TProduct) => {
  const newProduct = await Product.create(product);
  const result = await Product.findById(newProduct._id, {
    name: 1,
    description: 1,
    price: 1,
    category: 1,
    tags: 1,
    'variants.type': 1,
    'variants.value': 1,
    'inventory.quantity': 1,
    'inventory.inStock': 1,
  });

  return result;
};
const getAllProductsFromDB = async (searchTerm: string) => {
  let result;
  if (searchTerm) {
    result = await Product.find(
      {
        $and: [
          { isDeleted: false },
          {
            $or: [
              { name: { $regex: searchTerm, $options: 'i' } },
              { description: { $regex: searchTerm, $options: 'i' } },
              { category: { $regex: searchTerm, $options: 'i' } },
            ],
          },
        ],
      },
      {
        name: 1,
        description: 1,
        price: 1,
        category: 1,
        tags: 1,
        'variants.type': 1,
        'variants.value': 1,
        'inventory.quantity': 1,
        'inventory.inStock': 1,
      },
    );
  } else {
    result = await Product.find(
      { isDeleted: false },
      {
        name: 1,
        description: 1,
        price: 1,
        category: 1,
        tags: 1,
        'variants.type': 1,
        'variants.value': 1,
        'inventory.quantity': 1,
        'inventory.inStock': 1,
      },
    );
  }
  return result;
};
const getSingleProductFromDB = async (id: string) => {
  // checking deleted product
  if ((await Product.findOne({ _id: id })) === null) {
    throw new Error('This product already deleted or moved!');
  }
  const result = await Product.findOne(
    { _id: id, isDeleted: false },
    {
      name: 1,
      description: 1,
      price: 1,
      category: 1,
      tags: 1,
      'variants.type': 1,
      'variants.value': 1,
      'inventory.quantity': 1,
      'inventory.inStock': 1,
    },
  );
  return result;
};
const updateProductIntoDB = async (
  id: string,
  productData: Partial<TProduct>,
) => {
  // Built in static method for checking deleted product
  if ((await Product.findOne({ _id: id })) === null) {
    throw new Error('This product already deleted or moved!');
  }
  const result = await Product.findByIdAndUpdate(id, productData, {
    new: true,
    projection: {
      name: 1,
      description: 1,
      price: 1,
      category: 1,
      tags: 1,
      'variants.type': 1,
      'variants.value': 1,
      'inventory.quantity': 1,
      'inventory.inStock': 1,
      isDeleted: 0,
    },
  });
  return result;
};
const deleteProductFromDB = async (id: string) => {
  if (!(await Product.findOne({ _id: id }))) {
    throw new Error('This product already deleted or moved!');
  }
  const result = await Product.deleteOne({ _id: id });
  return result;
};
// check available product
const isQuantityAvailableInDB = async (id: string, quantity: number) => {
  const result = await Product.findOne({
    _id: id,
    isDeleted: false,
    quantity: { $gte: quantity },
  });
  return result;
};
export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  updateProductIntoDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  isQuantityAvailableInDB,
};
