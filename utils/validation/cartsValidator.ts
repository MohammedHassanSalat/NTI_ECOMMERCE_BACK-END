import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";

export const addProductCartToValidator: RequestHandler[] = [
    check('product')
        .notEmpty().withMessage('product is Required')
        .isMongoId().withMessage("Invalid Mongo Id")
    ,validatorMiddleware
]

export const removeProductCartFromValidator: RequestHandler[] = [
    check('itemId')
        .isMongoId().withMessage("Invalid Mongo Id")
    ,validatorMiddleware
]

export const updateProductQuantityValidator: RequestHandler[] = [
    check('itemId')
        .isMongoId().withMessage("Invalid Mongo Id"),
    check('quantity')
        .notEmpty().withMessage('product quantity is Required')
        .isNumeric().withMessage("quantity must be a number").toInt()
        .custom((val: number) => {
            if(val <= 0){
                throw new Error("Invalid quantity")
            }
            return true;
        })
    ,validatorMiddleware
]


