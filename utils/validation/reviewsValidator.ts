import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import reviewsModel from "../../models/reviewsModel";

export const createReviewValidator: RequestHandler[] = [
    check('comment')
        .notEmpty().withMessage('commment is Required'),
    check('rating')
        .notEmpty().withMessage('rating is Required'),
    check('user')
        .notEmpty().withMessage('user is Required')
        .isMongoId().withMessage('Invalid Mongo Id'),
    check('product')
        .notEmpty().withMessage('product is Required')
        .isMongoId().withMessage('Invalid Mongo Id')
        // * Check if category exist
        .custom(async (val , {req}) => {
            const review = await reviewsModel.findOne({user: req.user._id, product: val});
            if (review) {
                throw new Error('review made before');
            }
            return true;
        }),
    validatorMiddleware
]

export const updateReviewValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('Invalid Mongo Id')
    .custom(async (val , {req}) => {
        const review = await reviewsModel.findById(val);
        if(!review) {throw new Error('review not found')}
        if(review.user._id!.toString() !== req.user._id.toString()) {
            throw new Error('you cant do this')
        }
        return true;
    })
    
    ,validatorMiddleware
]

export const getReviewValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('Invalid Mongo Id'),
    validatorMiddleware
]

export const deleteReviewValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage('Invalid Mongo Id')
    .custom(async (val , {req}) => {
        if (req.user.role === 'user'){
            const review = await reviewsModel.findById(val);
            if(!review) {throw new Error('review not found')}
            if(review.user._id!.toString() !== req.user._id.toString()) {
                throw new Error('you cant do this')
            }
        }
        return true;
    }),
    validatorMiddleware
]