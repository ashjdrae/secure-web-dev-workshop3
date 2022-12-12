const jwt = require('jsonwebtoken');
var secret_token= null;

async function CreateToken(ID)
{
    secret_token = await jwt.sign({ sub: ID}, process.env.JWT_SECRET, { expiresIn: '7d'});
    return secret_token;
}

async function GetIDFromToken() 
{
    var IDUser = null;
    if(secret_token != null)
    {
        jwt.verify(secret_token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return (err);
        IDUser = decoded.sub;
        });
    }
    return IDUser
}

async function ResetToken()
{
    secret_token = null;
}

// JWT passport strategy
const passport = require('passport');
const User = require('../Users/user.model');
const { Strategy, ExtractJwt } = require('passport-jwt');
const localStrategy = require('./local.strategy')
passport.use(new Strategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    },
    async function(token,done) {
        User.findOne({_id: token.sub}, function(err,user) {
            if(err) return done(err,false);
            if(user) return done(null,user);
            return done(null,false);
        });
    }
))
module.exports = {CreateToken,GetIDFromToken,ResetToken};