import { Router } from 'express';

import orderController from '../controllers/order.js';
import { isEmbeddedUserOrAdmin, isUserOrAdmin, isLoggedIn } from '../utils/auth.js';

const ordersRouter = Router({ mergeParams: true });

ordersRouter.route('/').get(isUserOrAdmin, orderController.getAll);
ordersRouter.route('/add').post(isEmbeddedUserOrAdmin, orderController.add);
ordersRouter
    .route('/:id')
    .get(isLoggedIn, orderController.getOne) // Further auth in controller
    .put(isEmbeddedUserOrAdmin, orderController.update)
    .delete(isEmbeddedUserOrAdmin, orderController.delete);

export default ordersRouter;
