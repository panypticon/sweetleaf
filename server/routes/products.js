import { Router } from 'express';

import productController from '../controllers/products.js';
import { isAdmin } from '../utils/auth.js';

const productsRouter = Router();

productsRouter.route('/').get(productController.getAll);
productsRouter.route('/add').post(isAdmin, productController.add);
productsRouter
    .route('/:id')
    .get(productController.getOne)
    .put(isAdmin, productController.update)
    .delete(isAdmin, productController.delete);

export default productsRouter;
