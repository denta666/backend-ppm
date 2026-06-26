import { Router } from 'express';
import { MenuController } from '../controllers/menu.controller';
import { validate } from '../middlewares/validate';
import { requireAuth } from '../middlewares/auth';
import { createMenuSchema, updateMenuSchema } from '../validations/menu.validation';

const router = Router();

// Public — frontend pakai ini untuk tampilkan menu
router.get('/', MenuController.findAll);

// Protected — hanya admin yang login
router.post('/', requireAuth, validate(createMenuSchema), MenuController.create);
router.put('/:id', requireAuth, validate(updateMenuSchema), MenuController.update);
router.delete('/:id', requireAuth, MenuController.delete);

export default router;
