import { Router } from 'express';
import contactRoutes from './contact.routes';
import reviewRoutes from './review.routes';

const router = Router();

router.use('/contact', contactRoutes);
router.use('/reviews', reviewRoutes);

export default router;
