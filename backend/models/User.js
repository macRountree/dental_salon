import mongoose from 'mongoose';
import {uniqueId} from '../helpers/index.js';
import bcrypt from 'bcrypt';
const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  token: {
    type: String,
    default: () => uniqueId(),
  },
  verified: {
    type: Boolean,
    default: false,
  },
  admin: {type: Boolean, default: false},
});

//*Hashing pasword before save at DB
userSchema.pre('save', async function (next) {
  //* if password not modified then execute next middleware
  if (!this.isModified('password')) {
    next();
  }

  //* else salt(ran) + password hashed encrypted
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.checkPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
