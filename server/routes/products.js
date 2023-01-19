import { Router } from 'express';

import productController from '../controllers/products.js';
import { isLoggedIn, isAdmin } from '../utils/auth.js';

const productsRouter = Router();

productsRouter.route('/').get(productController.getAll);
productsRouter.route('/add').post(isAdmin, productController.add);

export default productsRouter;
