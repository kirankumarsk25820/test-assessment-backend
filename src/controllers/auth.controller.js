import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Admin login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hardcoded admin credentials
    if (email === 'test@pushpagiritechnology.com' && password === 'admin12345') {
      const token = jwt.sign({ role: 'admin', email }, process.env.JWT_SECRET, { expiresIn: '8h' });
      return res.json({ success: true, token, role: 'admin' });
    }

    return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

// Candidate login (email + test code)
export const candidateLogin = async (req, res) => {
  try {
    const { email, testCode } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      // If not existing, create new candidate
      user = new User({
        email,
        testCode,
        role: 'candidate'
      });
      await user.save();
    } else if (user.testCode !== testCode) {
      return res.status(401).json({ success: false, message: 'Invalid test code' });
    }

    const token = jwt.sign({ id: user._id, email: user.email, role: 'candidate' }, process.env.JWT_SECRET, { expiresIn: '8h' });

    res.json({ success: true, token, role: 'candidate' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};
