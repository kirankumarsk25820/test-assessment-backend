import Test from '../models/Test.js';
import Question from '../models/Question.js';
import CodingProblem from '../models/CodingProblem.js';

// Create new test (Admin only)
export const createTest = async (req, res) => {
  try {
    const { name, duration, sections } = req.body; // sections = [{ name, duration }]
    const test = new Test({ name, duration, sections });
    await test.save();
    res.json({ success: true, message: 'Test created successfully', test });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating test', error });
  }
};

// Get all tests (Admin only)
export const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.json({ success: true, tests });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching tests', error });
  }
};

// Get single test with questions (Candidate)
export const getTestWithQuestions = async (req, res) => {
  try {
    const { testId } = req.params;
    const test = await Test.findById(testId).lean();
    if (!test) return res.status(404).json({ success: false, message: 'Test not found' });

    const mcqs = await Question.find({ testId });
    const coding = await CodingProblem.find({ testId });

    res.json({ success: true, test, mcqs, coding });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching test data', error });
  }
};
