import express from 'express';
import { registerUser, loginUser } from '../controllers/userController';

const router = express.Router();

// කවුරුහරි POST request එකක් (දත්ත යවන එකක්) '/register' කියන පාරෙන් එව්වොත්, registerUser කියන function එක වැඩ කරන්න කියලා අපි කියනවා.
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;