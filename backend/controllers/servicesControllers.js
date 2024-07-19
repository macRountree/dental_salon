import Services from '../models/Services.js';
import {validateObjectId, handleNotFoundError} from '../helpers/index.js';
const createService = async (req, res) => {
  if (Object.values(req.body).includes('')) {
    const error = new Error('All inputs required');
    return res.status(400).json({
      msg: error.message,
    });
  }
  try {
    const service = new Services(req.body);
    await service.save();
    res.json({msg: 'Add Service Success'});
  } catch (error) {
    console.log(error);
  }
};

const getServices = async (req, res) => {
  try {
    const services = await Services.find();
    res.json(services);
  } catch (error) {
    console.log(error);
  }
};

const getServiceById = async (req, res) => {
  //* Validate Object ID
  const {id} = req.params;
  if (validateObjectId(id, res)) return;

  //* validate exist id

  const service = await Services.findById(id);
  if (!service) {
    return handleNotFoundError('Service not exist', res);
  }
  res.json(service);
};

//* Update is more complex than others, we need validate if id exist, get the "service" and update the new service

const updateService = async (req, res) => {
  //* Validate Object ID
  const {id} = req.params;
  if (validateObjectId(id, res)) return;

  //* validate exist id

  const service = await Services.findById(id);
  if (!service) {
    return handleNotFoundError('Service not exist', res);
  }
  console.log(service);
  console.log(id);
  console.log(req.body);

  //* New ObjectValues
  service.name = req.body.name || service.name;
  service.price = req.body.price || service.price;

  try {
    await service.save();
    res.json({
      msg: 'Dental service was updated successfully',
    });
  } catch (error) {
    console.log(error);
  }
};

//* Delete Function

const deleteService = async (req, res) => {
  //* Validate Object ID
  const {id} = req.params;
  if (validateObjectId(id, res)) return;

  //* validate exist id

  const service = await Services.findById(id);
  if (!service) {
    return handleNotFoundError('Service not exist', res);
  }

  try {
    await service.deleteOne();
    res.json({msg: 'Service Deleted'});
  } catch (error) {
    console.log(error);
  }
};
export {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};
