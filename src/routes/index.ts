import { Router } from 'express';
import contactRoutes from './contact.routes';
import reviewRoutes from './review.routes';
import authRoutes from './auth.routes';
import menuRoutes from './menu.routes';
import galleryRoutes from './gallery.routes';

console.log("ROUTES INDEX LOADED");

const router = Router();

router.get('/test-route', (_req, res) => {
  res.json({ message: 'routes/index OK' });
});

router.use('/contact', contactRoutes);
router.use('/reviews', reviewRoutes);
router.use('/auth', authRoutes);
router.use('/menus', menuRoutes);
router.use('/galleries', galleryRoutes);

export default router;