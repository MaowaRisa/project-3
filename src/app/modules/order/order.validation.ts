import { z } from 'zod';
const orderValidationSchema = z.object({
  email: z.string().email(),
  productId: z.string(),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
});
const partialOrderValidationSchema = orderValidationSchema.partial();

export { orderValidationSchema, partialOrderValidationSchema };
