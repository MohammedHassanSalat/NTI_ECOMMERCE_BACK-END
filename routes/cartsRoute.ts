import { Router } from "express";
import { allowedTo, checkActive, protectRoutes } from "../controllers/auth";
import { addProductToCart, applyCoupon, clearCart, getLoggedUserCart, removeProduct, upadteProductQuantity } from "../controllers/carts";
import { addProductCartToValidator, removeProductCartFromValidator, updateProductQuantityValidator } from "../utils/validation/cartsValidator";

const cartsRoute: Router = Router();
cartsRoute.use(protectRoutes,checkActive,allowedTo('user'))


cartsRoute.route('/')
    .get(getLoggedUserCart)
    .post(addProductCartToValidator,addProductToCart)
    .delete(clearCart);

cartsRoute.put('/applyCoupon',applyCoupon)

cartsRoute.route('/:itemId') // TODO: item id is belong to object id
    .put(updateProductQuantityValidator,upadteProductQuantity)
    .delete(removeProductCartFromValidator,removeProduct);


export default cartsRoute;