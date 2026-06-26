import { Router } from 'express';
import { GalleryController } from '../controllers/gallery.controller';
import { requireAuth } from '../middlewares/auth';

const router = Router();

router.get('/', GalleryController.findAll);
router.post('/', requireAuth, GalleryController.create);
router.delete('/:id', requireAuth, GalleryController.delete);

export default router;