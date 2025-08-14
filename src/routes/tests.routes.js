import express from 'express';
import { createTest, getAllTests, getTestWithQuestions } from '../controllers/tests.controller.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Admin: Create test
router.post('/', protect, adminOnly, createTest);

// Admin: Get all tests
router.get('/', protect, adminOnly, getAllTests);

// Candidate: Get test with questions
router.get('/:testId', protect, getTestWithQuestions);

export default router;
