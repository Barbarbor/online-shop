const express = require('express');
const jwtAuth = require('../auth/authMiddleware');
const authRoutes = express.Router();

authRoutes.get('/protected', jwtAuth, (req, res) => {
    // If you reach this handler, the request is authenticated with a valid JWT.
    // Access user data using req.user
    res.json({ message: 'Authenticated', user: req.user });
});

module.exports = authRoutes;
