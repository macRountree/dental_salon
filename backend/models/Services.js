import mongoose from 'mongoose';

const servicesSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  price: {
    type: Number,
  },
});

const Services = mongoose.model('Services', servicesSchema);

export default Services;
