import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 12);
  console.log(username, email, password);
  const newUser = new User({ username, email, password: hashedPassword });
  console.log(newUser);

  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    next(err);

    // for custom error
    // export const errorHandler=(status,msg)=>{
    // const error = new Error();
    // error.status=status;
    // error.message=msg;
    // return error
    // })
    // then call
    // next(errorHandler(400,'invalid request'))
  }
};
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validateUser = await User.findOne({ email });
    console.log('Checking QQWZASW', req.body, validateUser);

    if (!validateUser) res.status(404).json({ message: 'User not Found' });
    const { password: hashedPassword, ...rest } = validateUser._doc;
    const validatePassword = bcryptjs.compareSync(
      password,
      validateUser.password
    );
    console.log('Checking QQWASW', req.body);

    if (!validatePassword) res.status(401).json({ message: 'Invalid Cred' });

    const token = jwt.sign({ id: validateUser._id }, process.env.JWT_SECRET);
    const expiryDate = new Date(Date.now() + 3600000); //milliseconds 1 hhour
    res
      .cookie('access_token', token, {
        httpOnly: true,
        expires: expiryDate,
        sameSite: 'None',
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
