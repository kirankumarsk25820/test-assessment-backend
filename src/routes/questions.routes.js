import express from 'express';
import { addQuestion, getQuestions } from '../controllers/questions.controller.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Admin: Add MCQ
router.post('/', protect, adminOnly, addQuestion);

// Get MCQs by Test ID
router.get('/:testId', protect, getQuestions);

export default router;
