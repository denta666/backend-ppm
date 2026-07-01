import { Router } from 'express';

console.log("AUTH ROUTES LOADED");

const router = Router();

router.post('/login', (_req, res) => {
  res.json({ message: 'LOGIN ROUTE OK' });
});

export default router;