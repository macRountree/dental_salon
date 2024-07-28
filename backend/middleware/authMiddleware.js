import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const authMiddleware = async (req, res, next) => {
  console.log();

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //*Pass with token
      //! Split needs this space extension ' ' to recover only Token

      const tokenNoBearer = req.headers.authorization.split(' ')[1];
      // console.log('With token', tokenNoBearer);
      //*Then generate JWT
      const decoded = jwt.verify(tokenNoBearer, process.env.JWT_SECRET);
      //   console.log(decoded, 'from decodeToken'); //*

      req.user = await User.findById(decoded.id).select(
        '-password -verified -token -__v'
      ); //*delist password , verified,token and __v  in object
      //   console.log(user);
      next();
    } catch (error) {
      const errorToken = new Error('Invalid  Token');
      res.status(403).json({msg: errorToken.message});
      console.log(errorToken);
    }
  } else {
    const errorToken = new Error('Invalid or Inexistent Token');
    res.status(403).json({msg: errorToken.message});
    console.log(errorToken);
  }
  //*Node doesnt now when the exe function is done, next() function proceed to next functions "userAuth in this case"
  // next();
};

export default authMiddleware;
