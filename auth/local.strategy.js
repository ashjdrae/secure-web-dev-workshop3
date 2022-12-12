const bcrypt = require("bcrypt")
const User = require('../Users/user.model')

async function Register(username,password)
{
    const hash = await bcrypt.hash(password,10);
    const user = new User({username, password : hash, role : "basic_user"})
    return await user.save()
}

async function checkPassword(username,password,req,res)
{
    const user = await User.findOne({username})
    return await bcrypt.compare(password,user.password)
}

async function GetUser(username)
{
    const user = await User.findOne({username})
    return user;
}

// local passport strategy
const passport = require('passport');
const LocalStrategy = require ('passport-local')

passport.use(new LocalStrategy({usernameField : 'username'},
    async function(username,password,done) {
        try {
            const user = await checkPassword(username,password)
            if(!user){return done(null,false);}
            return done(null,user);
        }
        catch(err) {
            if(err) {return done(err)}
        }
    }))

module.exports = { Register, checkPassword,GetUser}

