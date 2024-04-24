import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log('token from browser', req.cookies);
  if (!token) return res.status(401).json('You are not authenticated');
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json('Token is not valid');
    req.user = user;
    next();
  });
};
