import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
function validateObjectId(id, res) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('invalid ID');
    return res.status(400).json({msg: error.message});
  }
}

function handleNotFoundError(msg, res) {
  const error = new Error(msg);
  return res.status(404).json({msg: error.message});
}
//*Token by Date (not install dependencies)

const uniqueId = () =>
  Date.now().toString(32) + Math.random().toString(32).substring(2);

const generateJWT = id => {
  //* TIP: DONT store Creditcard, Passwords, Classified Info in payload Object
  //* Payload = id ,
  const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'});
  return token;
};

export {validateObjectId, handleNotFoundError, uniqueId, generateJWT};
