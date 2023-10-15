const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { verifyToken } = require('./jwt');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'zXjjnnao1e9pp-2249448,Mjdjv94ghXZXngeoP', // Use the same secret key as in jwt.js
};

passport.use(
    new Strategy(opts, (jwt_payload, done) => {
        const user = verifyToken(jwt_payload);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    })
);

const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = jwtAuth;