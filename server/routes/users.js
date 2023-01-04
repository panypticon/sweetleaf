import { Router } from 'express';

import userController from '../controllers/user.js';
import { authLocal } from '../utils/auth.js';

const usersRouter = Router();

usersRouter.route('/signup').post(userController.signUp);
usersRouter.route('/login').post(authLocal, userController.logIn);

export default usersRouter;
