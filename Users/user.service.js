// This file holds the Business-Logic layer, interacting with Data Layer
const bcrypt = require("bcrypt")
const User = require('../Users/user.model')
//const User = getUserModel();

function getUserModel()
{
  const User = require('../Users/user.model');
  return User;
}

async function GetSelf (req,res)
{
    User.findById(req.user._id).select("-password")
    .then(user=>{
    res.json(user)
    })
    .catch(err=>{
    res.json(err)
    })
}

  async function UpdateSelf (req, res)
  {
    const login = req.body?.username;
    const mdp = req.body?.password;
    const hash = await bcrypt.hash(mdp,10);
    User.findByIdAndUpdate(req.user._id,
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
            } else res.json("Change done.");
        }
        );
  }

async function DeleteSelf (req,res)
{
    User.findByIdAndDelete(req.user._id)
    .then(user=>{
        res.json("Delete done, please reconnect with another user")
    })
    .catch(err=>{
        res.json(err)
    })
}
async function GetAllUsers (req,res)
{
    User.find().select("-password")
    .then(users=>{
    res.json(users)
    })
}
async function UpdateUserRole (req,res)
{
    User.findByIdAndUpdate({_id :req.params.id},
        {
          $set: {
          role : "admin"
        },
      },
          {new:true},
          (err, User) => {
            if (err) {
              res.send(err);
            } else res.json("Change Done");
          }
        );
}

module.exports = {getUserModel,GetSelf, UpdateSelf, DeleteSelf,GetAllUsers,UpdateUserRole}