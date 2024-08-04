import express from 'express';
import {
  register,
  verifyAccountToken,
  login,
  userAuth,
  forgotPassword,
  verifyPasswordResetToken,
  updatePassword,
  adminAuth,
} from '../controllers/authControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

//*
const router = express.Router();

//* AuthRoutes and user Sign in
router.post('/register', register);
router.get('/verify/:token', verifyAccountToken);
router.post('/login', login);

//*Reset Pasword
router.post('/forgot-password', forgotPassword);
router
  .route('/forgot-password/:token')
  .get(verifyPasswordResetToken)
  .post(updatePassword);

//* Private - JWT required , first authmiddleware >  Second userAuth
router.get('/user', authMiddleware, userAuth);
router.get('/admin', authMiddleware, adminAuth);
export default router;
