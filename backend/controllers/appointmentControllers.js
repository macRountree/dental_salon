//*create, update, list , change  and delete appointments
import {
  sendEmailDeleteAppointment,
  sendEmailNewAppointment,
  sendEmailUpdateAppointment,
} from '../email/appointmentEmailService.js';
import {
  formateDate,
  handleNotFoundError,
  validateObjectId,
} from '../helpers/index.js';
import Appointment from '../models/Appointment.js';
import {parse, formatISO, startOfDay, endOfDay, isValid} from 'date-fns';

//*create
const createAppointment = async (req, res) => {
  const appointmentBody = req.body;
  appointmentBody.user = req.user._id.toString(); //*Store reqUser to string

  try {
    const newAppointment = new Appointment(appointmentBody);
    const result = await newAppointment.save();

    await sendEmailNewAppointment({
      date: formateDate(result.date),
      time: result.time,
    });

    res.json({msg: 'Appointment created successfully'});
  } catch (error) {
    console.log(error, 'Error createAppointmen');
  }
};
const getAppointmetsByDate = async (req, res) => {
  //* the endpoint from date  => appointments?date=2024/08/14 need to use req.query
  const {date} = req.query;
  const newDate = parse(date, 'yyyy/MM/dd', new Date());

  //*validate the date with isValid (date-fns funct)

  if (!isValid(newDate)) {
    const errorDate = new Error('invalid format Date');
    return res.status(400).json({
      msg: errorDate.message,
    });
  }

  const isoDate = formatISO(newDate);

  const appointments = await Appointment.find({
    date: {
      //*$gte from startOf day
      $gte: startOfDay(new Date(isoDate)),
      //*until end of day
      $lte: endOfDay(new Date(isoDate)),
    },
  }).select('time'); //* Only brings the time from the object,
  res.json(appointments);
  console.log(appointments);
};

const getAppointmentById = async (req, res) => {
  const {id} = req.params;

  //*Validate ObjectID
  if (validateObjectId(id, res)) return;

  //*validate Exist

  const appointmentExist = await Appointment.findById(id).populate('services');

  if (!appointmentExist) {
    return handleNotFoundError('Appointment does not exist', res);
  }

  //* Validate  if user create the appointment and user authenticated

  if (appointmentExist.user.toString() !== req.user._id.toString()) {
    const error = new Error('You do not have permission to create this post.');
    return res.status(403).json({msg: error.message});
  }
  res.json(appointmentExist);
};

const updateAppointment = async (req, res) => {
  console.log('From updateAppointment');
  const {id} = req.params;

  //*Validate ObjectID
  if (validateObjectId(id, res)) return;

  //*validate Exist

  const appointmentExist = await Appointment.findById(id).populate('services');

  if (!appointmentExist) {
    return handleNotFoundError('Appointment does not exist', res);
  }
  console.log(appointmentExist.user, 'UPDATE appointment exist');
  console.log(req.user._id, 'Req user ID', 'user appointmentExist');

  //* Validate  if user create the appointment and user authenticated

  if (appointmentExist.user.toString() !== req.user._id.toString()) {
    const error = new Error('You do not have permission to create this post.');
    return res.status(403).json({msg: error.message});
  }

  //*Build object to update
  const {date, time, totalAmount, services} = req.body;
  appointmentExist.date = date;
  appointmentExist.time = time;
  appointmentExist.totalAmount = totalAmount;
  appointmentExist.services = services;

  try {
    const result = await appointmentExist.save();
    await sendEmailUpdateAppointment({
      date: formateDate(result.date),
      time: result.time,
    });
    res.json({msg: 'Appointment Updated Successful'});
  } catch (error) {
    console.log(error);
  }
};

const deleteAppointment = async (req, res) => {
  const {id} = req.params;

  //*Validate ObjectID
  if (validateObjectId(id, res)) return;

  //*validate Exist

  const appointmentExist = await Appointment.findById(id).populate('services');

  if (!appointmentExist) {
    return handleNotFoundError('Appointment does not exist', res);
  }
  console.log(appointmentExist.user, 'user appointmentExist');
  console.log(req.user._id, 'Req user ID', 'user appointmentExist');

  //* Validate  if user create the appointment and user authenticated

  if (appointmentExist.user.toString() !== req.user._id.toString()) {
    const error = new Error('You do not have permission to create this post.');
    return res.status(403).json({msg: error.message});
  }

  try {
    const result = await appointmentExist.deleteOne();
    await sendEmailDeleteAppointment({
      date: formateDate(appointmentExist.date),
      time: appointmentExist.time,
    });

    res.json({msg: 'Appointment Deleted Succesfull'});
  } catch (error) {
    console.log(error);
  }
};
export {
  createAppointment,
  getAppointmetsByDate,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};
