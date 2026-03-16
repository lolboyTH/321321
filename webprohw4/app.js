const express = require('express');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
const secret = 'yay';

app.post('/login', (req,res) => {
    const { username, password } = req.body;
    const payload = { role: 'user' };
    if (username === 'admin'){
        payload = { role: 'admin' };
    }
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    res.json({ token });
})

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

const checkAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
};

app.get('/admin-only', authenticateToken, checkAdmin, (req, res) => {
    res.json({ message: 'Welcome, admin!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});