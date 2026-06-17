import express from 'express';
// 11. Object Destructuring වගේ import එකක් (අලුත් function එකත් import කරගන්නවා)
import { createPersonalizedPlan , getUserWorkouts } from '../controllers/workoutController';

const router = express.Router();

// Route Handler (POST request එකක් /generate කියන පාරෙන් ආවොත් මේක වැඩ)
router.post('/generate', createPersonalizedPlan);

// Route Handler (GET: තියෙන ඒවා බලන්න)
// 💡 :userId කියන්නේ URL එකේ වෙනස් වෙන කෑල්ලක් (Dynamic Parameter).
router.get('/:userId', getUserWorkouts);

export default router;