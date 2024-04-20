import { Router } from 'express';
import { loginUserControllers } from '../controllers/users/loginUserControllers.js';
import { validateUserController } from '../controllers/users/validateUserControllers.js';

export const authRouter = Router();

authRouter.post("/login", loginUserControllers);

authRouter.put("/validate/:registration_code", validateUserController);
