import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';

export const updateUser = async (req, res, next) => {
  console.log('ASDFG', req.user.id, req.params.id);
  if (req.user.id !== req.params.id) {
    // return res.status(401).json('You can update only your account');
    next({ statusCode: 401, message: 'You can only update your account' });
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 12);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};
