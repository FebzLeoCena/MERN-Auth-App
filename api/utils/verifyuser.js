import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) res.status(401).json('You are not authenticated');
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) res.status(403).json('Token is not valid');
    req.user = user;
    next();
  });
};
