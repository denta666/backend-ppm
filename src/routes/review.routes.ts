import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller';
import { validate } from '../middlewares/validate';
import { createReviewSchema } from '../validations/review.validation';

const router = Router();

router.get('/', ReviewController.findAll);
router.post('/', validate(createReviewSchema), ReviewController.create);
router.delete('/:id', ReviewController.delete);

export default router;
