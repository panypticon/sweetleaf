import { Router } from 'express';

import orderController from '../controllers/order.js';
import { isAdmin, isEmbeddedUserOrAdmin } from '../utils/auth.js';

const ordersRouter = Router();

ordersRouter.route('/').get(isAdmin, orderController.getAll);
ordersRouter.route('/add').post(isEmbeddedUserOrAdmin, orderController.add);
ordersRouter
    .route('/:id')
    .get(isEmbeddedUserOrAdmin, orderController.getOne)
    .put(isEmbeddedUserOrAdmin, orderController.update)
    .delete(isEmbeddedUserOrAdmin, orderController.delete);

export default ordersRouter;
