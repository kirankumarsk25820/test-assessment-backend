import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const ADMIN_EMAIL = 'test@pushpagiritechnology.com';
const ADMIN_PASSWORD = 'admin12345';

// ✅ Register new candidate
export const register = async (req, res) => {
    try {
        const { name, email, password, testCode, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            testCode,
            role: role || 'candidate'
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// ✅ Login for admin and candidates
export const login = async (req, res) => {
    try {
        const { email, password, testCode } = req.body;

        // 🔹 Admin Login
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '8h' });
            return res.json({ message: 'Admin login successful', token, role: 'admin' });
        }

        // 🔹 Candidate Login
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check test code
        if (user.role === 'candidate') {
            if (!testCode || testCode !== user.testCode) {
                return res.status(400).json({ message: 'Invalid or missing test code' });
            }
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' });
        res.json({ message: 'Login successful', token, role: user.role });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
