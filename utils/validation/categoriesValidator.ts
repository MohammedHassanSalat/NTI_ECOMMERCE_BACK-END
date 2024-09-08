import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import subCategoriesModel from "../../models/subCategoriesModel";
import { SubCategories } from "../../interfaces/subCategories";

export const createCategoryValidator: RequestHandler[] = [
    check('name')
        .notEmpty().withMessage((val, {req}) => {
        return (req.__('check_category_name'))
    })
    .isLength({ min: 2, max: 50 }).withMessage((val, {req}) => {
        return (req.__('check_category_NameLenght'))
    }),
    validatorMiddleware
]

export const updateCategoryValidator: RequestHandler[] = [
    check('name')
        .notEmpty().withMessage((val, {req}) => {
        return (req.__('check_category_name'))
    })
    .isLength({ min: 2, max: 50 }).withMessage((val, {req}) => {
        return (req.__('check_category_NameLenght'))
    }),
    validatorMiddleware
]

export const getCategoryValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage((val, {req}) => {
        return (req.__('check_id'))
    }),
    validatorMiddleware
]

export const deleteCategoryValidator: RequestHandler[] = [
    check('id').isMongoId().withMessage((val, {req}) => {
            return (req.__('check_id'))
        })
        .custom(async (val) => {
        const subcategories = await subCategoriesModel.find({ category: val });
        if (subcategories.length > 0) {
            // TODO: less performance
            // subcategories.map(async (subcategory: SubCategories) => {
            //   await subCategoriesModel.findByIdAndDelete(subcategory._id)
            // })

            // * bulkWrite more performance
            const bulkOption = subcategories.map((subcategory: SubCategories) => ({
            deleteOne: { filter: { _id: subcategory._id } }
            }))
            await subCategoriesModel.bulkWrite(bulkOption)
        }
        return true;
        }),
    validatorMiddleware
]

// errors are handled in en and ar just here in categories and in refactorHandlers
// rest to be continued just to save time 