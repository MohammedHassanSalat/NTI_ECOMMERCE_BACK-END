import { Router } from "express";
import {getSubcategories, createSubcategory, getSubcategory, updateSubcategory, deleteSubcategory, filterData, setCategoryId} from "../controllers/subCategories";
import { getSubcategoryValidator , createSubcategoryValidator , updateSubcategoryValidator , deleteSubcategoryValidator } from "../utils/validation/subcategoriesValidator";
import { allowedTo, checkActive, protectRoutes } from "../controllers/auth";

const subcategoriesRoute: Router = Router({mergeParams : true});

subcategoriesRoute.route('/')
    .get(filterData,getSubcategories)
    .post(protectRoutes,checkActive,allowedTo('manager','admin'),setCategoryId,createSubcategoryValidator,createSubcategory);

subcategoriesRoute.route('/:id')
    .get(getSubcategoryValidator,getSubcategory)
    .put(protectRoutes,checkActive,allowedTo('manager','admin'),updateSubcategoryValidator,updateSubcategory)
    .delete(protectRoutes,checkActive,allowedTo('manager','admin'),deleteSubcategoryValidator,deleteSubcategory);


export default subcategoriesRoute;