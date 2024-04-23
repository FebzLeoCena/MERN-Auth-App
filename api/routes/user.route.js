import express from 'express';
import { verifyToken } from '../utils/verifyuser.js';
import { updateUser } from '../controllers/user.controller.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'success' });
});
router.post('/update/:id', verifyToken, updateUser);

export default router;
