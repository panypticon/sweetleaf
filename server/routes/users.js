import { Router } from 'express';

import userController from '../controllers/user.js';
import { authLocal, authJWT, authGoogle } from '../utils/auth.js';

const usersRouter = Router();

usersRouter.route('/signup').post(userController.signUp);
usersRouter.route('/login').post(authLocal, userController.logIn());
usersRouter.route('/login/google').get(authGoogle);
usersRouter.route('/login/google/redirect').get(authGoogle, userController.logIn(true));

export default usersRouter;
