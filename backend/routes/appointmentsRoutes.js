import express from 'express';
import {
  createAppointment,
  getAppointmetsByDate,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from '../controllers/appointmentControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';
import {validateObjectId, handleNotFoundError} from '../helpers/index.js';

const router = express.Router();
//*confirm auth user by middleware
router
  .route('/')
  .post(authMiddleware, createAppointment)
  .get(authMiddleware, getAppointmetsByDate);

router
  .route('/:id')
  .get(authMiddleware, getAppointmentById)
  .put(authMiddleware, updateAppointment)
  .delete(authMiddleware, deleteAppointment);
export default router;
