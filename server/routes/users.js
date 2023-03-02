import { Router } from 'express';
import session from 'express-session';
import connect from 'connect-mongodb-session';

import userController from '../controllers/user.js';
import { authLocal, authGoogle, isAdmin, isUserOrAdmin } from '../utils/auth.js';
import ordersRouter from './orders.js';

const MongoDBStore = connect(session);
const store = new MongoDBStore({
    uri: process.env.DB_URL,
    databaseName: 'connect_mongodb_session',
    collection: 'sessions'
});
store.on('error', err => console.log(err));

const usersRouter = Router();

usersRouter.use(
    '/login/google',
    session({ secret: 'google-redirect-route', resave: false, saveUninitialized: false, store })
);

usersRouter.route('/').get(isAdmin, userController.getAll);
usersRouter.route('/signup').post(userController.add);
usersRouter.route('/login').post(authLocal, userController.logIn());
usersRouter.route('/login/google').get(userController.saveGoogleRedirectURL, authGoogle);
usersRouter.route('/login/google/redirect').get(authGoogle, userController.logIn(true));
usersRouter.route('/logout').get(userController.logOut);
usersRouter
    .route('/:id')
    .get(isUserOrAdmin, userController.getOne)
    .put(isUserOrAdmin, userController.update)
    .delete(isUserOrAdmin, userController.delete);
usersRouter.route('/:id/password').put(isUserOrAdmin, userController.updatePassword);
usersRouter.use('/:id/orders', ordersRouter);

export default usersRouter;
