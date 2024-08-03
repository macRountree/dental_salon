import mongoose from 'mongoose';

const appointmentSchema = mongoose.Schema({
  //* define service
  services: [
    //* Cros models Services
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Services',
    },
  ],
  //* need type DAte to filter appointments
  date: {
    type: Date,
  },
  time: {
    type: String,
  },
  totalAmount: {
    type: Number,
  },
  //*Cross model of User
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
