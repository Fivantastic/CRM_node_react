import express from 'express';
import { newUserController } from '../controllers/users/newUserController.js';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import { checkAdminPrivileges } from '../middlewares/checkAdminPrivileges.js';
import { updateUserController } from '../controllers/users/updateUserController.js';
import { loginUserControllers } from '../controllers/users/loginUserControllers.js';
import { validateUserController } from '../controllers/users/validateUserControllers.js';

// Creamos un router
export const userRouter = express.Router();

// Ruta user
// userRouter.post('/user/register', authenticateUser, checkAdminPrivileges,  newUserController);

userRouter.post('/user/register',  newUserController);

userRouter.put("/user/validate/:registration_code", validateUserController);

userRouter.post("/user/login", loginUserControllers);

userRouter.put('/user/update/:id_user', authenticateUser, updateUserController);






