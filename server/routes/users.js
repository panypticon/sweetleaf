import { Router } from 'express';

import userController from '../controllers/user.js';
import { authLocal, authGoogle, isAdmin, isUserOrAdmin } from '../utils/auth.js';

const usersRouter = Router();

usersRouter.route('/').get(isAdmin, userController.getAll);
usersRouter
    .route('/:id')
    .get(isUserOrAdmin, userController.getOne)
    .put(isUserOrAdmin, userController.update)
    .delete(isUserOrAdmin, userController.delete);
usersRouter.route('/signup').post(userController.signUp);
usersRouter.route('/login').post(authLocal, userController.logIn());
usersRouter.route('/login/google').get(authGoogle);
usersRouter.route('/login/google/redirect').get(authGoogle, userController.logIn(true));

export default usersRouter;
