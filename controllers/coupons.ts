import { Coupons } from "../interfaces/coupons";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./refactorHandler";
import couponsModel from "../models/couponsModel";


export const createCoupon = createOne<Coupons>(couponsModel)
export const getCoupons = getAll<Coupons>(couponsModel, 'coupons')
export const getCoupon = getOne<Coupons>(couponsModel)
export const updateCoupon = updateOne<Coupons>(couponsModel)
export const deleteCoupon = deleteOne<Coupons>(couponsModel)
