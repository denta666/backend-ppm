import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { requireAuth } from '../middlewares/auth';
import { loginSchema } from '../validations/auth.validation';

const router = Router();

router.post('/login', validate(loginSchema), AuthController.login);
router.get('/me', requireAuth, AuthController.me);

export default router;
