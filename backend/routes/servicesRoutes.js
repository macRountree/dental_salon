import express from 'express';
import {services} from '../data/dentalServices.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.json(services);
});

//*export router that will be used by index.js file
export default router;
