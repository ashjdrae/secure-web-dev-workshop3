// This file holds the Business-Logic layer, interacting with Data Layer
const bcrypt = require("bcrypt")
const User = require('./user.model')
const JWTStrategy = require('../auth/jwt.strategy')

async function GetSelf (req,res){
    var UserID = await JWTStrategy.GetIDFromToken()
    if(UserID != null)
    {
        User.findById(UserID)
        .then(user=>{
        res.json(user)
        })
        .catch(err=>{
        res.json(err)
        })
    }
    else
    {
        res.json("You need to login first")
    }
  }

  async function UpdateSelf (req, res)
  {
      var UserID = await JWTStrategy.GetIDFromToken()
      if(UserID != null)
      {
        const login = req.body?.username;
        const mdp = req.body?.password;
        const hash = await bcrypt.hash(mdp,10);
          User.findByIdAndUpdate(UserID,
          {
            $set: {
            username : login,
            password : hash
          },
        },
            {new:true},
            (err) => {
              if (err) {
                res.send(err);
              } else res.json("Change done. Please reconnect with your new logs");
            }
          );
      }
      else
      {
          res.json("You need to login first")
      }
      JWTStrategy.ResetToken();
  }

async function DeleteSelf (req,res)
{
    var UserID = await JWTStrategy.GetIDFromToken()
    if(UserID != null)
    {
        User.findByIdAndDelete(UserID)
        .then(user=>{
            res.json(user,"Delete done, please reconnect with another user")
        })
        .catch(err=>{
            res.json(err)
        })
    }
    else
    {
        res.json("You need to login first")
    }
    JWTStrategy.ResetToken();
}
async function GetAll (req,res)
{
    var UserID = await JWTStrategy.GetIDFromToken()
    if(UserID != null)
    {
        User.find()
        .then(users=>{
        res.json(users)
        })
        .catch(err=>{
        res.json(err)
        })
    }
    else
    {
        res.json("You need to login first")
    }
}
async function authMiddleware (req,res)
{
    var UserID = await JWTStrategy.GetIDFromToken()
    if(UserID != null)
    {
        User.findById(UserID)
        .then(user=>{
        return user.role
        })
        .catch(err=>{
        res.json(err)
        })
    }
    else
    {
        res.json("You need to login first")
    }
}
const roleMiddleware = (allowedRoles) => (req, res, next) => allowedRoles.includes(req.user?.role) ? next() : res.status(403).send()

module.exports = { GetSelf, UpdateSelf, DeleteSelf,GetAll,authMiddleware, roleMiddleware}