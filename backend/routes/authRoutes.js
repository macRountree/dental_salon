import express from 'express';
import {
  register,
  verifyAccountToken,
  login,
  userAuth,
} from '../controllers/authControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

//*
const router = express.Router();

//* AuthRoutes and user Sign in
router.post('/register', register);
router.get('/verify/:token', verifyAccountToken);
router.post('/login', login);

//* Private - JWT required , first authmiddleware >  Second userAuth
router.get('/user', authMiddleware, userAuth);
export default router;
