const jwt = require('jsonwebtoken');

async function CreateToken(ID)
{
    return await jwt.sign({ sub: ID}, process.env.JWT_SECRET, { expiresIn: '1h'});
}

// JWT passport strategy
const passport = require('passport');
const {getUserModel}=require('../Users/user.service');
const User = getUserModel();
const { Strategy, ExtractJwt } = require('passport-jwt');
const localStrategy = require('./local.strategy')
passport.use(new Strategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    },
    function (token,done) {
        User.findOne({_id: token.sub}, function(err,user) {
            if(err) return done(err,false);
            if(user) return done(null,user);
            return done(null,false);
        });
    }
))
module.exports = {CreateToken};