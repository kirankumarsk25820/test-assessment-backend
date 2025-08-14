import express from 'express';
import { addCodingProblem, submitCode } from '../controllers/coding.controller.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Admin: Add coding problem
router.post('/', protect, adminOnly, addCodingProblem);

// Candidate: Submit code
router.post('/submit', protect, submitCode);

export default router;
