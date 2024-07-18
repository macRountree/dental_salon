import express from 'express';
import {services} from '../data/dentalServices.js';
import {
  createService,
  getServiceById,
  getServices,
  updateService,
  deleteService,
} from '../controllers/servicesControllers.js';
const router = express.Router();
router.route('/').post(createService).get(getServices);
router
  .route('/:id')
  .get(getServiceById)
  .put(updateService)
  .delete(deleteService);

//*export router that will be used by index.js file
export default router;
