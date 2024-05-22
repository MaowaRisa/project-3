import { Schema, model } from 'mongoose';
import {
  IProductModel,
  TInventory,
  TProduct,
  TVariants,
} from './product.interface';

const variantsSchema = new Schema<TVariants>({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
});

const productSchema = new Schema<TProduct, IProductModel>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [variantsSchema], required: true },
  inventory: { type: inventorySchema, required: true },
  isDeleted: { type: Boolean },
});
// Static method for checking the deleted product
productSchema.statics.isProductDeleted = async function (id: string) {
  const deletedProduct = await Product.findOne({ _id: id, isDeleted: true });
  return deletedProduct;
};
export const Product = model<TProduct, IProductModel>('Product', productSchema);
