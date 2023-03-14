import { Router } from 'express';

import productController from '../controllers/product.js';
import { isAdmin } from '../utils/auth.js';
import ratingsRouter from './rating.js';

const productsRouter = Router({ mergeParams: true });

productsRouter.route('/').get(productController.getAll);
productsRouter.route('/add').post(isAdmin, productController.add);
productsRouter.route('/query').get(productController.query);
productsRouter.route('/allstars').get(productController.getAllstars);
productsRouter.route('/categories').get(productController.getCategories);
productsRouter
    .route('/:id')
    .get(productController.getOne)
    .put(isAdmin, productController.update)
    .delete(isAdmin, productController.delete);
productsRouter.use('/:id/ratings', ratingsRouter);

export default productsRouter;
