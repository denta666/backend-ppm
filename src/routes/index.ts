import { Router } from 'express';
import contactRoutes from './contact.routes';
import reviewRoutes from './review.routes';
import authRoutes from './auth.routes';
import menuRoutes from './menu.routes'; // ← tambah ini

const router = Router();

router.use('/contact', contactRoutes);
router.use('/reviews', reviewRoutes);
router.use('/auth', authRoutes);
router.use('/menus', menuRoutes); // ← tambah ini

export default router;