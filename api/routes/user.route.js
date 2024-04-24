import express from 'express';
import { verifyToken } from '../utils/verifyuser.js';
import { deleteUser, updateUser } from '../controllers/user.controller.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'success' });
});
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

export default router;
