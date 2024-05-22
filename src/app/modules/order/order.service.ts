import mongoose from "mongoose"
import { TOrder } from "./order.interface"
import { Order } from "./order.model"

const createNewOrderIntoDB = async (order: TOrder) => {
    const result = await Order.create(order)
    return result;
}
export const OrderServices = {
    createNewOrderIntoDB
}