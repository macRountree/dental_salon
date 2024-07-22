import express from 'express';
import {
  register,
  verifyAccountToken,
  login,
} from '../controllers/authControllers.js';

const router = express.Router();

//* AuthRoutes and user Sign in
router.post('/register', register);
router.get('/verify/:token', verifyAccountToken);
router.post('/login', login);
export default router;
