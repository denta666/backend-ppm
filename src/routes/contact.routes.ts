import { Router } from 'express';
import { ContactController } from '../controllers/contact.controller';
import { validate } from '../middlewares/validate';
import { createContactSchema } from '../validations/contact.validation';

const router = Router();

router.post('/', validate(createContactSchema), ContactController.create);
router.get('/', ContactController.getAll);
router.delete('/:id', ContactController.delete);

export default router;
