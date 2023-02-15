import { Router } from 'express';

import ratingController from '../controllers/rating.js';
import { isAdmin, isEmbeddedUserOrAdmin } from '../utils/auth.js';

const ratingsRouter = Router({ mergeParams: true });

ratingsRouter.route('/').get(ratingController.getAll);
ratingsRouter.route('/add').post(isEmbeddedUserOrAdmin, ratingController.add);
ratingsRouter
    .route('/:id')
    .get(ratingController.getOne)
    .put(isEmbeddedUserOrAdmin, ratingController.update)
    .delete(isEmbeddedUserOrAdmin, ratingController.delete);

export default ratingsRouter;
