import * as all from '../interfaces';
import { Application , Request , Response , NextFunction } from "express";
import categoriesRoute from "./categoriesRoute";
import subcategoriesRoute from "./subcategoriesRoute";
import ApiErrors from "../utils/apiErrors";
import globalErrors from "../middlewares/globalErrors";
import productsRoutes from './productsRoutes';
import usersRoute from './usersRoute';
import authRoute from './authRoute';
import reviewsRoute from './reviewsRoute';
import wishlistRoute from './wishlistRoute';
import couponsRoute from './couponsRoute';
import cartsRoute from './cartsRoute';
import ordersRoute from './ordersRoute';

const mountRoutes = (app: Application): void => {
    app.use('/app/v1/categories',categoriesRoute);
    app.use('/app/v1/subcategories',subcategoriesRoute);
    app.use('/app/v1/products',productsRoutes);
    app.use('/app/v1/reviews',reviewsRoute);
    app.use('/app/v1/wishlist',wishlistRoute);
    app.use('/app/v1/coupons',couponsRoute);
    app.use('/app/v1/carts',cartsRoute);
    app.use('/app/v1/orders',ordersRoute);
    app.use('/app/v1/users',usersRoute);
    app.use('/app/v1/auth',authRoute);
    
    app.all('*',(req: Request , res: Response , next: NextFunction) => {
        next(new ApiErrors(`the router ${req.originalUrl} is not found`,400))
    });
    
    app.use(globalErrors);
}

export default mountRoutes;