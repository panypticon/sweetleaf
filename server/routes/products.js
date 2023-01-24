import { Router } from 'express';

import productController from '../controllers/product.js';
import { isAdmin } from '../utils/auth.js';

const productsRouter = Router();

productsRouter.route('/').get(productController.getAll);
productsRouter.route('/add').post(isAdmin, productController.add);
productsRouter.route('/query').get(productController.query);
productsRouter
    .route('/:id')
    .get(productController.getOne)
    .put(isAdmin, productController.update)
    .delete(isAdmin, productController.delete);

export default productsRouter;
