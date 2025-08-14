import Question from '../models/Question.js';

// Add a new MCQ (Admin)
export const addQuestion = async (req, res) => {
  try {
    const { testId, section, question, options, correctAnswer } = req.body;
    const q = new Question({ testId, section, question, options, correctAnswer });
    await q.save();
    res.json({ success: true, message: 'Question added successfully', q });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding question', error });
  }
};

// Get questions by testId
export const getQuestions = async (req, res) => {
  try {
    const { testId } = req.params;
    const questions = await Question.find({ testId });
    res.json({ success: true, questions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching questions', error });
  }
};
