import { Router } from 'express';

import productController from '../controllers/products.js';

const productsRouter = Router();

productsRouter.route('/').get(productController.getAll);
