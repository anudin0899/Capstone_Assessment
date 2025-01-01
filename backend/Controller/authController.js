const db = require('../Config/db');
const jwt = require('jsonwebtoken');
const { hashData, verifyHashedData } = require('../Utilities/hashData');
const  connectToDatabase  = require('../Config/db')

module.exports = {
    // Sign Up
    signUp: async (req, res) => {
        const { firstName, lastName, email, password } = req.body;
        try {
            const db = connectToDatabase();
            // Check if the email already exists
            const [results] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

            if (results.length > 0) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            const hashedPassword = await hashData(password);
            const user = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: hashedPassword,
            };

            // Insert new user into the database
            await db.query('INSERT INTO users SET ?', user);
            res.status(200).json({ message: 'User created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },

    // Sign In
    signIn: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if the user exists
            const [results] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

            if (results.length === 0) {
                return res.status(404).json({ message: 'Email or password is wrong' });
            }

            const userInfo = results[0];
            const verifyPassword = await verifyHashedData(password, userInfo.password);

            if (verifyPassword) {
                const token = jwt.sign(
                    { id: userInfo.id, email: userInfo.email },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: '1h' }
                );
                res.status(200).json({
                    message: 'Authentication successful',
                    token: token,
                    userInfo: { ...userInfo, password: undefined },
                });
            } else {
                res.status(404).json({ message: 'Email or password is wrong' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },

    // Sign Out
    signout: async (req, res) => {
        res.clearCookie('token');
        res.status(200).json({
            message: 'Signout successfully!',
        });
    },
};
