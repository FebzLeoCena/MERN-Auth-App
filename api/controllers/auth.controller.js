import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 12);
  console.log(username, email, password);
  const newUser = new User({ username, email, password: hashedPassword });
  console.log('newUser', newUser);

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
    console.log('validateUser', req.body, validateUser);

    if (!validateUser)
      res.status(404).json({ success: false, message: 'User not Found' });
    const { password: hashedPassword, ...rest } = validateUser._doc;
    const validatePassword = bcryptjs.compareSync(
      password,
      validateUser.password
    );
    console.log('validatePassword', req.body, validatePassword);

    if (!validatePassword)
      res.status(401).json({ success: false, message: 'Invalid Cred' });

    const token = jwt.sign({ id: validateUser._id }, process.env.JWT_SECRET);
    const expiryDate = new Date(Date.now() + 3600000); //milliseconds 1 hhour
    res
      .cookie(
        'access_token',
        token,
        {
          withCredentials: true,
          sameSite: 'none',
          secure: true,
          httpOnly: true,
        }
        // {
        //   expires: expiryDate,
        //   // sameSite: 'None',
        //   httpOnly: true,
        // }
      )
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    console.log('google in 1');
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log('google in 2');

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      console.log('CookieTestToken1', token);

      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); //milliseconds 1 hhour
      res
        .cookie(
          'access_token',
          token,
          {
            withCredentials: true,
            sameSite: 'none',
            secure: true,
            httpOnly: true,
          }
          // {
          //   expires: expiryDate,
          //   httpOnly: true,
          // }
        )
        .status(200)
        .json(rest);
    } else {
      console.log('google in 3');

      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 12);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.floor(Math.random() * 10000).toString(),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      console.log('CookieTestToken2', token);

      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); //milliseconds 1 hhour
      res
        .cookie(
          'access_token',
          token,
          {
            withCredentials: true,
            sameSite: 'none',
            secure: true,
            httpOnly: true,
          }
          //  {
          //   expires: expiryDate,
          //   httpOnly: true,
          // }
        )
        .status(200)
        .json(rest);
    }
  } catch (err) {
    next(err);
  }
};
