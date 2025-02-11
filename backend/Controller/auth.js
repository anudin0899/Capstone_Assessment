const express = require('express');
const { hashData, verifyHashedData } = require('../Utilities/hashData');
const jwt = require('jsonwebtoken');
const db = require('../Config/db');

const router = express.Router();

// Sign Up
router.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        console.log(firstName, lastName, email, password);

        // Check if the email already exists
        const [results] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (results.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await hashData(password);
        await db.execute(
            "INSERT INTO users(first_name, last_name, email, password) VALUES(?, ?, ?, ?)",
            [firstName, lastName, email, hashedPassword]
        );

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// Sign In
router.post("/signin", async (req, res) => {
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

            res.cookie('token', token, { httpOnly: true, secure: true });
            res.status(200).json({
                message: 'Authentication successful',
                userInfo: { ...userInfo, password: undefined },
            });
        } else {
            res.status(404).json({ message: 'Email or password is wrong' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// Sign Out
router.post("/signout", (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Signout successfully!' });
});

// User Info
router.post("/userinfo", (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Signout successfully!' });
});

module.exports = router;
