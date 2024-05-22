import mongoose from "mongoose"
import { TOrder } from "./order.interface"
import { Order } from "./order.model"

const createNewOrderIntoDB = async (order: TOrder) => {
    const result = await Order.create(order)
    return result;
}
const getAllOrdersFromDB = async (email:string) =>{
    let result;
    if(email){
        result = await Order.find({email: {$regex: email}})
    }else{
        result = await Order.find()
    }
    return result;
}
export const OrderServices = {
    createNewOrderIntoDB,
    getAllOrdersFromDB
}