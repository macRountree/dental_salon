import User from '../models/User.js';
import {
  sendEmailPasswordReset,
  sendEmailVerification,
} from '../email/authEmailService.js';
import {generateJWT, uniqueId} from '../helpers/index.js';
/*
{
Validation
Required Fields
Hash Password
Duplicates Emails
}

*/
const register = async (req, res) => {
  if (Object.values(req.body).includes('')) {
    const error = new Error('All fields required');
    return res.status(400).json({msg: error.message});
  }

  const {email, password, name} = req.body;
  //*Avoid Duplicate Emails

  const userExist = await User.findOne({email});
  if (userExist) {
    const error = new Error(`User with Email: ${email} already exist`);
    return res.status(400).json({msg: error.message});
  }

  //*Password Length
  const MIN_PASSWORD_LENGTH = 8;
  if (password.trim().length < MIN_PASSWORD_LENGTH) {
    const errorLength = new Error(
      `Password must have minimum ${MIN_PASSWORD_LENGTH} Characters`
    );
    return res.status(400).json({msg: errorLength.message});
  }

  try {
    const user = new User(req.body);
    const resultUserSave = await user.save();

    //*extract name / email / token from DB to send Via Email
    const {name, email, token} = resultUserSave;
    sendEmailVerification({
      name,
      email,
      token,
    });
    res.json({msg: 'User Created Success, Verify your Email'});
  } catch (error) {
    console.log(error, 'Error authcontroller.js');
  }
  //   console.log(req.body);
};

const verifyAccountToken = async (req, res) => {
  //*need verifiy if token exist in every user
  const {token} = req.params;
  const user = await User.findOne({token});

  if (!user) {
    const errorToken = new Error('invalid Token');
    return res.status(401).json({msg: errorToken.message}); //*401 Unauthorized or 403 Forbidden
  }

  try {
    user.verified = true;
    user.token = ''; //*remove token before save in DB for security in browser
    await user.save();
    res.json({msg: 'User Confirmation Success'});
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({email});

  if (!user) {
    const errorUserExist = new Error('User not Exist');
    return res.status(401).json({msg: errorUserExist.message});
  }

  /**Check user Exist */
  //* Check User Confirms Account

  if (!user.verified) {
    const errorToken = new Error(
      'User not Verified. Please check your E-mail to Verify it.'
    );
    return res.status(401).json({msg: errorToken.message});
  }
  //* Confir Password

  if (await user.checkPassword(password)) {
    //*Call JTW and generate TOKEN with _id
    const token = generateJWT(user._id);
    res.json({token});
  } else {
    const errorPassword = new Error('Password incorrect');
    return res.status(401).json({msg: errorPassword.message});
  }
};

const forgotPassword = async (req, res) => {
  const {email} = req.body;

  //*Verify if user exist
  const user = await User.findOne({email});

  if (!user) {
    const errorPassword = new Error(`User with email: ${email} does not exist`);
    return res.status(401).json({msg: errorPassword.message});
  }
  //*else user exist then generate Token
  try {
    user.token = uniqueId();

    const result = await user.save();
    await sendEmailPasswordReset({
      name: result.name,
      email: result.email,
      token: result.token,
    });
    res.json({msg: 'Send Email'});
  } catch (error) {
    console.log(error);
  }
  console.log(email, 'from ForgotPassword');
};

const verifyPasswordResetToken = async (req, res) => {
  const {token} = req.params;
  console.log(token, `verifiypasswor ${token} `);
  const isValidtoken = await User.findOne({token});
  if (!isValidtoken) {
    const errorToken = new Error('invalid Token');
    return res.status(400).json({msg: errorToken.message});
  }
  res.json({msg: 'valid Token'});
};
const updatePassword = async (req, res) => {
  const {token} = req.params;
  console.log(token, `verifiypasswor ${token} `);
  const user = await User.findOne({token});
  console.log(user);
  if (!user) {
    const errorToken = new Error('invalid Token');
    return res.status(400).json({msg: errorToken.message});
  }
  const {password} = req.body;
  // // console.log(password);
  try {
    user.token = '';
    user.password = password;
    await user.save();
    res.json({msg: 'Password modified Success'});
  } catch (error) {
    console.log(error);
  }
};

const userAuth = async (req, res) => {
  //*We have the token  with req.user decoded from middleware ... next() method of middleware send the require right here
  console.log('From user authController', req.user);

  const {user} = req;
  res.json({user});
};
const adminAuth = async (req, res) => {
  const {user} = req;
  //*If !user is admin  then restringed access
  if (!user.admin) {
    const errorAdmin = new Error('Not Valid Action');
    return res.status(403).json({msg: errorAdmin.message});
  }

  res.json(user);
};

export {
  register,
  verifyAccountToken,
  login,
  userAuth,
  adminAuth,
  verifyPasswordResetToken,
  updatePassword,
  forgotPassword,
};
