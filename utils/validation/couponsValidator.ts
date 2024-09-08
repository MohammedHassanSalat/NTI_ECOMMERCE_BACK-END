import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import couponsModel from "../../models/couponsModel";

export const createCouponValidator: RequestHandler[] = [
    check('name')
        .notEmpty().withMessage('Coupon Name is Required')
        .isLength({ min: 2, max: 50 }).withMessage('Name length must be between 2 and 50')
        .custom(async (val: string) => {
            const coupon = await couponsModel.findOne({name: val});
            if(coupon){
                throw new Error('coupon name exists already')
            }
            return true;
        }),
    check('expireTime')
        .notEmpty().withMessage('Coupon expire time is Required')
        .isDate().withMessage('Invalid Date'),
    check('discount')
        .notEmpty().withMessage('Discount is Required')
        .isNumeric().withMessage('Discount must be number')
        .custom((val) => {
            if(val <= 0 || val > 100){
                throw new Error('Invalid discount value')
            }
            return true;
        })
    ,validatorMiddleware
]

export const updateCouponValidator: RequestHandler[] = [
    check('name')
        .isLength({ min: 2, max: 50 }).withMessage('Name length must be between 2 and 50'),
    check('expireTime').optional()
        .isDate().withMessage('Invalid Date'),
    check('discount')
        .notEmpty().withMessage('Discount is Required')
        .isNumeric().withMessage('Discount must be number')
        .custom((val) => {
            if(val <= 0 || val > 100){
                throw new Error('Invalid discount value')
            }
            return true;
        })
    ,validatorMiddleware
]

export const getCouponValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('Invalid Mongo Id'),
    validatorMiddleware
]

export const deleteCouponValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('Invalid Mongo Id'),
    validatorMiddleware
]