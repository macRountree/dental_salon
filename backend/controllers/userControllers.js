import Appointment from '../models/Appointment.js';

const getUserAppointments = async (req, res) => {
  //* Need pass the user ID (from mongo)

  const {user} = req.params;
  console.log(user, 'user Params');
  console.log(req.user, 'Req User controller');
  const role = 'admin';
  if (user !== req.user._id.toString() && role !== 'admin') {
    const error = new Error('Access Denied');
    return res.status(400).json({msg: error.message});
  }
  try {
    //*Bring all appointments from user id Selected     || logged

    const userAppointments = await Appointment.find({
      user,
      date: {
        $gte: new Date(),
      },
    })
      .populate('services')
      .sort({date: 'asc'}); //*extract service name

    res.json(userAppointments);
  } catch (error) {
    console.log(error);
  }
};
export {getUserAppointments};
