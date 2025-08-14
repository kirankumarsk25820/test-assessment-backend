import express from 'express';
import { register, login } from '../controllers/auth.controller.js';

const router = express.Router();

// Candidate register/login
router.post('/register', register);
router.post('/login', login);

export default router;
