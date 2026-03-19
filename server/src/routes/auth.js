import express from 'express';
import { register, login } from '../controllers/authController.js';
import { checkNotAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', checkNotAuthenticated, register);
router.post('/login', checkNotAuthenticated, login);

export default router;
