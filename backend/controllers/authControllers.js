import User from '../models/User.js';
import {sendEmailVerification} from '../email/authEmailService.js';

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
    const errorToken = new Error('User not Verified');
    return res.status(401).json({msg: errorToken.message});
  }
  //* Confir Password

  if (await user.checkPassword(password)) {
    res.json({msg: 'User Auth'});
  } else {
    const errorPassword = new Error('Password incorrect');
    return res.status(401).json({msg: errorPassword.message});
  }
};

export {register, verifyAccountToken, login};
