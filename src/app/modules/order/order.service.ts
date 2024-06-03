import { TOrder } from './order.interface';
import { Order } from './order.model';

const createNewOrderIntoDB = async (order: TOrder) => {
  const result = await Order.create(order);
  const newOrder = await Order.findOne(
    { _id: result._id },
    {
      email: 1,
      productId: 1,
      price: 1,
      quantity: 1,
      _id: 0,
    },
  );
  return newOrder;
};
const getAllOrdersFromDB = async (email: string) => {
  let result;
  if (email) {
    result = await Order.find({ email: { $regex: email } },{
      email: 1,
      productId: 1,
      price: 1,
      quantity: 1,
      _id: 0,
    });
  } else {
    result = await Order.find({},{
      email: 1,
      productId: 1,
      price: 1,
      quantity: 1,
      _id: 0,
    });
  }
  return result;
};
export const OrderServices = {
  createNewOrderIntoDB,
  getAllOrdersFromDB,
};
