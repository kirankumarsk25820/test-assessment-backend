import CodingProblem from '../models/CodingProblem.js';
import Submission from '../models/Submission.js';
import { executeCode } from '../utils/judge0.js';

// Add coding problem (Admin)
export const addCodingProblem = async (req, res) => {
  try {
    const { testId, title, description, sampleInput, sampleOutput, language } = req.body;
    const problem = new CodingProblem({ testId, title, description, sampleInput, sampleOutput, language });
    await problem.save();
    res.json({ success: true, message: 'Coding problem added successfully', problem });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding coding problem', error });
  }
};

// Submit code (Candidate)
export const submitCode = async (req, res) => {
  try {
    const { userId, problemId, sourceCode, languageId, stdin } = req.body;
    const output = await executeCode(sourceCode, languageId, stdin);

    const submission = new Submission({
      userId,
      problemId,
      sourceCode,
      languageId,
      stdin,
      output
    });
    await submission.save();

    res.json({ success: true, output });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error submitting code', error });
  }
};
