const jwt = require('jsonwebtoken');

const secret = 'zXjjnnao1e9pp-2249448,Mjdjv94ghXZXngeoP'; // Replace with a strong, secret key
const expiresIn = '1h';

function signToken(payload) {
    return jwt.sign(payload, secret, { expiresIn });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return null;
    }
}

module.exports = { signToken, verifyToken };