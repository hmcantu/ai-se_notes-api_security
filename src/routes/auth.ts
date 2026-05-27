import { Router } from 'express';
import { register, login, getProfile } from '../controllers/auth.js';
import { auth } from '../middleware/auth.js';
import { loginLimiter } from '../middleware/limiter.js'; // Note: You can use this same limiter or check if you have a 'registerLimiter' exported here

const router = Router();

// Add the limiter middleware right before the 'register' controller
router.post('/register', loginLimiter, register); 
router.post('/login', loginLimiter, login);
router.get('/me', auth, getProfile);

export default router;