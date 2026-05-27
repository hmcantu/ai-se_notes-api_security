import { Router } from 'express';
import { register, login, getProfile } from '../controllers/auth.js';
import { auth } from '../middleware/auth.js';
import { loginLimiter } from '../middleware/limiter.js';

const router = Router();

router.post('/register', register);
router.post('/login', loginLimiter, login);
router.get('/me', auth, getProfile);

export default router;