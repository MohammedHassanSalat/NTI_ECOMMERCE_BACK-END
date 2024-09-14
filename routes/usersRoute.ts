import { Router } from "express";
import { createUserValidator ,updateUserValidator , getUserValidator , deleteUserValidator, changeUserPasswordValidator } from "../utils/validation/usersValidator";
import { changeUserPassword, createUser, deleteUser, getUser, getUsers, resizeUserImage, setLoggedUserId, updateUser, uploadUserImage } from "../controllers/users";
import { protectRoutes ,checkActive , allowedTo } from "../controllers/auth";
import { updateLoggedUser , changeLoggrdUserPassword } from "../controllers/users";
import {updateLoggedUserValidator , changeLoggedUserPasswordValidator} from "../utils/validation/usersValidator"

const usersRoute: Router = Router();
usersRoute.use(protectRoutes,checkActive);
usersRoute.get('/me',setLoggedUserId,getUser)
usersRoute.put('/updateMe', uploadUserImage, resizeUserImage, updateLoggedUserValidator ,updateLoggedUser)
usersRoute.put('/changeMyPassword',changeLoggedUserPasswordValidator,changeLoggrdUserPassword)
usersRoute.delete('/deleteMe',allowedTo('user'),setLoggedUserId,deleteUser)

usersRoute.use(allowedTo('manager'));
usersRoute.route('/')
    .get(getUsers)
    .post(uploadUserImage,resizeUserImage,createUserValidator,createUser);

usersRoute.route('/:id')
    .get(getUserValidator,getUser)
    .put(uploadUserImage,resizeUserImage,updateUserValidator,updateUser)
    .delete(deleteUserValidator,deleteUser);

usersRoute.put('/:id/changePassword',changeUserPasswordValidator,changeUserPassword)

export default usersRoute;