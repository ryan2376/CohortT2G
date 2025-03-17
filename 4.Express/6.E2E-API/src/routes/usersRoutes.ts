import express from 'express';
import { loginUser, logOutUser, registerUser } from '../controllers/authController';
import { getUsers } from '../controllers/usersController';

const router = express.Router();

// public routes
// go to the route of api/v1/users then check if they are -are logged in
// if they are an admin
// then get the user- controller
// router.get('/', protect, adminGuard, getUsers)

export default router;