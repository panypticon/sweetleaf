import { Router } from 'express';

import userController from '../controllers/user.js';

const usersRouter = Router();

usersRouter.route('/signup').post(userController.signUp);

export default usersRouter;
