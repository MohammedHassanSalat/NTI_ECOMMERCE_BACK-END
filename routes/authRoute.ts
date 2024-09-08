import { Router } from "express";
import { signup , login , resetCode , forgetPassword, verifyResetCode } from "../controllers/auth";
import { loginValidator, signupValidator , sendMailValidator, resetCodeValidator } from "../utils/validation/authValidator";

const authRoute: Router = Router();

authRoute.route('/signup').post(signupValidator,signup);
authRoute.route('/login').post(loginValidator,login);
authRoute.route('/forgetPassword').post(sendMailValidator,forgetPassword);
authRoute.route('/verifyCode').post(verifyResetCode);
authRoute.route('/resetCode').put(resetCodeValidator,resetCode);

// usersRoute.route('/:id')
//     .get(getUserValidator,getUser)
//     .put(uploadUserImage,resizeUserImage,updateUserValidator,updateUser)
//     .delete(deleteUserValidator,deleteUser);


export default authRoute;