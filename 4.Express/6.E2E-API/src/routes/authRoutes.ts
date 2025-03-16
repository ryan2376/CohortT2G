import express from 'express';
import { loginUser, registerUser } from '../controllers/authController';

const router = express.Router();

// public routes
router.post('/register', registerUser)
router.post('/login', loginUser)

export default router;